import type { CompanyStoryProfile } from "./company-story-types";

export const HEALTH_ENERGY_STORIES: Record<string, CompanyStoryProfile> = {
  PFE: {
    stakes:
      "Pfizer depended on replacing large patented medicines while integrating major acquisitions; Lipitor, later vaccines and oncology products, and the political cost of drug pricing repeatedly reshaped that task.",
    moments: [
      {
        year: 2000,
        then: "Viagra has made Pfizer unusually visible, while Lipitor, co-marketed with Warner-Lambert, is becoming central to the portfolio. Pfizer has launched a hostile bid to break up Warner-Lambert's merger agreement with American Home Products.",
        after: "Pfizer acquired Warner-Lambert in 2000 and gained full control of Lipitor, which became the defining product of the combined company.",
      },
      {
        year: 2003,
        then: "Pfizer has agreed to buy Pharmacia, owner of Celebrex and a major stake in Monsanto, but regulators have not yet cleared the transaction. Lipitor and Norvasc still anchor a patent-heavy product base.",
        after: "Pfizer completed the Warner-Lambert merger in 2000, gaining full control of Lipitor, then bought Pharmacia in 2003 and later separated the inherited Monsanto stake.",
      },
      {
        year: 2012,
        then: "Pfizer has absorbed Wyeth and its Prevnar vaccine franchise, but Lipitor lost U.S. patent exclusivity in November 2011. The company is preparing to separate animal-health and nutrition assets while rebuilding its pipeline.",
        after: "Pfizer spun off Zoetis and sold the nutrition business, while newer products including Ibrance and Eliquis reduced dependence on the old primary-care blockbusters.",
      },
      {
        year: 2023,
        then: "Comirnaty and Paxlovid have made pandemic products unusually important, but demand is moving away from emergency purchasing. Pfizer has completed its Biohaven purchase for Nurtec ODT and is emphasizing oncology and specialty medicines.",
        after: "Pfizer completed its acquisition of Seagen in 2023 and combined Seagen's antibody-drug conjugates with products such as Ibrance and Xtandi.",
      },
    ],
    recentArc:
      "Through 2024, Pfizer cut costs as Comirnaty and Paxlovid sales normalized, integrated Seagen, and advanced an oncology-led strategy under chief executive Albert Bourla.",
  },
  JNJ: {
    stakes:
      "Johnson & Johnson's diversification across medicines, devices, and consumer brands softened single-product risk, but recalls, talc litigation, and the eventual separation of consumer health tested the value of that breadth.",
    moments: [
      {
        year: 2000,
        then: "Johnson & Johnson spans Tylenol and Band-Aid consumer products, Ethicon surgery, DePuy orthopedics, and prescription medicines including Procrit. Its decentralized operating model is a strength only if quality remains consistent across the group.",
        after: "The company continued buying device and pharmaceutical businesses, while its breadth later exposed it to product recalls and litigation across several divisions.",
      },
      {
        year: 2007,
        then: "Remicade is expanding in immune disease and Cordis sells the Cypher drug-eluting stent, but Boston Scientific has won the contest for Guidant. J&J has completed its acquisition of Pfizer's consumer-health brands, including Listerine and Nicorette.",
        after: "Johnson & Johnson completed the Pfizer consumer acquisition in 2006, while competition and safety concerns reduced Cypher's earlier dominance in coronary stents.",
      },
      {
        year: 2013,
        then: "The Synthes acquisition has enlarged DePuy's orthopedic and trauma business. Stelara and recently approved Xarelto support pharmaceuticals, while manufacturing lapses behind the McNeil consumer recalls remain a reputational burden.",
        after: "Pharmaceutical growth increasingly came from Stelara, Darzalex, and other specialty drugs, while device and talc claims remained persistent legal issues.",
      },
      {
        year: 2023,
        then: "Johnson & Johnson has announced plans to separate its Tylenol, Neutrogena, and Band-Aid consumer business as Kenvue. The remaining company is centered on Janssen medicines and MedTech, with Stelara exclusivity and talc litigation prominent risks.",
        after: "Johnson & Johnson completed the Kenvue separation in 2023 and adopted the Johnson & Johnson Innovative Medicine name for its pharmaceutical segment.",
      },
    ],
    recentArc:
      "Through 2024, J&J pursued growth from Darzalex, Tremfya, Carvykti, and MedTech acquisitions such as Abiomed and Shockwave Medical while continuing to contest talc claims and prepare for Stelara competition.",
  },
  MRK: {
    stakes:
      "Merck's research reputation repeatedly met concentrated patent and safety risk: Vioxx damaged trust, the Schering-Plough combination broadened the pipeline, and Keytruda later made oncology the central franchise.",
    moments: [
      {
        year: 2000,
        then: "Zocor, Fosamax, and Cozaar are major products, and the recently launched pain medicine Vioxx is being promoted as a growth driver. Merck still presents internally discovered medicines and scientific credibility as its core advantage.",
        after: "Merck withdrew Vioxx worldwide in 2004 after a trial identified increased cardiovascular risk, leading to extensive litigation and a major reputational crisis.",
      },
      {
        year: 2007,
        then: "Merck is rebuilding under Richard Clark after the Vioxx withdrawal. Gardasil has received U.S. approval, Januvia has launched for type 2 diabetes, and Zocor has lost U.S. exclusivity.",
        after: "Gardasil and Januvia became durable franchises, and Merck resolved much of the U.S. Vioxx litigation through a settlement program.",
      },
      {
        year: 2012,
        then: "Merck has integrated Schering-Plough, adding Remicade rights, animal health, and a larger research organization. Singulair faces U.S. patent expiry during 2012, while the experimental cancer antibody MK-3475 remains an early pipeline asset.",
        after: "Merck launched Keytruda, the brand name for pembrolizumab, in 2014 and built it into the center of a broad oncology program.",
      },
      {
        year: 2019,
        then: "Keytruda is approved across multiple cancers and is increasingly important to Merck's growth. Gardasil and animal health provide other pillars, while Januvia and Keytruda concentration make lifecycle management critical.",
        after: "Keytruda gained additional indications and combinations, and Merck separated Organon in 2021 with established brands and women's-health products.",
      },
    ],
    recentArc:
      "Through 2024, Merck added Prometheus Biosciences and its immunology asset, agreed to acquire Harpoon Therapeutics, expanded Winrevair after U.S. approval, and continued preparing for eventual Keytruda patent pressure.",
  },
  LLY: {
    stakes:
      "Eli Lilly had to replace successive neuroscience and diabetes blockbusters; its fortunes moved from Prozac and Zyprexa through Cymbalta and Trulicity to oncology and incretin medicines.",
    moments: [
      {
        year: 2000,
        then: "Prozac and Zyprexa dominate Lilly's neuroscience portfolio, while Humalog is strengthening its diabetes franchise. Prozac's main U.S. patent is under challenge, making pipeline execution unusually important.",
        after: "Generic fluoxetine sharply reduced Prozac sales after patent protection ended, and Zyprexa later generated both large sales and costly product-liability settlements.",
      },
      {
        year: 2007,
        then: "Cymbalta is growing in depression and pain, Byetta gives Lilly a foothold in the young GLP-1 market through its alliance with Amylin, and Alimta supports oncology. Zyprexa litigation and patent dependence remain material.",
        after: "Cymbalta became a major product before losing U.S. exclusivity, and Lilly ended its Byetta alliance after Bristol-Myers Squibb acquired Amylin.",
      },
      {
        year: 2013,
        then: "Lilly is approaching Cymbalta's U.S. patent expiry after earlier losses of Zyprexa and Gemzar exclusivity. Its late-stage pipeline includes dulaglutide for diabetes, while animal health and established insulin products provide support.",
        after: "Dulaglutide launched as Trulicity in 2014, and Lilly later added Taltz, Verzenio, and Jardiance alliance revenue to its growth portfolio.",
      },
      {
        year: 2023,
        then: "Mounjaro has been approved for type 2 diabetes, joining Trulicity, Jardiance, Verzenio, and Taltz. Manufacturing capacity and additional tirzepatide uses are now central strategic questions.",
        after: "The FDA approved tirzepatide as Zepbound for chronic weight management in 2023, and Lilly committed heavily to expanding incretin manufacturing.",
      },
    ],
    recentArc:
      "Through 2024, Lilly expanded Mounjaro and Zepbound supply, launched Kisunla for early symptomatic Alzheimer's disease after FDA approval, and continued investing in injectable and active-ingredient capacity.",
  },
  UNH: {
    stakes:
      "UnitedHealth balanced insurance underwriting with the faster-growing Optum services platform; medical-cost trends, government reimbursement, acquisitions, and scrutiny of vertical integration determined how durable that model remained.",
    moments: [
      {
        year: 2000,
        then: "UnitedHealth provides employer health coverage and administers benefits through UnitedHealthcare. The company is recovering from earlier operational and pricing problems under chief executive William McGuire.",
        after: "UnitedHealth restored underwriting discipline and expanded nationally, while McGuire resigned in 2006 amid an options-backdating investigation.",
      },
      {
        year: 2007,
        then: "UnitedHealthcare has a large commercial and government membership base, and Ingenix sells health data and technology services. Leadership has passed to Stephen Hemsley after the options-backdating controversy.",
        after: "Ingenix was later renamed OptumInsight, and UnitedHealth assembled Optum into health-services, pharmacy-benefit, and care-delivery businesses.",
      },
      {
        year: 2013,
        then: "UnitedHealth combines insurance with the newly branded Optum platform, including OptumRx and care services. Affordable Care Act implementation and Medicare payment policy are immediate operating uncertainties.",
        after: "Optum expanded through acquisitions and organic growth, becoming a major provider of pharmacy benefits, clinics, analytics, and health-system services.",
      },
      {
        year: 2023,
        then: "UnitedHealthcare leads U.S. managed care, while Optum spans pharmacy benefits, physician groups, and technology. The Change Healthcare acquisition has closed after the government unsuccessfully challenged the deal.",
        after: "UnitedHealth integrated Change Healthcare into OptumInsight, broadening its role in claims and payment infrastructure.",
      },
    ],
    recentArc:
      "In 2024, a cyberattack on Change Healthcare disrupted claims and payments across the U.S. health system; UnitedHealth restored services while facing congressional, antitrust, and provider scrutiny.",
  },
  ABT: {
    stakes:
      "Abbott repeatedly remade itself around devices, diagnostics, nutrition, and selected medicines; the AbbVie separation clarified that portfolio, while recalls and acquisition integration remained company-specific execution risks.",
    moments: [
      {
        year: 2000,
        then: "Abbott combines hospital diagnostics, Ross nutrition, vascular and hospital products, and pharmaceuticals led by Depakote and Biaxin. Its breadth reduces reliance on one market but makes research and capital allocation diffuse.",
        after: "Abbott expanded devices through Guidant's vascular business and built Humira into a major pharmaceutical product before separating that drug franchise.",
      },
      {
        year: 2007,
        then: "Humira is growing in autoimmune disease, and Abbott has acquired Guidant's vascular-intervention assets, including drug-eluting stents. Diagnostics and Ensure and Similac nutrition products remain large non-drug businesses.",
        after: "Humira became the pharmaceutical division's principal product, while Xience established Abbott as a leader in drug-eluting coronary stents.",
      },
      {
        year: 2013,
        then: "Abbott has separated its research-based pharmaceutical business as AbbVie. The remaining Abbott is centered on diagnostics, nutrition, generic medicines outside developed markets, and devices including Xience.",
        after: "Abbott rebuilt its device portfolio by acquiring St. Jude Medical and expanded rapid diagnostics by acquiring Alere.",
      },
      {
        year: 2022,
        then: "FreeStyle Libre has made continuous glucose monitoring a major growth platform, while the Alinity diagnostics systems and pandemic tests support diagnostics. Similac and other nutrition brands retain substantial manufacturing and quality responsibilities.",
        after: "Abbott recalled certain powdered infant formulas from its Sturgis plant in 2022 and temporarily halted production during an FDA investigation, contributing to a U.S. formula shortage.",
      },
    ],
    recentArc:
      "Through 2024, Abbott expanded FreeStyle Libre, structural-heart devices, and its diagnostics installed base, while resolving operational consequences of the infant-formula recall and competing in rapidly evolving glucose monitoring.",
  },
  AMGN: {
    stakes:
      "Amgen had to extend a biotechnology franchise built on Epogen and Neupogen into new therapeutic areas while biosimilars challenged mature products and large acquisitions changed its research profile.",
    moments: [
      {
        year: 2000,
        then: "Epogen and Neupogen define Amgen's biotechnology franchise, and the company is developing Aranesp and pegylated Neulasta as next-generation versions. Dependence on a small group of blood-cell products concentrates clinical and reimbursement risk.",
        after: "Aranesp and Neulasta became major products, although safety warnings and reimbursement changes later constrained the anemia-drug market.",
      },
      {
        year: 2003,
        then: "Amgen has acquired Immunex and its rheumatoid-arthritis medicine Enbrel. Aranesp and Neulasta are newly commercialized, giving the company several biologic franchises to manufacture and defend.",
        after: "Enbrel became one of Amgen's largest products, and the company used its biologics manufacturing scale to broaden into oncology and bone health.",
      },
      {
        year: 2012,
        then: "Enbrel, Neulasta, and Aranesp still lead sales, while Prolia and Xgeva are establishing the denosumab bone-health franchise. Amgen has agreed to acquire Micromet and its bispecific-antibody platform.",
        after: "Prolia and Xgeva became major products, and Micromet's technology produced the leukemia medicine Blincyto.",
      },
      {
        year: 2023,
        then: "Prolia, Enbrel, Otezla, Repatha, and a growing biosimilars business support Amgen. The company has agreed to buy Horizon Therapeutics, whose rare-disease portfolio includes Tepezza and Krystexxa, but the transaction remains subject to review.",
        after: "Amgen completed the Horizon Therapeutics acquisition in 2023 after resolving the Federal Trade Commission's challenge.",
      },
    ],
    recentArc:
      "Through 2024, Amgen integrated Tepezza, Krystexxa, and Uplizna, expanded its biosimilars portfolio, and advanced the obesity candidate MariTide while managing mature-product competition.",
  },
  BDX: {
    stakes:
      "Becton Dickinson's recurring needles, syringes, and diagnostic consumables offered resilience, but product quality, hospital budgets, and the integration of CareFusion and C. R. Bard determined the value of its expansion into larger medical systems.",
    moments: [
      {
        year: 2000,
        then: "BD sells Vacutainer blood-collection systems, needles, syringes, and diagnostic instruments used routinely by hospitals and laboratories. Safety-engineered sharps are becoming more important as needlestick regulation advances.",
        after: "U.S. needlestick-safety requirements accelerated adoption of protected needles and collection devices, strengthening BD's safety-products franchise.",
      },
      {
        year: 2007,
        then: "BD has expanded molecular diagnostics and cell analysis while retaining its large medical-supplies base. The FACS flow-cytometry platform and safety devices tie instrument placements to recurring consumables.",
        after: "BD continued investing in diagnostics and medication management, then moved into hospital equipment through a much larger transaction.",
      },
      {
        year: 2016,
        then: "BD has acquired CareFusion, adding Alaris infusion pumps, Pyxis medication dispensing, and respiratory products. Integrating connected hospital systems now matters alongside its traditional disposable devices.",
        after: "BD integrated CareFusion and acquired C. R. Bard in 2017, adding vascular, urology, oncology, and surgical devices.",
      },
      {
        year: 2023,
        then: "BD spans medication delivery, Alaris infusion systems, interventional devices from Bard, and life-science diagnostics. The company is working through remediation and regulatory restrictions affecting Alaris pumps.",
        after: "BD received FDA clearance for an updated Alaris infusion system in 2023 and began returning the platform to the U.S. market.",
      },
    ],
    recentArc:
      "Through 2024, BD expanded Alaris availability, launched new diagnostic and interventional products, and continued its BD Excellence operating program while addressing product-quality obligations.",
  },
  BIIB: {
    stakes:
      "Biogen's identity shifted from multiple-sclerosis leadership toward neuroscience bets with much less predictable clinical and regulatory paths; Tecfidera concentration and the Aduhelm controversy made that transition especially visible.",
    moments: [
      {
        year: 2000,
        then: "Biogen's Avonex is a leading interferon treatment for relapsing multiple sclerosis, and the company remains a focused biotechnology firm. Its scale and pipeline are narrow compared with diversified drugmakers.",
        after: "Biogen merged with IDEC Pharmaceuticals in 2003, adding Rituxan economics and creating Biogen Idec.",
      },
      {
        year: 2007,
        then: "Biogen Idec markets Avonex and has returned Tysabri to the market with restricted distribution after cases of progressive multifocal leukoencephalopathy. Rituxan, partnered with Genentech, supplies another important earnings stream.",
        after: "Tysabri use expanded under safety monitoring, and Biogen developed additional oral and longer-acting multiple-sclerosis therapies.",
      },
      {
        year: 2016,
        then: "Tecfidera has become Biogen's largest multiple-sclerosis product, alongside Avonex, Tysabri, and Plegridy. The company has resumed late-stage development of aducanumab for Alzheimer's disease after an encouraging early study.",
        after: "Aducanumab produced conflicting trial interpretations and was approved as Aduhelm in 2021 through the FDA's accelerated-approval pathway, prompting intense scientific and reimbursement controversy.",
      },
      {
        year: 2022,
        then: "Aduhelm has received limited uptake as Medicare prepares a national coverage decision and several medical centers decline to use it. Biogen is cutting costs while working with Eisai on lecanemab and defending a mature multiple-sclerosis franchise.",
        after: "Biogen withdrew Aduhelm from the market in 2024 and shifted Alzheimer's commercialization attention to Eisai-led Leqembi.",
      },
    ],
    recentArc:
      "Through 2024, Biogen launched the postpartum-depression medicine Zurzuvae with Sage, acquired Reata and Skyclarys, supported Leqembi, and reorganized under chief executive Christopher Viehbacher.",
  },
  BMY: {
    stakes:
      "Bristol Myers Squibb repeatedly used partnerships and acquisitions to replace expiring blockbusters; Plavix gave way to immuno-oncology, and Celgene added both growth products and another patent clock.",
    moments: [
      {
        year: 2000,
        then: "Bristol-Myers Squibb combines prescription drugs such as Taxol, Pravachol, and Plavix with Mead Johnson nutrition and consumer products. Several important medicines rely on partners or licenses, complicating control of the portfolio.",
        after: "Plavix became a major cardiovascular product, while accounting problems and patent expirations pushed Bristol-Myers toward a more focused biopharmaceutical strategy.",
      },
      {
        year: 2007,
        then: "Plavix has returned to the U.S. market without authorized generic competition after a disputed settlement collapsed. Bristol-Myers is narrowing around pharmaceuticals under James Cornelius and advancing biologics such as Orencia.",
        after: "The company sold or separated noncore businesses, including Mead Johnson, and adopted a 'string of pearls' strategy of smaller biotechnology deals and partnerships.",
      },
      {
        year: 2016,
        then: "Opdivo and Yervoy have made immuno-oncology central to Bristol-Myers, while Eliquis is growing through the Pfizer alliance. Competition from Merck's Keytruda makes lung-cancer trial results strategically important.",
        after: "Opdivo remained a major oncology franchise but lost ground to Keytruda in key first-line lung-cancer settings; Eliquis became another principal product.",
      },
      {
        year: 2020,
        then: "Bristol-Myers has completed its acquisition of Celgene, adding Revlimid, Pomalyst, and the late-stage assets luspatercept and ozanimod. Integration and the approaching Revlimid patent decline now define the combined company.",
        after: "The company launched Reblozyl and Zeposia, gained cell therapies Abecma and Breyanzi, and faced generic Revlimid entry under settlement agreements.",
      },
    ],
    recentArc:
      "Through 2024, Bristol Myers added Karuna Therapeutics and Mirati Therapeutics, launched schizophrenia medicine Cobenfy after FDA approval, and relied on newer products to offset Revlimid, Eliquis, and Opdivo exclusivity pressures.",
  },
  BSX: {
    stakes:
      "Boston Scientific competed through interventional devices whose adoption could shift quickly with clinical evidence; the Guidant acquisition created years of debt and quality work before electrophysiology and structural heart revived the portfolio.",
    moments: [
      {
        year: 2000,
        then: "Boston Scientific sells minimally invasive devices for cardiology, radiology, endoscopy, and urology. Coronary stents and catheters support growth, but recalls and FDA scrutiny have exposed weaknesses in manufacturing controls.",
        after: "Boston Scientific resolved major FDA quality issues and later entered the drug-eluting-stent market with Taxus.",
      },
      {
        year: 2007,
        then: "Boston Scientific has acquired Guidant after outbidding Johnson & Johnson, adding implantable defibrillators and pacemakers. The deal brought heavy debt just as safety concerns and competition pressure both Guidant devices and the Taxus stent.",
        after: "The company spent years reducing debt, divesting assets, and repairing quality systems while drug-eluting-stent growth slowed.",
      },
      {
        year: 2016,
        then: "The FDA has approved the Watchman left-atrial-appendage closure device, and Boston Scientific has rebuilt around rhythm management, endoscopy, peripheral intervention, and urology. Watchman's commercial adoption remains an execution test.",
        after: "Watchman became a major structural-heart platform, and acquisitions broadened Boston Scientific in electrophysiology, urology, and peripheral vascular care.",
      },
      {
        year: 2023,
        then: "Watchman FLX, Farapulse pulsed-field ablation outside the United States, and the Exalt disposable duodenoscope illustrate a portfolio focused on less-invasive procedures. The Baylis Medical acquisition has added transseptal-access tools.",
        after: "The FDA approved Farapulse in 2024, giving Boston Scientific a U.S. pulsed-field ablation system for atrial fibrillation.",
      },
    ],
    recentArc:
      "Through 2024, Boston Scientific expanded Farapulse and Watchman, completed its Axonics acquisition after regulatory review, and continued acquiring specialized interventional technologies.",
  },
  CI: {
    stakes:
      "Cigna's health-insurance underwriting was transformed by the Express Scripts purchase into a benefits-and-services model; medical costs, pharmacy economics, and repeated strategic deal choices remained the core tension.",
    moments: [
      {
        year: 2000,
        then: "Cigna combines employer health coverage with life, disability, retirement, and international insurance. Managed-care pricing and medical-cost estimates determine whether its broad benefits portfolio earns acceptable margins.",
        after: "Cigna experienced severe health-plan service and pricing problems, changed leadership, and later sold its retirement business to Prudential.",
      },
      {
        year: 2007,
        then: "Cigna is focused more tightly on employer health and related benefits after selling retirement operations. H. Edward Hanway is emphasizing service recovery, consumer-directed plans, and disciplined medical-cost pricing.",
        after: "Cigna restored operating performance and expanded internationally and in Medicare through acquisitions.",
      },
      {
        year: 2016,
        then: "Cigna has agreed to be acquired by Anthem, but the large insurer combination faces Justice Department review. Cigna still derives much of its business from employer plans, international coverage, and specialty benefits.",
        after: "Federal courts blocked the Anthem merger on competition grounds, and the companies terminated the agreement in 2017 after extensive litigation.",
      },
      {
        year: 2019,
        then: "Cigna has completed its acquisition of Express Scripts, adding a major pharmacy-benefit manager and specialty-pharmacy operation. Integrating those services with the insurance business now drives the strategy.",
        after: "Cigna organized Express Scripts and other health services under the Evernorth brand while retaining Cigna Healthcare for insurance.",
      },
    ],
    recentArc:
      "Through 2024, Cigna expanded Evernorth, agreed to sell its Medicare Advantage business to Health Care Service Corporation, and ended reported merger discussions with Humana while pharmacy-benefit practices drew political scrutiny.",
  },
  CVS: {
    stakes:
      "CVS evolved from a drugstore chain into a vertically integrated pharmacy-benefit, insurance, and care-delivery company; each expansion increased both customer reach and regulatory and integration complexity.",
    moments: [
      {
        year: 2000,
        then: "CVS operates neighborhood pharmacies where prescriptions drive repeat visits and front-store sales. Scale in store locations and pharmacy purchasing matters, but the business remains primarily retail.",
        after: "CVS expanded its national footprint through acquisitions including Eckerd stores and Sav-on and Osco locations.",
      },
      {
        year: 2007,
        then: "CVS has agreed to merge with Caremark, a pharmacy-benefit manager that administers drug plans and mail-order prescriptions. The transaction would join retail pharmacies with a large purchaser of medicines.",
        after: "CVS completed the Caremark merger in 2007, creating a combined retail and pharmacy-benefit business.",
      },
      {
        year: 2016,
        then: "CVS Health has stopped selling tobacco, acquired Target's pharmacy and clinic operations, and purchased Omnicare's long-term-care pharmacy business. MinuteClinic and Caremark extend the company beyond traditional drugstores.",
        after: "CVS integrated the Target pharmacies and later pursued health insurance as another step toward coordinated care.",
      },
      {
        year: 2019,
        then: "CVS has completed its acquisition of Aetna after regulatory approval, combining stores, Caremark pharmacy benefits, clinics, and a national insurer. Debt reduction and integration of these different businesses are immediate priorities.",
        after: "CVS opened HealthHUB formats, used Aetna and Caremark in an integrated model, and later added Signify Health and Oak Street Health.",
      },
    ],
    recentArc:
      "Through 2024, CVS integrated Signify Health's home assessments and Oak Street Health's primary-care centers, faced elevated Aetna medical costs, changed leadership to David Joyner, and announced a broad cost-reduction effort.",
  },
  DHR: {
    stakes:
      "Danaher's acquisition system and operating discipline turned an industrial conglomerate into a life-sciences and diagnostics specialist; serial dealmaking, portfolio separations, and post-pandemic demand normalization tested that model.",
    moments: [
      {
        year: 2000,
        then: "Danaher owns a decentralized collection of tools, controls, environmental, and industrial-technology businesses. The Danaher Business System applies lean manufacturing and cash discipline across acquired companies.",
        after: "Danaher used its operating system and repeated acquisitions to move progressively into medical diagnostics, water quality, and life sciences.",
      },
      {
        year: 2007,
        then: "Danaher has added Leica Microsystems and KaVo dental equipment to established platforms including Fluke instruments and Hach water analysis. Acquisition integration remains as important as end-market demand.",
        after: "Danaher completed the Tektronix acquisition and continued reshaping the portfolio toward higher-recurring-revenue scientific and medical markets.",
      },
      {
        year: 2019,
        then: "Danaher has separated Fortive and is centered more heavily on life sciences, diagnostics, dental, and environmental platforms including Beckman Coulter, Leica, and Pall. It has announced that the dental unit will become the separately traded Envista.",
        after: "Danaher completed the Envista separation in 2019 and announced the purchase of GE's biopharma business, later named Cytiva.",
      },
      {
        year: 2023,
        then: "Cytiva, Pall, Cepheid, and Beckman Coulter make bioprocessing and diagnostics the core of Danaher. The company has announced plans to separate Environmental & Applied Solutions as Veralto.",
        after: "Danaher completed the Veralto separation in 2023 and acquired Abcam, adding research antibodies and related tools.",
      },
    ],
    recentArc:
      "Through 2024, Danaher integrated Abcam and managed a sharp normalization in bioprocessing and COVID-related diagnostics demand while retaining Cytiva, Pall, Cepheid, and Beckman Coulter as its principal platforms.",
  },
  GILD: {
    stakes:
      "Gilead's antiviral expertise produced dominant HIV and hepatitis C franchises, but the curative nature of HCV therapy created its own decline and pushed the company toward oncology through costly acquisitions.",
    moments: [
      {
        year: 2000,
        then: "Gilead is a small antiviral specialist with Vistide and Tamiflu royalty interests, and its current commercial base remains limited. The key research question is whether its nucleotide chemistry can support larger chronic-disease products.",
        after: "Gilead launched Viread for HIV in 2001 and built a succession of combination therapies around tenofovir.",
      },
      {
        year: 2007,
        then: "Truvada and Atripla have established Gilead as a leader in once-daily HIV treatment, while Viread remains foundational. The company has completed the Myogen acquisition to add the pulmonary-hypertension medicine Letairis.",
        after: "Gilead expanded single-tablet HIV regimens and acquired Pharmasset in 2012 for the hepatitis C compound that became sofosbuvir.",
      },
      {
        year: 2016,
        then: "Sovaldi and Harvoni have transformed hepatitis C treatment and made that franchise Gilead's largest business, while HIV products remain durable. Rapid patient treatment, payer discounts, and rival cures make the longevity of HCV revenue uncertain.",
        after: "Hepatitis C sales declined as the treated patient pool fell and competition increased, while newer HIV regimens including Biktarvy became central.",
      },
      {
        year: 2022,
        then: "Biktarvy anchors HIV, Veklury is used for hospitalized COVID-19 patients, and the Kite acquisition supplies Yescarta and Tecartus cell therapies. Trodelvy, acquired with Immunomedics, is the principal new solid-tumor oncology asset.",
        after: "Gilead expanded Trodelvy and its cell-therapy franchise while continuing to depend heavily on HIV medicines.",
      },
    ],
    recentArc:
      "Through 2024, Gilead broadened Biktarvy use, reported pivotal prevention results for twice-yearly lenacapavir, expanded cell therapy, and absorbed the setback from Trodelvy's failed confirmatory lung-cancer study.",
  },
  HUM: {
    stakes:
      "Humana deliberately concentrated on Medicare Advantage and senior care, gaining focus but increasing exposure to government rates, risk adjustment, utilization, and the economics of owned clinics and home health.",
    moments: [
      {
        year: 2000,
        then: "Humana has exited the hospital business it once built and now operates health plans, with significant Medicare and military-program exposure. Medical-cost forecasting and government contracts dominate the risk.",
        after: "Humana expanded Medicare plans and the TRICARE military business while reducing dependence on less profitable commercial accounts.",
      },
      {
        year: 2007,
        then: "Medicare Advantage and Part D are becoming increasingly important after the new prescription benefit began in 2006. Humana's growth now depends heavily on serving seniors under federal payment formulas.",
        after: "Humana became one of the largest Medicare Advantage insurers and added pharmacy, wellness, and care-management capabilities.",
      },
      {
        year: 2019,
        then: "Humana remains independent after courts blocked its proposed sale to Aetna. It has partnered with private-equity firms in Kindred at Home and is building primary-care clinics aimed at Medicare members.",
        after: "Humana acquired full control of Kindred at Home, later rebranded its healthcare services businesses under CenterWell, and expanded senior-focused clinics.",
      },
      {
        year: 2023,
        then: "Humana is concentrated in Medicare Advantage, with CenterWell providing primary care, pharmacy, and home health. Rising medical utilization and annual federal rate decisions can materially change plan economics.",
        after: "Higher-than-expected Medicare Advantage utilization pressured Humana's results, and the company reset pricing and benefit plans for subsequent enrollment periods.",
      },
    ],
    recentArc:
      "Through 2024, Humana managed elevated inpatient and outpatient utilization, expanded CenterWell clinics, prepared for Medicare Advantage reimbursement changes, and named Jim Rechtin to succeed Bruce Broussard as chief executive.",
  },
  ISRG: {
    stakes:
      "Intuitive Surgical had to turn da Vinci from an expensive capital purchase into a widely used surgical platform; procedure evidence, surgeon training, hospital budgets, and recurring instruments drove each stage of adoption.",
    moments: [
      {
        year: 2000,
        then: "Intuitive Surgical is still trying to move robotic surgery from laboratory promise into operating rooms. Its da Vinci system places the surgeon at a console controlling wristed instruments, but broad FDA clearance, hospital budgets, and surgeon acceptance remain unsettled.",
        after: "Intuitive Surgical gained FDA clearance for the da Vinci system in 2000 and completed its initial public offering later that year.",
      },
      {
        year: 2003,
        then: "The da Vinci system has FDA clearances for several laparoscopic procedures, while Computer Motion's Zeus remains a competing robotic platform. Hospitals must still justify the systems' cost and train surgeons to use a new operating method.",
        after: "Intuitive acquired rival Computer Motion in 2003, standardized the combined robotic-surgery platform around da Vinci, and expanded its installed base through urology and gynecology procedures.",
      },
      {
        year: 2007,
        then: "Da Vinci is increasingly used in prostatectomy, and the newer da Vinci S offers improved reach and imaging. System sales create an installed base that consumes proprietary instruments and accessories.",
        after: "Procedure growth broadened beyond prostatectomy, and recurring instrument, accessory, and service revenue became increasingly important.",
      },
      {
        year: 2016,
        then: "The da Vinci Xi is replacing earlier systems, while the company is developing the smaller-platform opportunity that became Ion. Questions persist about cost, comparative evidence, and adoption outside established procedures.",
        after: "Intuitive expanded Xi placements, introduced the single-port da Vinci SP, and gained clearance for the Ion robotic bronchoscopy platform.",
      },
      {
        year: 2023,
        then: "Da Vinci Xi and SP support a large global procedure base, and Ion extends robotics into lung-biopsy navigation. Hospital staffing and capital budgets have normalized unevenly after the pandemic.",
        after: "Intuitive received FDA clearance for da Vinci 5 in 2024 and began a measured commercial rollout.",
      },
    ],
    recentArc:
      "Through 2024, Intuitive launched da Vinci 5, expanded Ion and SP use, and continued shifting economics toward procedures, instruments, services, and operating leases around a growing installed base.",
  },
  MDT: {
    stakes:
      "Medtronic's pacemaker heritage expanded into a broad device portfolio through acquisitions, but product recalls, procedure cycles, and the Covidien integration repeatedly tested whether scale improved innovation.",
    moments: [
      {
        year: 2000,
        then: "Medtronic leads in pacemakers and implantable defibrillators and has expanded into spinal, neurological, and vascular devices. Product reliability and physician adoption matter as much as the aging population.",
        after: "Medtronic broadened further in diabetes, spine, and cardiovascular devices, while several lead and device recalls underscored quality risk.",
      },
      {
        year: 2007,
        then: "Cardiac rhythm devices remain central, while the MiniMed insulin-pump business, spinal products, and neurological stimulation provide diversification. Product reliability, hospital purchasing, and competition from Guidant and St. Jude Medical shape the device franchise.",
        after: "Medtronic suspended Sprint Fidelis lead distribution in 2007 after observing elevated fracture risk and followed affected patients under regulatory oversight.",
      },
      {
        year: 2016,
        then: "Medtronic has acquired Covidien and moved its legal domicile to Ireland, adding surgical stapling, patient monitoring, and vascular products. Omar Ishrak must integrate the enlarged company while sustaining innovation in cardiac and diabetes devices.",
        after: "Medtronic integrated Covidien, acquired Mazor Robotics for spine surgery, and developed the Hugo robotic-assisted surgery system.",
      },
      {
        year: 2023,
        then: "Medtronic spans cardiac rhythm, diabetes, neuroscience, surgical products, and transcatheter valves. The company has announced plans to separate patient monitoring and respiratory interventions, while Hugo remains in staged international rollout.",
        after: "Medtronic later decided to retain the patient-monitoring and respiratory businesses and continued investing in Hugo and pulsed-field ablation.",
      },
    ],
    recentArc:
      "Through 2024, Medtronic advanced the PulseSelect pulsed-field ablation system after FDA approval, expanded MiniMed 780G in the United States, and continued Hugo clinical development under chief executive Geoff Martha.",
  },
  ABBV: {
    stakes:
      "AbbVie began life overwhelmingly dependent on Humira; its central challenge was to use that cash flow to build immunology, oncology, neuroscience, and aesthetics franchises before biosimilar competition arrived.",
    moments: [
      {
        year: 2013,
        then: "AbbVie has separated from Abbott with Humira as its dominant product and a portfolio that includes Kaletra, Synthroid, and Lupron. The new company must allocate Humira cash flows while preparing for eventual patent loss.",
        after: "AbbVie expanded Humira into additional indications and used acquisitions and partnerships to diversify beyond the medicine.",
      },
      {
        year: 2016,
        then: "AbbVie has acquired Pharmacyclics and its share of Imbruvica, adding a major blood-cancer franchise. Humira still supplies most operating profit, while hepatitis C medicine Viekira faces intense competition.",
        after: "Imbruvica became a major oncology product, and AbbVie developed Skyrizi and Rinvoq as intended successors in immunology.",
      },
      {
        year: 2020,
        then: "Skyrizi and Rinvoq are newly launched, Imbruvica anchors oncology, and AbbVie has agreed to acquire Allergan for Botox, aesthetics, eye care, and neuroscience products. The transaction remains subject to regulatory clearance.",
        after: "AbbVie completed the Allergan acquisition in 2020 and added Botox Therapeutic, Botox Cosmetic, Vraylar, and Juvederm.",
      },
      {
        year: 2023,
        then: "U.S. Humira biosimilars are about to enter after years of patent settlements. AbbVie is relying on Skyrizi and Rinvoq in immunology, with Botox, Vraylar, and Imbruvica supplying other major franchises.",
        after: "Humira faced U.S. biosimilar competition beginning in 2023, while Skyrizi and Rinvoq continued expanding across approved immune-disease uses.",
      },
    ],
    recentArc:
      "Through 2024, AbbVie completed acquisitions of ImmunoGen and Cerevel Therapeutics, adding Elahere and a neuroscience pipeline, while Skyrizi and Rinvoq increasingly offset Humira's decline.",
  },
  XOM: {
    stakes:
      "Exxon Mobil's integrated scale tied long-lived upstream projects to refining and chemicals, but commodity cycles, capital discipline, climate policy, and the strategic turn toward U.S. shale repeatedly changed the pressure on management.",
    moments: [
      {
        year: 2000,
        then: "Exxon and Mobil have completed their merger, combining global oil and gas production with refining, chemicals, and the Exxon, Mobil, and Esso brands. Lee Raymond is focused on integration, cost control, and investing only in projects that clear strict return thresholds.",
        after: "Exxon Mobil integrated the two companies and pursued large projects in Qatar, West Africa, Russia, and other long-cycle resource regions.",
      },
      {
        year: 2008,
        then: "Exxon Mobil is benefiting from high crude prices and major upstream developments including Qatar LNG and Sakhalin-1. Its refining and chemical operations provide integration, but project costs and access to new reserves are rising.",
        after: "Oil prices collapsed during the financial crisis, and Exxon later acquired XTO Energy to build a larger position in unconventional U.S. natural gas.",
      },
      {
        year: 2016,
        then: "The XTO acquisition has made Exxon a major shale producer, but the oil-price collapse has pressured upstream earnings and project spending. Rex Tillerson continues to favor integrated scale and large developments despite a growing climate-policy debate.",
        after: "Darren Woods succeeded Tillerson in 2017, and Exxon increased spending in the Permian Basin and offshore Guyana.",
      },
      {
        year: 2023,
        then: "Guyana and the Permian Basin are central growth assets after Exxon cut costs and maintained investment through the pandemic downturn. The company is also developing carbon-capture, hydrogen, and biofuels options under its Low Carbon Solutions unit.",
        after: "Exxon agreed to acquire Pioneer Natural Resources in 2023 and completed the transaction in 2024, greatly enlarging its Permian position.",
      },
    ],
    recentArc:
      "Through 2024, Exxon integrated Pioneer, advanced additional Guyana developments with Hess and CNOOC, pursued a large Gulf Coast carbon-capture network, and arbitrated with Chevron over preemption rights tied to Hess's Guyana stake.",
  },
  CVX: {
    stakes:
      "Chevron combined upstream megaprojects with refining strength, making execution at Tengiz, Australian LNG, and later U.S. shale as important as oil prices; the proposed Hess deal added Guyana and a major contractual dispute.",
    moments: [
      {
        year: 2000,
        then: "Chevron begins 2000 as a standalone integrated oil major, producing from places such as California, the Gulf of Mexico, and Kazakhstan's Tengiz field while also refining and selling fuel. Oil prices are recovering from their late-1990s collapse, putting capital discipline back under scrutiny.",
        after: "Chevron entered the decade as an independent integrated producer before agreeing later in 2000 to combine with Texaco.",
      },
      {
        year: 2003,
        then: "ChevronTexaco is integrating the 2001 merger of Chevron and Texaco across upstream, refining, and branded fuel operations. The combined company has broad international reserves but also complex partnerships and legacy liabilities.",
        after: "ChevronTexaco completed integration, sold overlapping assets, and shortened its name to Chevron in 2005.",
      },
      {
        year: 2007,
        then: "Chevron has absorbed Unocal, adding Asian natural-gas and deepwater assets. It is sanctioning or developing large projects such as Gorgon LNG and expanding Tengiz while high construction costs test project discipline.",
        after: "Gorgon became one of Chevron's largest investments and experienced delays and cost increases before producing LNG.",
      },
      {
        year: 2016,
        then: "Chevron is cutting spending and selling assets after the oil-price collapse, while the Gorgon LNG project in Australia approaches startup. The company must finish megaprojects and protect its balance sheet in a lower-price environment.",
        after: "Gorgon began production in 2016, and Chevron later increased its Permian Basin focus while acquiring Noble Energy.",
      },
      {
        year: 2023,
        then: "Chevron combines Permian shale, Tengiz, Australian LNG, Gulf of Mexico production, refining, and the Renewable Energy Group acquisition. The Future Growth Project in Kazakhstan remains a large execution commitment.",
        after: "Chevron agreed to acquire Hess in 2023, but closing became contingent on arbitration over Exxon Mobil's claimed preemption rights in the Stabroek Block.",
      },
    ],
    recentArc:
      "Through 2024, Chevron advanced the Tengiz expansion, increased Permian production, and pursued regulatory approvals for Hess while the Guyana partnership arbitration remained unresolved.",
  },
  HAL: {
    stakes:
      "Halliburton's fortunes followed customer drilling and completion budgets, while KBR's asbestos liabilities and the failed Baker Hughes merger showed how corporate structure and antitrust risk could matter alongside oilfield technology.",
    moments: [
      {
        year: 2000,
        then: "Halliburton combines oilfield services with the Brown & Root engineering and construction business under chief executive Dick Cheney. Energy Services supplies drilling, cementing, and completion work, while legacy construction claims complicate the group.",
        after: "Cheney left in August 2000 to run for vice president. Asbestos claims inherited through Dresser later pushed Halliburton toward a court-supervised settlement, and the company reorganized engineering activities under KBR.",
      },
      {
        year: 2003,
        then: "Halliburton is negotiating a global settlement of asbestos claims tied to Dresser and faces scrutiny of KBR's government work. Rising international drilling helps Energy Services, but legal uncertainty dominates capital allocation.",
        after: "Cheney left in August 2000 to run for vice president. Halliburton later completed an asbestos and silica settlement through Chapter 11 proceedings for affected subsidiaries and separated KBR.",
      },
      {
        year: 2016,
        then: "Halliburton has agreed to buy Baker Hughes, but regulators are challenging overlaps across oilfield services. At the same time, the oil-price collapse is forcing producers to cut drilling and pressure service prices.",
        after: "Halliburton and Baker Hughes terminated the merger in 2016 after antitrust opposition, and Halliburton paid the agreed termination fee.",
      },
      {
        year: 2022,
        then: "Halliburton is focused on drilling, evaluation, and completion services after years of North American shale retrenchment. Tight equipment supply and recovering activity are improving service-market conditions, while international spending is also returning.",
        after: "Halliburton emphasized pricing, capital discipline, and its electric-fracturing and digital offerings as producers increased activity after the pandemic.",
      },
    ],
    recentArc:
      "Through 2024, Halliburton expanded Zeus electric fracturing, Sensori fracture monitoring, and digital well services while balancing a mature North American market with stronger international activity.",
  },
  COP: {
    stakes:
      "ConocoPhillips transformed from an integrated refiner-producer into a focused exploration company; portfolio sales, shale acquisitions, and exposure to Alaska and LNG made capital allocation the defining issue.",
    moments: [
      {
        year: 2003,
        then: "Conoco and Phillips Petroleum have completed their merger, creating an integrated company with upstream production, refining, chemicals interests, and fuel marketing. Management is integrating overlapping assets while carrying substantial commodity exposure.",
        after: "ConocoPhillips integrated the merger and expanded through the 2006 acquisition of Burlington Resources.",
      },
      {
        year: 2007,
        then: "The Burlington Resources acquisition has added large North American natural-gas holdings. ConocoPhillips also owns major refining capacity and a stake in Russia's Lukoil, making the portfolio broad but capital intensive.",
        after: "The financial crisis and lower commodity prices prompted writedowns, asset sales, and a reassessment of the integrated structure.",
      },
      {
        year: 2013,
        then: "ConocoPhillips has spun off refining, chemicals, and midstream operations as Phillips 66. The remaining company is a pure exploration-and-production business with assets in U.S. shale, Alaska, Canada, Europe, and Asia-Pacific.",
        after: "ConocoPhillips sold noncore assets, exited deepwater exploration in several regions, and concentrated investment on lower-cost resources.",
      },
      {
        year: 2022,
        then: "ConocoPhillips has acquired Concho Resources and Shell's Permian assets, making the basin central to the portfolio. Alaska, Qatar LNG interests, and other international production provide diversification.",
        after: "ConocoPhillips integrated the Permian acquisitions and approved the Willow project in Alaska after federal authorization in 2023.",
      },
    ],
    recentArc:
      "Through 2024, ConocoPhillips advanced Willow, expanded its Qatar LNG interests, and agreed to acquire Marathon Oil to add U.S. shale and Equatorial Guinea assets.",
  },
  DUK: {
    stakes:
      "Duke Energy's evolution from pipelines and merchant power into a predominantly regulated utility reduced commodity exposure but increased dependence on state commissions, coal-ash remediation, storm resilience, and financing a cleaner grid.",
    moments: [
      {
        year: 2000,
        then: "Duke Energy combines regulated Carolinas electricity with interstate gas pipelines and a growing merchant-energy and trading operation. The diversified model offers several profit sources but exposes the company to commodity and project risk.",
        after: "Duke expanded merchant energy and acquired Westcoast Energy, then later separated its gas businesses as Spectra Energy.",
      },
      {
        year: 2007,
        then: "Duke has merged with Cinergy, adding regulated utilities in the Midwest, and is preparing to separate its natural-gas operations as Spectra Energy. The remaining company will be more concentrated in electric utilities and generation.",
        after: "Duke completed the Spectra spin-off in 2007 and became more dependent on regulated electric operations.",
      },
      {
        year: 2013,
        then: "Duke has acquired Progress Energy, adding utilities in Florida and the Carolinas, but the abrupt removal of Progress chief Bill Johnson immediately after closing drew regulatory scrutiny. Integrating nuclear and coal-heavy fleets is now central.",
        after: "Duke settled governance issues surrounding the merger and later faced extensive cleanup obligations after the 2014 Dan River coal-ash spill.",
      },
      {
        year: 2023,
        then: "Duke is reviewing a possible sale of its commercial renewables business to concentrate on regulated utilities. Carolinas resource plans call for coal retirements, gas, renewables, storage, and grid investment, all subject to commission approval and customer affordability.",
        after: "Duke completed the commercial-renewables sale in 2023 and continued negotiating multiyear grid and generation plans with state regulators.",
      },
    ],
    recentArc:
      "Through 2024, Duke pursued regulated capital plans in the Carolinas, Florida, and the Midwest, advanced coal retirements and storm-hardening work, and managed rate cases and rising financing costs.",
  },
  NEE: {
    stakes:
      "FPL Group, later NextEra Energy, paired a regulated Florida utility with a national wind-and-solar developer; weather, regulation, tax policy, interest rates, and the financing needs of rapid renewable construction shaped the model.",
    moments: [
      {
        year: 2000,
        then: "FPL Group owns regulated Florida Power & Light and a smaller independent-power business. Florida population growth supports utility demand, while nuclear plants and storm exposure require disciplined operations.",
        after: "FPL Group expanded independent generation, particularly wind power, through the business that became NextEra Energy Resources.",
      },
      {
        year: 2007,
        then: "FPL Group pairs Florida Power & Light with one of the country's largest wind developers. Its proposed merger with Constellation Energy has been terminated, leaving management to pursue renewable growth independently.",
        after: "FPL Group continued building wind generation and abandoned the Constellation combination after regulatory and shareholder opposition.",
      },
      {
        year: 2012,
        then: "The company is now named NextEra Energy, reflecting the scale of Energy Resources alongside Florida Power & Light. Federal wind tax-credit uncertainty affects project timing, while low rates support capital-intensive utility and renewable investment.",
        after: "NextEra expanded wind and solar generation, invested in FPL's grid, and acquired Gulf Power in Florida.",
      },
      {
        year: 2023,
        then: "NextEra combines FPL's regulated Florida network with Energy Resources' wind, solar, battery, and transmission projects. Higher interest rates and the funding needs of affiliate NextEra Energy Partners complicate an investment program built during cheaper financing.",
        after: "NextEra Energy Partners reduced its growth expectations and changed its distribution-growth plans as financing conditions tightened.",
      },
    ],
    recentArc:
      "Through 2024, NextEra continued large renewable, storage, transmission, and FPL investments under chief executive John Ketchum, and worked through financing and governance changes at NextEra Energy Partners.",
  },
  LIN: {
    stakes:
      "Praxair's pipeline and on-site gas contracts produced recurring industrial cash flow, while the Linde merger created global scale whose value depended on antitrust divestitures, integration, and disciplined construction of customer-dedicated plants.",
    moments: [
      {
        year: 2000,
        then: "Praxair supplies oxygen, nitrogen, hydrogen, and specialty gases through pipelines, on-site plants, and cylinders. Long contracts and customer switching costs provide stability, but volumes still reflect steel, chemicals, refining, electronics, and healthcare activity.",
        after: "Praxair expanded its pipeline networks and on-site plants globally while maintaining a focused industrial-gases portfolio.",
      },
      {
        year: 2007,
        then: "Praxair is investing in hydrogen for refineries, oxygen for steel and chemicals, and high-purity gases for electronics. Chief executive Dennis Reilley emphasizes project selection and density around existing production networks.",
        after: "Praxair continued building large on-site projects in the Americas and Asia and expanded packaged-gas distribution.",
      },
      {
        year: 2016,
        then: "Praxair operates a concentrated industrial-gas network with long-duration customer contracts and significant North American pipeline density. Low industrial activity and the strong dollar pressure volumes, while management remains selective about new projects.",
        after: "Praxair and Germany's Linde agreed in 2017 to an all-stock merger of equals, subject to extensive global antitrust remedies.",
      },
      {
        year: 2019,
        then: "Praxair and Linde have completed their merger under the Linde plc name after divesting assets required by regulators. Steve Angel leads the combined company, which now spans industrial gases and Linde Engineering worldwide.",
        after: "Linde integrated the two networks, realized merger savings, and adopted LIN as the public identity of the combined company.",
      },
      {
        year: 2023,
        then: "Linde serves chemicals, refining, electronics, healthcare, food, and manufacturing through on-site plants, pipelines, and merchant gases. Its project backlog increasingly includes semiconductor gases, clean hydrogen, and carbon-capture infrastructure.",
        after: "Linde advanced U.S. Gulf Coast hydrogen and carbon-capture projects and announced additional supply investments tied to semiconductor manufacturing.",
      },
    ],
    recentArc:
      "Through 2024, Linde expanded electronics and clean-energy projects, continued price and productivity programs, and remained led by chief executive Sanjiv Lamba after Steve Angel became chairman.",
  },
};
