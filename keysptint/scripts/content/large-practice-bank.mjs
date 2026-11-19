// Explicit verb forms keep the grammar drills correct, including irregular verbs.
export const drills = {
  easy: {
    subjects: [
      ['I', false],
      ['You', false],
      ['We', false],
      ['They', false],
      ['He', true],
      ['She', true],
      ['My brother', true],
      ['Our teacher', true],
    ],
    contexts: ['every morning', 'on Mondays', 'before lunch', 'after class'],
    actions: [
      ['read a short story', 'reads a short story'],
      ['write a shopping list', 'writes a shopping list'],
      ['pack a small bag', 'packs a small bag'],
      ['check the weather', 'checks the weather'],
      ['water the flowers', 'waters the flowers'],
      ['clean the kitchen table', 'cleans the kitchen table'],
      ['take a short walk', 'takes a short walk'],
      ['listen to a new song', 'listens to a new song'],
      ['practice English words', 'practices English words'],
      ['make a cup of tea', 'makes a cup of tea'],
      ['put the books away', 'puts the books away'],
      ['feed the little cat', 'feeds the little cat'],
      ['open the curtains', 'opens the curtains'],
      ['wash the empty cups', 'washes the empty cups'],
      ['draw a simple picture', 'draws a simple picture'],
      ['choose a book to read', 'chooses a book to read'],
      ['visit the corner shop', 'visits the corner shop'],
      ['learn a useful phrase', 'learns a useful phrase'],
      ['send a short message', 'sends a short message'],
      ['sort the colored pencils', 'sorts the colored pencils'],
      ['help a friend with homework', 'helps a friend with homework'],
      ['look for a quiet place', 'looks for a quiet place'],
      ['carry a bottle of water', 'carries a bottle of water'],
      ['read the notice by the door', 'reads the notice by the door'],
      ['count the chairs in the room', 'counts the chairs in the room'],
      ['plan a game for the afternoon', 'plans a game for the afternoon'],
      ['walk through the small park', 'walks through the small park'],
      ['tidy the desk by the window', 'tidies the desk by the window'],
      ['prepare a simple snack', 'prepares a simple snack'],
      ['check the bus timetable', 'checks the bus timetable'],
    ],
  },
  medium: {
    subjects: [
      'My colleague',
      'The volunteers',
      'Our tutor',
      'The visitors',
      'My neighbor',
      'The students',
      'The organizer',
      'The participants',
    ],
    contexts: [
      'before the workshop',
      'after the meeting',
      'earlier this week',
      'during the afternoon session',
    ],
    actions: [
      ['check the revised timetable', 'checked the revised timetable'],
      ['compare the available options', 'compared the available options'],
      ['write down the main points', 'wrote down the main points'],
      ['prepare a list of questions', 'prepared a list of questions'],
      ['find a suitable example', 'found a suitable example'],
      ['discuss the next stage', 'discussed the next stage'],
      ['choose a different approach', 'chose a different approach'],
      ['ask for a clearer explanation', 'asked for a clearer explanation'],
      ['bring an extra notebook', 'brought an extra notebook'],
      ['take a photograph of the display', 'took a photograph of the display'],
      ['read the instructions carefully', 'read the instructions carefully'],
      ['suggest a practical improvement', 'suggested a practical improvement'],
      ['make a note of the changes', 'made a note of the changes'],
      ['review the completed exercise', 'reviewed the completed exercise'],
      ['explain the purpose of the activity', 'explained the purpose of the activity'],
      ['offer to help with the arrangements', 'offered to help with the arrangements'],
      ['send a copy of the updated plan', 'sent a copy of the updated plan'],
      ['test the new equipment', 'tested the new equipment'],
      ['learn how the booking system works', 'learned how the booking system works'],
      ['collect the necessary information', 'collected the necessary information'],
      ['give a short demonstration', 'gave a short demonstration'],
      ['leave enough time for questions', 'left enough time for questions'],
      ['notice a mistake in the example', 'noticed a mistake in the example'],
      ['organize the material into sections', 'organized the material into sections'],
      ['speak to the person in charge', 'spoke to the person in charge'],
      ['share a useful suggestion', 'shared a useful suggestion'],
      ['keep a record of the discussion', 'kept a record of the discussion'],
      ['request a quieter room', 'requested a quieter room'],
      ['agree on a realistic deadline', 'agreed on a realistic deadline'],
      ['work through the example carefully', 'worked through the example carefully'],
    ],
  },
  hard: {
    subjects: [
      'The reviewers',
      'The coordinator',
      'The analysts',
      'The editor',
      'The research group',
      'The consultant',
      'The advisory panel',
      'The project team',
    ],
    contexts: [
      'by the end of the review',
      'before the next consultation',
      'by the time the report is published',
      'before the committee reconvenes',
    ],
    actions: [
      ['examined the underlying assumptions'],
      ['reconsidered the original interpretation'],
      ['identified the remaining uncertainties'],
      ['compared the competing explanations'],
      ['established a consistent frame of reference'],
      ['clarified the scope of the investigation'],
      ['distinguished evidence from speculation'],
      ['accounted for the differences between the groups'],
      ['explained the limitations of the comparison'],
      ['verified the accuracy of the historical records'],
      ['resolved the apparent contradiction'],
      ['defined the criteria for assessing the outcome'],
      ['acknowledged the practical constraints'],
      ['revised the proposed sequence of activities'],
      ['documented the reasons for the final recommendation'],
      ['evaluated the consequences of the alternative approach'],
      ['addressed the concerns raised during the consultation'],
      ['provided a more comprehensive account of the findings'],
      ['assessed the reliability of the available evidence'],
      ['considered the implications for future research'],
      ['established which observations require further investigation'],
      ['incorporated feedback from the affected communities'],
      ['reviewed the relationship between the proposed stages'],
      ['identified the conditions necessary for implementation'],
      ['reconciled the inconsistent descriptions'],
      ['developed a more transparent evaluation process'],
      ['specified how progress should be measured'],
      ['considered perspectives absent from the initial discussion'],
      ['explained how the revised proposal addresses earlier concerns'],
      ['separated the immediate effects from the longer-term consequences'],
    ],
  },
}

// Only countable nouns are pluralized; irregular forms are listed explicitly.
export const countableNouns = {
  easy: {
    common:
      'apron badge bead bench belt blanket blouse bowl bracelet broom bucket candle carpet comb curtain cushion diary envelope glove hammer handle hanger helmet hook jacket jar jug kettle ladder lantern lid mirror napkin necklace packet pillow pocket postcard quilt ribbon ring rope rug scarf shelf slipper sock spoon sticker suitcase towel tray umbrella vase wallet whistle wristwatch',
    animals:
      'ant ape bat bear bee beetle bird bull butterfly calf camel cat chick chicken cow crab crane crow deer dog dolphin donkey dove duck eagle eel elephant fish flea fly fox frog goat goose grasshopper hen horse lamb lion lizard monkey mosquito moth mouse mule owl ox parrot pig pigeon pony rabbit rat seal shark sheep snail snake sparrow spider squirrel swan tiger toad turkey turtle whale wolf worm zebra',
    food: 'apple apricot avocado bagel banana bean beet biscuit blueberry bun burger burrito cabbage cake candy carrot cherry chestnut chickpea coconut cookie cracker crepe croissant cucumber cupcake date doughnut dumpling egg fig grape grapefruit kiwi lemon lentil lime mango meatball melon muffin mushroom nectarine noodle nut olive onion orange pancake peach peanut pear pea pecan pepper pie pickle pizza plum potato pretzel pumpkin radish raisin raspberry roll sandwich sausage scone strawberry taco tangerine tart tomato truffle turnip walnut waffle yam',
    technology:
      'adapter alarm antenna app battery button cable calculator camera cartridge charger chip clock computer console controller cursor disk document earbud file filter folder game headset icon image joystick keyboard keypad laptop lens link machine message microphone modem monitor mouse mousepad motor password phone photo pixel plug pointer printer projector radio receiver remote robot router scanner screen sensor server socket speaker stylus switch tablet terminal timer transmitter transistor video webcam wire',
    nature:
      'acorn bay beach beetle birch blossom boulder branch brook bud bush cactus cave cedar chestnut cliff cloud coast cone creek daisy dandelion desert dune fern field fir flower forest garden glacier grape grove hill iceberg island lake leaf lily maple meadow mountain nest oak ocean orchard palm pebble petal pine plant pond poplar puddle reed reef river rock root rose sapling seed seedling shell shore shrub snowflake spruce star stem stone stream sunflower thorn tree tulip valley vine volcano wave waterfall weed willow woodland',
    school:
      'album atlas bag bell binder blackboard board booklet bookmark brush cabinet calendar card chair chart class classroom classmate clock club coach coat compass computer course crayon desk dictionary diploma door drawing easel eraser essay exam exercise experiment flag folder globe graph group hall highlighter journal key label lesson letter line locker map marker model notebook note page paragraph pen pencil poem poster project pupil puzzle question quiz report ruler school schoolbag fair section sentence sharpener sheet shelf sketchbook song stamp stapler student subject table teacher textbook timetable topic trophy uniform vowel workbook worksheet',
    business:
      'account address advertisement appointment assistant badge bag bank basket bill bonus booth box branch brochure budget buyer cabinet campaign card cart cashier catalog cent check clerk client code coin company contract counter coupon crate customer deal delivery desk discount display document employee employer envelope factory fee file form goal hotel invoice item job label leaflet letter loan logo manager market meeting merchant message notebook offer office order outlet owner package parcel partner payment pen plan price product receipt record refund register reminder report request sale sample seller shelf shipment shopper shop signature slogan staffroom stamp stand store supplier tag task tax team ticket tip tool trade trolley unit voucher warehouse worker',
  },
  medium: {
    common:
      'achievement adjustment advantage alternative ambition announcement application argument arrangement assumption attempt attitude audience author background barrier behavior benefit boundary capacity category challenge circumstance citizen colleague commitment community comparison complaint conclusion condition connection consequence consideration contribution conversation coordinator decision demonstration description destination detail development disadvantage discovery discussion distinction document editor effort employee encounter entrance environment evaluation exception exhibition explanation facilitator feature finding guideline habit improvement incident initiative inquiry insight instruction intention interpretation investigation invitation limitation location measurement method observation obstacle opportunity organizer participant pattern perspective possibility preference priority procedure proposal purpose recommendation reflection relationship requirement resource responsibility restriction revision routine selection session situation solution strategy suggestion summary technique tradition transition variation visitor workshop',
    animals:
      'aardvark albatross alligator alpaca anaconda anchovy angelfish anteater antelope armadillo axolotl baboon badger bandicoot barracuda bass beaver beluga bison blackbird bluebird bobcat bonobo buffalo bullfrog bumblebee canary capybara caracal carp cassowary caterpillar catfish chameleon chamois cheetah chimpanzee chinchilla chipmunk cicada cockatoo cormorant cougar coyote crocodile cuttlefish damselfly dragonfly dugong echidna egret falcon ferret firefly flamingo gazelle gecko gibbon goldfinch goldfish gorilla grouse guillemot guppy hamster hare hedgehog heron hippopotamus hornet hummingbird hyena ibex iguana impala jackal jellyfish kangaroo kestrel kingfisher koala kookaburra lapwing lemur leopard lobster locust lorikeet lynx macaque magpie mallard manatee mandrill marmot marten meerkat mongoose narwhal newt ocelot octopus okapi orangutan orca ostrich otter panda pangolin panther parakeet peacock pelican penguin pheasant platypus porcupine puffin quail quokka raccoon reindeer rhinoceros salamander sardine scorpion seagull seahorse serval shrew skylark sloth starfish starling stingray swallow tapir tarantula toucan trout viper wallaby walrus warbler weasel woodpecker wombat wren',
    food: 'almond anchovy artichoke spear aubergine blackberry blueberry floret bruschetta burrito caper cashew cauliflower cheeseburger cherry chickpea clementine coconut courgette cranberry croquette cucumber cutlet dumpling eggplant fig fritter gooseberry grape grapefruit guava hazelnut jalapeno kumquat leek lemon lentil lime lychee macadamia mandarin mango meatball mulberry mussel nectarine oatcake oyster pancake papaya parsnip passionfruit peach pear pecan persimmon pickle pineapple pistachio plantain plum pomegranate pomelo potato prawn pretzel prune quiche radish raisin raspberry raviolo redcurrant risotto roll rutabaga sardine scallion scallop scone shallot shrimp wrap strawberry tuber tangerine tortilla truffle turnip walnut chestnut',
    technology:
      'accelerometer adapter address administrator algorithm annotation archive attachment backup barcode benchmark bookmark browser buffer cache calculator capacitor cartridge certificate charger checkbox chipset clipboard codec compiler component configuration connection connector controller database decoder desktop detector device diagram dictionary directory display domain driver emulator encoder endpoint executable extension feed field firewall font framework function gateway gigabyte headset hostname hyperlink identifier inbox index input installation instruction interface iteration joystick keyword library link listener log mailbox megabyte microphone microchip module motherboard namespace network notebook notification object operator option output package parameter partition peripheral photograph pixel plugin port processor profile program projector protocol proxy query queue receiver recorder register repository request response router scanner scheduler screenshot script semaphore sensor sequence shortcut simulator snapshot socket spreadsheet statement chip subroutine switch syntax terminal textbox thread thumbnail timer token toolbar tracker transaction transmitter tutorial update username variable viewport webcam widget workspace',
    nature:
      'aquifer archipelago avalanche basin biome branch canopy canyon catchment cavern continent conifer crater current cyclone delta desert dune ecosystem estuary evergreen flood floodplain foothill fossil geyser glacier gorge grassland habitat headland hedgerow hurricane iceberg inlet island isthmus lagoon lake landscape latitude leaf formation marsh meadow meteor mineral monsoon moraine mountain mudflat mushroom organism outcrop peninsula pine plateau pollen-grain prairie rainforest ravine reef reservoir ridge river rock rockpool root sandbank seedling shrub shoreline slope snowdrift snowflake stalactite stalagmite star steppe stream summit thunderstorm tributary valley volcano waterfall watershed wave wetland whirlpool woodland',
    school:
      'academy accomplishment accreditation activity advisor annotation application apprenticeship assessment assignment auditorium author bibliography bookmark bursary campus candidate certificate chapter citation classroom college commentary competition conclusion conference consultation credential curriculum debate deduction definition demonstration department diagram dictionary diploma discipline dissertation draft edition elective enrollment equation essay evaluation examination examiner example exchange exercise experiment explanation faculty excursion footnote graduate hypothesis illustration inference instructor internship journal laboratory lecture lecturer lesson librarian library mentor method module note observation outline paragraph participant passage placement portfolio practicum presentation principal professor project pupil qualification questionnaire quotation reference report researcher revision rubric scholarship semester seminar sentence solution specialist subject submission supervisor syllabus textbook thesis timetable transcript translation tutor tutorial undergraduate university workshop',
    business:
      'accountant acquisition adjustment advertisement advisor agent agreement allocation allowance analysis applicant appraisal asset assistant audit auditor authorization beneficiary bid bond booking bottleneck branch broker budget campaign candidate career category commission committee competitor complaint conference consultant consumer contract contractor corporation cost credit customer deadline dealer debt decision deduction delegate department deposit director discount distributor dividend division donation duty earning employee employer enterprise entrepreneur entry estimate exchange executive expense export factory fee firm forecast franchise fund guarantee guarantor incentive industry inquiry installment insurer intermediary interview investment investor invoice lease lender liability license manufacturer margin merchant milestone negotiation objective obligation operation order organization outlet overhead owner partner partnership patent payment penalty pension policy portfolio preference premium presentation producer profit projection promotion proposal prospect purchase quotation receipt receivable record recruit recruiter reference refund regulation reimbursement remittance representative requirement reserve retailer return revenue reward royalty salary schedule sector shareholder shipment signature sponsor stakeholder statement strategy subcontractor subsidiary supplier surcharge target tariff tender transaction vacancy valuation venture warehouse wholesaler',
  },
  hard: {
    common:
      'abstraction accommodation acknowledgement adaptation ambiguity anomaly antecedent anticipation appropriation approximation assertion attribution axiom categorization characterization clarification classification coefficient coincidence compilation complexity component conceptualization concession conjecture constraint construct contradiction convention correlation criterion deduction delineation dependency derivation determinant dichotomy dimension discrepancy distinction divergence entity equivalence exception extrapolation framework generalization hierarchy hypothesis implication inconsistency indicator inference innovation insight instance interdependency interpretation intervention irregularity justification manifestation methodology misconception misinterpretation modification paradigm phenomenon postulate prerequisite presupposition proposition qualification quantification reconciliation reconstruction redistribution reformulation representation resolution restriction simplification specialization specification subdivision synthesis taxonomy theorem transformation uncertainty variable verification',
    animals:
      'annelid arachnid arthropod bivalve bryozoan canid cephalopod cetacean chelicerate chordate cnidarian coelacanth copepod crustacean decapod echinoderm elasmobranch equid felid gastropod hemichordate hominid hymenopteran invertebrate lagomorph lepidopteran marsupial mollusk monotreme mustelid nematode nudibranch odontocete opisthobranch osteichthyan passerine pinniped platyhelminth poriferan primate proboscidean protozoan ruminant scyphozoan solenodon tardigrade tenrec therapsid ungulate urochordate vertebrate xenarthran',
    food: 'acidulant additive allergen nutrient antioxidant binder bioactive biopolymer carbohydrate carotenoid catalyst chelator coagulant confection cracker crystallite delicacy derivative disaccharide emulsifier enzyme ester lipid flavorant flavonoid fortificant fructan glucosinolate glycoside hydrocolloid hydrolysate ingredient isoflavone isomer lipoprotein macronutrient metabolite micronutrient monosaccharide oligosaccharide peptide phospholipid phytonutrient phytosterol pigment polyphenol polysaccharide preservative probiotic protease protein saccharide saponin stabilizer sweetener tocopherol triglyceride vitamin xanthophyll',
    technology:
      'abstraction accelerator accumulator actuator adapter algorithm allocator annotation architecture artifact authenticator automaton backplane benchmark bitmap bootloader breakpoint bus bytecode callback capacitor checksum chipset circuit classifier codec compiler compositor constructor container controller coprocessor coroutine cryptosystem dataset debugger decoder decompiler decorator delimiter descriptor detector digitizer disassembler dispatcher domain eigenvector emulator encoder endpoint enumerator exception executable executor framebuffer gateway generator hash hyperlink hyperparameter hypervisor identifier indexer instruction interpreter interrupt interconnect iterator kernel latch lexeme lexer linker lockfile macro mesh microcontroller microprocessor module multiplexer mutex namespace node operand optimizer oscillator packet parser partition payload pipeline pixel port preprocessor protocol proxy quantizer queue rasterizer reconciler register renderer repeater repository resistor scheduler semaphore serializer shader key snapshot socket frame subroutine subsystem superclass synthesizer tensor thread tokenizer transceiver transistor transponder tuple validator vector viewport',
    nature:
      'anticline aquifer atoll basin bioindicator biome biomarker bryophyte catchment chloroplast clast conifer contour crater cryovolcano dendrite diatom discontinuity dune ecosystem ecotone eddy estuary fault fissure floodplain formation fossil fumarole geode glacier gorge gully habitat headland hoodoo horizon vent isobar isotherm isotope hollow lagoon landform lens lichen lithofacies meander meteorite microhabitat mineral moraine nunatak organism orogen outcrop paleosol pediment peninsula phenocryst phytolith phytoplankter plateau pluton polyp pothole promontory outcrop ravine rhizome ridge rift riverbank rockface sandbar core sepal sinkhole snowfield speleothem stalactite pore stratum syncline cone terrace tributary vent volcano watershed wetland',
    school:
      'abstraction allomorph allophone analogy anaphor antecedent aphorism argument assessment axiom bibliography case-study clause cognate collocation complement concept concordance conjecture constituent construct counterargument criterion deduction definition determiner diagram dialect dissertation edition epithet ethnography exercise explanation footnote framework generalization genre gloss grapheme heuristic homograph homonym homophone hypothesis idiom inference inflection interpretation lexeme manuscript metaphor metonym method modifier monograph morpheme nominalization paradigm parameter participle pedagogue phoneme constraint postulate preposition presupposition pronoun proposition qualifier quantifier questionnaire reference register rubric schema schwa feature fragment simile syllable syllabus syntagm taxonomy tense textbook theorem thesis transcript utterance variable',
    business:
      'acquisition amortization arbitrageur asset beneficiary bondholder brokerage cartel clearinghouse loan concession conglomerate consortium covenant counterparty creditor debenture debtor deduction defeasance depreciation derivative disbursement distributor dividend divestiture encumbrance endowment enterprise entitlement entrepreneur account expenditure fiduciary franchise guarantee guarantor haircut indemnity indenture intermediary investment issuer venture lender levy liability lien liquidator mandate merger mortgage multinational negotiator obligation holder overdraft partnership payable fund portfolio premium principal prospectus provision receivable receiver recapitalization refinance reimbursement remittance reinsurer reserve revenue royalty securitization shareholder stakeholder stockholder subsidiary subvention surety syndicate tariff taxpayer tranche transaction transferee trustee underwriter valuation warrant',
  },
}

const irregular = {
  child: 'children',
  person: 'people',
  man: 'men',
  woman: 'women',
  foot: 'feet',
  tooth: 'teeth',
  mouse: 'mice',
  goose: 'geese',
  ox: 'oxen',
  sheep: 'sheep',
  deer: 'deer',
  fish: 'fish',
  leaf: 'leaves',
  shelf: 'shelves',
  scarf: 'scarves',
  wolf: 'wolves',
  calf: 'calves',
  analysis: 'analyses',
  hypothesis: 'hypotheses',
  thesis: 'theses',
  synthesis: 'syntheses',
  criterion: 'criteria',
  phenomenon: 'phenomena',
  stratum: 'strata',
  schema: 'schemas',
  antenna: 'antennas',
  cactus: 'cacti',
  curriculum: 'curricula',
  quiz: 'quizzes',
  grouse: 'grouse',
  bison: 'bison',
  reindeer: 'reindeer',
  raviolo: 'ravioli',
}

export function pluralize(noun) {
  if (Object.hasOwn(irregular, noun)) return irregular[noun]
  if (/[^aeiou]y$/.test(noun)) return `${noun.slice(0, -1)}ies`
  if (/(s|x|z|ch|sh)$/.test(noun)) return `${noun}es`
  if (['potato', 'tomato', 'hero'].includes(noun)) return `${noun}es`
  return `${noun}s`
}
