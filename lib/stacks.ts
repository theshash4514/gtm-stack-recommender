import {
  QuizAnswers,
  ToolRecommendation,
  LayerRecommendation,
  StackRecommendation,
  QuizQuestion,
} from "./types";

export const questions: QuizQuestion[] = [
  {
    id: "product",
    question: "What do you sell?",
    options: [
      { value: "b2b_saas", label: "B2B SaaS" },
      { value: "hardware", label: "Hardware / Physical Product" },
      { value: "services", label: "Services / Agency / Consulting" },
      { value: "marketplace", label: "Marketplace / Platform" },
    ],
  },
  {
    id: "stage",
    question: "Company stage?",
    options: [
      { value: "pre_revenue", label: "Pre-revenue (still finding PMF)" },
      { value: "early_revenue", label: "Early revenue (< $1M ARR)" },
      { value: "growing", label: "Growing ($1M - $5M ARR)" },
      { value: "scaling", label: "Scaling ($5M+ ARR)" },
    ],
  },
  {
    id: "team",
    question: "How many people do GTM at your company?",
    options: [
      { value: "solo", label: "Just me (founder-led sales)" },
      { value: "small", label: "2-3 people" },
      { value: "medium", label: "4-10 people" },
      { value: "large", label: "10+ people" },
    ],
  },
  {
    id: "budget",
    question: "Monthly GTM tool budget?",
    options: [
      { value: "bootstrapped", label: "$0 - $200 (bootstrapped)" },
      { value: "low", label: "$200 - $1,000" },
      { value: "mid", label: "$1,000 - $3,000" },
      { value: "high", label: "$3,000+" },
    ],
  },
  {
    id: "channel",
    question: "Primary lead generation channel?",
    options: [
      { value: "cold_email", label: "Cold email" },
      { value: "linkedin", label: "LinkedIn outreach" },
      { value: "content", label: "Content / inbound" },
      { value: "paid_ads", label: "Paid ads" },
      { value: "multi_channel", label: "Multi-channel (all of the above)" },
    ],
  },
  {
    id: "buildStyle",
    question: "How do you prefer to build workflows?",
    options: [
      { value: "no_code", label: "No-code tools (point-and-click, Zapier-style)" },
      { value: "ai_assisted", label: "AI-assisted building (describe what you want in plain English)" },
      { value: "custom_code", label: "Custom code (Python, APIs, scripts)" },
    ],
  },
];

function tool(
  name: string,
  description: string,
  price: string,
  priceValue: number,
  reason: string,
  affiliateKey: string
): ToolRecommendation {
  return { name, description, price, priceValue, reason, affiliateKey };
}

function getDataLayer(a: QuizAnswers): LayerRecommendation {
  const tools: ToolRecommendation[] = [];

  if (a.channel === "paid_ads") {
    if (a.budget === "bootstrapped" || a.budget === "low") {
      tools.push(tool("SpyFu", "Competitive ad intelligence", "~$39/mo", 39, "See what competitors are running", "spyfu"));
    } else {
      tools.push(tool("Semrush", "Competitive intelligence & keyword research", "~$129/mo", 129, "Full ad analysis + keyword research + competitive intelligence", "semrush"));
    }
  } else if (a.budget === "bootstrapped") {
    tools.push(tool("Apollo.io", "Contact database with free tier", "$0/mo", 0, "900 credits/year (~75/mo). Includes prospecting, basic filters, 2 sequences, and API access. Universal starting point", "apollo"));
  } else if (a.budget === "low") {
    if (a.product === "hardware") {
      tools.push(tool("LinkedIn Sales Navigator", "Advanced LinkedIn search & filtering", "~$99/mo", 99, "Hardware buyers are on LinkedIn. Filter by company size, industry, role", "linkedin_sales_nav"));
      tools.push(tool("Apollo.io Basic", "Contact database with unlimited emails", "~$49/mo", 49, "Unlimited email credits, advanced filters, intent data. Pairs with Sales Nav", "apollo"));
    } else {
      tools.push(tool("Apollo.io Basic", "Contact database with unlimited emails", "~$49/mo", 49, "Unlimited email credits, advanced filters, intent data, AI assistant", "apollo"));
      tools.push(tool("LinkedIn Sales Navigator", "LinkedIn lead targeting", "~$99/mo", 99, "Sales Nav for LinkedIn targeting. Standard seed-stage combo", "linkedin_sales_nav"));
    }
  } else if (a.budget === "mid") {
    tools.push(tool("Apollo.io Pro", "Advanced contact database", "~$79/mo", 79, "Apollo for database + lead sourcing. Clay handles enrichment in Layer 2", "apollo"));
    tools.push(tool("LinkedIn Sales Navigator", "LinkedIn lead targeting", "~$99/mo", 99, "Sales Nav for LinkedIn targeting alongside Apollo", "linkedin_sales_nav"));
  } else {
    if (a.team === "large") {
      tools.push(tool("ZoomInfo", "Enterprise contact intelligence (321M+ contacts)", "~$1,500/mo", 1500, "Maximum North America depth for large teams", "zoominfo"));
    } else {
      tools.push(tool("Apollo.io Pro", "Advanced contact database", "~$79/mo", 79, "Apollo for base data sourcing. Clay handles enrichment in Layer 2", "apollo"));
      tools.push(tool("LinkedIn Sales Navigator", "LinkedIn lead targeting", "~$99/mo", 99, "Sales Nav for advanced LinkedIn search + filtering", "linkedin_sales_nav"));
    }
  }

  return { layer: "data", icon: "🎯", label: "Data & Prospecting", tools };
}

function getEnrichmentLayer(a: QuizAnswers): LayerRecommendation {
  const tools: ToolRecommendation[] = [];

  if (a.channel === "paid_ads") {
    if (a.budget === "bootstrapped" || a.budget === "low") {
      tools.push(tool("Google Analytics 4", "Web analytics & conversion tracking", "$0/mo", 0, "Understand who clicks your ads", "ga4"));
      tools.push(tool("Hotjar", "Heatmaps & session recordings", "$0/mo", 0, "See how visitors interact with your landing pages", "hotjar"));
    } else {
      tools.push(tool("Google Analytics 4", "Web analytics & conversion tracking", "$0/mo", 0, "Foundation of paid ads measurement", "ga4"));
      tools.push(tool("Hotjar Pro", "Advanced heatmaps & session recordings", "~$39/mo", 39, "Advanced session recordings and heatmaps", "hotjar"));
      tools.push(tool("Microsoft Clarity", "Free session recordings & heatmaps", "$0/mo", 0, "Complements Hotjar with ML-powered insights", "microsoft_clarity"));
    }
  } else if (a.channel === "content") {
    // For content/inbound: solo founders with budget get HubSpot CRM, which bundles Clearbit
    const willUseHubSpot = (a.team === "solo" && a.budget !== "bootstrapped") || a.team === "large";
    tools.push(tool(
      "Clearbit Reveal",
      "Identify anonymous website visitors",
      willUseHubSpot ? "$0/mo" : "$0-99/mo",
      0,
      willUseHubSpot
        ? "Bundled free with your HubSpot CRM — no extra cost"
        : "See which companies visit your site. Free tier available, or bundled with HubSpot",
      "clearbit"
    ));
  } else if (a.budget === "bootstrapped") {
    tools.push(tool("Apollo Enrichment", "CRM enrichment (included with Apollo free tier)", "$0/mo", 0, "Already included — 100 CRM enrichments/mo, contact & account data, 1 intent topic. Good enough for early stage", "apollo"));
  } else if (a.budget === "low") {
    tools.push(tool("BetterContact", "Waterfall enrichment across 20+ providers", "~$35/mo", 35, "99.5% verification accuracy. 80% cheaper than Clay for pure contact data", "bettercontact"));
  } else if (a.budget === "mid") {
    tools.push(tool("Clay Launch", "Waterfall enrichment + AI research agent", "~$185/mo", 185, "Claygent browses websites, reads LinkedIn profiles, synthesizes unstructured data", "clay"));
  } else {
    tools.push(tool("Clay Growth", "Full waterfall + CRM sync + HTTP APIs", "~$495/mo", 495, "Maximum coverage. Standard for funded startups", "clay"));
  }

  return { layer: "enrichment", icon: "🔍", label: "Enrichment & Research", tools };
}

function getOutreachLayer(a: QuizAnswers): LayerRecommendation {
  const tools: ToolRecommendation[] = [];

  if (a.channel === "cold_email") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Saleshandy", "Cold email with unlimited accounts", "~$25/mo", 25, "Best value cold email tool. AI Sequence CoPilot included", "saleshandy"));
    } else if (a.budget === "low") {
      tools.push(tool("Instantly", "High-volume cold email platform", "~$97/mo", 97, "100K emails/mo, unlimited warmup, AI Reply Agent. Reddit favorite", "instantly"));
    } else {
      tools.push(tool("Instantly Hypergrowth", "Enterprise cold email", "~$97/mo", 97, "High-volume sending with AI reply handling", "instantly"));
    }
  } else if (a.channel === "linkedin") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Waalaxy", "Simple LinkedIn automation", "~$56/mo", 56, "Simplest LinkedIn automation. Good for beginners", "waalaxy"));
    } else if (a.budget === "low" || a.budget === "mid") {
      tools.push(tool("HeyReach", "Cloud-based LinkedIn outreach", "~$79/mo", 79, "Cloud-based, safe, campaign sequencing. Best LinkedIn tool at this price", "heyreach"));
    } else {
      tools.push(tool("HeyReach Unlimited", "Multi-account LinkedIn outreach", "~$799/mo", 799, "Drops to ~$15/account at 50 accounts. Unmatched economics", "heyreach"));
    }
  } else if (a.channel === "multi_channel") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Saleshandy", "Cold email automation", "~$25/mo", 25, "Start with cold email, add LinkedIn later", "saleshandy"));
    } else if (a.budget === "low") {
      tools.push(tool("Instantly", "Cold email platform", "~$97/mo", 97, "100K emails/mo, AI Reply Agent", "instantly"));
      tools.push(tool("HeyReach", "LinkedIn outreach", "~$79/mo", 79, "Multi-channel hits 46-71% reply rates vs 15-25% single-channel", "heyreach"));
    } else {
      tools.push(tool("Instantly", "Cold email at scale", "~$97/mo", 97, "High-volume cold email with AI handling", "instantly"));
      tools.push(tool("HeyReach", "LinkedIn outreach", "~$79/mo", 79, "Cloud-based LinkedIn automation", "heyreach"));
      tools.push(tool("Lemlist", "Multi-channel with personalization", "~$69/mo", 69, "Image/video personalization + custom landing pages", "lemlist"));
    }
  } else if (a.channel === "paid_ads") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Meta Ads", "Facebook & Instagram advertising", "Ad spend only", 0, "Broadest reach and cheapest CPMs for testing", "meta_ads"));
    } else if (a.budget === "low") {
      if (a.product === "hardware") {
        tools.push(tool("Meta Ads", "Social advertising", "Ad spend only", 0, "Retargeting and broad awareness", "meta_ads"));
        tools.push(tool("YouTube Ads", "Video advertising", "Ad spend only", 0, "Hardware buyers need to see the product work", "youtube_ads"));
      } else {
        tools.push(tool("Meta Ads", "Social advertising", "Ad spend only", 0, "Broad reach for testing", "meta_ads"));
        tools.push(tool("AdCreative.ai", "AI ad creative generation", "~$29/mo", 29, "AI generates ad visuals + copy with performance scoring", "adcreative"));
      }
    } else if (a.budget === "mid") {
      tools.push(tool("LinkedIn Ads", "B2B precision targeting", "Ad spend only", 0, "LinkedIn for precision B2B targeting", "linkedin_ads"));
      tools.push(tool("Meta Ads", "Social advertising", "Ad spend only", 0, "Broad reach + retargeting", "meta_ads"));
      tools.push(tool("Foreplay", "Creative swipe file (100M+ ads)", "~$49/mo", 49, "Save and organize winning ad creatives", "foreplay"));
    } else {
      tools.push(tool("LinkedIn Ads", "B2B advertising", "Ad spend only", 0, "Precision B2B targeting", "linkedin_ads"));
      tools.push(tool("Meta Ads", "Social advertising", "Ad spend only", 0, "Broad reach", "meta_ads"));
      tools.push(tool("YouTube Ads", "Video advertising", "Ad spend only", 0, "Product demos + thought leadership", "youtube_ads"));
      tools.push(tool("Motion", "Creative analytics platform", "~$199/mo", 199, "Understand which ads work and why. Weekly creative leaderboards", "motion"));
    }
    if (a.product === "hardware") {
      const hasYT = tools.some((t) => t.name === "YouTube Ads");
      if (!hasYT) {
        tools.push(tool("YouTube Ads", "Video advertising for demos", "Ad spend only", 0, "Video demos outperform static for physical products", "youtube_ads"));
      }
    }
  } else if (a.channel === "content") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("AuthoredUp", "LinkedIn post editor & hooks library", "$0/mo", 0, "Free tier covers LinkedIn content basics", "authoredup"));
      tools.push(tool("Beehiiv", "Newsletter platform", "$0/mo", 0, "Free up to 2,500 subscribers. Built-in referral program", "beehiiv"));
      tools.push(tool("Buffer", "Social media scheduling", "$0/mo", 0, "Multi-platform scheduling for free", "buffer"));
    } else if (a.budget === "low") {
      tools.push(tool("Taplio", "AI LinkedIn content & scheduling", "~$49/mo", 49, "AI-powered LinkedIn content creation and lead gen", "taplio"));
      tools.push(tool("Beehiiv", "Newsletter platform", "$0-49/mo", 25, "Built-in referral program, SEO, monetization", "beehiiv"));
      tools.push(tool("Shield", "LinkedIn analytics", "~$25/mo", 25, "Track impressions, engagement, follower growth", "shield"));
    } else {
      tools.push(tool("Taplio", "AI LinkedIn content", "~$49/mo", 49, "The standard LinkedIn growth tool", "taplio"));
      tools.push(tool("Beehiiv Scale", "Newsletter at scale", "~$49/mo", 49, "Advanced newsletter features", "beehiiv"));
      tools.push(tool("Shield", "LinkedIn analytics", "~$25/mo", 25, "Deep LinkedIn performance tracking", "shield"));
      tools.push(tool("Ahrefs", "SEO & keyword research", "~$99/mo", 99, "Keyword research and backlink analysis", "ahrefs"));
    }
  }

  // AI SDR tools removed entirely (11x, Artisan, AiSDR).
  // Category has 50-70% annual churn, 3.5 G2 ratings, users report 1000+ emails with 0 replies.
  // DIY with Clay + Instantly is better ROI at every budget level.

  // Dynamic label based on channel
  const layerLabel =
    a.channel === "content" ? "Content & Distribution" :
    a.channel === "paid_ads" ? "Ads & Creative" :
    "Outreach & Execution";

  const layerIcon =
    a.channel === "content" ? "✍️" :
    a.channel === "paid_ads" ? "📣" :
    "📧";

  return { layer: "outreach", icon: layerIcon, label: layerLabel, tools };
}

function getCRMLayer(a: QuizAnswers): LayerRecommendation {
  const tools: ToolRecommendation[] = [];

  // CRM
  if (a.stage === "pre_revenue") {
    tools.push(tool("Google Sheets", "Simple deal tracking", "$0/mo", 0, "You don't need a CRM yet. Track deals until you have 20+ active conversations", "google_sheets"));
  } else if (a.team === "solo") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Google Sheets + Notion", "Lightweight deal tracking", "$0/mo", 0, "Track deals in a spreadsheet until you have 20+ active conversations", "google_sheets"));
    } else if (a.channel === "linkedin" || a.channel === "multi_channel") {
      tools.push(tool("Folk", "Relationship-driven CRM", "~$20/mo", 20, "5/5 on G2. LinkedIn + WhatsApp native. Setup in 20 min", "folk"));
    } else {
      tools.push(tool("HubSpot Free CRM", "Full-featured free CRM", "$0/mo", 0, "Safe default. Massive ecosystem. Free forever tier is genuinely useful", "hubspot"));
    }
  } else if (a.team === "small") {
    if (a.channel === "cold_email" && (a.budget === "low" || a.budget === "mid")) {
      tools.push(tool("Close", "CRM with built-in power dialer", "~$35/user/mo", 70, "Built-in power dialer and SMS. Best if SDRs make 50+ calls/day", "close"));
    } else if (a.budget === "bootstrapped") {
      tools.push(tool("Pipedrive", "Visual pipeline CRM", "~$15/user/mo", 30, "Visual pipeline. Zero CRM experience needed", "pipedrive"));
    } else {
      tools.push(tool("Attio", "Modern CRM with custom objects", "~$36/user/mo", 72, "THE breakout CRM of 2026. Custom objects, beautiful UI. Beats HubSpot for teams under 200", "attio"));
    }
  } else if (a.team === "medium") {
    tools.push(tool("Attio Pro", "Advanced modern CRM", "~$86/user/mo", 344, "Modern UX with advanced features for growing teams", "attio"));
  } else {
    if (a.budget === "high") {
      tools.push(tool("Salesforce", "Enterprise CRM", "~$165/user/mo", 1650, "AppExchange ecosystem. Enterprise standard", "salesforce"));
    } else {
      tools.push(tool("HubSpot Enterprise", "All-in-one CRM platform", "~$150/user/mo", 1500, "Marketing automation bundled with CRM", "hubspot"));
    }
  }

  // Scheduling - always include
  // If HubSpot is the CRM, use built-in HubSpot Meetings (no extra cost)
  const usingHubSpot = tools.some((t) => t.affiliateKey === "hubspot");

  if (usingHubSpot) {
    tools.push(tool("HubSpot Meetings", "Scheduling (included with HubSpot)", "$0/mo", 0, "Already included in your HubSpot account — no need for a separate scheduling tool", "hubspot"));
  } else if (a.team === "solo") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Cal.com", "Open-source scheduling", "$0/mo", 0, "Free forever for individuals. Open-source Calendly alternative", "calcom"));
    } else {
      tools.push(tool("Calendly", "Meeting scheduling", "~$12/mo", 12, "Multiple event types, CRM + Zoom integrations", "calendly"));
    }
  } else if (a.team === "small" || a.team === "medium") {
    if (a.channel === "content" || a.channel === "paid_ads") {
      tools.push(tool("Chili Piper", "Instant meeting booking from forms", "~$30/user/mo", 60, "Converts 2x more inbound leads by eliminating scheduling back-and-forth", "chilipiper"));
    } else {
      tools.push(tool("Cal.com Team", "Team scheduling", "~$15/user/mo", 30, "Round-robin, collective scheduling, CRM integrations", "calcom"));
    }
  } else {
    tools.push(tool("RevenueHero", "Advanced lead routing + scheduling", "Custom", 100, "Routes inbound leads to right rep and books in one click", "revenuehero"));
  }

  // Attribution - only for paid ads
  if (a.channel === "paid_ads") {
    if (a.budget === "bootstrapped" || a.budget === "low") {
      tools.push(tool("UTM Parameters + Sheets", "Manual attribution tracking", "$0/mo", 0, "Don't pay for attribution until spending $3K+/mo on ads", "google_sheets"));
    } else if (a.budget === "mid") {
      tools.push(tool("Cometly", "AI-driven attribution", "~$250/mo", 250, "Full journey tracking. Feeds conversion data back to ad platforms", "cometly"));
    } else {
      tools.push(tool("Northbeam", "ML-based incrementality testing", "~$1,000/mo", 1000, "Platform-agnostic attribution for high-spend teams", "northbeam"));
    }
  }

  // Reporting
  tools.push(tool("Looker Studio", "Free dashboards & reporting", "$0/mo", 0, "Free unlimited dashboards. Standard for mid-market", "looker_studio"));

  return { layer: "crm", icon: "📊", label: "CRM & Analytics", tools };
}

function getAutomationLayer(a: QuizAnswers): LayerRecommendation {
  const tools: ToolRecommendation[] = [];

  // Workflow orchestration
  // n8n is a power-user tool — only for custom_code users with budget to self-host,
  // or ai_assisted users with mid+ budget who pair it with Claude Code.
  // No-code users should stick with Zapier/Make. Solo founders don't need n8n complexity.
  if (a.buildStyle === "no_code") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Zapier", "6,000+ app connections", "$0/mo", 0, "Simplest setup. AI Actions for natural language workflows. Start here", "zapier"));
    } else {
      tools.push(tool("Make", "Visual workflow automation", "~$16/mo", 16, "60% cheaper than Zapier at scale. Visual builder for complex multi-step flows", "make"));
    }
  } else if (a.buildStyle === "ai_assisted") {
    // AI-assisted: Claude Code is the primary tool. Only add n8n for teams that need
    // persistent orchestration (scheduling, triggers, routing) alongside Claude.
    if ((a.budget === "mid" || a.budget === "high") && a.team !== "solo") {
      tools.push(tool("n8n Cloud", "Workflow orchestration (pairs with Claude Code)", "~$20/mo", 20, "Claude is the brain, n8n is the nervous system. Use n8n for scheduling, triggers, and routing — Claude Code for the reasoning and building", "n8n"));
    } else {
      tools.push(tool("Make", "Visual workflow automation", "~$16/mo", 16, "Connect your tools with visual flows. Simpler than n8n, plenty powerful for most GTM workflows", "make"));
    }
  } else {
    // Custom code users — n8n self-hosted is the clear choice
    if (a.budget === "mid" || a.budget === "high") {
      tools.push(tool("n8n (self-hosted)", "Self-hosted workflow engine", "~$50/mo server", 50, "Replaces $1,500+ Zapier spend. Full control, LangChain integration, AI agent orchestration. Requires technical maintenance", "n8n"));
    } else {
      tools.push(tool("Make", "Visual workflow automation", "~$16/mo", 16, "Best value for custom code users on a budget. Move to n8n self-hosted when you outgrow it", "make"));
    }
  }

  // AI building tools
  if (a.buildStyle === "ai_assisted") {
    tools.push(tool("Claude Code", "Build GTM workflows in plain English", "~$100-200/mo", 150, "THE GTM engineering tool of 2026. Build prospecting pipelines, enrichment workflows, campaign launchers. No coding required — describe what you want", "claude_code"));
    if (a.budget !== "bootstrapped") {
      tools.push(tool("Cursor", "AI-powered code editor", "~$20/mo", 20, "VS Code fork with deep AI. Agent Mode for multi-file changes", "cursor"));
    }
  } else if (a.buildStyle === "no_code") {
    if (a.budget === "bootstrapped") {
      tools.push(tool("Bardeen", "Browser-based GTM automation", "$0/mo", 0, "Lead capture, prospecting actions. Free tier", "bardeen"));
    } else {
      tools.push(tool("Gumloop", "Visual AI agent builder", "~$37/mo", 37, "Just raised $50M from Benchmark. Used by Shopify, Ramp", "gumloop"));
    }
  } else {
    tools.push(tool("Claude Code", "Build GTM workflows in plain English", "~$100-200/mo", 150, "Build prospecting pipelines, enrichment workflows, campaign launchers. Describe what you want", "claude_code"));
  }

  return { layer: "automation", icon: "🤖", label: "AI & Automation", tools };
}

function getWhatToSkip(a: QuizAnswers): string[] {
  const skips: string[] = [];

  if (a.stage === "pre_revenue") {
    skips.push("Skip ZoomInfo, Salesforce, and any tool with annual contracts. You need flexibility right now.");
  }
  if (a.team === "solo" && a.budget === "bootstrapped") {
    skips.push("Skip paid enrichment tools. Apollo's free tier includes 100 CRM enrichments/mo — enough for early stage. Invest your budget in outreach volume.");
  }
  if (a.product === "hardware") {
    skips.push("Skip generic SaaS cold email templates. Your buyers need demos and proof-of-concept conversations. Lead with video and LinkedIn.");
  }
  if (a.budget === "high" && (a.team === "solo" || a.team === "small" || a.team === "medium")) {
    skips.push("Skip Salesforce. It's built for 10+ person teams. Attio Pro gives you everything you need at a fraction of the cost.");
  }
  if (a.channel === "paid_ads" && a.budget === "bootstrapped") {
    skips.push("Skip LinkedIn Ads — minimum viable spend is $300+/mo to learn anything. Start with Meta only, nail your creative, then expand.");
  }
  if (a.channel === "paid_ads" && a.stage === "pre_revenue") {
    skips.push("Skip attribution tools (Triple Whale, Northbeam). You don't have enough conversion data yet. Use UTM parameters + Google Sheets until you're spending $3K+/mo.");
  }
  if (a.channel === "paid_ads" && a.product === "hardware") {
    skips.push("Skip Google Search Ads unless you have a very specific product keyword. Hardware buyers discover through demos and video. Invest in YouTube and Meta video ads.");
  }
  if (a.channel === "cold_email" || a.channel === "linkedin" || a.channel === "multi_channel") {
    skips.push("Skip AI SDR tools (11x, Artisan, AiSDR). The category has 50-70% annual churn — users report sending 1,000+ emails with zero replies. Artisan has a 3.5 G2 rating and requires annual contracts at $2K+/mo. Build your own with Clay + Instantly for 1/10th the cost.");
  }
  if (a.buildStyle === "no_code") {
    skips.push("Skip n8n self-hosted. The setup requires server management. Stick with Zapier or Make — they're designed for non-technical users.");
  }
  if (a.budget !== "high" && a.stage !== "scaling") {
    skips.push("Skip ZoomInfo. Clay + Apollo gives you 90% of the data at 10% of the cost. ZoomInfo's aggressive contracts aren't worth it until you're enterprise-scale.");
  }

  return skips.slice(0, 4); // max 4 most relevant
}

function getSetupOrder(a: QuizAnswers): string[] {
  if (a.channel === "paid_ads") {
    return [
      "Analytics first — set up GA4 + conversion tracking before spending a dollar on ads",
      "Creative tools — you need ads before you can run ads",
      "One ad platform to start — Meta for broad/DTC, LinkedIn for enterprise B2B, YouTube for hardware demos",
      "CRM + attribution — connect the dots once you have data flowing",
    ];
  }
  if (a.channel === "content") {
    return [
      "CRM first — capture leads from day one, even before you have traffic",
      "Content platform — set up your newsletter or blog",
      "AI & Automation — set up content workflows and scheduling",
      "SEO & enrichment — understand who's visiting and what they want",
      "Distribution — social scheduling, repurposing, cross-posting",
    ];
  }
  return [
    "CRM first — you need somewhere to put leads before you find them",
    "AI & Automation layer — set up orchestration so tools connect from day one",
    "Data layer — now find your leads",
    "Enrichment — research and qualify them",
    "Outreach last — now reach out with full context",
  ];
}

const labelMap: Record<string, string> = {
  b2b_saas: "B2B SaaS",
  hardware: "Hardware",
  services: "Services/Agency",
  marketplace: "Marketplace",
  pre_revenue: "Pre-revenue",
  early_revenue: "Early Revenue",
  growing: "Growing",
  scaling: "Scaling",
  solo: "Solo Founder",
  small: "2-3 People",
  medium: "4-10 People",
  large: "10+ People",
  bootstrapped: "$0-200 Budget",
  low: "$200-1K Budget",
  mid: "$1K-3K Budget",
  high: "$3K+ Budget",
  cold_email: "Cold Email",
  linkedin: "LinkedIn",
  content: "Content/Inbound",
  paid_ads: "Paid Ads",
  multi_channel: "Multi-channel",
  no_code: "No-code",
  ai_assisted: "AI-Assisted",
  custom_code: "Custom Code",
};

export function getRecommendation(answers: QuizAnswers): StackRecommendation {
  const layers = [
    getDataLayer(answers),
    getEnrichmentLayer(answers),
    getOutreachLayer(answers),
    getCRMLayer(answers),
    getAutomationLayer(answers),
  ];

  const totalMonthlyCost = layers.reduce(
    (sum, layer) => sum + layer.tools.reduce((s, t) => s + t.priceValue, 0),
    0
  );

  const summary = Object.values(answers)
    .map((v) => labelMap[v] || v)
    .join(" · ");

  const channelLabel = labelMap[answers.channel] || answers.channel;
  const stageLabel = labelMap[answers.stage] || answers.stage;
  const budgetLabel = labelMap[answers.budget] || answers.budget;

  const reasoning = `Based on your ${stageLabel.toLowerCase()} stage, ${budgetLabel.toLowerCase()}, and focus on ${channelLabel.toLowerCase()}, this stack prioritizes ${
    answers.budget === "bootstrapped"
      ? "free and low-cost tools that punch above their weight"
      : answers.budget === "low"
      ? "high-ROI tools that balance cost and capability"
      : "professional-grade tools that scale with your growth"
  }. Each tool was selected for proven results with ${labelMap[answers.product].toLowerCase()} companies at your stage.`;

  return {
    layers,
    totalMonthlyCost,
    reasoning,
    setupOrder: getSetupOrder(answers),
    whatToSkip: getWhatToSkip(answers),
    summary,
  };
}
