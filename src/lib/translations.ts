// ─────────────────────────────────────────────
// Translations — English · Japanese · Chinese
// ─────────────────────────────────────────────

import type { Profile } from "@/data/profile";
import baseProfile from "@/data/profile";

/* ── Language codes ────────────────────────── */

export type Lang = "en" | "ja" | "zh";

export const LANGUAGES: { code: Lang; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "ja", label: "Japanese", nativeLabel: "日本語" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
];

/* ── UI string type ────────────────────────── */

export interface UI {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
  };
  common: {
    downloadResume: string;
    viewAll: string;
    all: string;
  };
  home: {
    viewProjects: string;
    getInTouch: string;
    featuredProjects: string;
    skills: string;
    interestedTitle: string;
    interestedDesc: string;
    contactMe: string;
  };
  resume: {
    summary: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    certifications: string;
    languages: string;
  };
  contact: {
    title: string;
    description: string;
    connect: string;
    location: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    sendMessage: string;
    thankYou: string;
    sendAnother: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  projects: {
    title: string;
    description: string;
    noMatch: string;
  };
}

/* ── UI translations ───────────────────────── */

const uiEn: UI = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  common: {
    downloadResume: "Download Resume",
    viewAll: "View all",
    all: "All",
  },
  home: {
    viewProjects: "View Resume",
    getInTouch: "Get in Touch",
    featuredProjects: "Featured Projects",
    skills: "Skills",
    interestedTitle: "Interested in working together?",
    interestedDesc:
      "I'm open to marketing strategy engagements, market research collaborations, and strategic growth advisory roles.",
    contactMe: "Contact Me",
  },
  resume: {
    summary: "Summary",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    education: "Education",
    certifications: "Certifications",
    languages: "Languages",
  },
  contact: {
    title: "Contact",
    description:
      "I'm exploring opportunities in marketing strategy and growth, and would love to connect. Feel free to send a message below or reach out on LinkedIn.",
    connect: "Connect",
    location: "Location",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    sendMessage: "Send Message",
    thankYou: "Thank you!",
    sendAnother: "Send another message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "How can I help?",
  },
  projects: {
    title: "Projects",
    description: "Strategy, consulting, and research engagements.",
    noMatch: "No projects match that filter.",
  },
};

const uiJa: UI = {
  nav: {
    home: "ホーム",
    projects: "プロジェクト",
    about: "概要",
    contact: "お問い合わせ",
  },
  common: {
    downloadResume: "履歴書をダウンロード",
    viewAll: "すべて表示",
    all: "すべて",
  },
  home: {
    viewProjects: "履歴書を見る",
    getInTouch: "お問い合わせ",
    featuredProjects: "注目のプロジェクト",
    skills: "スキル",
    interestedTitle: "一緒に仕事をしませんか？",
    interestedDesc:
      "コンサルティング、リサーチコラボレーション、戦略的アドバイザリーに対応しています。",
    contactMe: "お問い合わせ",
  },
  resume: {
    summary: "概要",
    experience: "経歴",
    projects: "プロジェクト",
    skills: "スキル",
    education: "学歴",
    certifications: "資格・認定",
    languages: "言語",
  },
  contact: {
    title: "お問い合わせ",
    description:
      "マーケティング戦略とグロースの機会を探しており、ぜひつながりたいと思っています。以下のフォームからメッセージを送るか、LinkedInでお気軽にご連絡ください。",
    connect: "つながる",
    location: "所在地",
    nameLabel: "お名前",
    emailLabel: "メールアドレス",
    messageLabel: "メッセージ",
    sendMessage: "送信する",
    thankYou: "ありがとうございます！",
    sendAnother: "もう一通送る",
    namePlaceholder: "お名前",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "お気軽にご相談ください",
  },
  projects: {
    title: "プロジェクト",
    description: "戦略、コンサルティング、リサーチの活動実績。",
    noMatch: "フィルターに一致するプロジェクトがありません。",
  },
};

const uiZh: UI = {
  nav: {
    home: "首页",
    projects: "项目",
    about: "关于",
    contact: "联系",
  },
  common: {
    downloadResume: "下载简历",
    viewAll: "查看全部",
    all: "全部",
  },
  home: {
    viewProjects: "查看简历",
    getInTouch: "联系我",
    featuredProjects: "精选项目",
    skills: "技能",
    interestedTitle: "有兴趣一起合作吗？",
    interestedDesc:
      "我对咨询合作、研究合作和战略顾问均持开放态度。",
    contactMe: "联系我",
  },
  resume: {
    summary: "概述",
    experience: "工作经历",
    projects: "项目经历",
    skills: "专业技能",
    education: "教育背景",
    certifications: "资格认证",
    languages: "语言能力",
  },
  contact: {
    title: "联系方式",
    description:
      "我正在探索营销策略和增长方面的机会，很期待与您联系。欢迎通过下方表单留言或在LinkedIn上联系我。",
    connect: "社交链接",
    location: "所在地",
    nameLabel: "姓名",
    emailLabel: "邮箱",
    messageLabel: "留言",
    sendMessage: "发送消息",
    thankYou: "谢谢！",
    sendAnother: "再发送一条",
    namePlaceholder: "您的姓名",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "请问有什么可以帮您的？",
  },
  projects: {
    title: "项目",
    description: "战略、咨询和研究项目。",
    noMatch: "没有匹配该筛选条件的项目。",
  },
};

/* ── Profile translations ──────────────────── */

const profileJa: Profile = {
  ...baseProfile,
  headline: "ディープテックとグローバル成長の交差点で。",
  summary:
    "北米、ヨーロッパ、アジアにわたり7年以上B2Bの収益成長を牽引してきた、グローバルマーケティング＆ビジネス戦略のプロフェッショナル。グローバル半導体ポートフォリオの製品ローンチ、ポジショニング、差別化、ライフサイクル管理を担い、3年間で140%の収益成長を達成。MRI装置向けに供給する冷却フィルター製品ラインでは、価格・契約条件・キーアカウント関係まで一貫してオーナーシップを持って推進。コンサルティングでは市場規模推定、競合評価、米国市場参入、ライフサイエンスソフトウェアのクロスマーケット分析を経験。英語・日本語・中国語のトリリンガル。",
  location: "サンディエゴ、CA",
  specialties: ["SaaSマーケティング戦略", "ライフサイエンス＆バイオテック", "AI＆先端製造業"],
  resumeUrl: "/resume-ja.pdf",

  skills: [
    {
      category: "プロダクトマーケティング",
      items: [
        "ポジショニング",
        "メッセージング",
        "差別化",
        "セグメンテーション",
        "バリュープロポジション",
        "Go-to-Market戦略",
        "製品ローンチ",
        "新製品開発（NPD）",
        "ライフサイクル管理",
        "セールスイネーブルメント",
        "価格・バリュー戦略",
        "競合分析",
        "技術ストーリーテリング",
      ],
    },
    {
      category: "リサーチ＆分析",
      items: [
        "市場規模推定",
        "一次・二次調査",
        "顧客の声（VOC）",
        "顧客インサイト創出",
        "ビジネスケース策定",
        "KPIトラッキング",
        "ROI分析",
      ],
    },
    {
      category: "部門横断",
      items: [
        "ステークホルダー調整",
        "セールス連携",
        "部門横断的な実行",
        "予算管理",
      ],
    },
    {
      category: "ツール",
      items: ["Excel", "Tableau", "PowerPoint", "Office 365", "CRM Systems"],
    },
  ],

  experience: [
    {
      title: "MBAマーケティングインターン",
      company: "BIOVIA・ダッソー・システムズ",
      type: "インターンシップ",
      dates: "2025年6月 – 現在",
      location: "サンディエゴ、CA・ハイブリッド",
      bullets: [
        "ライフサイエンス、材料科学、情報学の各セグメントにわたる競合・クロスマーケット環境をマッピングし、競合ポジショニング、ホワイトスペース、未充足ニーズを、年間マーケティング計画とGTMターゲティングに用いるセグメント優先順位付けのビューへと落とし込み。",
        "グローバルキャンペーンと業界イベント（展示会、カンファレンス、ウェビナー）のエンドツーエンド戦略を統括。メッセージング、ベンダー・予算管理、スケジュールを担い、営業・技術部門と部門横断で連携し、技術的なインプットを訴求力のあるメッセージへ翻訳するとともに、イベント接点を有望なパイプラインへ転換。",
        "キャンペーンとイベントの支出をパイプライン貢献に結びつけるExcelベースのパフォーマンスダッシュボードを構築し、より高収益なチャネルへの予算再配分と翌サイクルの予算増額を後押し。",
      ],
      skills: baseProfile.experience[0].skills,
    },
    {
      title: "戦略コンサルタント（Rady Action Project）",
      company: "インテル コーポレーション",
      type: "コンサルティングプロジェクト",
      dates: "2025年3月 – 2025年6月",
      location: "サンタクララ、CA",
      bullets: [
        "北米、ヨーロッパ、アジアにわたるグローバルなフィジカルAI・ロボティクス市場の規模を推定し、AI主導の需要が変曲する領域を特定。",
        "一次・二次調査を主導し、断片的な専門家の知見を、導入障壁（設備投資、データの入手可能性、安全認証、規制の遅れ）に関する体系的な見取り図へと整理。",
        "汎用ヒューマノイドよりニッチなロボティクススタートアップを狙うパートナーシップ主導の参入戦略を提言。インテルのコーポレート戦略リーダーシップに提示し、推奨した方向性が採用された。",
      ],
      skills: baseProfile.experience[1].skills,
    },
    {
      title: "グローバルマーケティング＆ビジネス戦略マネージャー",
      company: "モアテック株式会社",
      type: "正社員",
      dates: "2022年5月 – 2024年7月",
      location: "東京、日本",
      bullets: [
        "3年間で売上を140%成長させ、北米・ヨーロッパ・アジアにわたる国際的な収益計画と市場戦略を統括。その基盤となるセグメンテーション、ポジショニング、差別化、需要創出プランを構築。",
        "新製品開発（NPD）へのマーケティング視点の反映を主導し、R&D・エンジニアリングと連携して市場要件と未充足ニーズを製品仕様とイノベーションロードマップへ落とし込み。",
        "北米・ヨーロッパ・アジアで製品をローンチし、コンセプトから商用化まで、スケジュール、成果物、ステークホルダー間の調整を含めて推進。",
        "MRI装置向けに供給する冷却フィルター製品ラインを担当。新製品のローンチ、価格・契約条件の設定、アジアの主要顧客とのキーアカウント関係の管理を主導。",
        "既存製品のリポジショニングや販売終了の判断を含むライフサイクル管理を通じて、ポートフォリオの健全性を管理。",
        "新規地域アカウントへの市場参入とチャネル拡大を主導。競合分析と顧客インサイトを組み合わせ、価格設定とバリュープロポジションを精緻化。",
        "地域・チャネル別のマーケティング予算配分を含む四半期ごとの実績分析と戦略的提言をCEOに直接提供。",
      ],
      skills: baseProfile.experience[2].skills,
    },
    {
      title: "グローバルマーケティング＆ビジネス戦略アソシエイト",
      company: "モアテック株式会社",
      dates: "2018年4月 – 2022年4月",
      location: "東京、日本",
      bullets: [
        "日本、中国、米国、ヨーロッパにわたるグローバルB2Bキャンペーンを実行し、データドリブンの顧客獲得で30%の売上成長を達成。",
        "チャネルミックスの再調整、バリュープロポジションの見直し、展示会・デジタル・アウトバウンドにおけるリード評価の強化により、売上目標を25%超過達成。",
        "エンジニアリング、製造、品質部門と連携し、共同での顧客訪問や技術サポートを行い、主要顧客に影響する仕様・品質・供給の問題を解決。",
        "地域営業チームに、イネーブルメントツールキット、トレーニングプログラム、メッセージングを提供し、製品の採用を促進。",
        "地域別GTM計画の基盤となるマーケティングKPIトラッキングを構築し、部門横断で連携してKPI・ROI分析によりファネルパフォーマンスを最適化。",
      ],
      skills: baseProfile.experience[3].skills,
    },
  ],

  languages: [
    { name: "日本語", proficiency: "ネイティブ" },
    { name: "中国語（標準）", proficiency: "ネイティブ" },
    { name: "上海語", proficiency: "ネイティブ" },
    { name: "英語", proficiency: "流暢" },
  ],

  projects: [
    {
      id: "deep-tech-industrial-policy",
      title:
        "政策から実践へ：ディープテックとAIが持続可能な成長と産業戦略をどう変革するか",
      dates: "2025年6月 – 2025年9月",
      summary:
        "金融アドバイザリー企業、学術教員、部門横断MBAチームと協力し、CHIPS法、インフレ抑制法（IRA）、Stargateプロジェクトなど米国テクノロジー産業政策が、ディープテック、AI、先端製造業への資本流入をどのように変革しているかを分析。",
      bullets: [
        "CHIPS法、IRA、Stargateが戦略的産業計画と官民投資の整合に与える影響を評価。",
        "政策シグナルがAIおよびディープテックセクターにおける垂直統合、再資本化、統合をどのように引き起こすかを分析。",
        "サプライチェーンとインフラにおける新興投資ゾーンと戦略的ボトルネックを特定。",
        "連邦インセンティブがM&A戦略、プライベートエクイティのトレンド、不動産投資パターンに与える波及効果を検証。",
      ],
      skills: baseProfile.projects[0].skills,
      tags: ["AI・ディープテック", "M&A", "戦略"],
      artifacts: [{ label: "レポート（近日公開）", url: "#" }],
      highlights: [
        "米国産業政策分析",
        "M&Aとプライベートマーケットの反応",
        "セクター機会マッピング",
      ],
      featured: true,
    },
    {
      id: "physical-ai-robotics-intel",
      title: "フィジカルAIとロボティクスコンサルティングプロジェクト",
      org: "UCサンディエゴ – レイディ経営大学院（Intel）",
      dates: "2025年3月 – 2025年6月",
      summary:
        "部門横断MBAチームと協力し、今後5年間でAIがグローバルロボティクス産業をどのように変革するかについて、Intelの調査を支援。",
      bullets: [
        "AI＋ロボティクスの融合に関する業界調査を実施：産業用・消費者セクターにおける主要トレンド、基盤技術、競争ダイナミクス。",
        "ステークホルダーの洞察と二次調査を活用して、グローバルな成長機会と潜在的なマーケット変曲点を評価。",
        "コンサルティングフレームワークと戦略的モデリングを使用して、シニアリーダーシップにデータドリブンの提言を提供。",
        "AI、半導体、オートメーションの交差点における専門知識を強化。",
      ],
      skills: baseProfile.projects[1].skills,
      tags: ["AI・ディープテック", "コンサルティング", "戦略"],
      artifacts: [{ label: "デッキ（近日公開）", url: "#" }],
      featured: true,
    },
    {
      id: "san-diego-consulting-competition",
      title: "サンディエゴイマージョンコンサルティングコンペティション – 第1位",
      dates: "2025年3月 – 2025年4月",
      summary:
        "イスラエルのスタートアップBzigoと協力し、AI蚊検出デバイスの米国市場参入戦略を策定。",
      bullets: [
        "短期B2Cターゲティングと長期B2B拡大計画を組み合わせた戦略を構築。",
        "市場調査とモデリングを実施。イノベーションと戦略的インパクトが評価され、第1位のピッチを達成。",
      ],
      skills: baseProfile.projects[2].skills,
      tags: ["Go-to-Market", "コンサルティング"],
      artifacts: [{ label: "ピッチデッキ（近日公開）", url: "#" }],
      highlights: ["第1位受賞"],
      featured: true,
    },
  ],
};

const profileZh: Profile = {
  ...baseProfile,
  headline: "深科技与全球增长的交汇点。",
  summary:
    "拥有7年以上经验的全球营销与商业战略专业人士，在北美、欧洲和亚洲推动B2B收入增长。负责全球半导体产品组合的产品发布、定位、差异化和生命周期管理，在三年内实现140%的收入增长，其中包括供应至MRI设备的冷却过滤器产品线，全面负责定价、合同条款和关键客户关系。咨询经验涵盖市场规模测算、竞争评估、美国市场进入，以及生命科学软件的跨市场分析。精通英语、日语和中文三种语言。",
  location: "圣迭戈，加利福尼亚",
  specialties: ["SaaS营销策略", "生命科学与生物技术", "人工智能与先进制造"],
  resumeUrl: "/resume-zh.pdf",

  skills: [
    {
      category: "产品营销",
      items: [
        "定位",
        "信息传递",
        "差异化",
        "市场细分",
        "价值主张",
        "市场进入策略",
        "产品发布",
        "新产品开发（NPD）",
        "生命周期管理",
        "销售赋能",
        "定价与价值策略",
        "竞争分析",
        "技术叙事",
      ],
    },
    {
      category: "研究与分析",
      items: [
        "市场规模测算",
        "一手与二手研究",
        "客户之声（VOC）",
        "客户洞察生成",
        "商业案例开发",
        "KPI跟踪",
        "ROI分析",
      ],
    },
    {
      category: "跨职能",
      items: ["利益相关者协调", "销售协作", "跨职能执行", "预算管理"],
    },
    {
      category: "工具",
      items: ["Excel", "Tableau", "PowerPoint", "Office 365", "CRM Systems"],
    },
  ],

  experience: [
    {
      title: "MBA营销实习生",
      company: "BIOVIA，达索系统",
      type: "实习",
      dates: "2025年6月 – 至今",
      location: "圣迭戈, CA · 混合办公",
      bullets: [
        "梳理生命科学、材料科学和信息学各细分领域的竞争与跨市场格局，将竞争对手定位、市场空白和未满足需求转化为用于年度营销规划和GTM目标定位的细分优先级视图。",
        "主导全球营销活动和行业活动（展会、会议、网络研讨会）的端到端策略，涵盖信息传递、供应商与预算管理及时间安排；推动与销售和技术相关方的跨职能协调，将技术输入转化为有说服力的信息表达，并将活动接触点转化为合格的销售管道。",
        "构建基于Excel的绩效仪表板，将营销活动和活动支出与销售管道贡献相关联，推动将预算重新分配至更高收益的渠道，并为下一周期争取更高的预算分配。",
      ],
      skills: baseProfile.experience[0].skills,
    },
    {
      title: "战略顾问（Rady Action Project）",
      company: "英特尔公司",
      type: "咨询项目",
      dates: "2025年3月 – 2025年6月",
      location: "圣克拉拉, CA",
      bullets: [
        "测算北美、欧洲和亚洲的全球物理AI与机器人市场机会规模，识别AI驱动需求的拐点所在。",
        "主导一手和二手研究，将零散的专家意见整理为关于采用障碍（资本支出、数据可得性、安全认证和监管滞后）的结构化视图。",
        "建议采取以合作伙伴为主导的进入策略，聚焦细分机器人初创企业而非通用人形机器人；向英特尔企业战略领导层汇报，其采纳了所建议的方向。",
      ],
      skills: baseProfile.experience[1].skills,
    },
    {
      title: "全球营销与商业战略经理",
      company: "Moretec公司",
      type: "全职",
      dates: "2022年5月 – 2024年7月",
      location: "东京，日本",
      bullets: [
        "三年内实现收入增长140%，负责北美、欧洲和亚洲的国际收入规划和市场战略，并构建其背后的市场细分、定位、差异化和需求生成计划。",
        "推动营销对新产品开发（NPD）的输入，与研发和工程团队合作，将市场需求和未满足需求转化为产品规格和创新路线图。",
        "在北美、欧洲和亚洲推出产品，从概念到商业化全程推进，包括时间安排、交付成果和相关方协调。",
        "负责供应至MRI设备的冷却过滤器产品线，推出新产品，制定定价和合同条款，并管理与亚洲主要客户的关键客户关系。",
        "通过生命周期管理（包括对现有产品的重新定位和退市决策）维护产品组合的健康。",
        "主导进入新区域客户的市场拓展和渠道扩张，结合竞争分析与客户洞察优化定价和价值主张。",
        "直接向CEO提供季度绩效分析和战略建议，包括跨地区和渠道的营销预算分配。",
      ],
      skills: baseProfile.experience[2].skills,
    },
    {
      title: "全球营销与商业战略助理",
      company: "Moretec公司",
      dates: "2018年4月 – 2022年4月",
      location: "东京，日本",
      bullets: [
        "在日本、中国、美国和欧洲执行全球B2B营销活动，通过数据驱动的客户获取实现30%的收入增长。",
        "通过重新平衡渠道组合、优化价值主张，以及在展会、数字和外呼渠道中加强潜客筛选，超额完成销售目标25%。",
        "与工程、制造和质量团队协作，进行联合客户拜访和技术支持，解决影响关键客户的规格、质量和供应问题。",
        "为区域销售团队配备赋能工具包、培训计划和信息传递材料，推动产品采用。",
        "构建成为区域GTM规划基础的营销KPI跟踪体系，跨职能协作，通过KPI和ROI分析优化漏斗表现。",
      ],
      skills: baseProfile.experience[3].skills,
    },
  ],

  languages: [
    { name: "日语", proficiency: "母语" },
    { name: "普通话", proficiency: "母语" },
    { name: "上海话", proficiency: "母语" },
    { name: "英语", proficiency: "流利" },
  ],

  projects: [
    {
      id: "deep-tech-industrial-policy",
      title: "从政策到实践：深科技与人工智能如何重塑可持续增长与产业战略",
      dates: "2025年6月 – 2025年9月",
      summary:
        "与金融咨询公司、学术教授和跨职能MBA团队合作，分析美国近期技术产业政策，如CHIPS法案、通胀削减法案（IRA）和星际之门项目，如何改变深科技、人工智能和先进制造业的资本流向。",
      bullets: [
        "评估CHIPS法案、IRA和星际之门项目如何影响战略产业规划和公私投资协调。",
        "分析政策信号如何触发人工智能和深科技领域的垂直整合、再资本化和整合。",
        "识别供应链和基础设施中的新兴投资区域和战略瓶颈。",
        "考察联邦激励政策对并购战略、私募股权趋势和房地产投资模式的连锁效应。",
      ],
      skills: baseProfile.projects[0].skills,
      tags: ["人工智能与深科技", "并购", "战略"],
      artifacts: [{ label: "报告（即将发布）", url: "#" }],
      highlights: [
        "美国产业政策分析",
        "并购与私募市场响应",
        "行业机会映射",
      ],
      featured: true,
    },
    {
      id: "physical-ai-robotics-intel",
      title: "物理AI与机器人咨询项目",
      org: "加州大学圣迭戈分校 – 雷迪管理学院（Intel）",
      dates: "2025年3月 – 2025年6月",
      summary:
        "与跨职能MBA团队合作，支持英特尔探索未来五年人工智能将如何改变全球机器人产业。",
      bullets: [
        "开展AI+机器人融合的行业研究：工业和消费领域的关键趋势、使能技术和竞争动态。",
        "利用利益相关者洞察和二手研究，评估全球增长机会和潜在市场拐点。",
        "运用咨询框架和战略建模，向高层领导提供数据驱动的建议。",
        "加深在人工智能、半导体和自动化交叉领域的专业知识。",
      ],
      skills: baseProfile.projects[1].skills,
      tags: ["人工智能与深科技", "咨询", "战略"],
      artifacts: [{ label: "演示文稿（即将发布）", url: "#" }],
      featured: true,
    },
    {
      id: "san-diego-consulting-competition",
      title: "圣迭戈沉浸式咨询大赛 – 第一名",
      dates: "2025年3月 – 2025年4月",
      summary:
        "与以色列初创公司Bzigo合作，为其AI蚊虫检测设备制定美国市场进入策略。",
      bullets: [
        "将短期B2C定位与长期B2B扩展计划相结合。",
        "进行市场研究和建模；凭借创新和战略影响力获得第一名。",
      ],
      skills: baseProfile.projects[2].skills,
      tags: ["Go-to-Market", "咨询"],
      artifacts: [{ label: "路演演示（即将发布）", url: "#" }],
      highlights: ["第一名获奖"],
      featured: true,
    },
  ],
};

/* ── Public API ─────────────────────────────── */

const uiMap: Record<Lang, UI> = { en: uiEn, ja: uiJa, zh: uiZh };
const profileMap: Record<Lang, Profile> = {
  en: baseProfile,
  ja: profileJa,
  zh: profileZh,
};

export function getUI(lang: Lang): UI {
  return uiMap[lang] ?? uiEn;
}

export function getProfile(lang: Lang): Profile {
  return profileMap[lang] ?? baseProfile;
}
