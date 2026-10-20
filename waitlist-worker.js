/**
 * Atta Waitlist + Trial Code Email Worker (Cloudflare Workers + Resend / Domain Email)
 *
 * 环境变量 (wrangler secret put):
 * - RESEND_API_KEY: Resend API Key（绑好你的域名邮箱后创建）
 * - FROM_EMAIL: 发件人，例如 "Atta <beta@yourdomain.com>"
 * - NOTIFY_EMAIL: (可选) 你的通知邮箱，每有人加入候补同步抄送你
 * - AUTO_SEND_CODE: (可选) 设为 "1" 则注册时立即自动生成并发送试用码；不设则发送「已加入候补，试用码随后发放」确认信
 * - WAITLIST_KV: 绑定 KV 命名空间，记录 { email, code, lang, ts }
 * - ADMIN_TOKEN: (可选) 管理密钥；访问 GET /?token=xxx 可查看全部候补名单，加 &format=csv 直接导出表格
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const genCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = () => Array.from(crypto.getRandomValues(new Uint8Array(4)), b => chars[b % chars.length]).join('');
  return `ATTA-${seg()}-${seg()}`;
};

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (req.method === 'GET' && env.ADMIN_TOKEN && url.searchParams.get('token') === env.ADMIN_TOKEN && env.WAITLIST_KV) {
      const { keys } = await env.WAITLIST_KV.list({ limit: 1000 });
      const rows = (await Promise.all(keys.map(k => env.WAITLIST_KV.get(k.name, 'json')))).filter(Boolean);
      if (url.searchParams.get('format') === 'csv') {
        const csv = ['email,code,lang,ts', ...rows.map(r => `${r.email},${r.code},${r.lang},${r.ts}`)].join('\n');
        return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
      }
      return Response.json(rows);
    }
    if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: CORS });

    const { email = '', lang = 'en' } = await req.json().catch(() => ({}));
    const clean = String(email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      return Response.json({ error: 'Invalid email' }, { status: 400, headers: CORS });
    }

    const code = genCode();
    const record = { email: clean, code, lang, ts: new Date().toISOString() };
    if (env.WAITLIST_KV) await env.WAITLIST_KV.put(clean, JSON.stringify(record));

    const auto = env.AUTO_SEND_CODE === '1';
    const zh = lang === 'zh';
    const subject = zh
      ? (auto ? '你的 Atta 内测试用码' : '你已加入 Atta 候补名单')
      : (auto ? 'Your Atta beta trial code' : "You're on the Atta waitlist");
    const text = zh
      ? (auto
          ? `你好！\n\n欢迎试用 Atta。你的专属内测试用码是：\n\n  ${code}\n\n有问题直接回复这封邮件即可。\n\n— Atta 团队`
          : `你好！\n\n我们已收到你的邮箱（${clean}）。本批内测名额开放时，我们会通过此邮箱把你的专属试用码发给你。\n\n— Atta 团队`)
      : (auto
          ? `Hi!\n\nWelcome to the Atta closed beta. Here is your trial code:\n\n  ${code}\n\nReply directly to this email if you need any help.\n\n— Atta`
          : `Hi!\n\nYou're on the Atta waitlist (${clean}). We'll send your trial code to this address as the next batch opens up.\n\n— Atta`);

    if (env.RESEND_API_KEY && env.FROM_EMAIL) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.FROM_EMAIL,
          to: [clean],
          ...(env.NOTIFY_EMAIL ? { bcc: [env.NOTIFY_EMAIL] } : {}),
          subject,
          text,
        }),
      });
      if (!r.ok) return Response.json({ error: 'Mail send failed' }, { status: 502, headers: CORS });
    }

    return Response.json({ ok: true }, { headers: CORS });
  },
};
