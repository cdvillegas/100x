import type { CompanyStoryProfile } from "./company-story-types";

export const CONSUMER_INDUSTRIAL_STORIES: Record<
  string,
  CompanyStoryProfile
> = {
  WMT: {
    stakes:
      "Walmart's purchasing power and rural store network lowered prices, but labor scrutiny, thin margins, and the cost of turning thousands of stores into an online system tested whether scale could keep adapting.",
    moments: [
      {
        year: 2000,
        then: "Sam Walton's supercenter formula now blankets the country, and groceries are making the weekly Walmart trip routine; critics increasingly target wages, suppliers, and small-town competitors.",
        after: "Walmart had expanded from discount stores into supercenters and become the largest U.S. grocer by the end of the 1990s.",
      },
      {
        year: 2009,
        then: "Lee Scott is handing the CEO job to Mike Duke as recession-struck households trade down; the company's low-price promise is powerful, while overseas formats remain uneven.",
        after: "Walmart had weathered the credit crisis with its Everyday Low Prices message and had named Mike Duke to succeed Lee Scott.",
      },
      {
        year: 2016,
        then: "Doug McMillon is raising store wages and funding grocery pickup while Amazon resets delivery expectations; the store network must become an e-commerce asset rather than a fixed-cost burden.",
        after: "Walmart had invested in employee pay, tested digital grocery pickup, and placed Doug McMillon in charge of a broader technology push.",
      },
      {
        year: 2023,
        then: "Stores double as pickup hubs, Walmart+ anchors the membership response to Prime, and advertising has become a new business; inflation is pushing shoppers toward groceries and away from discretionary aisles.",
        after: "Walmart had built curbside pickup across much of its network, launched Walmart+, and expanded its Connect advertising operation.",
      },
    ],
    recentArc:
      "Through 2024, Walmart kept automating fulfillment, expanded its advertising and marketplace businesses, bought smart-TV maker Vizio, and agreed to sell its Meituan-backed China e-commerce stake while groceries and value positioning remained central.",
  },

  HD: {
    stakes:
      "Home Depot's warehouse stores paired contractor depth with do-it-yourself traffic, but housing cycles, store execution, and a costly supply chain determined whether orange-apron scale remained an advantage.",
    moments: [
      {
        year: 2000,
        then: "Arthur Blank is succeeding cofounder Bernie Marcus atop a fast-growing chain whose cavernous stores, lumber aisles, and orange aprons have rewritten home improvement retail.",
        after: "Home Depot had spent the 1990s rapidly opening warehouse-format stores and had elevated Arthur Blank to chief executive.",
      },
      {
        year: 2008,
        then: "Frank Blake is repairing stores after the Bob Nardelli era, HD Supply has been sold, and the collapsing housing market is pressuring big-ticket renovation demand.",
        after: "Home Depot had replaced Bob Nardelli with Frank Blake, sold HD Supply, and begun restoring store-level service as housing weakened.",
      },
      {
        year: 2016,
        then: "Craig Menear is linking stores, mobile ordering, and distribution while rising home values support remodeling; professional contractors remain the most valuable repeat customers.",
        after: "Home Depot had developed an interconnected-retail strategy and expanded fulfillment options under Craig Menear.",
      },
      {
        year: 2023,
        then: "The pandemic renovation surge is fading, Ted Decker has the CEO chair, and the retailer must hold professional and DIY traffic as mortgage rates freeze housing turnover.",
        after: "Home Depot had promoted Ted Decker, increased frontline pay, and entered 2023 against unusually strong pandemic-era home-improvement demand.",
      },
    ],
    recentArc:
      "In 2024 Home Depot completed its acquisition of SRS Distribution, deepening its push into roofing, landscaping, and other complex professional projects while high rates continued to restrain large discretionary renovations.",
  },

  KO: {
    stakes:
      "Coca-Cola's bottling reach and namesake formula traveled everywhere, but changing health preferences and the economics of controlling versus franchising bottlers kept forcing the company beyond carbonated soda.",
    moments: [
      {
        year: 2000,
        then: "Coca-Cola, Sprite, and Fanta form a global fountain-and-bottle machine, but contamination recalls in Europe and a combative bottler relationship have punctured the aura of flawless execution.",
        after: "Coca-Cola had endured major 1999 product recalls in Belgium and France and management upheaval after Roberto Goizueta's death.",
      },
      {
        year: 2009,
        then: "Muhtar Kent is chief executive, Coke Zero is gaining distribution, and the company is leaning harder into water, juice, tea, and emerging markets as U.S. soda consumption softens.",
        after: "Coca-Cola had installed Muhtar Kent as chief executive and expanded noncarbonated brands including Dasani, Minute Maid, and Powerade.",
      },
      {
        year: 2019,
        then: "James Quincey is refranchising bottling territory and promoting smaller packages, pricing, and still beverages over raw soda volume; the Costa acquisition is awaiting completion.",
        after: "Coca-Cola had installed James Quincey as chief executive, accelerated bottling refranchising, and agreed in 2018 to acquire Costa.",
      },
      {
        year: 2023,
        then: "Coke Zero Sugar, Fairlife, Costa Coffee, and mini-cans widen a portfolio still anchored by Coca-Cola; inflation makes brand pricing useful but tests household loyalty.",
        after: "Coca-Cola had acquired Costa, taken full control of BodyArmor, and used package mix and pricing to broaden its beverage strategy.",
      },
    ],
    recentArc:
      "Through 2024, James Quincey continued the total-beverage strategy, with Coca-Cola Zero Sugar and Fairlife prominent in the mix while the company navigated inflation, currency pressure, and shifting packaging rules.",
  },

  AMZN: {
    stakes:
      "Jeff Bezos kept exchanging current comfort for infrastructure—warehouses, Prime, devices, and cloud computing—leaving Amazon exposed whenever capital markets or customers tired before those systems matured.",
    moments: [
      {
        year: 2000,
        then: "The online bookstore now sells toys, electronics, and almost everything else, but fulfillment spending and dot-com skepticism make Bezos's promised flywheel difficult to distinguish from cash burn.",
        after: "Amazon had broadened beyond books, opened its marketplace to outside sellers, and invested heavily in distribution before the internet bubble broke.",
      },
      {
        year: 2007,
        then: "Prime is a young shipping club, third-party sellers fill the catalog, and the new S3 and EC2 services rent computing to developers; retail still defines the company.",
        after: "Amazon had launched Prime in 2005 and introduced S3 and EC2 in 2006 as the foundation of Amazon Web Services.",
      },
      {
        year: 2016,
        then: "AWS has become a visible profit engine, Prime binds shopping to video, and the Echo has put Alexa in homes; fulfillment spending still absorbs enormous capital.",
        after: "Amazon had begun separately reporting AWS, expanded Prime benefits, and turned the Echo from an invitation-only device into a broader consumer product.",
      },
      {
        year: 2023,
        then: "Andy Jassy is cutting jobs and closing projects after the pandemic warehouse buildout, while AWS growth is slowing and the costly Alexa bet has yet to become a strong business.",
        after: "Amazon had overbuilt parts of its fulfillment network during the pandemic, begun its largest layoffs, and put Andy Jassy in charge after Bezos became executive chair.",
      },
    ],
    recentArc:
      "Through 2024, Amazon emphasized regionalized fulfillment, advertising, Prime logistics, and generative-AI services in AWS, while expanding its Anthropic investment and replacing the abandoned iRobot deal with narrower device and automation bets.",
  },

  COST: {
    stakes:
      "Costco's membership fees supported unusually low merchandise markups, but the model depended on renewal trust, disciplined selection, and warehouses productive enough to justify giant packages and sparse frills.",
    moments: [
      {
        year: 2000,
        then: "Price Club and Costco have become one warehouse chain built around membership cards, pallets, Kirkland Signature, and the discipline to walk away from goods that cannot meet its markup rules.",
        after: "Costco had integrated the Price Club merger and introduced Kirkland Signature as a unified private label.",
      },
      {
        year: 2009,
        then: "Jim Sinegal still visits warehouses and protects the low-price culture as recession pinches shoppers; gasoline, food, and treasure-hunt merchandise keep trips frequent.",
        after: "Costco had preserved its membership model, limited assortment, and low markups through years of national and international expansion.",
      },
      {
        year: 2013,
        then: "Craig Jelinek has succeeded Sinegal, the hot-dog price remains a cultural promise, and overseas warehouses offer growth without changing the membership bargain.",
        after: "Costco had completed its leadership transition to Craig Jelinek while maintaining its employee-pay and member-value practices.",
      },
      {
        year: 2023,
        then: "Pandemic-era demand has normalized, digital ordering complements rather than replaces warehouse traffic, and inflation tests how much value members see in Kirkland and bulk packs.",
        after: "Costco had expanded e-commerce and same-day delivery while keeping warehouses and membership renewal at the center of its economics.",
      },
    ],
    recentArc:
      "Ron Vachris became chief executive in 2024, Costco raised U.S. and Canadian membership fees for the first time since 2017, and the company continued opening warehouses while tightening membership-card checks.",
  },

  PEP: {
    stakes:
      "PepsiCo's snacks and drinks shared distribution muscle, but the company had to keep Doritos, Lay's, Gatorade, and Pepsi relevant as health concerns, bottling complexity, and commodity costs shifted.",
    moments: [
      {
        year: 2000,
        then: "PepsiCo begins 2000 with Pepsi-Cola, Frito-Lay's powerful direct-store delivery system, and Tropicana, acquired in 1998. Restaurants have been spun out, leaving management to prove that drinks and salty snacks can share distribution advantages without becoming a slow-moving conglomerate.",
        after: "PepsiCo entered the decade focused on beverages and Frito-Lay after spinning off its restaurants and acquiring Tropicana.",
      },
      {
        year: 2003,
        then: "Pepsi-Cola sits beside Frito-Lay's dominant snack routes, Tropicana juice, Quaker foods, and Gatorade, creating a distribution system that spans salty snacks and beverages.",
        after: "PepsiCo had divested its restaurant chains, acquired Tropicana, and completed the Quaker Oats acquisition in 2001.",
      },
      {
        year: 2008,
        then: "Indra Nooyi is steering a portfolio from Pepsi and Mountain Dew to Gatorade, Quaker, and baked snacks; input inflation and health criticism complicate the 'Performance with Purpose' agenda.",
        after: "PepsiCo had made Indra Nooyi chief executive and articulated a strategy linking growth with nutrition and environmental goals.",
      },
      {
        year: 2016,
        then: "Frito-Lay's direct-store delivery remains a formidable shelf advantage, while zero-calorie drinks and smaller packages answer declining demand for full-sugar soda.",
        after: "PepsiCo had expanded its 'guilt-free' product categories and relied on snacks to balance pressure in carbonated beverages.",
      },
      {
        year: 2023,
        then: "Ramon Laguarta has raised prices across Lay's, Doritos, Gatorade, and Pepsi as freight and ingredients climb; frequent snacks support the portfolio, but consumers can trade down.",
        after: "PepsiCo had acquired SodaStream and Rockstar Energy under Ramon Laguarta and had used pricing to offset broad cost inflation.",
      },
    ],
    recentArc:
      "Through 2024, PepsiCo kept investing in automation and its Frito-Lay network while volume pressure, Quaker cereal recalls, and scrutiny of processed foods complicated a strategy built on brands and pricing.",
  },

  PG: {
    stakes:
      "Procter & Gamble's research, advertising, and retailer relationships supported everyday brands, yet sprawling categories and periodic execution failures repeatedly tested whether breadth created leverage or bureaucracy.",
    moments: [
      {
        year: 2000,
        then: "Tide, Pampers, Crest, and Pantene fill household routines, but slowing growth and missed forecasts are challenging Durk Jager's rapid-reorganization program.",
        after: "P&G had assembled a vast consumer-brand portfolio and entered 2000 amid disruption from its Organization 2005 restructuring.",
      },
      {
        year: 2007,
        then: "A.G. Lafley's P&G now includes Gillette, adding razors and batteries to beauty, fabric care, and baby products; integrating the acquisition without dulling innovation is the central task.",
        after: "P&G had acquired Gillette in 2005 and combined brands such as Mach3, Braun, and Duracell with its household portfolio.",
      },
      {
        year: 2016,
        then: "Lafley has returned and is handing the company to David Taylor after agreeing to sell dozens of beauty brands to Coty; management is concentrating resources on fewer daily-use categories.",
        after: "P&G had agreed to divest a large collection of beauty brands and had named David Taylor chief executive.",
      },
      {
        year: 2023,
        then: "Jon Moeller is using product superiority and price increases across Tide, Pampers, and Gillette to absorb inflation, with private labels waiting if consumers reject the tradeoff.",
        after: "P&G had streamlined into focused category units and promoted Jon Moeller after years of brand pruning and productivity work.",
      },
    ],
    recentArc:
      "Through 2024, P&G continued emphasizing product performance, supply-chain productivity, and premium formats while commodity and currency pressure eased unevenly and consumers faced higher shelf prices.",
  },

  CL: {
    stakes:
      "Colgate-Palmolive's toothpaste leadership and pet nutrition offered repeat purchases, but retailer power, local rivals, currency swings, and raw-material inflation could erode the economics hidden inside familiar tubes and bags.",
    moments: [
      {
        year: 2000,
        then: "Colgate toothpaste and Palmolive soap travel through a deeply international distribution system, while Hill's Science Diet gives the company a premium pet-food business built through veterinarians.",
        after: "Colgate-Palmolive had focused its portfolio around oral care, personal care, home care, and Hill's pet nutrition.",
      },
      {
        year: 2008,
        then: "Colgate is pressing higher-margin Total toothpaste and manual toothbrushes across emerging markets, but oil-linked packaging and ingredients are raising costs.",
        after: "Colgate had widened the geographic reach of Colgate Total and strengthened its global share in toothpaste and manual toothbrushes.",
      },
      {
        year: 2016,
        then: "Ian Cook is funding advertising and premium oral-care launches while Venezuela and other currency disruptions punish reported results; Hill's adds a distinct science-led growth leg.",
        after: "Colgate had expanded sensitivity, whitening, and therapeutic oral-care products while managing a portfolio exposed heavily to overseas currencies.",
      },
      {
        year: 2023,
        then: "Noel Wallace is pushing premium toothpaste, elmex, and Hill's therapeutic diets as inflation raises resin, transport, and agricultural costs; repeated price increases risk volume losses.",
        after: "Colgate had acquired the elmex and meridol businesses outside Europe and invested in new Hill's manufacturing capacity.",
      },
    ],
    recentArc:
      "Through 2024, Colgate-Palmolive leaned on premium oral care and Hill's Pet Nutrition, restored margins as some costs moderated, and kept investing in science-based pet-food capacity and digital commerce.",
  },

  F: {
    stakes:
      "Ford's trucks, factories, dealers, and family influence provided staying power, but pension burdens, fuel shocks, quality costs, and each new propulsion cycle made reinvention expensive.",
    moments: [
      {
        year: 2000,
        then: "The F-Series and Explorer define a profitable light-truck franchise, while Jacques Nasser is assembling consumer-service ventures and a stable of European luxury marques around the automaker.",
        after: "Ford had made Jacques Nasser chief executive, expanded beyond vehicle manufacturing, and assembled its Premier Automotive Group.",
      },
      {
        year: 2009,
        then: "Alan Mulally's One Ford plan and the cash raised by mortgaging the Blue Oval have kept Ford outside bankruptcy so far; U.S. auto demand has collapsed.",
        after: "Ford had borrowed against major assets in 2006, sold Jaguar and Land Rover, and begun simplifying its global vehicle platforms.",
      },
      {
        year: 2016,
        then: "The aluminum-bodied F-150 is established, global platforms have replaced regional duplication, and Mark Fields is spending on autonomy and mobility as U.S. auto sales approach a plateau.",
        after: "Ford had launched the aluminum-intensive F-150 and completed much of the One Ford global-platform overhaul.",
      },
      {
        year: 2023,
        then: "Jim Farley has separated reporting into Ford Blue, Model e, and Ford Pro; the F-150 Lightning and Mustang Mach-E make electrification tangible while recalls and battery costs remain acute.",
        after: "Ford had launched the Mustang Mach-E and F-150 Lightning and reorganized around combustion vehicles, electric vehicles, and commercial customers.",
      },
    ],
    recentArc:
      "Through 2024, Ford slowed some battery-electric capacity plans, emphasized hybrids and Ford Pro software and services, returned to Formula 1 with Red Bull for 2026, and continued confronting costly recalls and warranty work.",
  },

  GIS: {
    stakes:
      "General Mills' cereal, baking, snack, and pet-food brands offered pantry repetition, but breakfast habits, retailer bargaining, and the need to renovate old franchises constrained dependable-looking growth.",
    moments: [
      {
        year: 2000,
        then: "Cheerios, Betty Crocker, and Yoplait compete for pantry and refrigerator space as supermarkets consolidate, private labels improve, and rivals fight for limited shelf space.",
        after: "General Mills had built leading cereal, baking, snack, and yogurt brands around strong supermarket distribution.",
      },
      {
        year: 2003,
        then: "The Pillsbury acquisition has added refrigerated dough, Häagen-Dazs rights, and Green Giant to a company already anchored by Big G cereals; debt and integration now command attention.",
        after: "General Mills had completed the Pillsbury acquisition in 2001 and divested overlapping assets required by regulators.",
      },
      {
        year: 2019,
        then: "Jeff Harmening is integrating Blue Buffalo, giving the cereal maker a premium pet-food platform just as U.S. cereal consumption and yogurt competition remain difficult.",
        after: "General Mills had acquired Blue Buffalo in 2018 and made pet food a major operating segment.",
      },
      {
        year: 2023,
        then: "At-home food demand has retreated from pandemic peaks, while pricing across Cheerios, Nature Valley, Pillsbury, and Blue Buffalo offsets costly grain, freight, and labor.",
        after: "General Mills had reshaped its portfolio through pet-food acquisitions and divestitures and had raised prices during the inflation surge.",
      },
    ],
    recentArc:
      "Through 2024, General Mills concentrated on core North American retail and Blue Buffalo, sold its North American yogurt business, and worked to restore pet-food momentum while value-conscious shoppers pressured volumes.",
  },

  KMB: {
    stakes:
      "Kimberly-Clark's tissues, diapers, and professional products served recurring needs, but pulp costs, private labels, birth rates, and local consumer habits could squeeze even globally familiar brands.",
    moments: [
      {
        year: 2000,
        then: "Huggies, Kleenex, and Scott paper products anchor the company after its Scott Paper combination, with mature U.S. categories making international penetration and manufacturing efficiency essential.",
        after: "Kimberly-Clark had integrated Scott Paper and centered its consumer portfolio on diapers, tissues, and personal-care products.",
      },
      {
        year: 2008,
        then: "Huggies competes intensely with Pampers, while Kleenex and Cottonelle face rising pulp and energy costs; emerging-market diapers promise volume but require local pricing.",
        after: "Kimberly-Clark had expanded disposable personal-care products globally and used restructuring to reduce manufacturing complexity.",
      },
      {
        year: 2016,
        then: "Tom Falk is separating health-care products as Halyard and pruning factories, leaving consumer tissue, personal care, and K-C Professional as the focused company.",
        after: "Kimberly-Clark had spun off Halyard Health in 2014 and continued its FORCE cost-reduction program.",
      },
      {
        year: 2023,
        then: "Mike Hsu is pushing premium Huggies and adult-care products while repeated price increases answer expensive fiber, resin, and transport; lower birth rates remain a structural diaper challenge.",
        after: "Kimberly-Clark had invested in premium personal-care formats and used pricing and productivity programs through the inflation shock.",
      },
    ],
    recentArc:
      "In 2024 Kimberly-Clark announced a reorganization around North America, international personal care, and international family care and professional products, alongside plans to simplify its supply chain and portfolio.",
  },

  KR: {
    stakes:
      "Kroger's scale in food purchasing, private label, and customer data operated inside a brutally low-margin business where labor, price perception, and consolidation shaped every strategic choice.",
    moments: [
      {
        year: 2000,
        then: "Kroger is digesting Fred Meyer, combining conventional supermarkets with larger multi-department stores while Walmart's grocery expansion raises the standard for price and logistics.",
        after: "Kroger had completed the Fred Meyer merger in 1999, creating one of the country's largest supermarket operators.",
      },
      {
        year: 2009,
        then: "Ralphs, Fry's, King Soopers, and Kroger banners draw on a shared private-label and loyalty-card system as recession makes food-at-home resilient but intensifies price competition.",
        after: "Kroger had developed a broad family of regional banners and used loyalty data to tailor promotions and assortment.",
      },
      {
        year: 2016,
        then: "Rodney McMullen is extending ClickList pickup and Simple Truth organics after buying Harris Teeter; food deflation and hard discounters threaten identical-store momentum.",
        after: "Kroger had acquired Harris Teeter, expanded digital pickup, and built Simple Truth into a substantial natural-and-organic private label.",
      },
      {
        year: 2023,
        then: "Kroger has agreed to buy Albertsons, betting that combined purchasing, data, pharmacies, and stores can meet Walmart and Amazon; regulators and unions are preparing a fight.",
        after: "Kroger had announced a proposed Albertsons acquisition and planned store divestitures to address competition concerns.",
      },
    ],
    recentArc:
      "In 2024 federal and state challenges blocked the Albertsons transaction, courts enjoined the deal, and the companies terminated it; Kroger continued investing in private labels, personalization, pharmacies, and automated fulfillment.",
  },

  LOW: {
    stakes:
      "Lowe's shared the home-improvement warehouse opportunity with a larger rival, so store productivity, contractor loyalty, merchandising, and housing turnover mattered more than simply adding square footage.",
    moments: [
      {
        year: 2000,
        then: "Lowe's is leaving its small-town hardware roots for bright, large-format stores aimed at suburban homeowners, racing Home Depot across new metropolitan markets.",
        after: "Lowe's had spent the 1990s converting to warehouse stores and expanding beyond its traditional southeastern base.",
      },
      {
        year: 2009,
        then: "The housing collapse has cut project traffic and pressured appliances, lumber, and flooring; Lowe's cleaner stores appeal to consumers, but fixed occupancy costs remain.",
        after: "Lowe's had expanded nationally during the housing boom and entered the recession with a large store base exposed to remodeling demand.",
      },
      {
        year: 2019,
        then: "Former Home Depot executive Marvin Ellison is closing Orchard Supply, exiting Mexico, and simplifying inventory while trying to rebuild tools, job-lot quantities, and service for professionals.",
        after: "Lowe's had appointed Marvin Ellison chief executive and begun pruning noncore operations and resetting store execution.",
      },
      {
        year: 2023,
        then: "Private brands, same-day fulfillment, and a stronger Pro desk meet a slowdown in big-ticket DIY projects as mortgage rates rise; Lowe's remains more homeowner-heavy than Home Depot.",
        after: "Lowe's had modernized merchandising and fulfillment under Marvin Ellison and had expanded its professional-customer program.",
      },
    ],
    recentArc:
      "Through 2024, Lowe's pursued its Total Home strategy, expanded same-day delivery and rural assortments, and targeted small and midsize professionals while weak housing turnover constrained discretionary projects.",
  },

  MCD: {
    stakes:
      "McDonald's franchise system and standardized menu generated enormous reach, but food quality, restaurant speed, franchisee economics, and changing tastes could turn ubiquity into stagnation.",
    moments: [
      {
        year: 2000,
        then: "The Big Mac, fries, Happy Meal, and drive-through define global fast food, yet relentless restaurant expansion is producing overlap and uneven service under Jack Greenberg.",
        after: "McDonald's had expanded aggressively around the world and broadened its holdings with concepts including Chipotle and Boston Market.",
      },
      {
        year: 2003,
        then: "Comparable sales have weakened, the Made for You kitchen has not fixed service, and Jim Cantalupo is returning to run a 'Plan to Win' centered on existing restaurants.",
        after: "McDonald's had warned that it expected its first quarterly loss and had brought Jim Cantalupo back as chief executive at the start of 2003.",
      },
      {
        year: 2016,
        then: "Steve Easterbrook is refranchising restaurants, simplifying operations, and rolling all-day breakfast across the United States after years of menu clutter and traffic pressure.",
        after: "McDonald's had installed Steve Easterbrook and introduced U.S. all-day breakfast in 2015.",
      },
      {
        year: 2023,
        then: "Chris Kempczinski is pairing digital loyalty, delivery, and restaurant modernization with price increases; franchisees must fund growth while households absorb food inflation.",
        after: "McDonald's had expanded its loyalty program and digital ordering and had accelerated restaurant development under its Accelerating the Arches strategy.",
      },
    ],
    recentArc:
      "Through 2024, McDonald's expanded loyalty and development plans, tested the CosMc's beverage concept, bought its Israeli franchise business, and dealt with value-sensitive traffic and an E. coli outbreak tied to slivered onions.",
  },

  MO: {
    stakes:
      "Philip Morris Companies and later Altria paired exceptional nicotine pricing power with litigation, regulation, declining cigarette volumes, and repeated attempts to reshape the assets around Marlboro.",
    moments: [
      {
        year: 2000,
        then: "Philip Morris Companies owns Marlboro worldwide and a large Kraft foods business; the tobacco settlement has defined legal obligations, but individual lawsuits and public hostility remain existential concerns.",
        after: "Philip Morris had joined the 1998 Master Settlement Agreement and retained a diversified structure spanning tobacco and packaged food.",
      },
      {
        year: 2003,
        then: "An approved name change to Altria is weeks away, intended to distinguish the parent from Philip Morris tobacco while Kraft remains under the same roof.",
        after: "Philip Morris Companies had approved the Altria name and continued defending major smoking-related litigation.",
      },
      {
        year: 2008,
        then: "Altria has already distributed Kraft and plans to separate Philip Morris International, leaving a U.S.-focused Marlboro business exposed to falling volumes but protected by brand and price.",
        after: "Altria had spun off Kraft Foods in 2007 and announced the 2008 separation of Philip Morris International.",
      },
      {
        year: 2023,
        then: "The Juul investment has been almost entirely written down, cigarette volumes keep declining, and On! nicotine pouches carry more of the burden of building a smoke-free business.",
        after: "Altria had recorded repeated impairments on its Juul stake, expanded On! distribution, and agreed to transfer U.S. IQOS commercialization rights to Philip Morris International.",
      },
    ],
    recentArc:
      "Through 2024, Altria expanded NJOY ACE distribution while fighting unauthorized flavored e-vapor products, continued growing oral-nicotine pouch On!, and relied on Marlboro pricing as U.S. cigarette volumes declined.",
  },

  NKE: {
    stakes:
      "Nike's athlete storytelling and product pipeline made shoes cultural objects, but fashion cycles, wholesale relationships, labor scrutiny, and constant technical renewal could quickly cool even the Swoosh.",
    moments: [
      {
        year: 2000,
        then: "Michael Jordan's playing career has paused, Nike Air is mature, and Phil Knight is trying to restore product energy while factory labor practices remain a global reputational wound.",
        after: "Nike had responded to sweatshop criticism with new labor standards and had built basketball, running, and global football franchises around athlete endorsements.",
      },
      {
        year: 2008,
        then: "Mark Parker is balancing performance innovation such as Nike+ with fashion and global football; the planned Umbro purchase would deepen soccer as recession risk approaches.",
        after: "Nike had partnered with Apple on Nike+, expanded internationally, and agreed in 2007 to acquire Umbro.",
      },
      {
        year: 2019,
        then: "The SNKRS app, limited releases, and Nike Direct are drawing consumers toward the company, while Colin Kaepernick advertising shows the brand is willing to enter political culture.",
        after: "Nike had accelerated direct digital sales, launched major Vapormax and React platforms, and featured Colin Kaepernick in its 2018 campaign.",
      },
      {
        year: 2023,
        then: "John Donahoe is clearing excess inventory after pandemic supply disruption, digital sales carry more weight, and the pullback from wholesale partners risks giving competitors shelf space.",
        after: "Nike had prioritized direct-to-consumer channels, reduced several wholesale relationships, and accumulated elevated inventory as transit times normalized.",
      },
    ],
    recentArc:
      "In 2024 Nike warned that lifestyle franchises needed fresher product, cut costs, restored selected wholesale ties, and named veteran Elliott Hill to replace John Donahoe as chief executive.",
  },

  BKNG: {
    stakes:
      "Priceline and later Booking Holdings owned no hotels, so its strength rested on traveler traffic, supplier breadth, advertising efficiency, and adapting the marketplace across borders and devices.",
    moments: [
      {
        year: 2003,
        then: "Priceline.com has survived the dot-com collapse by retreating toward travel and its name-your-own-price model, but demand remains vulnerable to war fears and a weak airline industry.",
        after: "Priceline had exited several attempted categories, restructured after the internet bust, and refocused on online travel booking.",
      },
      {
        year: 2008,
        then: "Booking.com and Active Hotels have turned Priceline into a European hotel marketplace, where agency commissions and abundant independent properties differ from the opaque U.S. brand.",
        after: "Priceline had acquired Active Hotels and Booking.com and combined them into a fast-growing European reservation platform.",
      },
      {
        year: 2016,
        then: "The Priceline Group spans Booking.com, Priceline, Kayak, Agoda, and OpenTable; mobile bookings are rising, while Google search advertising is both indispensable and expensive.",
        after: "Priceline had acquired Kayak and OpenTable and built Booking.com into the group's dominant global accommodation brand.",
      },
      {
        year: 2023,
        then: "Glenn Fogel is rebuilding travel volumes after pandemic restrictions, promoting connected trips across lodging, flights, and cars as Europe reopens despite inflation and war.",
        after: "Booking Holdings had survived the travel shutdown, expanded payments and flights, and saw demand recover sharply during 2022.",
      },
    ],
    recentArc:
      "Through 2024, Booking Holdings advanced its connected-trip strategy, integrated Etraveli's flight content despite the blocked acquisition, expanded alternative accommodations and payments, and faced tighter European platform regulation.",
  },

  TSLA: {
    stakes:
      "Tesla sought to make electric cars desirable and vertically integrated, but every step depended on capital, battery supply, manufacturing discipline, charging access, and Elon Musk's unusually personal control of the narrative.",
    moments: [
      {
        year: 2012,
        then: "The Roadster proved an electric car could be fast, and the Fremont factory is preparing the Model S; Tesla still must show it can build a sedan repeatedly rather than hand-assemble a niche sports car.",
        after: "Tesla had delivered Roadsters, purchased the former NUMMI plant, and scheduled the first Model S deliveries for 2012.",
      },
      {
        year: 2016,
        then: "Model S has established the brand and Model X production is beginning, while the Nevada Gigafactory and lower-priced Model 3 require manufacturing at a scale Tesla has never attempted.",
        after: "Tesla had launched Model S and Model X, broken ground on its battery Gigafactory, and prepared to unveil Model 3.",
      },
      {
        year: 2020,
        then: "Model 3 is shipping from Fremont, a Shanghai factory has begun producing cars, and Tesla has posted two consecutive profitable quarters; quality, service, and sustained mass production remain open tests.",
        after: "Tesla had survived its Model 3 production crisis, opened Gigafactory Shanghai, and introduced the Model Y.",
      },
      {
        year: 2023,
        then: "Austin and Berlin are ramping, the aging S-3-X-Y lineup faces established electric rivals, and price, autonomy claims, and Musk's attention after buying Twitter all carry operational consequences.",
        after: "Tesla had opened factories in Texas and Germany, expanded 4680-cell work, and delivered its first Semi trucks.",
      },
    ],
    recentArc:
      "Through 2024, Tesla cut vehicle prices, delivered the Cybertruck, laid off staff, shifted attention toward robotaxis and the Optimus robot, and saw major automakers adopt its North American Charging Standard.",
  },

  GM: {
    stakes:
      "The post-bankruptcy General Motors retained vast truck, SUV, dealer, and manufacturing scale, but legacy costs, recalls, cyclical demand, and the capital required for electric and autonomous vehicles remained inseparable.",
    moments: [
      {
        year: 2012,
        then: "The reorganized GM sells Chevrolet, Cadillac, Buick, and GMC after shedding Pontiac, Saturn, Saab, and Hummer; government ownership and pension obligations still shape the recovery.",
        after: "General Motors had emerged from its 2009 bankruptcy, returned to public markets, and narrowed its U.S. brand portfolio.",
      },
      {
        year: 2016,
        then: "Mary Barra is repairing the culture after the ignition-switch tragedy, Chevrolet Bolt production is approaching, and profitable pickups fund experiments in ride sharing and autonomy.",
        after: "GM had recalled millions of ignition-switch vehicles, established a victim compensation fund, and made Mary Barra chief executive.",
      },
      {
        year: 2020,
        then: "GM has closed plants through a contentious restructuring and strike, exited several overseas markets, and is concentrating on trucks, SUVs, Cruise autonomy, and a coming electric architecture.",
        after: "GM had endured a six-week UAW strike in 2019, stopped producing several sedans, and invested heavily in Cruise.",
      },
      {
        year: 2023,
        then: "Ultium-based Cadillac Lyriq and GMC Hummer EV production is moving slowly, Cruise is expanding driverless service, and Mary Barra is promising an electric lineup while combustion trucks fund it.",
        after: "GM had launched the Ultium platform, begun producing new electric models, and expanded Cruise operations before 2023.",
      },
    ],
    recentArc:
      "Through 2024, GM recovered from the 2023 UAW strike, slowed some EV capacity plans while launching Equinox EV and Silverado EV, reorganized Cruise after its driverless permit suspension, and exited the robotaxi funding model.",
  },

  MDLZ: {
    stakes:
      "Mondelez inherited globally distributed snack brands and emerging-market reach, but cocoa and sugar costs, local tastes, retailer power, and portfolio complexity tested its focus on biscuits and chocolate.",
    moments: [
      {
        year: 2013,
        then: "The newly named Mondelez owns Oreo, Cadbury, Ritz, Trident, and Milka after Kraft Foods split its global snacks from the North American grocery company; the separation is barely complete.",
        after: "Kraft Foods had acquired Cadbury in 2010 and spun off its North American grocery business in 2012, leaving Mondelez International.",
      },
      {
        year: 2016,
        then: "Irene Rosenfeld is cutting overhead and expanding Oreo and Cadbury across markets, while the coffee joint venture with D.E Master Blenders has removed another business from the focused snacks portfolio.",
        after: "Mondelez had combined its coffee brands with D.E Master Blenders to form Jacobs Douwe Egberts and had emphasized margins and global power brands.",
      },
      {
        year: 2020,
        then: "Dirk Van de Put is restoring brand investment and adding local snacks through acquisitions, with Oreo, belVita, Ritz, Cadbury, and Milka at the center of the growth agenda.",
        after: "Mondelez had shifted from aggressive cost reduction toward balanced growth and acquired brands including Tate's Bake Shop.",
      },
      {
        year: 2023,
        then: "Clif Bar and Chipita expand bars and baked snacks, while soaring cocoa, sugar, energy, and transport costs demand pricing that could pressure volumes.",
        after: "Mondelez had acquired Chipita and Clif Bar and agreed to sell its developed-market gum business to Perfetti Van Melle.",
      },
    ],
    recentArc:
      "Through 2024, Mondelez raised prices and hedged against record cocoa costs, kept expanding Oreo and Cadbury distribution, and pursued bolt-on acquisitions while a boycott linked to its continued Russian operations created reputational pressure.",
  },

  GE: {
    stakes:
      "GE's prestige rested on combining jet engines, power equipment, media, health care, and finance, but opaque capital exposure and conglomerate allocation made operational strength difficult to separate from balance-sheet risk.",
    moments: [
      {
        year: 2000,
        then: "Jack Welch's GE spans aircraft engines, power turbines, NBC, medical scanners, plastics, and GE Capital; disciplined earnings growth has made the conglomerate itself the product.",
        after: "GE had spent two decades under Jack Welch acquiring, pruning, and managing industrial and financial businesses through centralized performance systems.",
      },
      {
        year: 2008,
        then: "Jeff Immelt's infrastructure order book looks formidable, but GE Capital relies on short-term funding and exposes the industrial icon to a credit market already showing fractures.",
        after: "GE had expanded infrastructure operations while retaining a large finance arm whose funding and asset quality were increasingly important.",
      },
      {
        year: 2016,
        then: "GE has agreed to sell most of GE Capital, bought Alstom's power assets, and is moving its headquarters to Boston; the industrial reset depends heavily on aviation and a difficult power integration.",
        after: "GE had designated GE Capital assets for disposal and completed the Alstom power acquisition in 2015.",
      },
      {
        year: 2023,
        then: "Larry Culp is about to separate GE HealthCare, leaving aviation and the later-to-be-spun power and renewables businesses; the old conglomerate is deliberately ending.",
        after: "GE had sold or separated numerous businesses, reduced debt, and scheduled the GE HealthCare spin for the opening days of 2023.",
      },
    ],
    recentArc:
      "In 2024 GE completed the GE Vernova separation and renamed the remaining company GE Aerospace, concentrating it on commercial and military engines under Larry Culp.",
  },

  ADP: {
    stakes:
      "ADP's payroll systems sat inside recurring employer workflows, but regulation, labor-market cycles, cloud-native challengers, and the burden of migrating decades of software tested the durability of that embedded position.",
    moments: [
      {
        year: 2000,
        then: "Employers outsource checks, tax filings, and records to ADP's mainframe-honed payroll machinery; brokerage services remain alongside the employer-services franchise.",
        after: "ADP had built a large recurring payroll-processing business and also operated securities-clearing and dealer-services units.",
      },
      {
        year: 2008,
        then: "Gary Butler is expanding web-based human-resources tools, while employment losses threaten the number of workers appearing on client payrolls.",
        after: "ADP had broadened from payroll into benefits, tax, time, and human-capital-management services.",
      },
      {
        year: 2016,
        then: "Carlos Rodriguez is selling Dealer Services as CDK Global and pushing cloud platforms such as RUN and Vantage; Workday, Paycom, and smaller software vendors attack from different ends.",
        after: "ADP had spun off CDK Global in 2014 and concentrated on employer services and professional-employer-organization offerings.",
      },
      {
        year: 2023,
        then: "A tight labor market supports pays per control, while ADP Marketplace and DataCloud extend payroll records into analytics and integrations; small businesses remain sensitive to a slowdown.",
        after: "ADP had modernized major products in the cloud and expanded its PEO, analytics, and partner ecosystem.",
      },
    ],
    recentArc:
      "Through 2024, ADP continued moving clients onto cloud platforms, expanded AI-assisted payroll and HR tools, and benefited from resilient employment while wage growth and slower hiring changed transaction patterns.",
  },

  APD: {
    stakes:
      "Air Products' pipelines and on-site plants created long customer relationships, yet giant gas projects, energy costs, customer concentration, and disciplined engineering execution determined whether contracted demand justified the capital.",
    moments: [
      {
        year: 2000,
        then: "Air Products supplies oxygen, nitrogen, hydrogen, and specialty gases to refineries, chip plants, hospitals, and manufacturers through pipelines, on-site units, and cylinders.",
        after: "Air Products had built a global industrial-gas network and substantial chemicals operations around long-lived customer facilities.",
      },
      {
        year: 2009,
        then: "Manufacturing contraction is reducing merchant volumes, but refinery hydrogen and long-term on-site contracts provide support while customers defer new plants.",
        after: "Air Products had expanded hydrogen pipeline systems and electronics gases before the global industrial downturn.",
      },
      {
        year: 2016,
        then: "Seifi Ghasemi is preparing to separate the Versum Materials electronics business, sharpening Air Products around industrial gases and large projects.",
        after: "Air Products had announced the Versum spin under a portfolio-focused strategy and had begun reducing overhead.",
      },
      {
        year: 2023,
        then: "The company is committing capital to the NEOM green-hydrogen complex and Gulf Coast blue-hydrogen plans, tying future growth to projects with long construction and policy timelines.",
        after: "Air Products had signed agreements for major hydrogen and gasification projects and made energy-transition developments central to its capital plan.",
      },
    ],
    recentArc:
      "Through 2024, Air Products advanced NEOM and other low-carbon hydrogen projects while investors questioned project costs, governance, and capital allocation, setting up a board challenge from activist Mantle Ridge.",
  },

  BA: {
    stakes:
      "Boeing's engineering franchise and duopoly-scale backlog met unforgiving safety obligations, fixed-price development risk, supplier complexity, and the financial temptation to prioritize delivery tempo.",
    moments: [
      {
        year: 2000,
        then: "Boeing is integrating McDonnell Douglas and balancing 737 and 777 commercial programs with military aircraft, missiles, and space systems under Phil Condit.",
        after: "Boeing had merged with McDonnell Douglas in 1997 and reorganized a company spanning commercial aviation and defense.",
      },
      {
        year: 2008,
        then: "Airline demand and the 787 Dreamliner's composite-airframe promise have built a large backlog, but supplier-driven assembly and an initial delay are testing the new production model.",
        after: "Boeing had launched the 787, outsourced major structural work, and postponed its planned first flight and delivery schedule.",
      },
      {
        year: 2020,
        then: "The 737 MAX remains grounded after two fatal crashes, Dennis Muilenburg has been removed, and David Calhoun must repair certification, production, and trust before deliveries can resume.",
        after: "Lion Air 610 and Ethiopian Airlines 302 had crashed, regulators had grounded the MAX, and Boeing had halted production and changed chief executives.",
      },
      {
        year: 2023,
        then: "MAX deliveries are recovering and the 787 has resumed handovers, but supplier defects, certification delays, and losses on defense programs keep execution under scrutiny.",
        after: "Boeing had resumed 737 MAX and 787 deliveries after extensive regulatory and manufacturing reviews.",
      },
    ],
    recentArc:
      "In 2024 an Alaska Airlines 737 MAX 9 door plug blew out, regulators capped production, machinists struck, Boeing agreed to acquire Spirit AeroSystems, and Kelly Ortberg replaced David Calhoun as chief executive.",
  },

  CAT: {
    stakes:
      "Caterpillar's dealers, installed base, and heavy machines offered a formidable franchise, but mining, construction, energy, inventories, and credit made its apparent strength inseparable from violent capital cycles.",
    moments: [
      {
        year: 2000,
        then: "Yellow bulldozers, excavators, engines, and dealer parts support infrastructure and mining worldwide, while a strong dollar and weak agricultural markets pressure factories.",
        after: "Caterpillar had modernized plants after its 1990s labor battles and built a globally coordinated dealer and financing network.",
      },
      {
        year: 2009,
        then: "Dealers are cutting inventories as construction and mining customers cancel orders; Caterpillar is reducing production after years of commodity-led capacity expansion.",
        after: "Caterpillar had expanded during the global mining and construction boom and then announced large workforce reductions as demand collapsed.",
      },
      {
        year: 2013,
        then: "The Bucyrus acquisition has deepened mining exposure just as commodity producers reconsider capital spending; Chinese machinery demand is slowing and dealer inventories are elevated.",
        after: "Caterpillar had acquired Bucyrus International in 2011 and integrated a broader underground and surface mining portfolio.",
      },
      {
        year: 2023,
        then: "Dealer inventories are rebuilding, energy and mining customers remain active, and Caterpillar is adding autonomy and connected services while supply shortages constrain shipments.",
        after: "Caterpillar had deployed autonomous haulage systems, expanded digital fleet tools, and moved its headquarters to the Dallas area.",
      },
    ],
    recentArc:
      "Through 2024, Caterpillar leaned on services, pricing, energy demand, and autonomous mining systems while construction activity varied by region and dealer inventories normalized.",
  },

  CSX: {
    stakes:
      "CSX owned irreplaceable eastern rail corridors, but service reliability, labor relations, regulation, fuel costs, and the tension between network efficiency and customer resilience shaped the moat.",
    moments: [
      {
        year: 2000,
        then: "CSX is absorbing its share of Conrail routes, linking Atlantic ports, coal fields, factories, and population centers while integration problems disrupt service.",
        after: "CSX and Norfolk Southern had divided Conrail's operating assets in 1999, forcing a major network and systems integration.",
      },
      {
        year: 2009,
        then: "Coal, autos, and intermodal volumes are falling with the recession, but pricing discipline and fuel surcharges matter across a fixed rail network.",
        after: "CSX had improved operations and pricing during the freight expansion before traffic fell sharply in late 2008.",
      },
      {
        year: 2019,
        then: "Jim Foote is continuing Hunter Harrison's precision-scheduled-railroading overhaul, running longer trains and closing facilities while customers and employees question service tradeoffs.",
        after: "CSX had hired Hunter Harrison in 2017, rapidly restructured operations, and installed Jim Foote after Harrison's death.",
      },
      {
        year: 2023,
        then: "Joe Hinrichs is emphasizing employees and customer service after pandemic congestion and a national rail labor dispute; coal and merchandise still share tracks with growing intermodal traffic.",
        after: "CSX had appointed former Ford executive Joe Hinrichs and worked through staffing and service disruptions across the freight-rail industry.",
      },
    ],
    recentArc:
      "Through 2024, CSX improved service metrics, invested in terminals and track, expanded rail-served industrial projects, and managed the Baltimore bridge disruption while labor and regulatory scrutiny remained elevated.",
  },

  DE: {
    stakes:
      "Deere's dealer network and green equipment commanded loyalty, but farm income, crop prices, replacement cycles, and the shift from mechanical machines to software-governed precision systems drove demand.",
    moments: [
      {
        year: 2000,
        then: "John Deere tractors and combines serve farmers emerging from low crop prices, while construction equipment and consumer lawn products broaden a company still tied to agricultural income.",
        after: "Deere had built a leading North American agricultural-equipment franchise and expanded into construction and grounds care.",
      },
      {
        year: 2009,
        then: "High crop prices have supported large-equipment demand, but recession and tight credit threaten construction and smaller customers; GPS-guided farming is moving from novelty toward standard tool.",
        after: "Deere had expanded precision guidance products and manufacturing capacity during the commodity upswing.",
      },
      {
        year: 2016,
        then: "Falling corn and soybean prices have pushed the farm-equipment cycle into a deep downturn, while Deere protects research in telematics, guidance, and more automated machinery.",
        after: "Deere had cut production and employment as large agricultural-equipment demand contracted after its 2013 peak.",
      },
      {
        year: 2023,
        then: "Strong farm balance sheets and constrained supply support orders, while the autonomous 8R tractor and See & Spray system make software, data, and machine vision central to Deere's pitch.",
        after: "Deere had unveiled a fully autonomous production tractor and acquired Blue River Technology and Bear Flag Robotics.",
      },
    ],
    recentArc:
      "Through 2024, Deere cut production and jobs as agricultural demand weakened, continued rolling out autonomy and See & Spray, and faced farmer and regulatory pressure over equipment repair access.",
  },

  EMR: {
    stakes:
      "Emerson's controls and automation equipment sat deep inside customer plants, but industrial cycles, acquisitions, and the long transition away from a diversified electrical conglomerate demanded disciplined portfolio management.",
    moments: [
      {
        year: 2000,
        then: "Emerson Electric spans process controls, motors, power systems, climate technologies, and appliance components under Charles Knight's rigorous planning culture.",
        after: "Emerson had produced decades of earnings growth through acquisitions, cost control, and a broad electrical and industrial portfolio.",
      },
      {
        year: 2009,
        then: "David Farr is cutting costs as factory investment contracts, while Fisher valves, DeltaV control systems, and network power equipment keep Emerson embedded in customer infrastructure.",
        after: "Emerson had expanded process management and data-center power capabilities during the prior industrial expansion.",
      },
      {
        year: 2016,
        then: "Oil and gas customers are slashing projects, and Emerson plans to sell Network Power and other units to concentrate on automation and commercial and residential solutions.",
        after: "Emerson had announced major divestitures after energy-market weakness exposed the complexity of its portfolio.",
      },
      {
        year: 2023,
        then: "Lal Karsanbhai has sold a majority stake in Climate Technologies to Blackstone and agreed to buy National Instruments, recasting Emerson as a focused automation company.",
        after: "Emerson had reached transactions to separate Climate Technologies and acquire National Instruments after an extended pursuit.",
      },
    ],
    recentArc:
      "Through 2024, Emerson integrated National Instruments, combined AspenTech and industrial software assets more closely with automation, and continued simplifying the remaining portfolio around measurement, control, and software.",
  },

  FDX: {
    stakes:
      "FedEx connected aircraft, hubs, couriers, and ground contractors into time-definite logistics, but fuel, labor, capital intensity, e-commerce mix, and integrating separately built networks continually challenged density economics.",
    moments: [
      {
        year: 2000,
        then: "FDX Corporation starts 2000 with Federal Express's overnight air network and the RPS ground-parcel business acquired with Caliber System. Founder Fred Smith is trying to present these separately operated networks as one logistics portfolio while UPS remains the larger ground rival.",
        after: "FDX Corporation adopted the FedEx Corporation name in 2000 and grouped its express, ground, freight, and logistics services under the FedEx brand.",
      },
      {
        year: 2003,
        then: "FedEx Corporation places the purple-and-orange express air network beside FedEx Ground parcels and logistics services under one brand architecture.",
        after: "FedEx had acquired Caliber System, including RPS, and reorganized its operating companies under the FedEx name.",
      },
      {
        year: 2009,
        then: "Express volumes are falling with global trade, fuel remains volatile, and the Ground network competes directly with UPS while using independent contractors for pickup and delivery.",
        after: "FedEx had expanded Ground, bought Kinko's, and built an international express network before the recession reduced shipments.",
      },
      {
        year: 2019,
        then: "The TNT Express integration is running behind after the NotPetya cyberattack, Amazon is building its own delivery capacity, and trade friction is weakening premium international shipments.",
        after: "FedEx had acquired TNT Express in 2016 and suffered a major operational disruption from the 2017 NotPetya attack.",
      },
      {
        year: 2023,
        then: "Raj Subramaniam has succeeded Fred Smith and launched DRIVE cost cuts as pandemic parcel demand cools; Express and Ground still operate as overlapping networks.",
        after: "FedEx had experienced a pandemic volume surge, named Raj Subramaniam chief executive, and announced a broad efficiency program.",
      },
    ],
    recentArc:
      "Through 2024, FedEx advanced Network 2.0 and its One FedEx consolidation, cut air and facility capacity, lost the U.S. Postal Service air-cargo contract, and began reviewing strategic options for FedEx Freight.",
  },

  GD: {
    stakes:
      "General Dynamics balanced multidecade defense programs with Gulfstream business jets, leaving execution exposed to Pentagon budgets, fixed-price contracts, classified requirements, and wealthy buyers' aircraft cycles.",
    moments: [
      {
        year: 2000,
        then: "General Dynamics builds Abrams tanks, nuclear submarines, combat systems, and Gulfstream business jets after years of post-Cold War portfolio reshaping.",
        after: "General Dynamics had acquired Gulfstream Aerospace in 1999 and retained core land, marine, and information-systems businesses.",
      },
      {
        year: 2008,
        then: "Iraq and Afghanistan sustain armored-vehicle and communications demand, while Gulfstream benefits from corporate and emerging-market wealth just as credit conditions tighten.",
        after: "General Dynamics had expanded combat systems and information technology through acquisitions while investing in new Gulfstream aircraft.",
      },
      {
        year: 2016,
        then: "Phebe Novakovic is managing lower war-related demand while Columbia-class submarine work grows and the new Gulfstream G500 and G600 move through flight testing.",
        after: "General Dynamics had made Phebe Novakovic chief executive and begun testing a new generation of large-cabin Gulfstream jets.",
      },
      {
        year: 2023,
        then: "Ukraine has renewed demand for munitions and armored vehicles, Columbia submarines carry schedule risk, and Gulfstream is waiting for certification of the G700.",
        after: "General Dynamics had expanded ordnance capacity, advanced Columbia-class construction, and accumulated orders for the delayed G700.",
      },
    ],
    recentArc:
      "In 2024 the FAA certified the Gulfstream G700 and deliveries began, while General Dynamics increased munitions output and worked through submarine labor and supply-chain constraints.",
  },

  HON: {
    stakes:
      "Honeywell's aerospace systems, controls, materials, and building technologies benefited from installed bases, but conglomerate complexity, cyclicality, and large acquisitions made capital allocation central.",
    moments: [
      {
        year: 2000,
        then: "AlliedSignal has taken the Honeywell name after acquiring the controls company, creating a portfolio of aircraft systems, specialty materials, turbochargers, and automation under Michael Bonsignore.",
        after: "AlliedSignal had completed its Honeywell merger in 1999 and adopted the better-known Honeywell identity.",
      },
      {
        year: 2003,
        then: "David Cote is repairing operations after regulators blocked GE's takeover, while the aviation slump, asbestos liabilities, and weak industrial demand weigh on the combined portfolio.",
        after: "European regulators had prohibited GE's proposed acquisition of Honeywell, and David Cote had become chief executive in 2002.",
      },
      {
        year: 2016,
        then: "Aerospace aftermarket, UOP refining technology, and building controls drive the company, while David Cote's operating system ties a wide portfolio to common margin and cash targets.",
        after: "Honeywell had integrated major acquisitions, expanded turbochargers and automation, and simplified manufacturing under David Cote.",
      },
      {
        year: 2023,
        then: "Darius Adamczyk is steering an aviation recovery while connected buildings, warehouse automation, and sustainability software broaden the industrial base after major portfolio separations.",
        after: "Honeywell had spun off Garrett Motion and Resideo and had acquired businesses including Intelligrated and Sparta Systems.",
      },
    ],
    recentArc:
      "Through 2024, Honeywell announced major deals for Carrier's security business and CAES defense electronics, reorganized around automation, aviation, and energy transition, and faced activist pressure to consider separating aerospace.",
  },

  ITW: {
    stakes:
      "Illinois Tool Works' niche products and decentralized businesses earned attractive positions through application knowledge, but acquisitive sprawl, customer concentration, and auto and construction cycles tested that discipline.",
    moments: [
      {
        year: 2000,
        then: "ITW operates hundreds of small businesses making fasteners, welding equipment, packaging systems, food equipment, and specialty products, allowing local managers unusual autonomy.",
        after: "Illinois Tool Works had built a highly decentralized portfolio through frequent acquisitions of engineered niche businesses.",
      },
      {
        year: 2009,
        then: "Automotive, construction, and industrial demand are collapsing across ITW's many units; decentralized managers can cut quickly, but breadth cannot escape the factory cycle.",
        after: "ITW had expanded globally and by acquisition before the recession drove broad volume declines.",
      },
      {
        year: 2016,
        then: "Scott Santi is applying an 80/20 process, shedding lower-return product lines, and simplifying divisions around the customers and products that matter most.",
        after: "ITW had divested its industrial-packaging segment and reduced complexity under its enterprise strategy.",
      },
      {
        year: 2023,
        then: "Automotive OEM components, Hobart food equipment, Miller welding systems, and construction products share a playbook of customer-back innovation and disciplined capacity.",
        after: "ITW had completed years of portfolio pruning and embedded its 80/20 management system across seven operating segments.",
      },
    ],
    recentArc:
      "Through 2024, ITW continued its 80/20 operating system, selective pricing, and customer-backed product development while automotive production normalized and European industrial demand softened.",
  },

  LIN: {
    stakes:
      "Linde's industrial-gas plants and engineering projects tied capital to customer processes for years, but energy inputs, mega-project execution, and industrial demand determined the value of those durable contracts.",
    moments: [
      {
        year: 2000,
        then: "Germany's Linde supplies industrial gases and builds process plants while also owning materials-handling and refrigeration operations; its identity is broader than gases alone.",
        after: "Linde had developed gas-separation technology and assembled engineering, refrigeration, and forklift businesses over decades.",
      },
      {
        year: 2007,
        then: "The BOC acquisition has made Linde a much larger global gases supplier, and the sale of the KION forklift business has left industrial gases and engineering at the core.",
        after: "Linde had acquired British industrial-gas group BOC in 2006 and sold its materials-handling operations.",
      },
      {
        year: 2019,
        then: "Linde has completed an all-stock combination with Praxair under a new Irish parent, and former Praxair chief Steve Angel is integrating overlapping networks under regulatory divestiture orders.",
        after: "Linde AG and Praxair had closed their merger in October 2018 after agreeing to substantial asset sales.",
      },
      {
        year: 2023,
        then: "Long-term on-site gas contracts support the base business, while clean-hydrogen and carbon-capture projects create a new capital pipeline dependent on customer commitments and policy support.",
        after: "Linde had announced multiple low-carbon hydrogen projects and proposed eliminating its Frankfurt listing in favor of a single New York listing.",
      },
    ],
    recentArc:
      "Through 2024, Linde signed additional long-term supply projects in electronics, chemicals, and low-carbon hydrogen, increased its U.S. market emphasis, and continued integrating engineering capabilities with on-site gas contracts.",
  },

  LMT: {
    stakes:
      "Lockheed Martin's aircraft, missiles, satellites, and classified systems offered long backlogs, but program performance, procurement politics, security obligations, and dependence on government budgets shaped every franchise.",
    moments: [
      {
        year: 2000,
        then: "The Lockheed and Martin Marietta combination spans F-16 fighters, missiles, military electronics, launch vehicles, and information systems, while failed acquisitions have left management focused on execution.",
        after: "Lockheed Martin had formed in 1995, acquired Loral defense assets, and abandoned a proposed Northrop Grumman purchase under antitrust pressure.",
      },
      {
        year: 2003,
        then: "The newly named F-35 Joint Strike Fighter program promises a common aircraft for U.S. and allied services, while Iraq and homeland-security spending lift demand across missiles and systems.",
        after: "Lockheed Martin had won the Joint Strike Fighter competition in 2001 and moved the F-35 into development.",
      },
      {
        year: 2016,
        then: "Marillyn Hewson has added Sikorsky helicopters, while F-35 production grows amid cost, software, and readiness scrutiny across the multinational program.",
        after: "Lockheed Martin had completed the Sikorsky acquisition in 2015 and continued increasing F-35 production.",
      },
      {
        year: 2023,
        then: "Ukraine is drawing down Javelin, HIMARS, and missile inventories, the F-35 remains the largest program, and supply constraints limit how quickly production can answer new demand.",
        after: "Lockheed Martin had expanded munitions discussions with the Pentagon and delivered hundreds of F-35 aircraft to U.S. and allied operators.",
      },
    ],
    recentArc:
      "Through 2024, Lockheed resumed F-35 deliveries under a phased Technology Refresh 3 approach, increased missile and rocket capacity, and abandoned its Aerojet Rocketdyne acquisition after regulatory opposition.",
  },

  MMM: {
    stakes:
      "3M's thousands of adhesive, abrasive, filtration, safety, and health products rewarded patient invention, but conglomerate sprawl and large product-liability disputes threatened the premium attached to its laboratory culture.",
    moments: [
      {
        year: 2000,
        then: "Post-it Notes and Scotch tape are the visible edge of a company spanning abrasives, films, medical products, industrial adhesives, and electronics materials under its 15-percent innovation culture.",
        after: "3M had commercialized technologies across many divisions by allowing researchers time and pathways to pursue internally generated ideas.",
      },
      {
        year: 2009,
        then: "George Buckley is cutting production as electronics and industrial customers retrench, while respirators, health-care consumables, and office products provide different demand patterns.",
        after: "3M had expanded through acquisitions and product development while preserving a broad industrial and consumer portfolio.",
      },
      {
        year: 2016,
        then: "Inge Thulin is selling and combining businesses, investing in fewer platforms, and using a global ERP rollout to make the famously decentralized company more efficient.",
        after: "3M had reorganized from six business groups to five and divested several noncore operations.",
      },
      {
        year: 2023,
        then: "Mike Roman plans to spin off health care, while PFAS contamination claims and Combat Arms earplug litigation create liabilities too large to treat as ordinary product issues.",
        after: "3M had announced the Solventum health-care separation, placed its earplug subsidiary into bankruptcy, and committed to ending PFAS manufacturing.",
      },
    ],
    recentArc:
      "In 2024 3M completed the Solventum spin, William Brown replaced Mike Roman as chief executive, and the company advanced major settlements covering public-water PFAS claims and military earplugs.",
  },

  NOC: {
    stakes:
      "Northrop Grumman's stealth aircraft, space systems, sensors, and strategic weapons relied on rare engineering skills, but classified complexity, fixed-price risk, and shifting Pentagon priorities made execution decisive.",
    moments: [
      {
        year: 2000,
        then: "Northrop Grumman is best known for the B-2 stealth bomber and military electronics, and its failed attempt to merge with Lockheed Martin has left it pursuing smaller defense combinations.",
        after: "Northrop had acquired Grumman and Westinghouse's defense electronics business before regulators blocked its proposed Lockheed Martin merger.",
      },
      {
        year: 2003,
        then: "The acquisitions of Litton and Newport News have added ships, electronics, and information technology, transforming Northrop Grumman into a broad defense prime during rising wartime budgets.",
        after: "Northrop Grumman had completed the Litton and Newport News Shipbuilding acquisitions and expanded beyond aircraft and sensors.",
      },
      {
        year: 2019,
        then: "Kathy Warden is integrating Orbital ATK's rockets and satellites, while the B-21 Raider and Ground Based Strategic Deterrent competitions could define the next generation of strategic programs.",
        after: "Northrop Grumman had acquired Orbital ATK in 2018 and was developing the classified B-21 bomber.",
      },
      {
        year: 2023,
        then: "The B-21 has been publicly unveiled, the Sentinel nuclear-missile program is ramping, and James Webb's successful deployment highlights space capability; these programs carry demanding schedules and fixed-price exposure.",
        after: "Northrop Grumman had helped build the James Webb Space Telescope and revealed the first B-21 Raider in December 2022.",
      },
    ],
    recentArc:
      "Through 2024, Northrop advanced B-21 flight testing, absorbed charges on early production, and worked through major cost growth and restructuring on the Sentinel intercontinental-ballistic-missile program.",
  },
};
