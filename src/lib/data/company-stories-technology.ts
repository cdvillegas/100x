import type { CompanyStoryProfile } from "./company-story-types";

export const TECHNOLOGY_STORIES: Record<string, CompanyStoryProfile> = {
  MSFT: {
    stakes:
      "Microsoft had to keep its Windows and Office franchises relevant while regulators, new devices, and cloud computing repeatedly changed where software was bought and used.",
    moments: [
      {
        year: 2000,
        then:
          "Bill Gates still ran Microsoft, Windows 98 and Office anchored the PC, and the federal antitrust trial threatened the company's operating freedom.",
        after:
          "Microsoft settled the U.S. antitrust case, handed the CEO role to Steve Ballmer, and extended its reach into servers, consoles, and enterprise software.",
      },
      {
        year: 2003,
        then:
          "Steve Ballmer's Microsoft was centered on Windows XP and Office, while Xbox and the .NET platform pushed the company beyond its desktop stronghold.",
        after:
          "Xbox became a durable console business, but Windows Vista's delays and reception exposed the cost of Microsoft's sprawling development process.",
      },
      {
        year: 2008,
        then:
          "Vista was struggling to displace Windows XP, Google was reshaping web software, and Microsoft was spending heavily to establish Xbox and online services.",
        after:
          "Windows 7 repaired much of Vista's damage, Bing replaced Live Search, and Azure developed into a major enterprise cloud platform.",
      },
      {
        year: 2016,
        then:
          "Satya Nadella was recasting Microsoft around Azure and subscriptions; Windows 10, Office 365, and a willingness to support rival platforms marked the break from the Ballmer era.",
        after:
          "Microsoft bought LinkedIn and GitHub, expanded Azure, and made recurring cloud and software subscriptions increasingly central to the company.",
      },
      {
        year: 2022,
        then:
          "Azure, Microsoft 365, Teams, GitHub, and LinkedIn made Microsoft a broad enterprise platform, while cloud capacity and cybersecurity required sustained investment.",
        after:
          "Microsoft agreed to acquire Activision Blizzard and, as ChatGPT drew mass attention, prepared a much larger Azure partnership with OpenAI.",
      },
      {
        year: 2023,
        then:
          "Azure and Microsoft 365 were the core growth engines, while the proposed Activision Blizzard acquisition faced regulatory challenges and the company deepened its work in large AI models.",
        after:
          "Microsoft completed the Activision Blizzard acquisition in 2023 and embedded generative-AI assistants across Azure, GitHub, Windows, and Microsoft 365.",
      },
    ],
    recentArc:
      "Through 2024, Microsoft expanded its AI infrastructure and Copilot products while regulators examined its cloud and AI partnerships and customers weighed the cost and usefulness of the new tools.",
  },

  CSCO: {
    stakes:
      "Cisco's fortunes depended on translating its dominance in routers and switches into durable positions as networking shifted toward software, cloud operators, security, and subscriptions.",
    moments: [
      {
        year: 2000,
        then:
          "John Chambers led the central supplier of routers and switches for the internet buildout, using frequent acquisitions to broaden Cisco's networking portfolio.",
        after:
          "The telecom and dot-com collapse produced a severe inventory correction, forcing layoffs and a sharper focus on profitability.",
      },
      {
        year: 2003,
        then:
          "Cisco had emerged from the network-equipment crash with a leaner cost base, but carriers and enterprises remained cautious and low-cost competitors were advancing.",
        after:
          "The company expanded into consumer networking, collaboration, and data-center products through acquisitions including Linksys, Scientific Atlanta, and WebEx.",
      },
      {
        year: 2009,
        then:
          "WebEx, TelePresence, and a new server initiative were broadening Cisco beyond network plumbing just as the recession constrained customer budgets.",
        after:
          "Cisco's Unified Computing System gained traction, while consumer ventures disappointed and software-defined networking challenged proprietary hardware control.",
      },
      {
        year: 2016,
        then:
          "Chuck Robbins had replaced John Chambers as CEO and was emphasizing security, software, and recurring revenue while traditional switching and routing matured.",
        after:
          "Cisco bought AppDynamics and Duo Security, sold more subscriptions, and exited several lower-priority hardware and service businesses.",
      },
      {
        year: 2022,
        then:
          "Cisco was shifting more software and security sales to subscriptions after buying Acacia Communications, while component shortages lengthened delivery times for networking hardware.",
        after:
          "Supply constraints eased, but customers then digested accumulated equipment orders as Cisco sought a larger position in security and observability.",
      },
      {
        year: 2023,
        then:
          "Cisco was balancing subscription growth in security and observability against a shift from component shortages to uneven product orders, plus competition from cloud-managed networking.",
        after:
          "Cisco agreed to buy Splunk in 2023 and completed the transaction in 2024, making observability and security analytics a much larger part of the company.",
      },
    ],
    recentArc:
      "In 2024, Cisco began integrating Splunk, reduced staff, and pitched networking, security, and observability as a combined platform while customers digested earlier equipment purchases.",
  },

  INTC: {
    stakes:
      "Intel had to defend the economics of x86 processors while manufacturing execution, mobile computing, custom chips, and rival foundries altered the source of semiconductor advantage.",
    moments: [
      {
        year: 2000,
        then:
          "Craig Barrett's Intel dominated PC processors with Pentium III, but pricing pressure from AMD and the costly race to build leading-edge fabs remained immediate concerns.",
        after:
          "Intel recovered from the Pentium 4 era with the Core architecture, and Apple's adoption of Intel processors reinforced x86's position in personal computers.",
      },
      {
        year: 2007,
        then:
          "Core 2 processors had restored product momentum, Apple was moving Macs to Intel chips, and the company still viewed the PC as the center of mainstream computing.",
        after:
          "Intel maintained strong PC and server positions but failed to establish its processors in the smartphone market led by ARM-based designs.",
      },
      {
        year: 2013,
        then:
          "Paul Otellini was preparing to retire as Intel promoted ultrabooks and spent heavily to make its chips competitive in power-sensitive mobile devices.",
        after:
          "Mobile subsidies did not create a lasting handset position, and repeated process delays weakened Intel's manufacturing lead.",
      },
      {
        year: 2020,
        then:
          "Bob Swan's Intel was ramping 10-nanometer products after years of delays, while AMD's Zen processors and Taiwan Semiconductor's manufacturing progress intensified pressure.",
        after:
          "Further manufacturing delays preceded Pat Gelsinger's return as CEO and a strategy to rebuild fabs and create an external foundry business.",
      },
      {
        year: 2022,
        then:
          "Pat Gelsinger had returned to launch IDM 2.0, commit to new fabrication plants, and restore product cadence; Alder Lake offered a visible test against AMD and Apple-designed processors.",
        after:
          "Intel began a costly factory expansion, separated more business units, and sought government support as PC demand fell.",
      },
      {
        year: 2023,
        then:
          "Pat Gelsinger was funding new factories and the IDM 2.0 foundry strategy as a weak PC market, execution risk, and AMD's server gains tested the turnaround.",
        after:
          "Intel separated its manufacturing economics more clearly, advanced several new process nodes, and secured U.S. support for planned domestic fabrication investments.",
      },
    ],
    recentArc:
      "During 2024, Intel launched Core Ultra and Xeon products, pursued foundry customers, and announced cost reductions as heavy factory spending and competitive pressure continued.",
  },

  IBM: {
    stakes:
      "IBM had to replace shrinking pools of proprietary hardware and infrastructure revenue without losing the enterprise relationships built around its mainframes, services, and software.",
    moments: [
      {
        year: 2000,
        then:
          "Lou Gerstner's IBM had already shifted from a threatened breakup toward integrated services, software, and mainframes, with Global Services carrying more of the client relationship.",
        after:
          "IBM deepened the services model, bought PwC Consulting, and sold its personal-computer business to Lenovo.",
      },
      {
        year: 2003,
        then:
          "Sam Palmisano now led IBM, and the completed PwC Consulting acquisition made business advice and technology implementation a larger part of its enterprise offering.",
        after:
          "The company exited PCs, expanded middleware through acquisitions, and emphasized higher-margin software and services.",
      },
      {
        year: 2009,
        then:
          "IBM entered the recession with a broad outsourcing backlog, a profitable software portfolio, and mainframes that remained embedded in banks and governments.",
        after:
          "The company promoted analytics and cloud computing, while heavy share repurchases and shrinking legacy businesses made its long earnings roadmap harder to sustain.",
      },
      {
        year: 2016,
        then:
          "Ginni Rometty was betting on Watson, analytics, cloud, mobile, and security as IBM reported a prolonged contraction in its older businesses.",
        after:
          "Watson's commercial reach fell short of its branding, and IBM made the $34 billion acquisition of Red Hat to strengthen its hybrid-cloud position.",
      },
      {
        year: 2022,
        then:
          "IBM had just spun off Kyndryl, leaving Arvind Krishna to concentrate on Red Hat, hybrid-cloud software, consulting, and mainframes.",
        after:
          "IBM introduced watsonx, continued software acquisitions, and benefited from a new mainframe cycle while maintaining its hybrid-cloud focus.",
      },
      {
        year: 2023,
        then:
          "Arvind Krishna's IBM was smaller after spinning off Kyndryl, with Red Hat, hybrid-cloud software, consulting, and mainframes defining the remaining portfolio.",
        after:
          "IBM introduced the watsonx AI platform, continued software acquisitions, and benefited from a mainframe cycle while maintaining its hybrid-cloud focus.",
      },
    ],
    recentArc:
      "By 2024, IBM was expanding watsonx and automation offerings, completed its purchase of Apptio, and agreed to acquire HashiCorp to add infrastructure-management software.",
  },

  ORCL: {
    stakes:
      "Oracle had to protect its database franchise while customers shifted from perpetual licenses and on-premises systems toward subscription applications and public cloud infrastructure.",
    moments: [
      {
        year: 2000,
        then:
          "Larry Ellison's Oracle was a database powerhouse selling into the internet boom, and its applications business was challenging SAP in large corporate accounts.",
        after:
          "The technology downturn slowed license sales, but Oracle used its cash and installed base to begin a long acquisition campaign.",
      },
      {
        year: 2007,
        then:
          "Oracle had absorbed PeopleSoft and Siebel, turning itself into a major applications vendor while integrating overlapping products and confronting SAP.",
        after:
          "Oracle bought BEA Systems and Sun Microsystems, gaining Java, Solaris, servers, and MySQL alongside its database and applications.",
      },
      {
        year: 2013,
        then:
          "The Sun acquisition had made Oracle a hardware vendor, engineered systems such as Exadata were central to its pitch, and cloud-native rivals challenged its licensing model.",
        after:
          "Oracle built and acquired cloud applications, launched a second generation of cloud infrastructure, and gradually shifted customers toward subscriptions.",
      },
      {
        year: 2020,
        then:
          "Safra Catz led Oracle as Fusion and NetSuite cloud applications grew, but its infrastructure cloud remained much smaller than Amazon Web Services and Microsoft Azure.",
        after:
          "Oracle expanded cloud regions, won large database and enterprise workloads, and moved its headquarters from California to Texas.",
      },
      {
        year: 2022,
        then:
          "Oracle had agreed to buy Cerner, a major move into health-care technology, while Fusion applications and its smaller infrastructure cloud carried the subscription transition.",
        after:
          "Oracle completed the Cerner acquisition, renamed the business Oracle Health, and increased spending on cloud capacity.",
      },
      {
        year: 2023,
        then:
          "Oracle was integrating Cerner, its largest acquisition, while demand for cloud infrastructure and database capacity required substantial data-center investment.",
        after:
          "Oracle renamed Cerner as Oracle Health, expanded multicloud database partnerships, and committed more capital to infrastructure for AI workloads.",
      },
    ],
    recentArc:
      "Through 2024, Oracle emphasized GPU capacity, database services inside rival clouds, and a difficult modernization effort at Oracle Health while cloud capital spending accelerated.",
  },

  QCOM: {
    stakes:
      "Qualcomm had to preserve the value of its wireless patents and modem leadership as handset cycles, customer concentration, regulation, and in-house chip designs shifted bargaining power.",
    moments: [
      {
        year: 2000,
        then:
          "Irwin Jacobs's Qualcomm had sold its handset and infrastructure operations to focus on CDMA chips and patent licensing as third-generation wireless networks approached.",
        after:
          "CDMA and later 3G adoption expanded royalty and chipset revenue, making Qualcomm a central supplier to global handset makers.",
      },
      {
        year: 2008,
        then:
          "Qualcomm's chips and licenses benefited from 3G smartphone adoption, but Nokia and regulators were contesting the terms and reach of its patent royalties.",
        after:
          "The company settled with Nokia, built Snapdragon into a leading smartphone platform, and became a major supplier across the Android market.",
      },
      {
        year: 2013,
        then:
          "Snapdragon combined applications processing and cellular modems for leading Android phones, while Qualcomm's licensing practices attracted growing regulatory scrutiny.",
        after:
          "Qualcomm paid competition penalties in several jurisdictions and lost some premium application-processor business when major customers developed their own chips.",
      },
      {
        year: 2019,
        then:
          "Steve Mollenkopf's Qualcomm was fighting Apple over licensing, defending itself after a blocked Broadcom takeover, and preparing chips for the first commercial 5G devices.",
        after:
          "Qualcomm settled its global litigation with Apple, restored a supply agreement, and benefited from the first broad wave of 5G handset launches.",
      },
      {
        year: 2022,
        then:
          "Cristiano Amon had taken over as Qualcomm bought Nuvia and directed Snapdragon engineering toward cars, laptops, and connected devices beyond smartphones.",
        after:
          "A handset downturn tested that diversification, while automotive agreements expanded and Nuvia's designs became the basis for new PC processors.",
      },
      {
        year: 2023,
        then:
          "Cristiano Amon was pushing Snapdragon into cars, PCs, and connected devices as smartphone demand weakened and Apple continued developing its own modem.",
        after:
          "Qualcomm extended its modem supply arrangement with Apple and introduced Snapdragon X processors aimed at Windows laptops.",
      },
    ],
    recentArc:
      "In 2024, Qualcomm launched Snapdragon X-based AI PCs, expanded automotive design wins, and continued diversifying while handsets and Apple modem dependence remained material.",
  },

  DELL: {
    stakes:
      "Dell had to reinvent a direct-sales PC model whose efficiency was widely copied, then prove that servers, storage, services, and financing could offset commoditization.",
    moments: [
      {
        year: 2000,
        then:
          "Michael Dell's build-to-order model was taking PC share with low inventory and direct customer relationships, while the company expanded into servers and storage.",
        after:
          "Dell became the leading PC vendor by units for a period, but slowing industry growth and improving rivals weakened the advantage of its original model.",
      },
      {
        year: 2007,
        then:
          "Kevin Rollins ran Dell as Michael Dell remained chairman, while quality complaints, slowing growth, and an accounting investigation exposed strains in the direct-sales machine.",
        after:
          "Dell entered retail stores, bought Perot Systems, and broadened enterprise offerings after Michael Dell returned as CEO in January 2007, but public-market pressure persisted.",
      },
      {
        year: 2013,
        then:
          "Dell was negotiating Michael Dell's proposed leveraged buyout as PC shipments fell and the company tried to build a larger enterprise technology portfolio.",
        after:
          "After Michael Dell returned as CEO in 2007, a leveraged buyout took Dell private, giving management room to restructure away from quarterly public-market scrutiny.",
      },
      {
        year: 2016,
        then:
          "Private Dell was preparing to complete its debt-heavy acquisition of EMC, a transaction designed to add storage, VMware, and major enterprise accounts.",
        after:
          "Dell completed the EMC acquisition, returned to public markets, and used asset sales and cash flow to reduce acquisition debt.",
      },
      {
        year: 2022,
        then:
          "Dell had just spun off VMware after reducing acquisition debt, leaving PCs, servers, storage, and financing more visible during a pandemic-driven hardware cycle.",
        after:
          "PC demand contracted, Dell reduced costs, and accelerator-based servers became a larger infrastructure opportunity.",
      },
      {
        year: 2023,
        then:
          "Dell had spun off VMware and was again exposed more directly to PCs, servers, storage, and infrastructure demand after the pandemic purchasing surge.",
        after:
          "Dell reduced costs during the PC downturn and saw growing demand for servers designed around Nvidia accelerators.",
      },
    ],
    recentArc:
      "Through 2024, Dell emphasized AI servers and enterprise infrastructure, while uneven PC replacement demand and the working-capital demands of accelerator systems shaped results.",
  },

  AAPL: {
    stakes:
      "Apple repeatedly had to turn tightly integrated hardware, software, and services into the next mass-market product before dependence on an aging flagship constrained the business.",
    moments: [
      {
        year: 2000,
        then:
          "Steve Jobs had returned Apple to profitability with the translucent iMac, but the company remained a small computer maker preparing a new operating system.",
        after:
          "Mac OS X arrived, the iPod and iTunes created a major music business, and Apple opened its own retail stores.",
      },
      {
        year: 2007,
        then:
          "The iPod defined Apple's resurgence, Intel-based Macs were gaining acceptance, and Steve Jobs was preparing the company to enter the crowded mobile-phone market.",
        after:
          "The iPhone and App Store remade Apple's business, while the iPad added another large device category.",
      },
      {
        year: 2012,
        then:
          "Tim Cook had succeeded Steve Jobs, and Apple entered the year with the iPhone 4S, Siri, and an enormous share of its business tied to smartphone execution.",
        after:
          "The iPhone and App Store remade Apple, and the company later expanded the phone line, introduced the Apple Watch, and built a much larger services business around its installed base.",
      },
      {
        year: 2020,
        then:
          "The iPhone still dominated Apple's economics, but wearables and services had become larger businesses and custom chips already distinguished its mobile devices.",
        after:
          "M-series chips improved Mac performance and battery life, while pandemic-era device demand and subscription services expanded the ecosystem.",
      },
      {
        year: 2022,
        then:
          "Apple's M-series Macs, services, wearables, and privacy changes had broadened the ecosystem, while chip shortages and dependence on Chinese assembly constrained supply.",
        after:
          "Device demand cooled, Apple diversified more assembly, and regulators imposed new limits on App Store practices.",
      },
      {
        year: 2023,
        then:
          "Apple's installed base and services revenue provided resilience as smartphone and PC demand softened, while supply concentration in China remained a strategic risk.",
        after:
          "Apple unveiled the Vision Pro, shifted more assembly toward India and Vietnam, and faced new regulatory constraints on its App Store practices.",
      },
    ],
    recentArc:
      "In 2024, Apple released Vision Pro, introduced Apple Intelligence and a partnership with OpenAI, and continued adapting its App Store rules under regulatory pressure.",
  },

  NVDA: {
    stakes:
      "Nvidia had to keep turning specialized graphics expertise into indispensable computing platforms as gaming cycles, rival chips, customer-built silicon, and manufacturing dependence changed the market.",
    moments: [
      {
        year: 2000,
        then:
          "Jensen Huang's young Nvidia was winning PC graphics sockets with GeForce, but fast product cycles and competition from 3dfx and ATI made leadership fragile.",
        after:
          "Nvidia acquired 3dfx assets, supplied graphics for Microsoft's first Xbox, and established a durable position in programmable GPUs.",
      },
      {
        year: 2003,
        then:
          "Nvidia enters 2003 supplying graphics for Microsoft's Xbox and pushing the new GeForce FX architecture after acquiring 3dfx's assets. Programmable shaders are making graphics chips more capable, but ATI's Radeon line is a fierce rival and each product cycle can reorder the market.",
        after:
          "Nvidia recovered from the uneven GeForce FX generation with later GeForce products and developed CUDA to let programmers use GPUs for work beyond graphics.",
      },
      {
        year: 2008,
        then:
          "GeForce was a major gaming brand and CUDA offered developers a way to use GPUs for general computing, while AMD's newly acquired ATI unit pressed the company on price and product cycles.",
        after:
          "CUDA adoption spread through scientific computing and early deep-learning work, giving Nvidia a software advantage beyond gaming graphics.",
      },
      {
        year: 2013,
        then:
          "Nvidia was balancing GeForce gaming, Tesla accelerators, and Tegra mobile processors as researchers demonstrated striking neural-network results on its GPUs.",
        after:
          "Deep learning drove demand for Tesla accelerators and CUDA, while Tegra found a stronger role in automotive and gaming devices than in phones.",
      },
      {
        year: 2020,
        then:
          "Data-center acceleration had become a major business alongside gaming, and Nvidia had agreed to acquire Mellanox to strengthen high-speed computing connectivity.",
        after:
          "Nvidia completed Mellanox, attempted but abandoned an Arm acquisition, and introduced the Ampere and Hopper architectures.",
      },
      {
        year: 2022,
        then:
          "Ampere GPUs were serving gaming, data centers, and cryptocurrency miners, while Nvidia's proposed Arm acquisition faced regulatory opposition and supply remained tight.",
        after:
          "Nvidia abandoned the Arm transaction, endured a gaming and crypto correction, and introduced Hopper data-center GPUs.",
      },
      {
        year: 2023,
        then:
          "Hopper GPUs and CUDA were positioned for large-model computing, and the five-week-old ChatGPT had made the workload newly visible outside research labs; the scale of resulting demand was unknown.",
        after:
          "Cloud providers and model developers ordered large clusters of Nvidia accelerators, and the company accelerated its product cadence around Blackwell.",
      },
    ],
    recentArc:
      "During 2024, Nvidia began shipping Blackwell systems after a production adjustment, expanded networking and enterprise software, and faced stronger scrutiny from regulators and customers developing custom chips.",
  },

  ADBE: {
    stakes:
      "Adobe had to move creative professionals from packaged desktop software to recurring cloud subscriptions without weakening the tools, formats, and workflows that sustained its pricing power.",
    moments: [
      {
        year: 2000,
        then:
          "John Warnock and Chuck Geschke's Adobe was built around Photoshop, Illustrator, Acrobat, and PostScript as publishing moved decisively onto digital workflows.",
        after:
          "Adobe assembled its core creative products into Creative Suite and expanded PDF from a document format into a broader business workflow.",
      },
      {
        year: 2008,
        then:
          "Creative Suite and Acrobat dominated professional design workflows, while the Macromedia acquisition had added Flash, Dreamweaver, and web-development tools.",
        after:
          "Mobile platforms reduced Flash's relevance, and Adobe began shifting product delivery and customer relationships toward the cloud.",
      },
      {
        year: 2013,
        then:
          "Shantanu Narayen was moving Photoshop and the rest of Creative Suite to Creative Cloud subscriptions, prompting customer resistance and near-term revenue disruption.",
        after:
          "Creative Cloud established a recurring-revenue model, while Adobe built a second franchise in digital marketing and analytics.",
      },
      {
        year: 2020,
        then:
          "Creative Cloud, Document Cloud, and Experience Cloud formed Adobe's portfolio, with collaboration and browser-based design becoming more important.",
        after:
          "Remote work increased digital-document use, and Adobe added collaborative design tools while pursuing the web-based design market.",
      },
      {
        year: 2022,
        then:
          "Creative Cloud, Document Cloud, and Experience Cloud had benefited from remote workflows, while the Frame.io acquisition added video collaboration and browser-native rivals kept advancing.",
        after:
          "Adobe proposed buying Figma, encountered regulatory opposition, and introduced its Firefly family of generative-AI tools.",
      },
      {
        year: 2023,
        then:
          "Adobe was seeking regulatory approval for its proposed Figma acquisition as generative AI and browser-native collaboration challenged established creative workflows.",
        after:
          "Adobe abandoned the Figma transaction after regulatory opposition and rolled Firefly generative-AI features into its creative products.",
      },
    ],
    recentArc:
      "Through 2024, Adobe expanded Firefly and AI-assisted editing while creators questioned training-data practices and investors assessed whether generative tools would reinforce or erode its franchises.",
  },

  ADI: {
    stakes:
      "Analog Devices had to sustain premium analog and signal-processing positions through long industrial cycles while integrating large acquisitions and competing for scarce engineering talent.",
    moments: [
      {
        year: 2000,
        then:
          "Analog Devices supplied converters and signal processors for communications, industrial, and consumer equipment as telecom infrastructure spending surged.",
        after:
          "The telecom downturn sharply reduced demand, but the company retained broad expertise in converting real-world signals into digital data.",
      },
      {
        year: 2007,
        then:
          "Jerald Fishman's Analog Devices was emphasizing high-performance analog products for industrial, automotive, and communications customers rather than chasing commodity volume.",
        after:
          "The company expanded power management and automotive content while navigating the financial crisis and uneven industrial recovery.",
      },
      {
        year: 2013,
        then:
          "Analog Devices entered a slower industrial environment with a diverse catalog, long product lives, and a strategy centered on high-value signal chains.",
        after:
          "The company bought Hittite Microwave and Linear Technology, greatly broadening its radio-frequency and power-management portfolios.",
      },
      {
        year: 2020,
        then:
          "Vincent Roche's Analog Devices was integrating Linear Technology and had agreed to sell its delayed-entry cellular infrastructure power-amplifier business.",
        after:
          "Analog Devices agreed to acquire Maxim Integrated, adding scale in automotive, data-center, industrial, and power-management chips.",
      },
      {
        year: 2022,
        then:
          "Analog Devices had completed the Maxim acquisition during a broad chip shortage, adding power-management and automotive products to a larger analog portfolio.",
        after:
          "The company integrated Maxim as customer inventories rose, setting up a broad correction in industrial and automotive orders.",
      },
      {
        year: 2023,
        then:
          "The Maxim acquisition had enlarged Analog Devices just as customers accumulated inventory after pandemic-era shortages, especially in industrial and automotive markets.",
        after:
          "A broad inventory correction reduced orders, and the company cut factory utilization while continuing to integrate Maxim.",
      },
    ],
    recentArc:
      "In 2024, Analog Devices worked through elevated customer inventories and weak industrial demand while continuing investment in higher-value automotive and intelligent-edge applications.",
  },

  AMAT: {
    stakes:
      "Applied Materials had to keep its chipmaking tools essential through violent capital-spending cycles, rising process complexity, export controls, and competition from specialized equipment vendors.",
    moments: [
      {
        year: 2000,
        then:
          "Applied Materials was the largest semiconductor-equipment supplier as chipmakers rushed to add capacity for PCs, communications gear, and the internet buildout.",
        after:
          "The technology bust produced a deep equipment downturn, forcing the company to manage factories and research spending through collapsed orders.",
      },
      {
        year: 2003,
        then:
          "Applied Materials entered a tentative recovery with broad positions in deposition, etch, inspection, and flat-panel equipment after severe customer cutbacks.",
        after:
          "New wafer sizes and more complex materials supported demand, though equipment spending remained highly cyclical.",
      },
      {
        year: 2007,
        then:
          "Applied Materials is selling the deposition, etch, inspection, and process-control systems needed for 300-millimeter chip factories, while its Applied Films acquisition adds display and solar equipment. Strong semiconductor spending makes factory utilization attractive, but every new fab risks adding too much industry capacity.",
        after:
          "Applied Materials expanded into flat-panel and thin-film solar manufacturing equipment before the financial crisis abruptly cut semiconductor capital spending.",
      },
      {
        year: 2009,
        then:
          "The financial crisis had pushed chipmakers to slash capital budgets, while Applied Materials was also investing in solar-manufacturing equipment.",
        after:
          "Semiconductor orders recovered, but the solar initiative struggled and the company later refocused on its stronger chip and display franchises.",
      },
      {
        year: 2016,
        then:
          "Gary Dickerson's Applied Materials was benefiting as three-dimensional NAND, FinFET transistors, and advanced displays required more process steps and materials engineering.",
        after:
          "Foundry, memory, and display investment expanded, while a proposed acquisition of Kokusai Electric was later abandoned after regulatory delays.",
      },
      {
        year: 2022,
        then:
          "Chip shortages were driving aggressive foundry and memory expansion, and Applied Materials was increasing production while the failed Kokusai deal left it to grow organically.",
        after:
          "Memory spending fell, U.S. export controls narrowed sales of advanced equipment to China, and the company emphasized packaging and materials complexity.",
      },
      {
        year: 2023,
        then:
          "Applied Materials faced a memory downturn and new U.S. restrictions on shipments to China, even as leading-edge logic and packaging grew more technically demanding.",
        after:
          "The company expanded advanced-packaging and materials systems while authorities investigated whether some China-related exports complied with U.S. rules.",
      },
    ],
    recentArc:
      "Through 2024, Applied Materials benefited from leading-edge logic and AI-related packaging investment, while China exposure and export-control compliance remained significant uncertainties.",
  },

  AMD: {
    stakes:
      "AMD had to challenge much larger processor rivals while relying on external manufacturing, maintaining architectural execution, and balancing PCs, servers, consoles, and accelerators.",
    moments: [
      {
        year: 2000,
        then:
          "Jerry Sanders's AMD had taken performance leadership with Athlon and was racing Intel toward the one-gigahertz mark despite a much smaller manufacturing base.",
        after:
          "Opteron introduced a successful 64-bit x86 design, but later product delays and Intel's Core architecture reversed AMD's momentum.",
      },
      {
        year: 2007,
        then:
          "AMD was absorbing ATI and preparing its Barcelona server processor while price competition, integration costs, and manufacturing execution strained the company.",
        after:
          "Opteron had given AMD a 64-bit opening, but Barcelona was delayed, the company lost processor share, and it spun its factories into GlobalFoundries to reduce capital requirements.",
      },
      {
        year: 2013,
        then:
          "Rory Read's AMD was cutting costs and leaning on semi-custom chips for upcoming game consoles while its Bulldozer processors lagged Intel.",
        after:
          "Console wins stabilized the business, and Lisa Su focused engineering resources on the new Zen CPU architecture.",
      },
      {
        year: 2016,
        then:
          "Lisa Su is concentrating AMD's limited resources on Zen processors, Radeon graphics, and the semi-custom chips already powering PlayStation 4 and Xbox One. The company has disclosed the Zen roadmap, but it has not yet proved that the design can close years of performance and efficiency gaps with Intel.",
        after:
          "AMD launched Ryzen and EPYC products based on Zen in 2017, restoring competition in desktop and server processors.",
      },
      {
        year: 2019,
        then:
          "Lisa Su's AMD had restored credibility with Ryzen and EPYC, and its chiplet design plus Taiwan Semiconductor manufacturing offered a path to more competitive products.",
        after:
          "Successive Zen generations gained PC and server share, and AMD acquired Xilinx to add adaptive computing and a larger embedded business.",
      },
      {
        year: 2022,
        then:
          "Ryzen and EPYC were gaining share through successive Zen designs, and AMD was awaiting approval to acquire Xilinx as its game-console chips benefited from strong demand.",
        after:
          "AMD completed the Xilinx acquisition, absorbed a PC downturn, and expanded its data-center portfolio toward AI accelerators.",
      },
      {
        year: 2023,
        then:
          "AMD was integrating Xilinx and launching new EPYC and Ryzen chips as a PC slump weighed on demand and Nvidia dominated the market for AI accelerators.",
        after:
          "AMD introduced its MI300 accelerator family and assembled more AI software and networking capabilities through acquisitions.",
      },
    ],
    recentArc:
      "In 2024, AMD expanded MI300 shipments, launched additional Zen processors, and agreed to acquire ZT Systems to strengthen its ability to deliver complete AI infrastructure.",
  },

  CPQ: {
    stakes:
      "Compaq had to preserve the scale built in personal computers while direct sales, falling prices, an unwieldy Digital Equipment acquisition, and weakening demand eroded its independence.",
    moments: [
      {
        year: 2000,
        then:
          "Michael Capellas was trying to simplify Compaq after its Digital Equipment acquisition, while Dell's direct model pressured the Presario and Deskpro PC businesses.",
        after:
          "Compaq cut costs and reorganized, but the PC downturn and difficult integration kept performance under pressure.",
      },
      {
        year: 2002,
        then:
          "Compaq and Hewlett-Packard were seeking shareholder approval for a contested merger that management argued would combine PCs, servers, services, and global distribution.",
        after:
          "Hewlett-Packard completed the acquisition of Compaq in May 2002 after a close proxy fight.",
      },
      {
        year: 2003,
        then:
          "Compaq no longer traded independently; its PCs, ProLiant servers, services, and customer contracts were being integrated into Hewlett-Packard.",
        after:
          "Hewlett-Packard retained major Compaq product lines, including ProLiant, while gradually retiring the corporate brand.",
      },
    ],
    recentArc:
      "The Compaq name persisted on selected consumer products for years, but its principal businesses became parts of HP and later HP Inc. and Hewlett Packard Enterprise.",
  },

  EMC: {
    stakes:
      "EMC had to defend premium enterprise storage as hardware standardized, data volumes surged, and cloud computing shifted spending toward software-defined infrastructure.",
    moments: [
      {
        year: 2000,
        then:
          "Mike Ruettgers's EMC dominated high-end corporate storage with Symmetrix systems as internet companies and large enterprises added data-center capacity.",
        after:
          "The technology downturn exposed excess spending and stronger competition, leading to layoffs and a leadership transition.",
      },
      {
        year: 2003,
        then:
          "Joe Tucci was rebuilding EMC after the storage crash, using new lower-priced systems and software to reduce dependence on high-end Symmetrix arrays.",
        after:
          "EMC acquired Documentum and VMware, adding information-management software and a fast-growing virtualization platform.",
      },
      {
        year: 2008,
        then:
          "EMC combined enterprise storage, security, content management, and majority ownership of VMware, whose virtualization software was changing server economics.",
        after:
          "VMware expanded rapidly, while cloud services and commodity hardware increased pressure on traditional storage arrays.",
      },
      {
        year: 2013,
        then:
          "EMC's federation joined EMC storage, VMware, and RSA, but activist investors and customers questioned whether the structure remained the best way to capture cloud demand.",
        after:
          "EMC created the Pivotal software venture and later agreed to be acquired by Dell in a highly leveraged transaction.",
      },
      {
        year: 2016,
        then:
          "EMC shareholders were awaiting completion of Dell's proposed acquisition, while the value of VMware and the financing burden shaped the transaction.",
        after:
          "Dell completed the acquisition in September 2016, and EMC ceased trading as an independent company.",
      },
    ],
    recentArc:
      "EMC's storage operations continued inside Dell Technologies, while VMware was spun off in 2021 and subsequently acquired by Broadcom in 2023.",
  },

  GLW: {
    stakes:
      "Corning had to convert deep materials science into profitable new markets while surviving abrupt demand swings in fiber optics, display glass, emissions controls, and consumer devices.",
    moments: [
      {
        year: 2000,
        then:
          "Corning was racing to expand optical-fiber and photonics capacity for telecom networks, while its established glass and ceramics businesses received less attention.",
        after:
          "The telecom collapse destroyed demand for much of that capacity, prompting large write-downs, plant closures, and layoffs.",
      },
      {
        year: 2003,
        then:
          "James Houghton had returned to lead a heavily restructured Corning, with survival tied to conserving cash and rebuilding around display glass and environmental technologies.",
        after:
          "Liquid-crystal-display glass became a major profit engine as flat-panel televisions and monitors spread.",
      },
      {
        year: 2008,
        then:
          "Wendell Weeks's Corning supplied precision glass for LCD panels and had introduced Gorilla Glass for thin, damage-resistant device screens.",
        after:
          "Gorilla Glass gained wide smartphone adoption, while display-glass pricing and television demand remained cyclical.",
      },
      {
        year: 2016,
        then:
          "Corning was investing in Gorilla Glass, optical communications, automotive emissions products, and pharmaceutical glass while managing persistent display-price declines.",
        after:
          "Fiber demand strengthened with cloud networks and broadband projects, and the company expanded cover glass and automotive applications.",
      },
      {
        year: 2022,
        then:
          "Corning was supplying cover glass, display substrates, broadband fiber, emissions ceramics, and pharmaceutical vials as pandemic demand strained logistics and input costs.",
        after:
          "Consumer-electronics and carrier demand weakened, prompting capacity and cost reductions before data-center optical demand improved.",
      },
      {
        year: 2023,
        then:
          "Corning faced weak smartphone, PC, and display demand after pandemic-era purchasing, while carrier customers reduced inventory in optical communications.",
        after:
          "The company cut costs and capacity, then saw demand improve in optical products tied to data-center and AI network buildouts.",
      },
    ],
    recentArc:
      "In 2024, Corning announced a multiyear supply agreement with Lumen for fiber and cable, and emphasized optical connectivity for dense data centers alongside recovery in display demand.",
  },

  HPQ: {
    stakes:
      "HP had to extract cash and relevance from PCs and printing as mobile devices, cloud services, channel inventory, and changing office habits reduced dependable hardware demand.",
    moments: [
      {
        year: 2000,
        then:
          "Carly Fiorina was reorganizing Hewlett-Packard around computing, printing, and services after the Agilent spinoff separated its original measurement businesses.",
        after:
          "HP completed the contested Compaq acquisition, gaining PC and server scale but also a difficult integration.",
      },
      {
        year: 2003,
        then:
          "The combined HP and Compaq was integrating overlapping PCs, servers, services, and sales channels while printing supplied much of the company's profit.",
        after:
          "Cost cuts improved parts of the combined business, but board conflict and uneven execution led to Fiorina's departure.",
      },
      {
        year: 2009,
        then:
          "Mark Hurd's HP had become a large PC, printer, server, and services supplier after buying EDS, with strict cost control central to its performance.",
        after:
          "Leadership turmoil followed Hurd's exit, and the Autonomy acquisition produced a major write-down and prolonged litigation.",
      },
      {
        year: 2016,
        then:
          "HP Inc. had just separated from Hewlett Packard Enterprise, leaving Dion Weisler to manage PCs and printing as independent mature franchises.",
        after:
          "HP gained PC share, acquired Samsung's printer business, and returned substantial cash while reducing costs.",
      },
      {
        year: 2022,
        then:
          "Enrique Lores's HP was shipping elevated volumes of PCs and home printers after remote work boosted demand, while component shortages constrained the mix it could deliver.",
        after:
          "The pandemic hardware cycle reversed, channel inventory rose, and HP reduced staffing and operating costs.",
      },
      {
        year: 2023,
        then:
          "Enrique Lores's HP was confronting a sharp post-pandemic PC correction, weaker home printing, and excess channel inventory.",
        after:
          "HP reduced headcount, worked down inventory, and promoted subscription printing and AI-capable PCs as replacement demand began to stabilize.",
      },
    ],
    recentArc:
      "Through 2024, HP launched AI PCs and pursued recurring workplace services, while printing supplies declined and Berkshire Hathaway substantially reduced its stake.",
  },

  INTU: {
    stakes:
      "Intuit had to keep tax and accounting software trusted and easy while moving customers online, entering assisted services, and using consumer data without alienating users or regulators.",
    moments: [
      {
        year: 2000,
        then:
          "Intuit's Quicken, QuickBooks, and TurboTax franchises made personal finance, small-business accounting, and tax preparation its core markets after a blocked merger with Microsoft.",
        after:
          "Online banking changed Quicken's role, while QuickBooks and TurboTax developed into stronger web and service platforms.",
      },
      {
        year: 2007,
        then:
          "Steve Bennett's Intuit was shifting TurboTax and QuickBooks toward online delivery while expanding payroll and payments for small businesses.",
        after:
          "Cloud versions grew, mobile tax filing emerged, and Brad Smith succeeded Bennett as CEO.",
      },
      {
        year: 2013,
        then:
          "QuickBooks Online and TurboTax were central to Intuit's connected-services strategy, though desktop software and financial institutions still represented important legacy relationships.",
        after:
          "Intuit sold several noncore businesses, concentrated on small businesses and consumers, and expanded the QuickBooks online ecosystem.",
      },
      {
        year: 2020,
        then:
          "Sasan Goodarzi was leading Intuit as cloud accounting, payroll, payments, and TurboTax Live pushed the company from software toward assisted financial services.",
        after:
          "Intuit acquired Credit Karma and Mailchimp, adding consumer financial recommendations and small-business marketing.",
      },
      {
        year: 2022,
        then:
          "Intuit had completed the Credit Karma and Mailchimp acquisitions, creating a wider platform spanning taxes, accounting, consumer finance, and small-business marketing.",
        after:
          "Management integrated the acquisitions, expanded assisted services, and faced continued scrutiny over tax-filing marketing and free preparation.",
      },
      {
        year: 2023,
        then:
          "Intuit was integrating Credit Karma and Mailchimp while regulators and consumer advocates scrutinized tax-filing marketing and access to free preparation.",
        after:
          "Intuit introduced the GenOS generative-AI platform and Intuit Assist across products, while remaining a target of criticism over tax-filing marketing and access to free preparation.",
      },
    ],
    recentArc:
      "In 2024, Intuit expanded assisted and AI-driven services, announced workforce changes toward AI skills, and competed with the IRS's new Direct File option.",
  },

  LRCX: {
    stakes:
      "Lam Research had to maintain process leadership in wafer fabrication while memory spending cycles, shrinking geometries, three-dimensional structures, and export rules whipsawed demand.",
    moments: [
      {
        year: 2000,
        then:
          "Lam Research supplied etch systems into a semiconductor capacity boom, with results tightly linked to customers' volatile factory-expansion plans.",
        after:
          "The technology bust brought a severe equipment contraction and reinforced the need for a broader installed-base service business.",
      },
      {
        year: 2007,
        then:
          "Lam was competing in conductor etch and wafer cleaning as chipmakers adopted smaller geometries and spent heavily on new memory capacity.",
        after:
          "The financial crisis crushed equipment orders, but Lam emerged positioned for more complex patterning and memory processes.",
      },
      {
        year: 2012,
        then:
          "Lam was seeking approval to acquire Novellus Systems, whose deposition tools would broaden the company beyond its traditional etch strength.",
        after:
          "Lam completed the Novellus acquisition and gained share as three-dimensional NAND required many repeated deposition and etch steps.",
      },
      {
        year: 2019,
        then:
          "Lam faced a sharp memory-spending downturn after several years of 3D NAND investment, while service revenue from its installed base provided some stability.",
        after:
          "Memory investment recovered, and pandemic-era electronics demand drove another strong equipment cycle.",
      },
      {
        year: 2022,
        then:
          "Lam was shipping etch and deposition tools into a worldwide fab expansion, with 3D NAND, leading-edge logic, and a large installed base supporting demand.",
        after:
          "Memory customers cut spending, and U.S. export controls limited shipments of advanced equipment to China.",
      },
      {
        year: 2023,
        then:
          "Memory customers were cutting capital spending and reducing inventories, while U.S. export controls limited the equipment Lam could supply to advanced Chinese fabs.",
        after:
          "Lam reduced costs, introduced tools for more complex memory structures, and prepared for a recovery led by advanced NAND and high-bandwidth memory.",
      },
    ],
    recentArc:
      "During 2024, Lam benefited from improving memory investment and AI-related demand for advanced packaging and high-bandwidth memory, with China restrictions still limiting parts of its market.",
  },

  MU: {
    stakes:
      "Micron had to survive memory's recurring booms and busts while funding leading-edge fabs, consolidating acquisitions, and differentiating products that often traded like commodities.",
    moments: [
      {
        year: 2000,
        then:
          "Steve Appleton's Micron was one of the remaining U.S. memory manufacturers, exposed to volatile DRAM pricing even as PC and communications demand appeared strong.",
        after:
          "The technology bust drove memory prices down, and Micron expanded through distressed assets while preserving manufacturing scale.",
      },
      {
        year: 2008,
        then:
          "Micron was losing money in an oversupplied DRAM market and building a NAND flash venture with Intel as the financial crisis deepened.",
        after:
          "Industry consolidation removed competitors, smartphone storage demand grew, and Micron acquired failed Japanese DRAM maker Elpida.",
      },
      {
        year: 2013,
        then:
          "Micron was awaiting completion of the Elpida acquisition, which would substantially increase its DRAM capacity and deepen relationships with mobile-device customers.",
        after:
          "The Elpida deal closed, and a more consolidated memory industry produced periods of stronger pricing and profitability.",
      },
      {
        year: 2020,
        then:
          "Sanjay Mehrotra's Micron supplied DRAM and NAND into data centers, phones, PCs, and vehicles while working through trade restrictions affecting Huawei.",
        after:
          "Pandemic demand tightened memory markets, followed by a severe inventory correction across PCs, phones, and data centers.",
      },
      {
        year: 2022,
        then:
          "Micron entered the year with tight DRAM and NAND supply, strong data-center demand, and plans for long-term manufacturing investment as chip shortages persisted.",
        after:
          "PC and smartphone demand weakened sharply, inventories climbed, and Micron cut production and capital spending.",
      },
      {
        year: 2023,
        then:
          "Micron was cutting production and capital spending amid one of the industry's deepest memory downturns, with customer inventories high and prices falling.",
        after:
          "Demand for high-bandwidth memory used with AI accelerators improved the outlook, while China restricted some purchases of Micron products.",
      },
    ],
    recentArc:
      "In 2024, Micron ramped high-bandwidth memory and planned U.S. fab investments supported by CHIPS Act incentives as conventional DRAM and NAND pricing recovered.",
  },

  ACN: {
    stakes:
      "Accenture had to keep a vast consulting workforce relevant as clients alternated between large transformation programs and cost cutting, and as automation changed what they would pay advisers to do.",
    moments: [
      {
        year: 2001,
        then:
          "Newly renamed Accenture was separating its identity from Arthur Andersen and preparing to operate as a public consulting and technology-services company.",
        after:
          "Accenture completed its initial public offering and avoided the collapse that later overtook Arthur Andersen's accounting partnership.",
      },
      {
        year: 2003,
        then:
          "Accenture was navigating weak technology spending with a mix of management consulting, systems integration, and outsourcing contracts.",
        after:
          "Outsourcing and offshore delivery expanded, giving the company longer contracts and a more global labor model.",
      },
      {
        year: 2009,
        then:
          "William Green's Accenture entered the recession with clients delaying discretionary consulting but continuing to seek operational savings through outsourcing.",
        after:
          "Accenture recovered with stronger demand for digital, cloud, analytics, and security work and shifted its incorporation to Ireland.",
      },
      {
        year: 2016,
        then:
          "Pierre Nanterme's Accenture was acquiring specialist agencies and technology firms to build digital, cloud, and security capabilities beyond traditional systems integration.",
        after:
          "The company completed many targeted acquisitions and became a leading implementation partner for major public-cloud and enterprise-software platforms.",
      },
      {
        year: 2022,
        then:
          "Julie Sweet's Accenture was hiring and acquiring aggressively as clients accelerated cloud migrations, digital commerce, and security programs during the pandemic.",
        after:
          "Client decisions slowed, Accenture reduced roles, and the company redirected investment and training toward generative AI.",
      },
      {
        year: 2023,
        then:
          "Julie Sweet's Accenture faced slower client decisions after rapid pandemic-era cloud transformation, while generative AI threatened some work and created new advisory demand.",
        after:
          "Accenture committed major investment to AI, trained employees on generative tools, and reduced roles as discretionary consulting remained uneven.",
      },
    ],
    recentArc:
      "Through 2024, Accenture reported large generative-AI bookings, continued acquisitions, and reoriented skills toward data and AI while clients constrained parts of consulting spending.",
  },

  CRM: {
    stakes:
      "Salesforce had to extend its cloud-software lead beyond sales automation while integrating acquisitions, controlling costs, and convincing customers that a broad platform was worth its complexity.",
    moments: [
      {
        year: 2007,
        then:
          "Marc Benioff's Salesforce was proving that customer-management software could be delivered through a browser, with its AppExchange inviting partners onto the platform.",
        after:
          "Subscription software became mainstream, and Salesforce expanded from sales automation into service, marketing, and application development.",
      },
      {
        year: 2012,
        then:
          "Salesforce was pushing the 'social enterprise' through acquisitions such as Radian6 while competing with Oracle, SAP, and Microsoft for larger corporate deployments.",
        after:
          "The company bought ExactTarget, Demandware, and MuleSoft, building marketing, commerce, and integration businesses around its CRM core.",
      },
      {
        year: 2016,
        then:
          "Salesforce's Sales, Service, Marketing, and Community clouds formed a broad customer platform, while frequent acquisitions and stock compensation accompanied rapid growth.",
        after:
          "Salesforce added MuleSoft, Tableau, and Slack in increasingly large transactions, making integration a central management task.",
      },
      {
        year: 2020,
        then:
          "Salesforce was integrating Tableau and MuleSoft as enterprises moved more workflows online, with Microsoft, Adobe, Oracle, and specialist SaaS vendors competing across its portfolio.",
        after:
          "Salesforce agreed to buy Slack, and pandemic-era digital projects accelerated demand before growth later slowed.",
      },
      {
        year: 2022,
        then:
          "Salesforce was integrating Slack, Tableau, and MuleSoft after pandemic-era digital projects accelerated demand, while the enlarged product suite increased management complexity.",
        after:
          "Growth slowed, Bret Taylor departed as co-CEO, activists demanded higher margins, and Salesforce began substantial cost cuts.",
      },
      {
        year: 2023,
        then:
          "Salesforce entered the year with co-CEO Bret Taylor departing, activist investors pressing for margins, and customers scrutinizing software spending after the Slack acquisition.",
        after:
          "Salesforce cut jobs, emphasized profitability, disbanded its mergers-and-acquisitions committee, and introduced Einstein GPT and Data Cloud offerings.",
      },
    ],
    recentArc:
      "In 2024, Salesforce promoted Agentforce and unified customer data for AI applications, while pursuing measured growth and maintaining the margin discipline adopted under activist pressure.",
  },

  AVGO: {
    stakes:
      "Broadcom had to make an acquisition-driven portfolio of chips and infrastructure software more valuable together while managing debt, customer concentration, and regulatory scrutiny.",
    moments: [
      {
        year: 2009,
        then:
          "Avago Technologies, built from former Hewlett-Packard and Agilent chip operations, supplied analog, optical, and radio-frequency components as it returned to public markets.",
        after:
          "Avago expanded through acquisitions and focused on defensible components used in communications, industrial, and consumer systems.",
      },
      {
        year: 2012,
        then:
          "Hock Tan's Avago was a public analog and communications-chip supplier, using cash flow and acquisitions to widen a portfolio still much smaller than the largest semiconductor companies.",
        after:
          "Avago continued buying specialized chip businesses and prepared the much larger LSI acquisition.",
      },
      {
        year: 2013,
        then:
          "Hock Tan's Avago was using disciplined acquisitions to broaden its semiconductor portfolio and had agreed to buy storage-connectivity specialist LSI.",
        after:
          "Avago completed the LSI deal, sold noncore units, and acquired Broadcom in a much larger transaction before adopting its name.",
      },
      {
        year: 2016,
        then:
          "Hock Tan's Avago was awaiting completion of its acquisition of Broadcom, a deal that would combine Avago's acquisition model with Broadcom's networking, wireless-connectivity, and broadband chips.",
        after:
          "Avago completed the Broadcom acquisition in February 2016 and adopted the Broadcom name. A later proposed Qualcomm takeover was blocked by the U.S. government, and the company shifted major acquisition spending toward software.",
      },
      {
        year: 2020,
        then:
          "Broadcom was integrating CA Technologies and Symantec's enterprise-security business while still relying on chips for networking, storage, broadband, and premium smartphones.",
        after:
          "Avago completed the Broadcom acquisition in 2016, later bought CA Technologies and Symantec's enterprise-security unit, and agreed to acquire VMware in 2022.",
      },
      {
        year: 2022,
        then:
          "Broadcom combined networking, storage, broadband, and wireless chips with the acquired CA and Symantec enterprise-software operations under Hock Tan's cost-focused model.",
        after:
          "Broadcom agreed to acquire VMware, won regulatory approvals after offering remedies, and completed the transaction in 2023.",
      },
      {
        year: 2023,
        then:
          "Broadcom was seeking regulatory approvals for VMware while hyperscale data centers were increasing demand for its high-speed networking and custom-compute chips.",
        after:
          "Broadcom completed the VMware acquisition in November 2023 and reorganized its products, licensing, and partner relationships.",
      },
    ],
    recentArc:
      "During 2024, Broadcom reported strong AI-networking demand and integrated VMware through subscription bundles and product consolidation that drew concern from some customers and partners.",
  },
};
