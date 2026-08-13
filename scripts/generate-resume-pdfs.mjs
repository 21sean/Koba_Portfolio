// ─────────────────────────────────────────────
// scripts/generate-resume-pdfs.mjs
// Generates public/resume-ja.pdf and public/resume-zh.pdf
// Run:  node scripts/generate-resume-pdfs.mjs
// ─────────────────────────────────────────────

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "public");
const fontsDir = path.resolve(__dirname, "fonts");

/* ── Colour palette ──────────────────────────── */
const BLACK = rgb(0.07, 0.07, 0.07);
const MUTED = rgb(0.42, 0.45, 0.5);
const ACCENT = rgb(0.11, 0.31, 0.85);

/* ── Resume data per language ──────────────── */

const CONTACT = {
  phone: "(858) 257-9845",
  email: "emi.kobayashi.work@gmail.com",
};

const resumeJa = {
  name: "小林 エミ",
  headline: "ディープテックとグローバル成長の交差点で。",
  location: "ラホヤ、サンディエゴ、CA",
  contact: `${CONTACT.phone}   ${CONTACT.email}`,
  summary:
    "北米、ヨーロッパ、アジアにわたり7年以上B2Bの収益成長を牽引してきた、グローバルマーケティング＆ビジネス戦略のプロフェッショナル。グローバル半導体ポートフォリオの製品ローンチ、ポジショニング、差別化、ライフサイクル管理を担い、3年間で140%の収益成長を達成。MRI装置向けに供給する冷却フィルター製品ラインでは、価格・契約条件・キーアカウント関係まで一貫してオーナーシップを持って推進。コンサルティングでは市場規模推定、競合評価、米国市場参入、ライフサイエンスソフトウェアのクロスマーケット分析を経験。英語・日本語・中国語のトリリンガル。",
  sections: {
    summary: "概要",
    education: "学歴",
    experience: "職務経歴",
    projects: "プロジェクト",
    skills: "スキル",
    certifications: "資格・認定",
    languages: "言語",
  },
  education: [
    {
      degree: "経営学修士（MBA）",
      school: "カリフォルニア大学サンディエゴ校 レイディ経営大学院",
      dates: "2024年8月 – 2026年6月",
    },
    {
      degree: "経済学 学士",
      school: "テンプル大学 ジャパンキャンパス（東京、日本）",
      dates: "2016年9月 – 2019年4月",
    },
  ],
  experience: [
    {
      title: "MBAマーケティングインターン",
      company: "BIOVIA・ダッソー・システムズ（バイオテック・製薬ソフトウェア業界）",
      dates: "2025年6月 – 現在",
      location: "サンディエゴ、CA・ハイブリッド",
      bullets: [
        "ライフサイエンス、材料科学、情報学の各セグメントにわたる競合・クロスマーケット環境をマッピングし、競合ポジショニング、ホワイトスペース、未充足ニーズを、年間マーケティング計画とGTMターゲティングに用いるセグメント優先順位付けのビューへと落とし込み。",
        "グローバルキャンペーンと業界イベント（展示会、カンファレンス、ウェビナー）のエンドツーエンド戦略を統括。メッセージング、ベンダー・予算管理、スケジュールを担い、営業・技術部門と部門横断で連携し、技術的なインプットを訴求力のあるメッセージへ翻訳するとともに、イベント接点を有望なパイプラインへ転換。",
        "キャンペーンとイベントの支出をパイプライン貢献に結びつけるExcelベースのパフォーマンスダッシュボードを構築し、より高収益なチャネルへの予算再配分と翌サイクルの予算増額を後押し。",
      ],
    },
    {
      title: "戦略コンサルタント（Rady Action Project）",
      company: "インテル コーポレーション（半導体・ロボティクス業界）",
      dates: "2025年3月 – 2025年6月",
      location: "サンタクララ、CA",
      bullets: [
        "北米、ヨーロッパ、アジアにわたるグローバルなフィジカルAI・ロボティクス市場の規模を推定し、AI主導の需要が変曲する領域を特定。",
        "一次・二次調査を主導し、断片的な専門家の知見を、導入障壁（設備投資、データの入手可能性、安全認証、規制の遅れ）に関する体系的な見取り図へと整理。",
        "汎用ヒューマノイドよりニッチなロボティクススタートアップを狙うパートナーシップ主導の参入戦略を提言。インテルのコーポレート戦略リーダーシップに提示し、推奨した方向性が採用された。",
      ],
    },
    {
      title: "グローバルマーケティング＆ビジネス戦略マネージャー",
      company: "モアテック株式会社（半導体業界・MRI装置向け冷却フィルター部品を含む）",
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
    },
  ],
  projects: [
    {
      title: "AI活用ポートフォリオウェブサイト",
      dates: "2025年2月 – 現在",
      summary:
        "AI支援開発により、職務経歴・プロジェクト・技術スキルのセクションを備えたレスポンシブなパーソナルポートフォリオサイトを設計・構築。プロンプトエンジニアリングと反復的なテストによりUI/UXを改善。",
    },
    {
      title: "ディープテック・産業政策戦略プロジェクト（UCサンディエゴ レイディ経営大学院）",
      dates: "2025年6月 – 2025年9月",
      summary:
        "金融アドバイザリー企業およびUCサンディエゴの教員と協働し、CHIPS法、インフレ抑制法、Stargateプロジェクトなど米国の産業政策が、ディープテック・AI・先端製造業における資本フロー、M&A、プライベートエクイティ投資をどう変革しているかを分析。新たな投資機会、サプライチェーンのボトルネック、インフラの優先課題を特定。",
    },
    {
      title: "市場参入コンサルティングプロジェクト（Bzigo、サンディエゴ、CA）",
      dates: "2025年3月 – 2025年4月",
      summary:
        "AI蚊検出デバイスの米国市場参入戦略を策定。消費者・法人の買い手タイプ別にセグメント化したボトムアップ市場モデルを構築し、直販・代理店それぞれの価格とチャネル経済性を定義。B2CからB2Bへ段階的に展開するロールアウトを設計。クライアントは本戦略を採用して米国市場へ参入し、MBAコンサルティングチームの中で戦略的イノベーション部門第1位を受賞。",
    },
  ],
  skills: [
    {
      category: "プロダクトマーケティング",
      items:
        "ポジショニング · メッセージング · 差別化 · セグメンテーション · バリュープロポジション · Go-to-Market戦略 · 製品ローンチ · 新製品開発（NPD） · ライフサイクル管理 · セールスイネーブルメント · 価格・バリュー戦略 · 競合分析 · 技術ストーリーテリング",
    },
    {
      category: "リサーチ＆分析",
      items:
        "市場規模推定 · 一次・二次調査 · 顧客の声（VOC） · 顧客インサイト創出 · ビジネスケース策定 · KPIトラッキング · ROI分析",
    },
    {
      category: "部門横断",
      items: "ステークホルダー調整 · セールス連携 · 部門横断的な実行 · 予算管理",
    },
    { category: "ツール", items: "Excel · Tableau · PowerPoint · Office 365 · CRMシステム" },
  ],
  certifications: [
    "IBM AIプロダクトマネージャー専門講座",
    "Adobe マーケティングスペシャリスト",
    "Google プロジェクトマネジメント専門講座",
    "Atlassian アジャイルプロジェクトマネジメント プロフェッショナル認定",
    "Microsoft Power BI データモデリング",
    "Google AI プロフェッショナル認定",
    "CFI コーポレートファイナンス基礎 プロフェッショナル認定",
    "CFI 財務分析・モデリング プロフェッショナル認定",
  ],
  languages: [
    { name: "日本語", level: "ネイティブ" },
    { name: "中国語（標準）", level: "ネイティブ" },
    { name: "上海語", level: "ネイティブ" },
    { name: "英語", level: "流暢" },
  ],
};

const resumeZh = {
  name: "小林 惠美",
  headline: "深科技与全球增长的交汇点。",
  location: "拉霍亚，圣迭戈，加利福尼亚",
  contact: `${CONTACT.phone}   ${CONTACT.email}`,
  summary:
    "拥有7年以上经验的全球营销与商业战略专业人士，在北美、欧洲和亚洲推动B2B收入增长。负责全球半导体产品组合的产品发布、定位、差异化和生命周期管理，在三年内实现140%的收入增长，其中包括供应至MRI设备的冷却过滤器产品线，全面负责定价、合同条款和关键客户关系。咨询经验涵盖市场规模测算、竞争评估、美国市场进入，以及生命科学软件的跨市场分析。精通英语、日语和中文三种语言。",
  sections: {
    summary: "概述",
    education: "教育背景",
    experience: "工作经历",
    projects: "项目经历",
    skills: "专业技能",
    certifications: "证书与认证",
    languages: "语言能力",
  },
  education: [
    {
      degree: "工商管理硕士（MBA）",
      school: "加州大学圣迭戈分校 雷迪管理学院",
      dates: "2024年8月 – 2026年6月",
    },
    {
      degree: "经济学学士",
      school: "天普大学日本校区（东京，日本）",
      dates: "2016年9月 – 2019年4月",
    },
  ],
  experience: [
    {
      title: "MBA营销实习生",
      company: "BIOVIA，达索系统（生物技术与制药软件行业）",
      dates: "2025年6月 – 至今",
      location: "圣迭戈，CA · 混合办公",
      bullets: [
        "梳理生命科学、材料科学和信息学各细分领域的竞争与跨市场格局，将竞争定位、市场空白和未满足需求转化为用于年度营销规划和GTM目标定位的细分优先级视图。",
        "主导全球营销活动和行业活动（展会、会议、网络研讨会）的端到端策略，涵盖信息传递、供应商与预算管理及时间安排；推动与销售和技术相关方的跨职能协调，将技术输入转化为有说服力的信息表达，并将活动接触点转化为合格的销售管道。",
        "开发基于Excel的绩效仪表板，将营销活动和会展支出与销售管道贡献相关联，推动预算向更高产出渠道的重新配置，并支持下一周期的预算增加。",
      ],
    },
    {
      title: "战略顾问（Rady Action Project）",
      company: "英特尔公司（半导体与机器人行业）",
      dates: "2025年3月 – 2025年6月",
      location: "圣克拉拉，CA",
      bullets: [
        "测算北美、欧洲和亚洲的全球物理AI与机器人市场机会规模，识别AI驱动需求的拐点所在。",
        "主导一手和二手研究，将零散的专家意见整理为关于采用障碍（资本支出、数据可得性、安全认证和监管滞后）的结构化视图。",
        "建议采取以合作伙伴为主导的进入策略，聚焦细分机器人初创企业而非通用人形机器人；向英特尔企业战略领导层汇报，其采纳了所建议的方向。",
      ],
    },
    {
      title: "全球营销与商业战略经理",
      company: "Moretec公司（半导体行业，含供应至MRI设备的冷却过滤器组件）",
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
    },
  ],
  projects: [
    {
      title: "AI驱动的个人作品集网站",
      dates: "2025年2月 – 至今",
      summary:
        "运用AI辅助开发，设计并构建响应式个人作品集网站，包含工作经历、项目和技术技能等定制板块。通过提示工程与迭代测试持续优化UI/UX。",
    },
    {
      title: "深科技与产业政策战略项目（加州大学圣迭戈分校雷迪管理学院）",
      dates: "2025年6月 – 2025年9月",
      summary:
        "与金融咨询公司及加州大学圣迭戈分校教员合作，分析CHIPS法案、通胀削减法案和星际之门项目等美国产业政策如何重塑深科技、AI和先进制造业的资本流向、并购活动与私募股权投资，并识别新兴投资机会、供应链瓶颈和基础设施优先事项。",
    },
    {
      title: "市场进入咨询项目（Bzigo，圣迭戈，加利福尼亚）",
      dates: "2025年3月 – 2025年4月",
      summary:
        "为AI蚊虫检测设备制定美国市场进入策略，按消费者和商业买家类型细分构建自下而上的市场模型以测算可触达机会；界定直销与分销渠道的定价与渠道经济性，并设计从B2C到B2B的分阶段推广路径。客户采纳该策略并成功进入美国市场，该项目在MBA咨询团队中荣获战略创新第一名。",
    },
  ],
  skills: [
    {
      category: "产品营销",
      items:
        "定位 · 信息传递 · 差异化 · 市场细分 · 价值主张 · 市场进入策略 · 产品发布 · 新产品开发（NPD） · 生命周期管理 · 销售赋能 · 定价与价值策略 · 竞争分析 · 技术叙事",
    },
    {
      category: "研究与分析",
      items:
        "市场规模测算 · 一手与二手研究 · 客户之声（VOC） · 客户洞察生成 · 商业案例开发 · KPI跟踪 · ROI分析",
    },
    { category: "跨职能", items: "利益相关者协调 · 销售协作 · 跨职能执行 · 预算管理" },
    { category: "工具", items: "Excel · Tableau · PowerPoint · Office 365 · CRM系统" },
  ],
  certifications: [
    "IBM 人工智能产品经理专业证书",
    "Adobe 营销专家认证",
    "Google 项目管理专业证书",
    "Atlassian 敏捷项目管理专业证书",
    "Microsoft Power BI 数据建模",
    "Google AI 专业证书",
    "CFI 公司金融基础专业证书",
    "CFI 财务分析与建模专业证书",
  ],
  languages: [
    { name: "日语", level: "母语" },
    { name: "普通话", level: "母语" },
    { name: "上海话", level: "母语" },
    { name: "英语", level: "流利" },
  ],
};

/* ── PDF rendering helpers ─────────────────── */

function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(/(\s+)/);
  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const test = currentLine + word;
    try {
      const width = font.widthOfTextAtSize(test, fontSize);
      if (width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine.trimEnd());
        currentLine = word.trimStart();
      } else {
        currentLine = test;
      }
    } catch {
      // If a character isn't in the font, push what we have and start fresh
      if (currentLine.length > 0) {
        lines.push(currentLine.trimEnd());
      }
      currentLine = word;
    }
  }
  if (currentLine.trimEnd().length > 0) {
    lines.push(currentLine.trimEnd());
  }
  return lines;
}

// CJK-aware word wrap: split on every character since CJK has no spaces between words
function wrapTextCJK(text, font, fontSize, maxWidth) {
  const chars = [...text];
  const lines = [];
  let currentLine = "";

  for (const ch of chars) {
    const test = currentLine + ch;
    try {
      const width = font.widthOfTextAtSize(test, fontSize);
      if (width > maxWidth && currentLine.length > 0) {
        lines.push(currentLine);
        currentLine = ch;
      } else {
        currentLine = test;
      }
    } catch {
      if (currentLine.length > 0) lines.push(currentLine);
      currentLine = ch;
    }
  }
  if (currentLine.length > 0) lines.push(currentLine);
  return lines;
}

async function generateResumePDF(data, fontPath, outputPath) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  // Load CJK font
  const fontBytes = fs.readFileSync(fontPath);
  const cjkFont = await pdfDoc.embedFont(fontBytes, { subset: true });

  // Also embed Helvetica for any fallback Latin text
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Use CJK font for everything since it includes Latin glyphs too
  const font = cjkFont;
  const boldFont = cjkFont; // Variable font handles weight via the same embed

  const PAGE_W = 595.28; // A4
  const PAGE_H = 841.89;
  const MARGIN_LEFT = 50;
  const MARGIN_RIGHT = 50;
  const CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT;
  const LINE_HEIGHT = 14;

  let page = pdfDoc.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - 50;

  function ensureSpace(needed) {
    if (y - needed < 50) {
      page = pdfDoc.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - 50;
    }
  }

  function drawText(text, x, yPos, size, colour, usedFont) {
    const f = usedFont || font;
    try {
      page.drawText(text, { x, y: yPos, size, font: f, color: colour });
    } catch {
      // Fallback: try Helvetica for unsupported glyphs
      try {
        page.drawText(text, { x, y: yPos, size, font: helvetica, color: colour });
      } catch {
        // Skip un-renderable text
      }
    }
  }

  function drawWrapped(text, x, size, colour, maxW) {
    const lines = wrapTextCJK(text, font, size, maxW || CONTENT_W);
    for (const line of lines) {
      ensureSpace(LINE_HEIGHT + 2);
      drawText(line, x, y, size, colour);
      y -= LINE_HEIGHT;
    }
  }

  function sectionHeader(title) {
    ensureSpace(30);
    y -= 8;
    drawText(title.toUpperCase(), MARGIN_LEFT, y, 9, ACCENT);
    y -= 4;
    // Draw line
    page.drawLine({
      start: { x: MARGIN_LEFT, y },
      end: { x: PAGE_W - MARGIN_RIGHT, y },
      thickness: 0.5,
      color: rgb(0.85, 0.87, 0.9),
    });
    y -= 12;
  }

  // ── Name ──
  drawText(data.name, MARGIN_LEFT, y, 20, BLACK);
  y -= 16;

  // ── Headline ──
  drawWrapped(data.headline, MARGIN_LEFT, 9, MUTED, CONTENT_W);
  y -= 2;

  // ── Location ──
  drawText(data.location, MARGIN_LEFT, y, 8, MUTED);
  y -= 11;

  // ── Contact ──
  drawText(data.contact, MARGIN_LEFT, y, 8, MUTED);
  y -= 20;

  // ── Summary ──
  sectionHeader(data.sections.summary);
  drawWrapped(data.summary, MARGIN_LEFT, 9, MUTED, CONTENT_W);
  y -= 6;

  // ── Education ──
  sectionHeader(data.sections.education);
  for (const edu of data.education) {
    ensureSpace(30);
    drawText(edu.degree, MARGIN_LEFT, y, 10, BLACK);
    try {
      const datesW = font.widthOfTextAtSize(edu.dates, 8);
      drawText(edu.dates, PAGE_W - MARGIN_RIGHT - datesW, y, 8, MUTED);
    } catch {
      drawText(edu.dates, PAGE_W - MARGIN_RIGHT - 80, y, 8, MUTED);
    }
    y -= 12;
    drawWrapped(edu.school, MARGIN_LEFT, 8, MUTED, CONTENT_W);
    y -= 6;
  }

  // ── Experience ──
  sectionHeader(data.sections.experience);
  for (const exp of data.experience) {
    ensureSpace(50);
    drawText(exp.title, MARGIN_LEFT, y, 10, BLACK);

    // Dates on the right
    try {
      const datesW = font.widthOfTextAtSize(exp.dates, 8);
      drawText(exp.dates, PAGE_W - MARGIN_RIGHT - datesW, y, 8, MUTED);
    } catch {
      drawText(exp.dates, PAGE_W - MARGIN_RIGHT - 80, y, 8, MUTED);
    }
    y -= 12;

    drawWrapped(exp.company, MARGIN_LEFT, 8, MUTED, CONTENT_W);
    y += 3;
    drawText(exp.location, MARGIN_LEFT, y, 8, MUTED);
    y -= 12;

    for (const bullet of exp.bullets) {
      ensureSpace(LINE_HEIGHT + 4);
      drawText("•", MARGIN_LEFT + 4, y, 8, MUTED);
      const bulletLines = wrapTextCJK(bullet, font, 8, CONTENT_W - 16);
      for (const line of bulletLines) {
        ensureSpace(LINE_HEIGHT);
        drawText(line, MARGIN_LEFT + 16, y, 8, MUTED);
        y -= 11;
      }
    }
    y -= 6;
  }

  // ── Projects ──
  sectionHeader(data.sections.projects);
  for (const proj of data.projects) {
    ensureSpace(40);

    // Reserve room on the right for the dates so the title wraps around them
    let datesW = 80;
    try {
      datesW = font.widthOfTextAtSize(proj.dates, 8);
    } catch {
      /* fall back to the reserved default */
    }
    drawText(proj.dates, PAGE_W - MARGIN_RIGHT - datesW, y, 8, MUTED);
    drawWrapped(proj.title, MARGIN_LEFT, 10, BLACK, CONTENT_W - datesW - 12);
    y += 2;

    drawWrapped(proj.summary, MARGIN_LEFT, 8, MUTED, CONTENT_W);
    y -= 8;
  }

  // ── Skills ──
  sectionHeader(data.sections.skills);
  for (const group of data.skills) {
    ensureSpace(LINE_HEIGHT + 4);
    const label = group.category + ": ";
    drawText(label, MARGIN_LEFT, y, 8, BLACK);
    try {
      const labelW = font.widthOfTextAtSize(label, 8);
      const itemLines = wrapTextCJK(group.items, font, 8, CONTENT_W - labelW);
      let first = true;
      for (const line of itemLines) {
        if (!first) {
          ensureSpace(LINE_HEIGHT);
        }
        drawText(line, MARGIN_LEFT + (first ? labelW : 0), y, 8, MUTED);
        y -= 11;
        first = false;
      }
    } catch {
      y -= 11;
    }
    y -= 2;
  }

  // ── Certifications ──
  sectionHeader(data.sections.certifications);
  for (const cert of data.certifications) {
    ensureSpace(LINE_HEIGHT);
    drawText("•", MARGIN_LEFT + 4, y, 8, MUTED);
    const certLines = wrapTextCJK(cert, font, 8, CONTENT_W - 16);
    for (const line of certLines) {
      ensureSpace(LINE_HEIGHT);
      drawText(line, MARGIN_LEFT + 16, y, 8, MUTED);
      y -= 11;
    }
  }
  y -= 4;

  // ── Languages ──
  sectionHeader(data.sections.languages);
  const langParts = data.languages.map((l) => `${l.name} (${l.level})`);
  drawWrapped(langParts.join("   "), MARGIN_LEFT, 8, MUTED, CONTENT_W);

  // Save
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`✓ Generated ${outputPath} (${(pdfBytes.length / 1024).toFixed(0)} KB)`);
}

/* ── Generate both PDFs ────────────────────── */

const jaFontPath = path.join(fontsDir, "NotoSansJP.ttf");
const zhFontPath = path.join(fontsDir, "NotoSansSC.ttf");

await generateResumePDF(resumeJa, jaFontPath, path.join(publicDir, "resume-ja.pdf"));
await generateResumePDF(resumeZh, zhFontPath, path.join(publicDir, "resume-zh.pdf"));

console.log("\nDone! Both translated resume PDFs generated.");
