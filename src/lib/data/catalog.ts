import { EXTRA_FIRMS } from "./catalog-extra";

export interface Firm {
  id: string;
  name: string;
  ticker: string;
  description: string;
}

export const FIRMS: Record<string, Firm> = {
  AAPL: {
    id: "aapl",
    name: "Apple",
    ticker: "AAPL",
    description: "Builds consumer devices, operating systems, and digital services as one tightly integrated product ecosystem.",
  },
  AIG: {
    id: "aig",
    name: "AIG",
    ticker: "AIG",
    description: "Sells commercial, property-casualty, and life insurance worldwide, earning premiums while investing the capital held against claims.",
  },
  AMZN: {
    id: "amzn",
    name: "Amazon",
    ticker: "AMZN",
    description: "Runs a vast online marketplace and fulfillment network, with cloud infrastructure providing a separate high-margin profit engine.",
  },
  AOL: {
    id: "aol",
    name: "America Online",
    ticker: "AOL",
    description: "Bundles dial-up internet access with email, instant messaging, news, and entertainment, funded by subscriptions and advertising.",
  },
  AVGO: {
    id: "avgo",
    name: "Broadcom",
    ticker: "AVGO",
    description: "Designs connectivity and data-center chips and sells infrastructure software, focusing on essential systems with high switching costs.",
  },
  BAC: {
    id: "bac",
    name: "Bank of America",
    ticker: "BAC",
    description: "Takes deposits and lends to households and businesses, with major credit-card, wealth-management, and investment-banking operations.",
  },
  BRK: {
    id: "brk",
    name: "Berkshire Hathaway",
    ticker: "BRK.A",
    description: "Uses insurance float to own public securities and operating businesses spanning rail, energy, manufacturing, and consumer brands.",
  },
  C: {
    id: "c",
    name: "Citigroup",
    ticker: "C",
    description: "Provides cards, deposits, lending, treasury services, and investment banking through a banking network built for multinational clients.",
  },
  COST: {
    id: "cost",
    name: "Costco",
    ticker: "COST",
    description: "Sells a limited assortment in high-volume warehouses, using annual membership fees and rapid inventory turnover to keep prices low.",
  },
  CSCO: {
    id: "csco",
    name: "Cisco Systems",
    ticker: "CSCO",
    description: "Sells the routers, switches, security tools, and software that move data through corporate networks and the internet.",
  },
  CVX: {
    id: "cvx",
    name: "Chevron",
    ticker: "CVX",
    description: "Produces oil and gas, refines crude into fuels, and sells energy products worldwide across the full petroleum value chain.",
  },
  DELL: {
    id: "dell",
    name: "Dell",
    ticker: "DELL",
    description: "Builds PCs and enterprise hardware around a direct-sales model that emphasizes configurable products and lean inventory.",
  },
  FB: {
    id: "meta",
    name: "Facebook",
    ticker: "FB",
    description: "Operates a global social network and sells targeted advertising based on the attention and activity of its users.",
  },
  GE: {
    id: "ge",
    name: "General Electric",
    ticker: "GE",
    description: "Operates across aircraft engines, power equipment, industrial systems, and—historically—a large finance arm, making it a proxy for the wider economy.",
  },
  GOOG: {
    id: "goog",
    name: "Google",
    ticker: "GOOG",
    description: "Organizes online information through search and related software, with advertising auctions supplying most of its revenue.",
  },
  HD: {
    id: "hd",
    name: "Home Depot",
    ticker: "HD",
    description: "Runs large home-improvement stores serving do-it-yourself customers and professional contractors, with housing activity driving demand.",
  },
  IBM: {
    id: "ibm",
    name: "IBM",
    ticker: "IBM",
    description: "Sells mission-critical computing, software, and consulting to large organizations, with long contracts and deeply embedded systems.",
  },
  INTC: {
    id: "intc",
    name: "Intel",
    ticker: "INTC",
    description: "Designs and manufactures processors for PCs and servers, historically combining chip architecture with ownership of advanced factories.",
  },
  JNJ: {
    id: "jnj",
    name: "Johnson & Johnson",
    ticker: "JNJ",
    description: "Develops medicines and medical devices across many clinical areas, using its scale and product breadth to balance research risk.",
  },
  JPM: {
    id: "jpm",
    name: "JPMorgan Chase",
    ticker: "JPM",
    description: "Combines consumer and commercial banking with payments, markets, asset management, and one of the world's largest investment banks.",
  },
  KO: {
    id: "ko",
    name: "Coca-Cola",
    ticker: "KO",
    description: "Sells beverage concentrate and brands through a global bottling system, earning high margins while partners handle much of production and delivery.",
  },
  LLY: {
    id: "lly",
    name: "Eli Lilly",
    ticker: "LLY",
    description: "Develops prescription drugs at global scale, relying on patent-protected medicines and a research pipeline to replace aging products.",
  },
  LU: {
    id: "lu",
    name: "Lucent",
    ticker: "LU",
    description: "Supplies telephone carriers with switching, optical, and wireless equipment after emerging from AT&T's equipment business.",
  },
  META: {
    id: "meta",
    name: "Meta Platforms",
    ticker: "META",
    description: "Operates Facebook, Instagram, WhatsApp, and Messenger, turning global user attention into targeted advertising revenue.",
  },
  MRK: {
    id: "mrk",
    name: "Merck",
    ticker: "MRK",
    description: "Develops and markets prescription medicines and vaccines, with results shaped by clinical trials, patents, and a few major products.",
  },
  MSFT: {
    id: "msft",
    name: "Microsoft",
    ticker: "MSFT",
    description: "Builds operating systems and productivity software used by consumers and businesses, historically monetized through durable licensing power.",
  },
  NVDA: {
    id: "nvda",
    name: "NVIDIA",
    ticker: "NVDA",
    description: "Designs accelerated-computing chips and software used for graphics, scientific computing, data centers, and artificial-intelligence workloads.",
  },
  ORCL: {
    id: "orcl",
    name: "Oracle",
    ticker: "ORCL",
    description: "Sells databases and enterprise applications that run core business records, generating recurring support revenue from deeply embedded systems.",
  },
  PEP: {
    id: "pep",
    name: "PepsiCo",
    ticker: "PEP",
    description: "Pairs Pepsi beverages with Frito-Lay snacks, using a global distribution network and everyday brands to generate repeat purchases.",
  },
  PFE: {
    id: "pfe",
    name: "Pfizer",
    ticker: "PFE",
    description: "Researches and markets medicines and vaccines worldwide, with patent cycles and successful clinical development driving its economics.",
  },
  PG: {
    id: "pg",
    name: "Procter & Gamble",
    ticker: "PG",
    description: "Owns household and personal-care staples sold globally, using brand strength, distribution, and advertising to defend pricing.",
  },
  QCOM: {
    id: "qcom",
    name: "Qualcomm",
    ticker: "QCOM",
    description: "Designs modem and mobile processors while licensing foundational wireless patents to device makers around the world.",
  },
  T: {
    id: "t",
    name: "AT&T",
    ticker: "T",
    description: "Sells wireless, broadband, and legacy telephone connectivity, funding large networks with recurring household and business subscriptions.",
  },
  TSLA: {
    id: "tsla",
    name: "Tesla",
    ticker: "TSLA",
    description: "Designs electric vehicles, batteries, charging systems, and energy products, controlling much of its software and manufacturing.",
  },
  UNH: {
    id: "unh",
    name: "UnitedHealth",
    ticker: "UNH",
    description: "Pairs a national health insurer with Optum's pharmacy, care-delivery, analytics, and benefits services across the health system.",
  },
  V: {
    id: "v",
    name: "Visa",
    ticker: "V",
    description: "Routes electronic payments between banks and merchants, earning fees on transaction volume without usually lending to cardholders.",
  },
  VZ: {
    id: "vz",
    name: "Verizon",
    ticker: "VZ",
    description: "Sells wireless and broadband connectivity over capital-intensive national networks, supported by recurring consumer and business bills.",
  },
  WFC: {
    id: "wfc",
    name: "Wells Fargo",
    ticker: "WFC",
    description: "Takes deposits and provides mortgages, cards, and commercial loans through a broad U.S. branch and business-banking franchise.",
  },
  MA: {
    id: "ma",
    name: "Mastercard",
    ticker: "MA",
    description: "Operates a global card-payment network, earning fees as spending moves between consumers, merchants, and financial institutions.",
  },
  DIS: {
    id: "dis",
    name: "Disney",
    ticker: "DIS",
    description: "Monetizes characters and stories across film, television, streaming, merchandise, cruises, and destination theme parks.",
  },
  WMT: {
    id: "wmt",
    name: "Walmart",
    ticker: "WMT",
    description: "Uses enormous purchasing and logistics scale to sell groceries and general merchandise at low prices through stores and online.",
  },
  XOM: {
    id: "xom",
    name: "Exxon Mobil",
    ticker: "XOM",
    description: "Produces oil and gas, refines fuels, and manufactures chemicals through a globally integrated, capital-intensive energy system.",
  },
  YHOO: {
    id: "yhoo",
    name: "Yahoo",
    ticker: "YHOO",
    description: "Runs a web portal built around search, email, news, and finance, monetized primarily through digital advertising and partnerships.",
  },
};

for (const [ticker, firm] of Object.entries(EXTRA_FIRMS)) {
  if (!FIRMS[ticker]) FIRMS[ticker] = firm;
}

export const FIRM_ALIASES: Record<string, string> = {
  GOOGL: "GOOG",
  BRK_A: "BRK",
  BRK_B: "BRK",
};
