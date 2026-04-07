# GTM Stack Recommender Calculator — Build Spec (v2, Research-Backed)

## What We're Building

An interactive web app where founders/GTM engineers answer 6 questions and get a personalized 5-layer GTM tool stack recommendation with monthly costs, setup order, reasoning, and affiliate "Get Started" links. Think "personality quiz for your sales stack." Gate the detailed report behind email capture.

## Tech Stack

- **Next.js 14+** (App Router)
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **No database needed** — the logic is a deterministic decision tree
- **Supabase** for email capture only (one table: `leads`)
- Deploy to **Vercel**

---

## User Flow

### Step 1: Landing Page
Clean hero:
- Headline: "What GTM Stack Should You Actually Use?"
- Subhead: "Answer 6 questions. Get a personalized 5-layer recommendation in 30 seconds. No fluff, no 50-tool listicles."
- CTA: "Find My Stack →"
- Social proof: "Built from analysis of 100+ GTM tool combinations. Updated March 2026."

### Step 2: Quiz (6 Questions, One Per Screen)
Progress bar at top. Card UI. Animated transitions.

**Q1: What do you sell?**
- B2B SaaS
- Hardware / Physical Product
- Services / Agency / Consulting
- Marketplace / Platform

**Q2: Company stage?**
- Pre-revenue (still finding PMF)
- Early revenue (< $1M ARR)
- Growing ($1M - $5M ARR)
- Scaling ($5M+ ARR)

**Q3: How many people do GTM at your company?**
- Just me (founder-led sales)
- 2-3 people
- 4-10 people
- 10+ people

**Q4: Monthly GTM tool budget?**
- $0 - $200 (bootstrapped)
- $200 - $1,000
- $1,000 - $3,000
- $3,000+

**Q5: Primary outbound channel?**
- Cold email
- LinkedIn outreach
- Content / inbound
- Paid ads
- Multi-channel (all of the above)

**Q6: How do you prefer to build workflows?**
- No-code tools (point-and-click, Zapier-style)
- AI-assisted building (Claude Code, Cursor — describe what you want in plain English)
- Custom code (Python, APIs, scripts)

### Step 3: Email Gate
"Your stack is ready. Where should we send it?"
- Email input
- Company name (optional)
- CTA: "Get My Stack →"
- Small text: "We'll also send you a setup checklist."

Save to Supabase: email, company_name, answers (JSON), recommended_stack_id, total_monthly_cost, created_at

### Step 4: Results Page
**Header:** "Your Recommended GTM Stack"
**Subtitle:** [answers summarized, e.g. "B2B SaaS · Early Revenue · Solo Founder · $200-1K budget · Cold Email · AI-Assisted"]

**5-Layer Stack Display** (vertical cards, each with icon, tool name, one-liner, monthly cost, and "Get Started →" affiliate link):

1. 🎯 **Data & Prospecting** — Where you find leads
2. 🔍 **Enrichment & Research** — How you research & qualify
3. 📧 **Outreach & Execution** — How you reach out
4. 📊 **CRM & Analytics** — How you track & close
5. 🤖 **AI & Automation** — How you orchestrate & scale

**Total Monthly Cost:** ~$X/mo

**Below the stack:**
- "Why this stack?" — 2-3 sentence reasoning
- "Setup order" — numbered list
- "What to skip" — tools people at this stage waste money on
- "Share your stack on LinkedIn" button

### Step 5: LinkedIn Share
Pre-fill:
```
Just found my ideal GTM stack:
🎯 [Data tool]
🔍 [Enrichment tool]
📧 [Outreach tool]
📊 [CRM tool]
🤖 [AI/Automation tool]
Total: ~$X/mo

Find yours → [link]
```

---

## The Decision Tree (Research-Backed, March 2026)

Create `lib/stacks.ts` with the recommendation engine.

### LAYER 1: Data & Prospecting

| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Budget $0-200 | Apollo.io (free tier) | $0/mo | 270M+ contacts, 10K email credits/mo free. Universal starting point — Reddit consensus pick |
| Budget $200-1K, SaaS | Apollo Basic + LinkedIn Sales Nav | $49 + $99 = $148/mo | Apollo for emails, Sales Nav for LinkedIn targeting. Standard seed-stage combo |
| Budget $200-1K, Hardware | LinkedIn Sales Nav + Apollo Basic | $99 + $49 = $148/mo | Hardware buyers are on LinkedIn. Sales Nav filters by company size, industry, role |
| Budget $200-1K, Paid ads | SpyFu + Meta Ad Library | $39/mo | Competitive ad intelligence. See what competitors are running |
| Budget $1K-3K | Apollo Pro + Clay (for data) | $79 + $185 = $264/mo | Apollo for database, Clay for waterfall enrichment across 150+ providers. 80-92% fill rates vs 40-60% single-provider |
| Budget $3K+, team <10 | Clay Growth + Apollo Pro | $495 + $79 = $574/mo | Clay Growth unlocks CRM sync + HTTP APIs. Best-in-class data orchestration |
| Budget $3K+, team 10+ | ZoomInfo or Cognism | $1,500+/mo | ZoomInfo for North America depth (321M+ contacts). Cognism for European/GDPR-compliant data |
| Budget $1K+, Paid ads | Semrush | $129+/mo | Competitive intelligence, keyword research, ad analysis |

### LAYER 2: Enrichment & Research

| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Budget $0-200 | Apollo enrichment (built-in) | $0 | Good enough for early stage. 60-70% fill rate on emails |
| Budget $200-500 | BetterContact | $15-55/mo | Waterfall enrichment across 20+ providers. 99.5% verification accuracy. 80% cheaper than Clay for pure contact data |
| Budget $500-1K | Clay Launch | $185/mo | Waterfall enrichment + Claygent AI research agent. The step-change: Claygent browses websites, reads LinkedIn profiles, synthesizes unstructured data no database has |
| Budget $1K-3K | Clay Growth | $495/mo | Full waterfall + CRM sync + HTTP APIs. Standard for funded startups |
| Budget $3K+ | Clay Enterprise or Clay + Cognism | $800+/mo | Maximum coverage. Cognism Diamond for phone-verified international mobiles |
| Channel = Paid ads, budget $0-1K | Google Analytics 4 + Hotjar (free) | $0 | The "enrichment" for paid ads is understanding who clicks. GA4 + Hotjar heatmaps |
| Channel = Paid ads, budget $1K+ | GA4 + Hotjar Pro + Microsoft Clarity | $39+/mo | Add session recordings and advanced heatmaps |
| Channel = Content/inbound | Clearbit Reveal (via HubSpot) | $0-99/mo | Identifies anonymous website visitors. Now bundled in HubSpot |

### LAYER 3: Outreach & Execution

**Cold Email:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Budget $0-200 | Saleshandy | $25/mo | Best value cold email tool. Unlimited email accounts, AI Sequence CoPilot |
| Budget $200-1K | Instantly (Hypergrowth) | $97/mo | 100K emails/mo, unlimited warmup, AI Reply Agent auto-handles objections. Reddit favorite for volume |
| Budget $1K+ (agency/scale) | Instantly Light Speed or Smartlead | $358/mo or $94/mo | Light Speed for 500K emails. Smartlead for technical teams wanting API-first workflows |

**LinkedIn:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Budget $0-200 | Waalaxy | $56/mo | Simplest LinkedIn automation. Good for beginners |
| Budget $200-1K | HeyReach (1 seat) | $79/mo | Cloud-based, safe, campaign sequencing. Best LinkedIn tool at this price |
| Budget $1K+ (multi-account) | HeyReach (unlimited) | $799/mo | Drops to ~$15/account at 50 accounts. Unmatched economics for agencies |

**Multi-channel:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Budget $200-1K | Instantly + HeyReach | $97 + $79 = $176/mo | Best combo at this price. Multi-channel hits 46-71% reply rates vs 15-25% single-channel |
| Budget $1K+ | Instantly + HeyReach + Lemlist | $97 + $79 + $69 = $245/mo | Add Lemlist for image/video personalization and custom landing pages |

**Paid Ads:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Budget $0-200 | Meta Ads (manual) | Ad spend only | Start with one channel. Meta has broadest reach and cheapest CPMs for testing |
| Budget $200-1K, SaaS | Meta Ads + AdCreative.ai | $29/mo + ad spend | AI generates ad visuals + copy with performance scoring before you launch |
| Budget $200-1K, Hardware | Meta Ads + YouTube Ads | Ad spend only | YouTube for product demos (hardware buyers need to see the robot work). Meta for retargeting |
| Budget $1K-3K | LinkedIn Ads + Meta + Foreplay | $49/mo + ad spend | LinkedIn for precision B2B targeting. Foreplay for creative swipe file (100M+ ad library) |
| Budget $3K+ | LinkedIn + Meta + YouTube + Motion | $199/mo + ad spend | Motion for creative analytics — understand which ads work and why. Weekly creative leaderboards |
| Hardware, any budget | Always include YouTube Ads | — | Video demos outperform static for physical products. YouTube + Meta together = 35% better results |

**Content / Inbound (only if channel = content/inbound):**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| LinkedIn content, budget $0-200 | AuthoredUp (free tier) | $0 | LinkedIn post editor with formatting, hooks library, drafts. Free tier covers basics |
| LinkedIn content, budget $200+ | Taplio | $49/mo | AI-powered LinkedIn content creation, scheduling, analytics, lead gen from engagement. The standard LinkedIn growth tool |
| LinkedIn analytics | Shield | $25/mo | Deep LinkedIn analytics — track impressions, engagement rate, follower growth over time. Shows what's working |
| Newsletter, budget $0-200 | Beehiiv (free tier) | $0 | Free up to 2,500 subscribers. Built-in referral program, SEO, monetization. The 2026 default for creator newsletters |
| Newsletter, budget $200+ | Beehiiv (Scale) or ConvertKit | $49/mo or $29/mo | Beehiiv for media-style newsletters. ConvertKit for course creators and digital product sellers |
| Blog / website, budget $0-200 | Framer | $0-15/mo | AI-powered website builder. Beautiful templates, fast to ship. No code needed |
| Blog / website, budget $200+ | Webflow | $29+/mo | More powerful than Framer for complex sites. Built-in CMS, SEO, and blog |
| SEO, budget $200+ | Ahrefs or Surfer SEO | $29-99/mo | Ahrefs for keyword research and backlink analysis. Surfer for on-page optimization and content scoring |
| Social scheduling | Buffer or Typefully | $0-15/mo | Buffer for multi-platform. Typefully for LinkedIn + Twitter/X focused scheduling |

**AI SDR (autonomous outreach) — include only if budget $1K+ AND team size 2+:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Budget $1K-3K, want to test AI SDR | AiSDR | $900/mo | Most transparent pricing. Best at mimicking human writing tone. Use in hybrid mode: AI drafts, human reviews |
| Budget $3K+ | Artisan (Ava) | $900-2,000/mo | Multi-channel AI SDR. Better than 11x for mid-market |
| DO NOT recommend | 11x.ai | $5K+/mo | Lost 70-80% of customers. 50-70% annual churn across AI SDR category. Only recommend if user specifically asks |

### LAYER 4: CRM & Analytics

**CRM:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Solo founder, budget $0-200 | Google Sheets + Notion | $0 | Honest truth: you don't need a CRM yet. Track deals in a spreadsheet until you have 20+ active conversations |
| Solo founder, budget $200+, LinkedIn-heavy | Folk | $20/mo | 5/5 on G2. Built for relationship-driven sales. LinkedIn + WhatsApp native. Setup in 20 min |
| Solo founder, budget $200+, email-heavy | HubSpot Free CRM | $0 | Safe default. Massive ecosystem. Free forever tier is genuinely useful |
| Team 2-3, modern/flexible | Attio | $36/user/mo | THE breakout CRM of 2026. Custom objects, millisecond filtering, beautiful UI. Multiple articles say it beats HubSpot for teams under 200 |
| Team 2-3, phone-heavy outbound | Close | $35/user/mo | Built-in power dialer and SMS. Best if SDRs make 50+ calls/day |
| Team 2-3, simple pipeline | Pipedrive | $15-60/user/mo | Visual pipeline. Co-founders with zero CRM experience will actually use it |
| Team 4-10 | Attio Pro or HubSpot Pro | $86/user or $100/user | Attio if you want modern UX. HubSpot if you need marketing automation bundled |
| Team 10+, budget $3K+ | Salesforce or HubSpot Enterprise | $165+/user or $150+/user | Salesforce only if you need AppExchange ecosystem. HubSpot for everything else |
| Stage = pre-revenue | Google Sheets | $0 | Don't overthink it. CRM later |

**Scheduling / Meeting Booking (always include — every outbound motion ends with "book a meeting"):**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Solo founder, budget $0-200 | Cal.com (free) or Calendly (free) | $0 | Cal.com is open-source, free forever for individuals. Calendly free works but limits to 1 event type |
| Solo founder, budget $200+ | Calendly (Standard) | $12/mo | Multiple event types, CRM + Zoom integrations, custom branding. The safe default |
| Team 2-10, outbound-heavy | Chili Piper | $30/user/mo | Instant meeting booking from inbound forms + round-robin routing. Converts 2x more inbound leads by eliminating scheduling back-and-forth |
| Team 2-10, budget-conscious | Cal.com (Team) | $15/user/mo | Open-source Calendly alternative. Round-robin, collective scheduling, CRM integrations |
| Team 10+, inbound-heavy | RevenueHero | Custom pricing | Advanced lead routing + instant scheduling. Routes inbound leads to right rep and books in one click |
| Any team using HubSpot | HubSpot Meetings (built-in) | $0 | Already included in HubSpot free. Use this if HubSpot is your CRM — no need for a separate tool |

**Attribution (only if channel = paid ads):**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Paid ads, Shopify/DTC | Triple Whale | $129+/mo | Shopify-native. Easiest setup. Profit-focused metrics |
| Paid ads, multi-platform, $10K-100K/mo spend | Cometly | $250/mo | AI-driven full journey tracking. Feeds conversion data back to ad platforms server-side |
| Paid ads, $100K+/mo spend | Northbeam | $1,000+/mo | ML-based incrementality testing. Platform-agnostic |
| Paid ads, budget $0-1K | UTM parameters + Google Sheets | $0 | Don't pay for attribution until you're spending $3K+/mo on ads |

**Reporting:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Any budget | Looker Studio | $0 | Free. Unlimited dashboards. Standard for mid-market |
| Need multi-source dashboards, non-technical | Databox | $47/mo | Pre-built templates, easier than Looker Studio |
| Need data pipelines into Looker | Supermetrics | $29+/mo | Moves data from ad platforms into Looker Studio/Sheets |

### LAYER 5: AI & Automation

**Workflow Orchestration:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Q6 = No-code, budget $0-200 | Zapier (free tier) | $0 | 6,000+ app connections. Simplest setup. AI Actions for natural language workflows |
| Q6 = No-code, budget $200+ | Make | $9-30/mo | 60% cheaper than Zapier at scale. Visual router/iterator logic. Better for complex multi-step flows |
| Q6 = AI-assisted or Custom code | n8n (Cloud) | $20/mo | Open-source. LangChain integration for AI agent orchestration. 1,000+ native integrations |
| Q6 = Custom code, budget $1K+ | n8n (self-hosted) | $50/mo server | Replaces $1,500+ Zapier spend. Full control. The GTM engineer's default |

**AI Building Tools:**
| Condition | Tool(s) | ~Price | Why |
|-----------|---------|--------|-----|
| Q6 = AI-assisted (DEFAULT recommendation) | Claude Code | ~$100-200/mo (usage) | THE GTM engineering tool of 2026. Build prospecting pipelines, enrichment workflows, campaign launchers in plain English. Sub-5-min signal-to-outreach latency. No coding required — describe what you want |
| Q6 = AI-assisted, want an IDE | Cursor | $20/mo | VS Code fork with deep AI. Agent Mode for multi-file changes. 1M+ users |
| Q6 = AI-assisted, budget-conscious | Windsurf | $15/mo | Budget-friendly agentic IDE |
| Q6 = No-code | Gumloop | $37/mo | Visual AI agent builder. Just raised $50M from Benchmark. Used by Shopify, Ramp |
| Q6 = No-code, GTM-specific | Bardeen | Free tier | Browser-based GTM automation. Lead capture, prospecting actions |
| Q6 = No-code, budget $0 | Lindy | $29/mo | Cheapest AI agent builder. Outbound calling, outreach, lead qualification |

---

## "What to Skip" Logic

- **Pre-revenue + any budget:** "Skip ZoomInfo, Salesforce, and any tool with annual contracts. You need flexibility right now."
- **Solo founder + budget $0-200:** "Skip enrichment tools entirely. Apollo's built-in enrichment is good enough. Invest your budget in outreach volume."
- **Hardware company:** "Skip generic SaaS cold email templates. Your buyers need demos and proof-of-concept conversations. Lead with video and LinkedIn."
- **Budget $3K+ but team <4:** "Skip Salesforce. It's built for 10+ person teams. Attio Pro gives you everything you need at a fraction of the cost."
- **Paid ads + budget $0-200:** "Skip LinkedIn Ads — minimum viable spend is $300+/mo to learn anything. Start with Meta only, nail your creative, then expand."
- **Paid ads + pre-revenue:** "Skip attribution tools (Triple Whale, Northbeam). You don't have enough conversion data yet. Use UTM parameters + Google Sheets until you're spending $3K+/mo."
- **Paid ads + Hardware:** "Skip Google Search Ads unless you have a very specific product keyword. Hardware buyers discover through demos and video. Invest in YouTube and Meta video ads."
- **AI SDRs at any stage under $1K budget:** "Skip AI SDR tools (11x, Artisan, AiSDR). The category has 50-70% annual churn. Build your own outbound stack with Claude Code + Instantly — you'll get better results at 1/10th the cost."
- **Anyone choosing "no-code" for Q6:** "Skip n8n self-hosted. The setup requires server management. Stick with Zapier or Make — they're designed for non-technical users."
- **ZoomInfo for sub-$10M ARR:** "Skip ZoomInfo. Clay + Apollo gives you 90% of the data at 10% of the cost. ZoomInfo's aggressive contracts and auto-renewal increases aren't worth it until you're enterprise-scale."

---

## "Setup Order" Logic

**For outbound channels (cold email, LinkedIn, multi-channel):**
1. CRM first (you need somewhere to put leads before you find them)
2. AI/Automation layer (set up your orchestration so tools connect from day one)
3. Data layer (now find your leads)
4. Enrichment (research them)
5. Outreach last (now reach out with context)

**For paid ads:**
1. Analytics first (GA4 + conversion tracking — you can't optimize what you can't measure)
2. Creative tools (you need ads before you can run ads)
3. One ad platform to start (Meta for broad/DTC, LinkedIn for enterprise B2B, YouTube for hardware demos)
4. CRM + attribution last (connect the dots once you have data flowing)

**For content/inbound:**
1. CRM first (capture leads from day one)
2. Content platform (newsletter tool or blog)
3. AI/Automation (set up content workflows)
4. SEO / enrichment (understand who's visiting)
5. Distribution (social scheduling, repurposing)

---

## Affiliate Links

The results page should include "Get Started →" buttons for each tool that link to affiliate/partner programs. Key affiliate programs:

| Tool | Affiliate Program | Commission |
|------|-------------------|------------|
| HubSpot | HubSpot Affiliate Program | Up to 30% recurring for 1 year |
| Instantly | Instantly Partner Program | Revenue share |
| Apollo | Apollo Referral Program | Credits + revenue share |
| Clay | Clay Partner Program | Revenue share |
| HeyReach | HeyReach Partner Program | Revenue share |
| Semrush | Semrush Affiliate | Up to $200 per referral |
| Foreplay | Foreplay Affiliate | Revenue share |
| n8n | n8n Affiliate | Revenue share |
| Pipedrive | Pipedrive Affiliate | 33% recurring |
| Close | Close Partner Program | Revenue share |

Store affiliate links in a config file (`lib/affiliates.ts`) so they're easy to update. Use UTM parameters to track which quiz answers drive the most affiliate revenue.

---

## Supabase Schema

```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  company_name text,
  answers jsonb not null,
  recommended_stack text not null,
  total_monthly_cost numeric,
  created_at timestamptz default now()
);
```

---

## Design

- Clean, modern, dark mode optional
- Card-based quiz with smooth transitions
- Results page should look like a premium report — something people screenshot and share
- Purple/blue gradient theme (GTM engineering aesthetic)
- Mobile-responsive (many will open from LinkedIn on phone)
- Results card designed for screenshots (this is how it spreads)
- Each tool card has: icon/logo, tool name, one-line description, price, "Get Started →" affiliate button

---

## Files Structure

```
/app
  /page.tsx                    — Landing page
  /quiz/page.tsx               — Quiz flow (6 questions)
  /results/page.tsx            — Results page (gated behind email)
/components
  /quiz/QuestionCard.tsx       — Single question component
  /quiz/ProgressBar.tsx        — Progress indicator
  /results/StackCard.tsx       — Individual tool recommendation card
  /results/LayerSection.tsx    — One layer (icon + tools + pricing)
  /results/ShareButton.tsx     — LinkedIn share button
  /results/SetupOrder.tsx      — Numbered setup steps
  /results/WhatToSkip.tsx      — Skip recommendations callout
  /EmailGate.tsx               — Email capture form
  /Hero.tsx                    — Landing page hero
/lib
  /stacks.ts                   — Decision tree logic (all recommendation rules)
  /affiliates.ts               — Affiliate link configuration
  /types.ts                    — TypeScript types
  /supabase.ts                 — Supabase client
```

---

## Important Notes

- Quiz should feel FAST — no loading between questions, smooth transitions
- Results render instantly after email capture (deterministic, no server computation)
- LinkedIn share text pre-formatted and copy-to-clipboard
- Open Graph image for LinkedIn previews
- "Powered by Crescendo" footer link
- Tool recommendations are honest and research-backed — this builds trust
- Prices noted as approximate ("~$X/mo") since they change
- All affiliate links open in new tab
- Claude Code should be recommended as DEFAULT for Q6 "AI-assisted" — not positioned as a developer tool. Frame it as: "Describe what you want in plain English. No coding required."

---

## After Building

1. Preview full flow end-to-end
2. Mobile responsive (test at 375px)
3. Email capture saves to Supabase
4. LinkedIn share generates clean copy
5. Results page looks screenshot-worthy
6. Affiliate links all work and open in new tab
7. All 5 layers render for every answer combination
8. "What to Skip" section renders contextually
9. Setup order matches the selected primary channel
