import type { EraMood, SectorKey } from "../types";
import {
  companyAfterStory,
  companyThenStory,
} from "./company-stories";
import { sectorOf } from "./sectors";

export interface EraClimate {
  kicker: string;
  body: string;
  chips: EraMood[];
}

/** What the world felt like at the start of the year. No prices, no future. */
export const YEAR_CLIMATE: Record<number, EraClimate> = {
  2000: {
    kicker: "Prosperity feels programmable.",
    body: "Y2K passed without disaster. The expansion that began in 1991 is matching the longest postwar run, unemployment is 4.1%, and the federal budget is in surplus. Nasdaq rose more than 80% in 1999; internet spending and measured productivity gains make growth feel like software you can ship. The Fed funds rate sits at 5.5%, oil has more than doubled from about $12 to the mid-$20s on OPEC cuts and recovering demand, and the 1999 repeal of Glass-Steagall is already remaking finance. Technology valuations assume years of flawless execution—even as money and energy have both gotten dearer.",
    chips: ["bull", "tech-wave", "mixed"],
  },
  2003: {
    kicker: "Recovery without conviction.",
    body: "The Nasdaq has fallen roughly three-quarters from its March 2000 peak, erasing trillions in paper wealth, and U.S. unemployment is 6% with factories still shedding jobs. The Fed has cut the funds rate to 1.25%, 30-year mortgages sit near multi-decade lows, and a housing-and-refinancing boom is carrying household spending. UN weapons inspectors are back in Iraq under Resolution 1441, U.S. and British forces are massing in the Gulf, and markets treat war as a live risk. Europe and Japan remain weak; Sarbanes-Oxley is the new rulebook after Enron and WorldCom.",
    chips: ["recovery", "mixed", "war-risk"],
  },
  2007: {
    kicker: "Global growth, hidden leverage.",
    body: "China grew at a double-digit pace last year, emerging-market demand is lifting commodities, and private-equity buyouts have just set records. The Fed has held the funds rate at 5.25% since June, unemployment is near 4.5%, and the goldilocks story still sells. U.S. house prices peaked in 2006, homebuilding is contracting, and subprime adjustable-rate delinquencies are rising; a handful of mortgage originators have already failed. Oil is around $60 after a volatile year. Most investors still expect housing losses to stay contained inside a strong global expansion.",
    chips: ["bull", "late-cycle", "mixed"],
  },
  2008: {
    kicker: "The credit system is cracking.",
    body: "Since last summer the subprime shock has frozen large parts of wholesale funding: Bear Stearns has liquidated two hedge funds, BNP Paribas has halted redemptions on three investment funds, Northern Rock has suffered a bank run, and the Fed has cut the funds rate from 5.25% to 4.25% while opening emergency auction facilities. Oil is near $100, squeezing households just as home prices and mortgage credit deteriorate. Banks are writing down CDOs; the question is not whether growth slows, but how far losses travel through an opaque securitization chain.",
    chips: ["recession", "crisis", "oil-shock"],
  },
  2009: {
    kicker: "After the system nearly broke.",
    body: "Lehman is gone, Fannie Mae and Freddie Mac are in conservatorship, AIG is on federal life support, and TARP capital is in the largest banks. The Fed has cut the funds rate to 0–0.25% and begun buying agency mortgage securities. Oil has collapsed from above $140 last summer to under $50. U.S. payrolls have been falling by hundreds of thousands a month, unemployment has climbed toward 7%, and world trade and factory output are dropping at a pace last seen in living memory. A new administration takes office in weeks; nobody knows whether the backstops are enough.",
    chips: ["recession", "crisis", "easy-money"],
  },
  2012: {
    kicker: "A fragile recovery goes mobile.",
    body: "Europe's sovereign-debt crisis is the global risk: a Greek debt writedown has been agreed in principle, Italian and Spanish bond yields remain elevated, and the ECB has offered banks three-year unlimited loans to keep credit from seizing. U.S. unemployment is still above 8%, the funds rate sits at 0–0.25%, and the Fed is twisting its balance sheet toward longer-term Treasuries, promising low rates at least through mid-2013. Housing is depressed but no longer in free fall. Smartphones and tablets are becoming everyday computers after the iPhone and iPad; cloud software is a serious alternative to owned servers, not yet the default. Sanctions on Iran keep Brent expensive.",
    chips: ["recovery", "mixed", "tech-wave"],
  },
  2013: {
    kicker: "The worst fears are receding.",
    body: "Mario Draghi's pledge to do \"whatever it takes,\" and the ECB's bond-buying backstop, have pulled the euro back from the brink. In Washington, Congress has just passed a last-minute fiscal-cliff deal that preserves most tax cuts and delays automatic spending cuts. The Fed is buying $85 billion of Treasuries and mortgage bonds each month and has tied the first rate increase to unemployment staying above 6.5%. U.S. joblessness is still just under 8%, but housing, auto sales, smartphones, and shale oil and gas are gaining real momentum. Growth feels possible again, not assured.",
    chips: ["recovery", "easy-money", "mixed"],
  },
  2016: {
    kicker: "Cheap oil, uneasy markets.",
    body: "Oil is below $40—down more than 60% from mid-2014—as U.S. shale, OPEC's decision not to cut, and weaker emerging-market demand glut the market. China's 2015 stock crash and August currency move still hang over exporters. The Fed has just made its first hike in nine years; the ECB, Switzerland, Sweden, and Denmark already run negative policy rates. High-yield energy credit is stressed. A British referendum on EU membership is expected this year, Europe is absorbing a migration crisis after 2015's refugee surge and the Paris attacks, and a bitter U.S. primary season is underway. Cheap fuel helps consumers; politics is no longer a background variable.",
    chips: ["mixed", "oil-shock", "easy-money"],
  },
  2019: {
    kicker: "A mature boom meets a trade war.",
    body: "A partial federal government shutdown that began December 22 is still running, with hundreds of thousands of workers unpaid. The Fed raised the funds rate to 2.25–2.50% in December—its fourth hike of 2018—helping trigger a sharp fourth-quarter market selloff; unemployment is below 4%. U.S.–China tariffs already cover hundreds of billions of dollars of goods, slowing factories and capital spending. Theresa May has not secured a Brexit deal, and the March exit date is approaching. The expansion is nearly a decade old, and that itself has become the worry.",
    chips: ["late-cycle", "trade-war", "mixed"],
  },
  2020: {
    kicker: "Calm markets, fragile supply chains.",
    body: "The United States and China announced a Phase One trade truce in December; the signing is days away, while most existing tariffs remain. Unemployment is 3.5%, the Fed has cut three times in 2019 to 1.50–1.75% after a September repo-market scare, and manufacturing surveys look to be stabilizing. The expansion that began in 2009 is still intact. The House has impeached the president; a Senate trial is imminent. On December 31, Chinese authorities reported a pneumonia cluster of unknown cause in Wuhan. Its reach is a footnote, not a forecast.",
    chips: ["late-cycle", "mixed"],
  },
  2022: {
    kicker: "The pandemic boom meets inflation.",
    body: "The Omicron variant is spreading faster than earlier waves, testing hospitals and disrupting travel just as the economy is trying to normalize. November consumer prices are up 6.8% from a year earlier, the highest since 1982; used cars, energy, food, and rents are all contributing, and ports and chip plants remain bottlenecks. The Fed is still at 0–0.25% but has doubled the pace of tapering bond purchases and signaled rate increases this year. Labor is scarce, wages are rising, and households still hold pandemic savings. Russian forces are massed on Ukraine's borders; European gas markets are already tight.",
    chips: ["inflation", "tightening", "war-risk"],
  },
  2023: {
    kicker: "High rates meet a new technology.",
    body: "After more than four percentage points of hikes in a single year, the Fed funds rate is 4.25–4.50%—a 15-year high—and the central bank is shrinking its balance sheet. Inflation has cooled from a 9% peak but remains far above target; markets are arguing over a soft landing versus recession. Europe got through the autumn without a full gas emergency after filling storage and replacing much Russian pipeline supply with LNG and conservation. China is dismantling zero-COVID weeks after nationwide protests. FTX's November collapse has punctured crypto. ChatGPT, released November 30, is five weeks old: striking enough that every board has heard of it, too new to know whether it changes an industry.",
    chips: ["tightening", "tech-wave", "mixed"],
  },
};

const SECTOR_CONTEXT: Record<number, Record<SectorKey, string>> = {
  2000: {
    technology: "Y2K upgrades and internet traffic have driven extraordinary demand for PCs, servers, chips, and networking gear. The real infrastructure boom now shares a market with business models valued mainly on clicks and possibility—and with companies that have yet to earn a profit.",
    financials: "A strong economy, active markets, and the 1999 repeal of Glass–Steagall encourage banks to combine lending, trading, and insurance. Credit looks benign, but consolidation is creating institutions whose risks are harder to see.",
    energy: "OPEC restraint and recovering world demand have lifted crude from roughly $12 to more than $25 in a year. Integrated oil companies again have pricing power after the late-1990s commodity slump.",
    healthCare: "Drug pipelines, biotechnology, and medical devices attract capital as genomics advances. Large pharmaceutical companies still pair patented blockbusters with unusually defensive cash flow.",
    consumer: "Low unemployment, rising home values, and record confidence support retailers, restaurants, and branded goods. Walmart-scale logistics matter as much as internet novelty, while household debt is quietly increasing.",
    industrials: "Factories benefit from strong demand and heavy investment in information equipment. A strong dollar and rising energy costs complicate the picture, but recession feels remote.",
    communications: "Telecom carriers are spending heavily on fiber, wireless networks, and internet capacity. Dial-up portals still command attention, and investors assume data traffic will justify almost any network buildout.",
    utilities: "Electricity deregulation is reshaping regional markets, while demand rises with a strong economy and new data infrastructure. Stable dividends look dull beside technology—exactly the appeal for cautious investors.",
  },
  2003: {
    technology: "The equipment glut from the internet boom is still being absorbed, and corporate technology budgets are tight. Survivors with cash and recurring enterprise revenue look stronger than the vanished dot-coms.",
    financials: "A steep yield curve and a refinancing wave support bank earnings as 30-year mortgage rates sit near multi-decade lows. Credit losses from the recession are easing, and housing is becoming the preferred growth engine.",
    energy: "War risk in Iraq and supply disruption in Venezuela keep crude volatile. China's oil demand is rising rapidly, beginning to alter assumptions built around slow growth in rich countries.",
    healthCare: "Large drugmakers remain profitable, but patent expirations and pricing scrutiny matter more after the equity bust. Biotechnology is rebuilding credibility around products rather than genome-era promises.",
    consumer: "Mortgage refinancing and rising home prices give households spending power despite a soft labor market. Discount stores are resilient; travel and discretionary demand remain sensitive to war anxiety.",
    industrials: "Manufacturers face excess capacity, weak business investment, and a strong productivity push. Defense and housing-linked demand are brighter than broad capital spending.",
    communications: "Broadband is replacing dial-up while mobile adoption grows. Telecom operators are repairing debt-heavy balance sheets after the fiber glut and the WorldCom collapse.",
    utilities: "After Enron and California's power crisis, investors care about leverage, trading exposure, and regulation again. Plain regulated generation and distribution regain value.",
  },
  2007: {
    technology: "Enterprise spending is healthy, online advertising is scaling, and mobile data is improving through 3G networks. The dominant PC-and-browser model still looks durable, though smaller devices are becoming capable computers.",
    financials: "Securitization turns mortgages into globally owned bonds, keeping credit abundant even as U.S. housing rolls over. Rising subprime delinquencies are visible; the unanswered question is who ultimately holds the risk.",
    energy: "Rapid growth in China and other emerging markets keeps oil demand strong. Producers and oilfield-service firms are spending again after years of restraint, with geopolitical supply risk built into prices.",
    healthCare: "Medicare Part D has expanded U.S. prescription coverage, supporting drug volumes while increasing government influence over the market. Device makers benefit from aging populations and elective procedures.",
    consumer: "Employment and incomes are still growing, but housing is no longer adding easy wealth. Retailers tied to home improvement and discretionary purchases face a consumer more exposed to mortgage resets.",
    industrials: "China-led commodity demand, commercial construction, mining, and global trade support machinery and transport. The cycle looks broad, and few expect a credit problem to stop it.",
    communications: "Broadband and 3G networks are turning voice carriers into data providers. Search advertising, online video, and social networks are growing, but television and print still capture much of the money.",
    utilities: "High fuel costs and rising electricity demand favor efficient generation, while climate policy is moving into boardrooms. Utilities remain capital-intensive and unusually sensitive to regulation and interest rates.",
  },
  2008: {
    technology: "Corporate spending is slowing as credit tightens, but internet advertising and smartphones remain young growth markets. Hardware leaders carry less speculative excess than in 2000, though they are not insulated from recession.",
    financials: "Banks are writing down mortgage securities, interbank trust is damaged, and emergency central-bank facilities are already in use. Capital ratios look less reassuring when assets cannot be priced or funded.",
    energy: "Crude is near $100 after years of emerging-market demand and constrained supply. High prices enrich producers but squeeze airlines, manufacturers, and households just as growth weakens.",
    healthCare: "Demand for medicines and essential care is relatively defensive, yet financing pressure reaches hospitals and smaller biotechnology firms. Patent risk and U.S. election-year reform proposals shape valuations.",
    consumer: "Falling home prices, tighter credit, and expensive fuel are pressing household budgets. Staples and discount retail look safer than autos, housing goods, or other financed purchases.",
    industrials: "Order books still reflect the global expansion, but housing equipment and construction have turned down. Exporters depend on Europe and emerging markets avoiding the U.S. slowdown.",
    communications: "Wireless data and broadband usage keep growing even as advertising and equipment budgets become vulnerable. Legacy landline revenue is falling faster than carriers would like.",
    utilities: "Regulated revenue offers shelter, but utilities must finance large plants and grids in stressed credit markets. Fuel costs and emerging carbon rules create additional uncertainty.",
  },
  2009: {
    technology: "Technology budgets are being cut, inventories are shrinking, and chip demand has collapsed. Cash-rich software and internet firms look unusually resilient; cloud computing is still a small but credible alternative to owned hardware.",
    financials: "Survival depends on capital, government guarantees, and confidence rather than ordinary earnings. Loan losses are still rising, and shareholders face dilution even where institutions endure.",
    energy: "Oil has fallen from $147 to near $40 as global demand contracts. Producers are cancelling projects, while integrated majors rely on balance-sheet strength and refining to outlast the shock.",
    healthCare: "Essential demand is steadier than the economy, but unemployment threatens insurance coverage and hospital finances. U.S. health-reform debate is moving from campaign promise toward legislation.",
    consumer: "Job losses, foreclosures, and scarce credit are forcing households to trade down and save. Discount retail and basic goods hold up better than travel, autos, and home-related spending.",
    industrials: "World trade and factory output are falling at a pace associated with depression. Machinery, transport, and materials companies are cutting production while governments prepare infrastructure stimulus.",
    communications: "Consumers still pay for mobile and broadband connections, making networks comparatively defensive. Advertising-funded media is weaker, and smartphones are beginning to redirect attention from PCs.",
    utilities: "Electricity demand is falling with industrial production, an unusual warning sign. Regulated returns provide stability, but financing and large construction programs remain exposed to the credit freeze.",
  },
  2012: {
    technology: "Smartphones, tablets, mobile apps, and cloud services are expanding despite weak macro growth. PC incumbents must decide whether these are adjacent products or a replacement cycle.",
    financials: "European sovereign stress and undercapitalized banks threaten funding across borders. U.S. banks are healing, but regulation, mortgage settlements, and near-zero rates constrain their old profit model.",
    energy: "Brent crude remains above $100 amid Iran tensions, while hydraulic fracturing is rapidly increasing U.S. oil and gas supply. Cheap domestic gas is changing power generation and industrial economics.",
    healthCare: "The Affordable Care Act faces a Supreme Court decision, creating uncertainty for insurers, hospitals, and drugmakers. Aging populations and specialty medicines still support long-run demand.",
    consumer: "U.S. households are repairing balance sheets, auto sales are recovering, and online retail is gaining share. Europe is weaker, making global brands dependent on emerging-market consumers.",
    industrials: "U.S. manufacturing and autos are recovering, but Europe's recession and slower world trade cap demand. Railroads and equipment makers benefit from shale activity and domestic investment.",
    communications: "Mobile broadband is changing media consumption: social networks, streaming video, and app stores compete for time. Carriers face heavy network spending while cable companies defend the home connection.",
    utilities: "Abundant shale gas is lowering power prices and accelerating coal-to-gas switching. Renewable mandates support wind and solar, while very low interest rates help fund large infrastructure programs.",
  },
  2013: {
    technology: "Mobile computing is now the growth engine, with cloud software and data-center demand following it. PC shipments are weakening, separating subscription and platform businesses from hardware tied to the old cycle.",
    financials: "Housing and credit are healing in the U.S., while Europe is still repairing banks and sovereign balance sheets. Near-zero rates support asset prices but compress lending margins.",
    energy: "U.S. tight-oil output is rising quickly, reversing decades of decline and lowering gas costs for industry. Global crude remains expensive, so producers still spend heavily.",
    healthCare: "Insurers and providers are preparing for major Affordable Care Act coverage provisions in 2014. Biotechnology is regaining investor interest as targeted drugs produce tangible clinical results.",
    consumer: "Improving housing, auto sales, and payrolls support U.S. spending, though wage growth remains modest. E-commerce and smartphones are making price comparison and delivery expectations permanent.",
    industrials: "Construction and automotive demand are recovering in the U.S., and cheap shale gas helps energy-intensive manufacturing. Europe remains a drag on multinational order books.",
    communications: "Streaming, social feeds, and mobile advertising are taking attention from print and scheduled television. Network owners carry the traffic, but platforms increasingly capture the economics.",
    utilities: "Low natural-gas prices pressure wholesale power markets while benefiting customers. Regulated utilities remain bond-like investments, making any future rise in rates an important risk.",
  },
  2016: {
    technology: "Cloud infrastructure and software subscriptions are becoming standard enterprise choices. Smartphones are mature enough that replacement cycles matter, while machine learning is useful but not yet a mainstream investment category.",
    financials: "Very low and negative rates squeeze lending margins, and post-crisis capital rules limit leverage. Market volatility tied to China and commodities weighs on trading and credit quality.",
    energy: "A global supply glut has pushed oil below $40, forcing producers and service companies to cut spending and debt. U.S. shale has made supply more responsive than in earlier cycles.",
    healthCare: "Drug-pricing anger is rising in a U.S. election year, while biotechnology valuations retreat from 2015 highs. Insurers continue adapting to Affordable Care Act exchanges and consolidation pressure.",
    consumer: "Cheap fuel and steady U.S. job growth support household spending. E-commerce is taking share quickly, forcing stores to treat fulfillment and mobile shopping as core infrastructure.",
    industrials: "Weak commodity investment and a strong dollar hurt exporters, while aerospace and construction remain firmer. China's shift from heavy industry toward services changes demand for equipment and materials.",
    communications: "Mobile attention has consolidated around social feeds, search, and streaming video. Traditional media faces cord-cutting, while carriers invest in faster 4G networks with limited pricing power.",
    utilities: "Low rates make dividends and long-lived infrastructure attractive. Cheap gas keeps power prices low, while wind and solar costs continue falling and coal retirements accelerate.",
  },
  2019: {
    technology: "Cloud computing, software subscriptions, digital advertising, and data centers drive growth. Smartphone and semiconductor demand has softened, and U.S.–China restrictions expose how global the hardware supply chain has become.",
    financials: "The Fed's December rate increase and a flatter yield curve raise recession concerns. Banks are far better capitalized than in 2008, but trading, dealmaking, and loan growth depend on confidence.",
    energy: "U.S. shale output is at a record, limiting oil-price upside despite geopolitical risk. Investors increasingly demand cash flow rather than production growth from indebted producers.",
    healthCare: "Drug pricing and insurance coverage are central U.S. political issues. Biotechnology innovation remains strong, while managed-care companies face recurring policy risk.",
    consumer: "Low unemployment supports spending, but tariffs and slowing housing complicate the outlook. E-commerce is now ordinary behavior, and retailers are spending heavily to match fast delivery.",
    industrials: "Tariffs, slower Chinese demand, and weaker auto production are hitting factories and freight. Aerospace backlogs provide support, but global supply chains are becoming a political liability.",
    communications: "Streaming services are challenging the cable bundle, while digital ads concentrate around a few platforms. Carriers are beginning 5G deployment before a clear mass-market use case exists.",
    utilities: "Falling bond yields and predictable regulated earnings attract defensive capital. Utilities are closing coal plants and adding renewables, but grid investment keeps capital needs high.",
  },
  2020: {
    technology: "Cloud, software subscriptions, digital ads, and data centers are established profit engines. Chip and hardware supply chains remain exposed to trade restrictions and Asian manufacturing concentration.",
    financials: "Three Fed cuts in 2019 have eased funding conditions, while banks enter the year well capitalized. Low rates squeeze margins, and leveraged corporate credit is a more visible worry than household mortgages.",
    energy: "Abundant U.S. shale supply and modest global demand keep pressure on producers. Investors want debt reduction and free cash flow rather than a return to aggressive volume growth.",
    healthCare: "Drug pricing dominates U.S. policy debate, and hospitals face ordinary cost pressure. An unexplained pneumonia cluster in Wuhan is being monitored, but no one can yet price its medical or economic reach.",
    consumer: "Low unemployment and wage gains support stores, travel, restaurants, and housing. Online shopping and streaming are growing alongside those physical businesses, not replacing them.",
    industrials: "Global manufacturing is emerging from a trade-war slowdown, but autos and capital goods remain weak. Aerospace, logistics, and factory supply chains depend on a gradual rebound in world trade.",
    communications: "Streaming competition is accelerating and 5G marketing is ahead of coverage. Digital platforms capture more advertising, while cable broadband remains the essential connection in most homes.",
    utilities: "Low rates support infrastructure spending and dividends. Wind, solar, and natural gas keep displacing coal, making grid modernization a larger part of the investment case.",
  },
  2022: {
    technology: "Pandemic demand has pulled forward spending on devices, cloud capacity, and software, while chip shortages persist. Rising bond yields challenge the high valuations attached to distant growth.",
    financials: "Banks expect rate increases to improve lending margins, but markets are adjusting to a faster Fed. Strong household balance sheets contrast with growing risk in speculative assets and expensive credit.",
    energy: "Oil and gas demand has recovered faster than supply after years of restrained investment. European gas shortages and Russia–Ukraine tension make energy security an immediate concern.",
    healthCare: "Vaccines, testing, and treatments remain central as Omicron spreads, while routine care continues normalizing. Pandemic winners now face difficult comparisons and political scrutiny over access and pricing.",
    consumer: "Households have jobs and accumulated savings, but food, fuel, rent, and goods inflation are eroding purchasing power. Retailers still face inventory delays and unusually high freight costs.",
    industrials: "Factories have demand but cannot reliably obtain chips, labor, or shipping capacity. Airlines and aerospace expect reopening, while logistics networks remain congested.",
    communications: "Streaming and social-media use remain above pre-pandemic levels, but growth is slowing. Privacy changes, content spending, and 5G capital needs are becoming harder tests of profitability.",
    utilities: "Power demand has recovered and fuel costs are rising, while decarbonization investment accelerates. Regulated utilities must finance that buildout just as interest rates begin moving higher.",
  },
  2023: {
    technology: "Cloud growth is slowing, layoffs have begun, and higher rates punish long-duration valuations. Generative AI has suddenly become visible, but its costs, customers, and competitive winners are unknown.",
    financials: "Rapid rate increases improve some loan yields but reduce the value of older bonds and slow mortgages and deals. Credit losses remain low; the tension between better margins and balance-sheet risk is building.",
    energy: "Europe has replaced much Russian pipeline gas through conservation and costly imports, easing immediate shortage fears. Oil producers remain disciplined even as recession risk threatens demand.",
    healthCare: "Pandemic urgency is fading, restoring attention to drug pipelines, medical procedures, and insurer costs. Demand is defensive, but pricing policy and post-COVID normalization separate winners from temporary beneficiaries.",
    consumer: "Employment remains strong, but inflation and higher borrowing costs pressure household budgets. Retailers are clearing excess goods while spending rotates back toward travel and services.",
    industrials: "Supply chains are improving, yet high rates and weak global growth threaten orders. U.S. infrastructure and semiconductor subsidies create unusually visible multiyear demand for construction and factory equipment.",
    communications: "Streaming growth has become a profitability contest, digital advertising is slowing, and social platforms are cutting costs. Generative AI raises a new question for search before it has a proven business model.",
    utilities: "Fuel pressures are easing, but grids require major investment for renewables and electrification. Higher rates make those capital programs more expensive and reduce the relative appeal of dividend yields.",
  },
};

/** @deprecated Retained as an editorial reference for the original curated copy. */
export const THEN: Record<string, string> = {
  "2000:AAPL":
    "Steve Jobs has returned Apple to profit with the colorful iMac, but it remains a small computer maker in a Windows-dominated market. Its recovery is real; a broader platform is not.",
  "2003:AAPL":
    "The iPod is a cultural hit. The computer business is still the P&L. Nobody is pricing a phone.",
  "2007:AAPL":
    "Macs and iPods. A phone is a loud rumor around Macworld, not a product in pockets yet. BlackBerry still owns 'serious' mobile.",
  "2008:AAPL":
    "The iPhone exists and people wait in line for it. It is still a small slice of a computer company. There is no App Store yet.",
  "2009:AAPL":
    "The App Store is real. The iPhone 3G already happened. In a recession, a $200 phone still looks like a luxury.",
  "2012:AAPL":
    "The iPhone is the company. Tim Cook has the chair. The question in the air is whether they can invent another category, not whether they can sell phones.",
  "2013:AAPL":
    "Post-Jobs anxiety is the plot. iPhone is a habit. People argue about 'lost innovation' in public.",
  "2016:AAPL":
    "iPhone growth is slowing and everyone can see it. Services are a footnote. China is both the upside and the scare.",
  "2019:AAPL":
    "Services and wearables are the new pitch as iPhone unit growth slows. Management has stopped reporting unit sales and continues returning enormous sums through buybacks.",
  "2020:AAPL":
    "A trillion-dollar consumer-products company is shifting attention toward services, wearables, and its installed base. Privacy is becoming a practical point of difference from advertising platforms.",
  "2022:AAPL":
    "The most valuable company in the market. A services machine on top of a phone. Inflation and China risk are the grown-up worries.",
  "2023:AAPL":
    "Demand cooled with the phone cycle. Vision Pro is a rumor. AI is something other people are demoing.",
  "2000:MSFT":
    "Windows and Office are a tax on every PC. The government is still in its face. The internet is a threat it is trying to buy or bury.",
  "2007:MSFT":
    "Still the PC company. Google is the existential insult. A phone OS is an also-ran. Cloud is an internal word.",
  "2012:MSFT":
    "Windows 8 is the bet. Nokia is the phone plan. Azure exists and almost nobody outside enterprise cares.",
  "2016:MSFT":
    "Satya Nadella has flipped the culture toward cloud. Office is becoming a subscription. Windows is no longer the whole identity.",
  "2020:MSFT":
    "Azure and Office 365 are the growth engine. Teams is gaining workplace adoption, while GitHub and LinkedIn broaden the enterprise ecosystem.",
  "2023:MSFT":
    "OpenAI's new ChatGPT runs on Azure infrastructure, and Microsoft is already its major partner. Whether generative AI changes Office, Bing, or cloud demand is still an open question.",
  "2000:AMZN":
    "An unprofitable bookstore-of-everything. Bezos keeps talking about a flywheel that is hard to see in the earnings.",
  "2007:AMZN":
    "Still 'the website that ships boxes.' AWS exists as a weird side business for developers, not a pillar of the S&P.",
  "2012:AMZN":
    "Prime is a habit for a certain kind of shopper. AWS is growing in public and still sounds like plumbing.",
  "2016:AMZN":
    "The everything store plus a cloud utility. Alexa is a novelty. Profits are still optional in the narrative.",
  "2020:AMZN":
    "Prime and two-day delivery have made the retail network everyday infrastructure, while AWS supplies most operating profit. The tradeoff remains relentless investment versus durable scale.",
  "2022:AMZN":
    "The pandemic hangover. Too many warehouses, too many people. AWS still prints money. Retail looks overbuilt.",
  "2007:GOOG":
    "Search advertising is scaling rapidly. YouTube is a recent, expensive-looking purchase, and mobile search is an emerging question rather than a proven business.",
  "2008:GOOG":
    "The default way to ask the internet a question. Mobile search is the open fight. YouTube still looks like a toy that burns bandwidth.",
  "2012:GOOG":
    "Mobile is eating desktop search. Android is the quiet empire. Privacy and scale are drawing more public criticism of a company that once defined itself by 'don't be evil.'",
  "2016:GOOG":
    "Now Alphabet on paper. YouTube and ads are the engine. Cars and moonshots are the science-fair.",
  "2020:GOOG":
    "Search advertising remains dominant, YouTube increasingly competes with television, and Google Cloud is growing from a smaller base. Antitrust and privacy scrutiny are now persistent operating risks.",
  "2023:GOOG":
    "Search advertising is still the cash engine. ChatGPT has made conversational answers look newly credible, but Google has not yet shown a public response or proved that search behavior will change.",
  "2008:NVDA":
    "Gaming and professional graphics drive the business. CUDA is a young software platform that lets researchers use GPUs for parallel computing, but it is not yet a major commercial market.",
  "2016:NVDA":
    "Gaming GPUs plus a story about cars and AI. The word 'GPU' is leaking out of enthusiast forums.",
  "2019:NVDA":
    "Data-center GPUs are a real business. Gaming still pays the bills. Crypto miners are a love-hate customer.",
  "2020:NVDA":
    "Gaming remains large and data-center demand is growing around AI and accelerated computing. The software ecosystem around CUDA is becoming as important as any single chip generation.",
  "2022:NVDA":
    "Gaming and data-center sales have surged through the pandemic, while crypto-related demand is difficult to measure. AI is a serious workload, but still mostly discussed through cloud and research customers.",
  "2023:NVDA":
    "Data-center revenue already rivals gaming, and ChatGPT has made large-model training visible outside research labs. The size and durability of any resulting chip demand are still unknown.",
  "2012:TSLA":
    "A tiny, money-losing automaker is preparing first deliveries of the Model S sedan. Electric cars remain a niche, and manufacturing at meaningful volume is unproven.",
  "2016:TSLA":
    "Model S and the new Model X serve wealthy early adopters. The company must prove it can manufacture reliably, build batteries at scale, and move beyond a luxury niche.",
  "2019:TSLA":
    "Model 3 is shipping and the internet is a courtroom. Elon is the brand. Profitability is a rumor that keeps missing.",
  "2020:TSLA":
    "Just barely a mass-market story. China is the new factory. The stock is already a religion.",
  "2022:TSLA":
    "The most valuable automaker is priced more like a technology platform. Vehicle deliveries and new factories are the immediate test as established manufacturers accelerate electric plans.",
  "2000:GE":
    "The conglomerate that taught a generation how to be a CEO. Plastics, jet engines, NBC, and a finance arm that looks like a hedge fund.",
  "2008:GE":
    "Still treated as a blue-chip industrial. The finance book is the part nobody wants to look at closely.",
  "2000:C":
    "A global bank that just ate the 1990s. Emerging markets and a supermarket of finance. Too big to need luck, or so the story goes.",
  "2007:C":
    "A money-center giant with a CDOs problem it has not fully admitted. Still a default holding for 'the economy.'",
  "2008:C":
    "Already wobbly. The word 'bailout' is not yet official. Credit is the product and the risk.",
  "2007:LEH":
    "A proud independent investment bank. Real estate is a feature, not a bug. Counterparties still pick up the phone.",
  "2008:AIG":
    "The quiet giant behind other people's risk. Credit-default insurance looks like free money until it doesn't.",
  "2000:CSCO":
    "It sells the pipes the internet runs on. Owning the picks and shovels of the boom is the respectable way to be greedy.",
  "2000:YHOO":
    "The homepage of the internet. Search is a box on the page, not a company. Display ads and dial-up deals still matter.",
  "2000:AOL":
    "You've got mail. Subscription dial-up, a curated portal, and instant messaging make AOL many households' front door to the internet—even as faster broadband begins to threaten the bundle.",
  "2012:FB":
    "The dominant social network is preparing for a widely expected IPO. It still has to prove that an advertising business built on desktop use can follow people onto phones.",
  "2016:FB":
    "News Feed is how news happens. Instagram is the youth insurance policy. Video and ads are the machine.",
  "2020:FB":
    "The default social graph. Stories and Instagram keep it young. A coming election will put the News Feed and content rules back under public scrutiny.",
  "2022:META":
    "The company formerly known as Facebook just bet the name on a metaverse. Apple's privacy change hit the ads. Reels is the fight with TikTok.",
  "2012:NFLX":
    "DVD-by-mail is shrinking and streaming is the bet. Licensing costs are rising, international expansion is beginning, and the company has only started experimenting with original programming.",
  "2016:NFLX":
    "Binge is a verb. Originals are the brand. The question is whether they can keep spending faster than the cable bundle dies.",
  "2008:XOM":
    "Oil is a geopolitical weapon and a price chart. An integrated major is how you buy 'the world still runs on this.'",
  "2020:XOM":
    "Shale has made oil abundant, investors are demanding spending discipline, and climate pressure is rising. Exxon is still pursuing large long-cycle projects while peers become more cautious.",
  "2022:XOM":
    "Europe needs molecules. Inflation makes energy look like a virtue again. Capex discipline is the new religion.",
  "2019:UNH":
    "The boring giant of American health insurance plus a clinic-and-pharmacy empire. Policy risk is always in the footnotes.",
};

/** @deprecated Retained as an editorial reference for the original curated copy. */
export const AFTER: Record<string, string> = {
  "2000:AAPL":
    "A computer company became a phone company, then a services company. The multiple is the iPhone era, not the iMac.",
  "2003:AAPL":
    "You bought iPod. You were handed iPhone, App Store, and a two-decade consumer monopoly. This is the lottery ticket.",
  "2007:AAPL":
    "You bought it the week a phone was still a rumor. The next twenty years were that phone.",
  "2008:AAPL":
    "You paid a recession price for a gadget company. The App Store and a billion phones did the rest.",
  "2009:AAPL":
    "Bought in the wreckage. The smartphone S-curve did the compounding. The 2008 scare was the entry fee.",
  "2012:AAPL":
    "Already huge, still compounded. Services, wearables, and a shrinking share count beat the 'Jobs is gone' essay.",
  "2016:AAPL":
    "The iPhone pause was real. Services and buybacks still quietly multiplied the capital.",
  "2020:AAPL":
    "A pandemic made the installed base even stickier. Not a 50-bagger from here — already a giant.",
  "2022:AAPL":
    "You bought the peak of 'most valuable on earth.' Fine, not magical. Time was short.",
  "2000:MSFT":
    "You bought the monopoly at bubble price. It took a lost decade, then Azure and Office 365 to make you whole-plus.",
  "2009:MSFT":
    "The PC company nobody wanted. Cloud and subscriptions turned it into a different stock with the same ticker.",
  "2016:MSFT":
    "The Nadella re-rating was already underway. Azure did the rest.",
  "2023:MSFT":
    "You bought the OpenAI wrapper as it was becoming obvious. A few years of AI spend, not a generation.",
  "2000:AMZN":
    "A money-losing retailer that became infrastructure. AWS, Prime, and years of reinvestment rather than reported profit. The hold is the whole story.",
  "2007:AMZN":
    "Boxes plus a side project called AWS. The side project became a utility. Retail became a habit.",
  "2022:AMZN":
    "You bought the hangover. Retail bloated, AWS still worked. Not enough years to be a legend.",
  "2007:GOOG":
    "Search ads plus a video site. Mobile and YouTube did the compounding. Android was the quiet empire.",
  "2023:GOOG":
    "AI scare, then a relief rally. Search did not die on contact. Too little time for a new S-curve.",
  "2008:NVDA":
    "A gaming-chip vendor. CUDA, then data centers, then a chatbot shock. This is what a 15-year hold of the right tool looks like.",
  "2016:NVDA":
    "AI was a keynote. Training clusters became a budget line. You were early to the pick-and-shovel.",
  "2022:NVDA":
    "You bought after a pandemic pop, before ChatGPT. The next three years were the demand shock.",
  "2023:NVDA":
    "You bought weeks into the chatbot era. The rerating was violent and fast. Not a 2008-style wait.",
  "2012:TSLA":
    "A science project with a sedan. Scaling, China, and an unusually personal public narrative around Elon Musk turned it into a mass-market auto stock — with software multiples.",
  "2022:TSLA":
    "You bought the dream at the high. Competition and rates did what skeptics always said. Holding from the peak hurt.",
  "2007:LEH":
    "Independent to the end. The end was 2008. Common equity went to zero.",
  "2008:AIG":
    "The insurance wrapper around a derivatives book. Dilution and a bailout saved the name, not the 2008 shareholder.",
  "2007:C":
    "A supermarket of finance that needed a rescue. The ticker survived. The 2007 price never really did.",
  "2008:C":
    "You bought a ward of the state. It lived. The recovery was a grind, not a 10-bagger.",
  "2000:CSCO":
    "The picks-and-shovels of the last boom. The internet kept growing. The stock spent decades working off a bubble multiple.",
  "2000:YHOO":
    "The homepage lost to search. Alibaba was the buried treasure, then a messy unwind. Not the compounder the 1999 story promised.",
  "2000:AOL":
    "Dial-up and a merger. Broadband eroded the subscription. The brand faded from a household name to a footnote.",
  "2000:GE":
    "The MBA's favorite conglomerate. Finance blew up, the industrial core was broken for parts. Size was not a moat.",
  "2008:XOM":
    "Oil crashed, then it didn't stay dead. Dividends did more work than glory. Energy cycles are long and rude.",
  "2022:XOM":
    "A war and an inflation spike paid you quickly. Not a 20-year story from this entry — a cycle trade that happened to be right.",
  "2012:FB":
    "The mobile-skeptic IPO. Instagram and the News Feed ad machine turned a desktop worry into a cash printer — then a new name.",
  "2022:META":
    "You bought the metaverse hangover. Reels and ads recovered faster than the visor. A two-year snapback, not a new platform.",
  "2012:NFLX":
    "Streaming was still a dare against cable. Originals and global scale worked until everyone else copied the homework.",
};

/** @deprecated Company timelines now provide complete coverage. */
export function sectorThen(year: number, ticker: string, name: string): string {
  const questions: Record<SectorKey, string> = {
    technology:
      "Its products can scale quickly, but leadership changes quickly too; the test is whether customers are locked into a durable platform or simply buying the current cycle.",
    financials:
      "Its reported earnings depend on assumptions about credit, funding, and markets that can look safest near the end of a cycle.",
    energy:
      "Its assets may last for decades, but the investment case still turns on commodity prices, depletion, and discipline with new capital.",
    healthCare:
      "Demand is durable, but patents, clinical evidence, reimbursement, and regulation decide how much of that demand reaches shareholders.",
    consumer:
      "Brand and distribution provide an advantage only if households keep choosing it while prices, channels, and tastes change.",
    industrials:
      "The order book reflects decisions made across the real economy, so margins depend on utilization, input costs, and where the capital cycle turns next.",
    communications:
      "Audience and network scale look powerful, but technology can rapidly shift attention—and the economics attached to it—to a different channel.",
    utilities:
      "Demand is predictable, while returns depend on regulation, financing costs, fuel choices, and the capital required to keep essential infrastructure reliable.",
  };
  return `${name} enters ${year} as one of the largest public companies in its field. ${questions[sectorOf(ticker)]}`;
}

/** @deprecated Company timelines now provide complete coverage. */
export function generatedAfter(year: number, name: string, multiple: number): string {
  if (multiple <= 0) {
    return `The gameplay model assigns no remaining value to this ${name} position. It does not identify a specific bankruptcy, acquisition, or corporate-action path.`;
  }
  if (multiple < 0.5) {
    return `In the gameplay model, each $1 invested in ${name} in ${year} finishes below $0.50. This is an estimated result, not a sourced return series.`;
  }
  if (multiple < 1) {
    return `In the gameplay model, each $1 invested in ${name} in ${year} finishes below its starting value. Time did not rescue the modeled entry.`;
  }
  if (multiple < 2) {
    return `The modeled ${name} position finishes between 1X and 2X its starting value. That is nominal growth, before considering inflation or taxes.`;
  }
  if (multiple < 5) {
    return `The modeled ${name} position grows to between 2X and 5X its starting value—positive compounding, but far from the game's 100X target.`;
  }
  if (multiple < 15) {
    return `The modeled ${name} position grows to between 5X and 15X its starting value. The long holding period does much of the work.`;
  }
  return `The modeled ${name} position exceeds 15X from its ${year} entry. Treat the magnitude as gameplay data until a sourced return series replaces it.`;
}

export function thenStory(year: number, ticker: string): string {
  return companyThenStory(year, ticker);
}

export function afterStory(
  year: number,
  ticker: string,
): string {
  return companyAfterStory(year, ticker);
}

export function yearClimate(year: number): EraClimate {
  return (
    YEAR_CLIMATE[year] ?? {
      kicker: "A year in the American tape.",
      body: "The board models a group of large public companies using only context available near the entry date. The future is not printed on the card.",
      chips: ["mixed"],
    }
  );
}

export function sectorContext(year: number, sector: SectorKey): string {
  return (
    SECTOR_CONTEXT[year]?.[sector] ??
    "The sector is being shaped by the same growth, credit, and policy forces moving the wider economy."
  );
}
