// Bilingual content for the generated static pages. English and Chinese are authored here;
// build.mjs wraps each entry in the shared page shell and writes the committed HTML.
export const PAGES = [
  {
    slug: 'project',
    en: {
      title: 'Project and availability - Atta',
      description: 'What Atta is, what the home page demos show, and the current availability of this self-hosted AI workbench.',
      h1: 'Project and availability',
      lede: 'Atta is a self-hosted AI workbench concept. This page explains what the public site shows, how to read the interactive demos, and what you can and cannot get today.',
      body: `
<section aria-labelledby="what">
<h2 id="what">What Atta is</h2>
<p>Atta is a self-hosted AI workbench concept. It puts agents that run on different machines into one live map. Each flow has steps, each step belongs to an agent, and risky steps stop at a gate called Hodor until the owner approves them.</p>
<p>The name comes from the leafcutter ant. The design targets one person who directs a small team of agents instead of watching many terminals.</p>
<p>This site presents the concept. It is not a live product instance.</p>
</section>
<section aria-labelledby="demos">
<h2 id="demos">What the demos show</h2>
<p>The home page demos are scripted interactions with sample data. The weekly report, the three machines, the bots, the scores, and the versions are examples. They are not live data.</p>
<p>You can click steps, switch flows, approve the gate, and watch the self-improvement loop. The demos run in your browser and send nothing to a server.</p>
<p>The self-improvement panel simulates the proposed loop. One rule changes, the same eval cases run again, and the change stays only if the score rises and the owner approves it.</p>
</section>
<section aria-labelledby="availability">
<h2 id="availability">Availability</h2>
<p>Atta is not publicly available. This website offers no download, installer, hosted service, account, or sign-up. It does not provide public installation instructions.</p>
<p>No public release date is published.</p>
</section>
<section aria-labelledby="repo">
<h2 id="repo">What the public repository contains</h2>
<p>The <a href="https://github.com/HugoSkylight/atta-web">public GitHub repository</a> contains this website: HTML, CSS, JavaScript, images, and the generator for these pages. It does not contain the product implementation, and no license for the product is published.</p>
</section>
<section aria-labelledby="contact">
<h2 id="contact">Contact</h2>
<p>Use the <a href="https://github.com/HugoSkylight/atta-web/issues">website repository issues</a> for questions and corrections. The maintainer is <a href="https://github.com/HugoSkylight">Hugo Light</a>. No public email address is published.</p>
<p>Issues are public. Do not post API keys, tokens, private logs, customer data, or other secrets. The maintainer can correct errors in this site. Product support is not offered through this site.</p>
</section>`,
    },
    zh: {
      title: '项目与可用性 - Atta',
      description: '了解 Atta 是什么、首页演示展示了什么，以及这个自托管 AI 工作台目前的可用状态。',
      h1: '项目与可用性',
      lede: 'Atta 是一个自托管 AI 工作台的概念。本页说明公开网站展示了什么、怎样理解交互演示，以及今天能得到什么、不能得到什么。',
      body: `
<section aria-labelledby="what">
<h2 id="what">Atta 是什么</h2>
<p>Atta 是一个自托管 AI 工作台的概念。它把运行在不同机器上的 Agent 放进一张实时图。每条流程有若干步骤，每个步骤属于一个 Agent；发布、付款、删除这类危险步骤会停在名为 Hodor 的门前，等所有者批准。</p>
<p>名字来自切叶蚁。设计面向一个人指挥一支小型 Agent 团队，而不是盯着许多终端。</p>
<p>本站展示的是概念，不是运行中的产品实例。</p>
</section>
<section aria-labelledby="demos">
<h2 id="demos">演示展示了什么</h2>
<p>首页演示是带示例数据的脚本化交互。周报、三台机器、Bot、分数和版本都是示例，不是实时数据。</p>
<p>你可以点步骤、切换流程、批准门禁，并观察自我改进循环。演示在浏览器里运行，不向服务器发送任何内容。</p>
<p>自我改进面板模拟设想的循环：只改一条规则，用同一组评测用例重跑，只有分数上升且所有者批准，改动才保留。</p>
</section>
<section aria-labelledby="availability">
<h2 id="availability">可用性</h2>
<p>Atta 尚未公开。本站不提供下载、安装包、托管服务、账户或注册，也不提供公开安装说明。</p>
<p>尚未公布公开发布日期。</p>
</section>
<section aria-labelledby="repo">
<h2 id="repo">公开仓库包含什么</h2>
<p><a href="https://github.com/HugoSkylight/atta-web">公开的 GitHub 仓库</a>包含这个网站：HTML、CSS、JavaScript、图片和这些页面的生成脚本。它不包含产品实现，也没有发布产品许可证。</p>
</section>
<section aria-labelledby="contact">
<h2 id="contact">联系</h2>
<p>问题和更正请使用<a href="https://github.com/HugoSkylight/atta-web/issues">网站仓库的 Issues</a>。维护者是 <a href="https://github.com/HugoSkylight">Hugo Light</a>。没有公布公开电子邮箱。</p>
<p>Issues 是公开的。不要发布 API 密钥、令牌、私有日志、客户数据或其他机密。维护者可以更正本站的错误。本站不提供产品支持。</p>
</section>`,
    },
  },
  {
    slug: 'privacy',
    en: {
      title: 'Privacy - Atta website',
      description: 'What this static Atta website stores and what it sends to third parties. This policy covers the website only.',
      h1: 'Privacy',
      lede: 'This policy covers the public Atta website. It does not describe the Atta product or any deployment of it.',
      body: `
<section aria-labelledby="collect">
<h2 id="collect">What the site collects</h2>
<p>The website has no accounts, forms, comments, newsletter, payments, analytics scripts, advertising, or tracking pixels. It has no application backend. Hosting and font providers receive browser requests as described below.</p>
</section>
<section aria-labelledby="storage">
<h2 id="storage">Cookies and local storage</h2>
<p>The website code sets no cookies and stores no language preference. Each language has its own URL. Your chosen language stays in the URL when you refresh or follow the site's navigation.</p>
</section>
<section aria-labelledby="third-parties">
<h2 id="third-parties">Third-party requests</h2>
<p>The site loads the Jost font from Google Fonts. Your browser connects to fonts.googleapis.com and fonts.gstatic.com and shares connection information such as your IP address and browser headers. Referrer information depends on your browser's policy. See the <a href="https://policies.google.com/privacy">Google Privacy Policy</a>.</p>
<p>The site is hosted on GitHub Pages. GitHub may process request information to operate and protect the service. This page does not specify GitHub's logging or retention settings. See the <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub Privacy Statement</a>.</p>
<p>Links to GitHub and other sites leave this site. Those sites apply their own policies.</p>
</section>
<section aria-labelledby="contact">
<h2 id="contact">Contact</h2>
<p>Questions and corrections go to the <a href="https://github.com/HugoSkylight/atta-web/issues">website repository issues</a>. Issues are public, so do not include personal data or secrets. No public email address is published.</p>
</section>
<section aria-labelledby="changes">
<h2 id="changes">Changes</h2>
<p>This policy may change with the site. The <a href="../changelog/">changelog</a> records changes to the website.</p>
</section>`,
    },
    zh: {
      title: '隐私 - Atta',
      description: '这个静态 Atta 网站保存什么、向第三方发送什么。本政策只覆盖网站。',
      h1: '隐私',
      lede: '本政策覆盖公开的 Atta 网站。它不描述 Atta 产品或任何产品部署。',
      body: `
<section aria-labelledby="collect">
<h2 id="collect">本站收集什么</h2>
<p>网站没有账户、表单、评论、邮件订阅、支付、分析脚本、广告或追踪像素，也没有应用后端。托管方和字体提供方会接收下文所述的浏览器请求。</p>
</section>
<section aria-labelledby="storage">
<h2 id="storage">Cookie 与本地存储</h2>
<p>网站代码不设置 Cookie，也不保存语言偏好。每种语言都有独立 URL。刷新页面或沿本站导航访问时，网址会保留所选语言。</p>
</section>
<section aria-labelledby="third-parties">
<h2 id="third-parties">第三方请求</h2>
<p>本站从 Google Fonts 加载 Jost 字体。浏览器连接 fonts.googleapis.com 和 fonts.gstatic.com 时，会分享 IP 地址和浏览器请求头等连接信息。来源信息取决于浏览器策略。参见 <a href="https://policies.google.com/privacy">Google 隐私政策</a>。</p>
<p>本站托管在 GitHub Pages 上。GitHub 可能为运营和保护服务处理请求信息。本页不指定 GitHub 的日志和保留设置。参见 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub 隐私声明</a>。</p>
<p>指向 GitHub 和其他网站的链接会离开本站。那些网站适用各自的政策。</p>
</section>
<section aria-labelledby="contact">
<h2 id="contact">联系</h2>
<p>问题和更正请发到<a href="https://github.com/HugoSkylight/atta-web/issues">网站仓库的 Issues</a>。Issues 是公开的，请不要包含个人数据或机密。没有公布公开电子邮箱。</p>
</section>
<section aria-labelledby="changes">
<h2 id="changes">变更</h2>
<p>本政策可能随网站变化。<a href="../changelog/">更新日志</a>记录网站的变化。</p>
</section>`,
    },
  },
  {
    slug: 'security',
    en: {
      title: 'Security - Atta website',
      description: 'Security scope for the static Atta website, its third-party dependencies, and how to report a problem.',
      h1: 'Security',
      lede: 'This page covers the public website. It is not a security assessment of the Atta product.',
      body: `
<section aria-labelledby="scope">
<h2 id="scope">Scope</h2>
<p>The site is static HTML, CSS, and JavaScript. It has no application backend, login, database, user accounts, payments, file uploads, forms, or text inputs.</p>
</section>
<section aria-labelledby="source">
<h2 id="source">Source and dependencies</h2>
<p>The full website source is in the <a href="https://github.com/HugoSkylight/atta-web">public repository</a>. The site loads one third-party resource, the Jost font from Google Fonts. Hosting is GitHub Pages.</p>
</section>
<section aria-labelledby="limits">
<h2 id="limits">What this page does not claim</h2>
<p>No audit, certification, or bug bounty is published. Nothing here is a claim about the security of the Atta product, its encryption, logging, model training, or data retention. Those properties depend on a deployment, and the product code is not public.</p>
</section>
<section aria-labelledby="report">
<h2 id="report">Reporting a problem</h2>
<p>Open an issue in the <a href="https://github.com/HugoSkylight/atta-web/issues">website repository</a> for website problems. Do not include exploit details, credentials, personal data, or other secrets in a public issue.</p>
<p>No private security contact or encryption key is published. If a report needs a private channel, open an issue without sensitive details and ask the maintainer how to proceed.</p>
</section>
<section aria-labelledby="versions">
<h2 id="versions">Supported version</h2>
<p>The website has no versioned releases. Its published source history is available in the <a href="https://github.com/HugoSkylight/atta-web/commits/main/">website repository</a>.</p>
</section>`,
    },
    zh: {
      title: '安全 - Atta',
      description: '静态 Atta 网站的安全范围、第三方依赖，以及如何报告问题。',
      h1: '安全',
      lede: '本页覆盖公开网站。它不是对 Atta 产品的安全评估。',
      body: `
<section aria-labelledby="scope">
<h2 id="scope">范围</h2>
<p>本站是静态 HTML、CSS 和 JavaScript，没有应用后端、登录、数据库、用户账户、支付、文件上传、表单或文本输入框。</p>
</section>
<section aria-labelledby="source">
<h2 id="source">源码与依赖</h2>
<p>完整的网站源码在<a href="https://github.com/HugoSkylight/atta-web">公开仓库</a>中。本站只加载一个第三方资源，即来自 Google Fonts 的 Jost 字体。托管方是 GitHub Pages。</p>
</section>
<section aria-labelledby="limits">
<h2 id="limits">本页不声明什么</h2>
<p>没有公布审计、认证或漏洞赏金。本页不声明 Atta 产品的安全性、加密、日志、模型训练或数据保留。这些属性取决于具体部署，产品代码不公开。</p>
</section>
<section aria-labelledby="report">
<h2 id="report">报告问题</h2>
<p>网站问题请在<a href="https://github.com/HugoSkylight/atta-web/issues">网站仓库</a>开 Issue。不要在公开 Issue 中包含漏洞细节、凭据、个人数据或其他机密。</p>
<p>没有公布私有安全联系人或加密密钥。如果报告需要私下渠道，请先开一个不含敏感细节的 Issue，询问维护者如何继续。</p>
</section>
<section aria-labelledby="versions">
<h2 id="versions">支持的版本</h2>
<p>网站没有版本化发布。已发布源码的历史可在<a href="https://github.com/HugoSkylight/atta-web/commits/main/">网站仓库</a>查看。</p>
</section>`,
    },
  },
  {
    slug: 'changelog',
    en: {
      title: 'Changelog - Atta website',
      description: 'Changes to the public Atta website, with links to the commits that made them.',
      h1: 'Changelog',
      lede: 'Changes to this website. Product changes are not listed because the product is not public.',
      body: `
<ol class="log">
<li><time datetime="2026-10-20">20 October 2026</time><h2>Project information and discoverability</h2><p>Added static English and Chinese project, privacy, security, and changelog pages. Language links now use separate URLs. Added social metadata, a sitemap, and an AI-readable site summary.</p></li>
<li>
<time datetime="2026-10-20">20 October 2026</time>
<h2>Bilingual homepage and interactive demo</h2>
<p>The home page gained a clickable alternate ant illustration and English and Chinese text. The yellow ticker loop was fixed in the same change.</p>
<p><a href="https://github.com/HugoSkylight/atta-web/commit/334c0be7a88ccdd12f9d27680542f165d0e1044d">Commit 334c0be</a></p>
</li>
<li>
<time datetime="2026-10-20">20 October 2026</time>
<h2>Hero homepage branch merged</h2>
<p>Pull request #1 merged feat/hero-bilingual-homepage into the main branch.</p>
<p><a href="https://github.com/HugoSkylight/atta-web/commit/088be71b2392d528b095e66bf36105154c77573a">Commit 088be71</a> · <a href="https://github.com/HugoSkylight/atta-web/pull/1">Pull request #1</a></p>
</li>
</ol>`,
    },
    zh: {
      title: '更新日志 - Atta',
      description: '公开 Atta 网站的变化，附对应提交的链接。',
      h1: '更新日志',
      lede: '本站的变化。产品尚未公开，因此不列产品变更。',
      body: `
<ol class="log">
<li><time datetime="2026-10-20">2026 年 10 月 20 日</time><h2>项目信息与可发现性</h2><p>新增中英文静态项目、隐私、安全和更新日志页面。语言切换改用独立网址，并加入社交分享元数据、站点地图和供 AI 阅读的网站摘要。</p></li>
<li>
<time datetime="2026-10-20">2026 年 10 月 20 日</time>
<h2>双语首页与交互演示</h2>
<p>首页增加了可点击切换的小蚂蚁立绘和中英文文案，并在同一次改动中修复黄色滚动条的循环断点。</p>
<p><a href="https://github.com/HugoSkylight/atta-web/commit/334c0be7a88ccdd12f9d27680542f165d0e1044d">提交 334c0be</a></p>
</li>
<li>
<time datetime="2026-10-20">2026 年 10 月 20 日</time>
<h2>主视觉首页分支合并</h2>
<p>Pull request #1 将 feat/hero-bilingual-homepage 合并进主分支。</p>
<p><a href="https://github.com/HugoSkylight/atta-web/commit/088be71b2392d528b095e66bf36105154c77573a">提交 088be71</a> · <a href="https://github.com/HugoSkylight/atta-web/pull/1">Pull request #1</a></p>
</li>
</ol>`,
    },
  },
];
