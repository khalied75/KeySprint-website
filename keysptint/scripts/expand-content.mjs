import { readFile, writeFile } from 'node:fs/promises'
import { calculateContentStats } from '../src/utils/contentStats.js'

// Original lesson arrays are preserved. Run this script again safely to merge
// additions without duplicating entries. Each topic has level-specific passages.
const root = new URL('../public/public%20json/', import.meta.url)
const read = async (name) =>
  JSON.parse(await readFile(new URL(`${name}.json`, root), 'utf8'))
const write = async (name, data) =>
  writeFile(new URL(`${name}.json`, root), `${JSON.stringify(data, null, 2)}\n`)
const unique = (items) => [...new Set(items)]

const vocabulary = {
  easy: {
    common:
      'accept arrive ask answer borrow break choose collect dance decide describe enjoy enter explain finish follow forget guess happen help invite join keep knock laugh leave lend listen look meet move need offer order pack paint pass plan point prefer promise pull push receive remember repeat reply return save share smile solve spend start stay stop thank think touch travel trust turn understand visit wait wash wear welcome wish work write',
    animals:
      'ant bat bee beetle buffalo camel chick crab crow deer donkey dove duck eagle eel fly fox frog goat goose hen lamb lion lizard mole moth mouse mule owl ox panda parrot pig pony puppy quail rabbit rat raven robin seal shark sheep snail snake spider swan tiger toad trout turkey turtle whale wolf worm yak zebra',
    food: 'bagel basil bean beef berry biscuit bun cabbage carrot celery cheese cherry chilli cocoa corn cream cucumber curry date dough flour garlic ginger grape ham honey jam juice kale lemon lime mango melon mint muffin noodle nut oat olive onion orange pasta peach peanut pepper pickle pie pizza plum pork potato pumpkin radish raisin rice salad sauce soup spinach steak stew sugar toast tofu tuna turkey waffle wheat yogurt',
    technology:
      'app audio blog button cable camera chat chip click clock code copy cursor data device disk drag drive email file flash folder font game icon image inbox input key laptop link list load lock login menu message mic mobile mouse mute page paste phone photo pixel plug print radio robot save scan screen search send server share signal site slide socket sound spam switch tablet tag task text timer tool touch upload user video voice web wifi wire zoom',
    nature:
      'acorn air ash bank bay beach bloom branch breeze brook bud bush cave clay cliff cloud coast creek dawn dew dirt dune dust earth fern field fire flame flood fog frost grass hail heat hill ice island ivy lake leaf light mist moon mud nest ocean palm petal pond pool rain reed reef river rock root rose sand seed shade shell shore sky snow soil spring star stem stone storm stream sun sunset tide tree valley vine wave wind wood',
    school:
      'art atlas bag bell bench block board book box break brush card chalk chart class club coat color count desk drama draw exam flag flute form globe glue grade graph group gym hall ink jar key lab learn lesson line map mark math music name note page pair paper pen pencil poem quiz read recess room row rule ruler school score shelf song space sport story study table tape teach team term test theme topic uniform vowel wall word write',
    business:
      'ad agent aid bank bill boss brand budget buyer cash cent change check clerk coin cost deal desk earn fee firm goal goods hire hours idea job label lease loan logo mail market meeting money offer office order owner pack paid pay phone plan price print profit quote rate rent sale save sell shop sign staff stamp stock store tax team time tip trade trip unit value wage work',
  },
  medium: {
    common:
      'achieve adjust admire advise affect afford announce arrange attempt avoid balance behave belong benefit challenge compare complain confirm connect consider contain contribute convince create deliver depend develop discover discuss encourage establish examine exchange expand experience express improve include influence introduce involve maintain manage mention notice observe organize participate persuade predict prepare protect provide realize recognize recommend reflect reduce refuse relate remind remove repair replace require respond reveal select separate suggest support survive translate transport volunteer',
    animals:
      'alligator anteater antelope armadillo badger barracuda beaver blackbird bluebird bobcat bulldog butterfly caterpillar cheetah chimpanzee chipmunk cockatoo cormorant crocodile dragonfly flamingo gazelle goldfinch grasshopper greyhound hedgehog heron hummingbird jellyfish kingfisher ladybird leopard lobster meerkat mongoose mosquito octopus ostrich otter panther peacock pelican penguin pheasant porcupine raccoon reindeer salamander sardine scorpion seahorse sparrow starfish stingray swallow tortoise walrus weasel woodpecker',
    food: 'almond anchovy apricot artichoke asparagus avocado barley beetroot blackberry blueberry broccoli buttermilk caramel cauliflower chickpea cinnamon coconut coriander cranberry croissant custard dessert dressing dumpling eggplant fennel fig granola grapefruit hazelnut hummus ingredient lentil lettuce macaroni mackerel marinade mushroom mustard nectarine oatmeal oregano paprika parsley pastry pistachio pomegranate poultry protein raspberry recipe rosemary salmon sandwich sausage scallion seafood sesame shallot sorbet sourdough soybean spaghetti sunflower tangerine turmeric vanilla vegetable vinegar walnut zucchini',
    technology:
      'adapter algorithm archive attachment backup bandwidth battery bookmark browser charger chipset clipboard compiler component database debug desktop digital document download encryption ethernet extension feedback firewall firmware framework function gateway headset hostname interface joystick keyword library microphone monitor network notebook notification operating password platform processor program projector protocol query router scanner screenshot shortcut software speaker spreadsheet storage streaming syntax terminal toolbar touchscreen tracker tutorial username variable virtual webpage wireless workspace',
    nature:
      'altitude atmosphere avalanche bamboo canyon climate continent countryside current desert drought ecosystem evergreen glacier granite habitat harvest horizon humidity iceberg insect landscape latitude limestone meadow mineral monsoon mountain mushroom orchard organism oxygen pebble peninsula plateau pollen prairie rainfall rainbow rainforest reservoir sandstone savanna seedling shrub shoreline snowflake species stalactite sunlight temperature terrain thunder timber tropical tundra vegetation volcano waterfall wetland wilderness woodland',
    school:
      'academy achievement admission algebra assignment attendance biology calendar campus certificate chapter chemistry classroom college computer curriculum debate dictionary diploma discussion education essay experiment geography geometry grammar graduation history homework instruction knowledge laboratory lecture literature material notebook paragraph presentation principal project question research revision scholarship semester seminar sentence solution subject summary syllabus textbook timetable translation tuition vocabulary workshop worksheet',
    business:
      'account accountant advertise agreement analysis applicant appointment approval asset balance benefit branch campaign candidate capital career colleague commission competition conference consumer contract customer deadline delivery demand department director discount earnings employee employer expense export factory finance income industry insurance interview inventory invoice investment manager marketing merchant negotiation operation payment payroll planning presentation production promotion proposal purchase receipt recruitment refund regulation resource retail revenue salary schedule service shipment stakeholder strategy supplier target transaction transport warehouse wholesale',
  },
  hard: {
    common:
      'accommodate acknowledge advantageous ambiguity anticipate articulate authenticity autonomous collaboration comprehensive conscientious consequence considerable consolidate contemporary contradictory conventional correspondence credibility demonstrate differentiate disproportionate dissemination diversification efficiency elaborate entrepreneurship equilibrium exceptionally facilitate feasibility hypothetical implementation indispensable infrastructure initiative innovative insightful interpretation interdisciplinary intervention investigation jurisdiction methodology meticulous misconception modification multifaceted negotiation nevertheless notwithstanding objective perseverance perspective phenomenon precaution prerequisite prioritization reconciliation redistribution rehabilitation resilience responsibility simultaneous sophisticated specialization substantial sustainability transformation transparency uncertainty unprecedented versatility vulnerability',
    animals:
      'amphibian anthropoid biodiversity bioluminescence camouflage carnivorous cephalopod chameleon coelacanth conservation crustacean domestication echolocation endangered exoskeleton herbivorous hippopotamus invertebrate iridescence marsupial metamorphosis microorganism migration nocturnal omnivorous orangutan ornithology paleontology parthenogenesis photosymbiosis platypus pollination predator primatology proboscis rhinoceros scavenger territorial thermoregulation vertebrate viviparous zoological',
    food: 'antioxidant caramelization charcuterie cholesterol confectionery crystallization delicatessen dehydration emulsification fermentation fortification gastronomy homogenization hydration hydroponics intolerance macronutrient malnutrition metabolism micronutrient mozzarella nourishment nutritional pasteurization pasteurize preservation probiotic refrigeration riboflavin saturation seasoning semolina sterilization sustainability transglutaminase unsaturated vegetarianism vermicelli vinaigrette wholegrain',
    technology:
      'accessibility authentication authorization asynchronous blockchain cryptography cybersecurity decentralization decompilation decryption deduplication deployment diagnostics encapsulation extensibility hyperparameter hypervisor idempotency indexing instrumentation interoperability localization microarchitecture microcontroller microprocessor middleware multithreading normalization observability orchestration parallelism polymorphism provisioning pseudocode quantization refactoring replication scalability serialization synchronization telemetry tokenization virtualization vulnerability',
    nature:
      'acidification afforestation agroforestry biodiversity biogeography biodegradable bioluminescence carboniferous climatology deforestation desertification eutrophication evapotranspiration geomorphology glaciation groundwater hydrological interdependence meteorological microclimate mineralization oceanography permafrost photosynthesis phytoplankton precipitation reforestation sedimentation seismology stratification subcontinental subterranean thermodynamics topographical transpiration ultraviolet urbanization volcanology watershed weathering',
    school:
      'accreditation bibliography categorization comprehension conceptualization constructivism contextualization dissertation epistemology extracurricular generalization historiography interdisciplinary lexicography metacognition methodological pedagogy phonetics phonology plagiarism postsecondary postgraduate prerequisite proficiency qualification quantitative questionnaire scaffolding specialization standardized stratification syntactical theoretical thesis undergraduate validation',
    business:
      'acquisition amortization appropriation arbitrage benchmarking capitalization collateral commercialization compliance conglomerate consolidation contingency depreciation deregulation diversification entrepreneurship expenditure externality fiduciary globalization indemnification insolvency intellectual interoperability liquidation macroeconomics merchandising microeconomics monopolization multinational organizational outsourcing procurement profitability prospectus recapitalization reconciliation reimbursement remuneration restructuring segmentation shareholder subsidiary underwriting valuation',
  },
}

// Three linked sentences per topic and level form a small coherent passage.
const topics = [
  {
    easy: [
      'I take the bus to school.',
      'My friend saves a seat for me.',
      'We talk about our plans for the day.',
    ],
    medium: [
      'The morning bus follows a different route when the main road is closed.',
      'I check the timetable before leaving home to avoid a long wait.',
      'Sharing the journey with a friend makes the trip more enjoyable.',
    ],
    hard: [
      'Although public transport occasionally requires patience, it offers a practical alternative to driving.',
      'A reliable timetable allows commuters to coordinate their journeys without unnecessary uncertainty.',
      'Improvements in accessibility can make the entire network more useful to the community.',
    ],
  },
  {
    easy: [
      'I put fresh bread on the table.',
      'My sister cuts an apple into small pieces.',
      'We eat breakfast before we leave home.',
    ],
    medium: [
      'Preparing breakfast the night before gives me more time in the morning.',
      'My sister adds fresh fruit to a bowl of yogurt and oats.',
      'A simple meal can be both enjoyable and easy to prepare.',
    ],
    hard: [
      'Establishing a consistent morning routine reduces the number of decisions required at the start of the day.',
      'Preparing ingredients in advance can accommodate a busy schedule without sacrificing variety.',
      'The conversation around the breakfast table often matters as much as the meal itself.',
    ],
  },
  {
    easy: [
      'The library has a quiet room.',
      'I choose a book about the sea.',
      'The woman at the desk helps me find it.',
    ],
    medium: [
      'The librarian recommends a collection of stories written for young readers.',
      'I borrow two books and promise to return them before the deadline.',
      'The quiet reading area is a comfortable place to concentrate.',
    ],
    hard: [
      'Public libraries provide access to resources that might otherwise remain unaffordable.',
      'Their collections reflect a diverse range of perspectives rather than a single interpretation of the world.',
      'By organizing workshops and exhibitions, librarians strengthen the relationship between knowledge and community.',
    ],
  },
  {
    easy: [
      'We plant seeds in a small pot.',
      'I give them water each morning.',
      'A green leaf appears after a few days.',
    ],
    medium: [
      'The seedlings need enough sunlight and regular watering to grow.',
      'We move the pots away from the window during the hottest part of the afternoon.',
      'Looking after the plants teaches us to notice small changes.',
    ],
    hard: [
      'Successful gardening depends on understanding the interaction between soil, moisture, and sunlight.',
      'Observing gradual changes is more informative than expecting immediate transformation.',
      'Composting household scraps contributes to healthier soil while reducing avoidable waste.',
    ],
  },
  {
    easy: [
      'I buy tomatoes at the market.',
      'The seller puts them in my bag.',
      'I also need rice and a bottle of milk.',
    ],
    medium: [
      'The market stalls offer fresh vegetables from several nearby farms.',
      'I compare prices and choose the ingredients needed for the week.',
      'Bringing reusable bags is a small habit that reduces waste.',
    ],
    hard: [
      'Seasonal markets create opportunities for direct communication between producers and consumers.',
      'Comparing quality alongside price encourages more deliberate purchasing decisions.',
      'Understanding where ingredients come from can influence how a household plans its meals.',
    ],
  },
  {
    easy: [
      'My cousin rides a blue bicycle.',
      'We stop at the park to rest.',
      'I put my helmet on before the next ride.',
    ],
    medium: [
      'The new cycle path connects the station with the park and the town center.',
      'We check the brakes and adjust our helmets before setting off.',
      'Cycling together gives us a chance to explore unfamiliar streets.',
    ],
    hard: [
      'Well-designed cycling infrastructure can accommodate riders with different levels of experience.',
      'Separating bicycles from heavy traffic improves confidence as well as convenience.',
      'Thoughtful route planning helps transform occasional cycling into an everyday habit.',
    ],
  },
  {
    easy: [
      'I write a short message to my friend.',
      'She asks me to meet her at the cafe.',
      'We choose a time that works for us both.',
    ],
    medium: [
      'A clear message includes the meeting place and the time we have agreed on.',
      'I read my reply once more before sending it to the group.',
      'Checking the details now prevents confusion later in the day.',
    ],
    hard: [
      'Effective communication requires attention to both the information and the person receiving it.',
      'Ambiguous instructions can create misunderstandings even when everyone shares the same objective.',
      'A brief confirmation often prevents a disproportionate amount of confusion later.',
    ],
  },
  {
    easy: [
      "The train leaves at nine o'clock.",
      'I keep my ticket in my coat pocket.',
      'We find our seats beside the window.',
    ],
    medium: [
      'Our train departs from a different platform because of maintenance work.',
      'An announcement reminds passengers to keep their luggage with them.',
      'I watch the countryside change as the train approaches the coast.',
    ],
    hard: [
      'A journey becomes less stressful when essential documents are organized and easily accessible.',
      'Announcements should communicate unexpected changes without overwhelming passengers with unnecessary detail.',
      'Reliable connections make long-distance rail travel a practical option for more people.',
    ],
  },
  {
    easy: [
      'It rains while we walk home.',
      'I open my umbrella and wait for my brother.',
      'We leave our wet shoes beside the door.',
    ],
    medium: [
      'The weather forecast suggests that heavy rain will arrive during the afternoon.',
      'We change our plans and choose an indoor activity instead.',
      'A flexible schedule helps us enjoy the day despite the weather.',
    ],
    hard: [
      'Weather forecasts describe probabilities rather than guaranteeing a particular outcome.',
      'Preparing for changing conditions is more useful than assuming a prediction will be exact.',
      'Flexible planning allows a group to respond calmly when circumstances become unpredictable.',
    ],
  },
  {
    easy: [
      'I listen to music after school.',
      'My brother plays a song on his guitar.',
      'We try to sing the last line together.',
    ],
    medium: [
      'Learning a new instrument requires patience and regular practice.',
      'My brother slows the song down so that I can follow the rhythm.',
      'Playing a short section correctly feels better than rushing through the whole piece.',
    ],
    hard: [
      'Musical fluency develops through deliberate practice rather than repetition without reflection.',
      'Breaking a complicated passage into manageable sections makes improvement easier to observe.',
      'Collaboration encourages performers to listen carefully and adapt to one another.',
    ],
  },
  {
    easy: [
      'We visit a museum on Saturday.',
      'I look at a map of an old town.',
      'The guide tells us a story about the people who lived there.',
    ],
    medium: [
      'The museum exhibition explains how everyday objects have changed over time.',
      'A volunteer answers our questions and points out details we missed.',
      'We compare the old photographs with the streets we know today.',
    ],
    hard: [
      'Museum exhibitions connect individual objects with the historical circumstances that shaped them.',
      'A carefully chosen collection can challenge assumptions as well as preserve collective memory.',
      'Considering whose stories are represented helps visitors evaluate an exhibition more thoughtfully.',
    ],
  },
  {
    easy: [
      'I have a new notebook for English.',
      'I write five useful words on the first page.',
      'I read the words again before I go to bed.',
    ],
    medium: [
      'Keeping a vocabulary notebook helps me remember words in meaningful contexts.',
      'I write an example sentence instead of copying a definition alone.',
      'Reviewing the notebook regularly makes unfamiliar words easier to recognize.',
    ],
    hard: [
      'Vocabulary retention improves when unfamiliar words are revisited in varied and meaningful contexts.',
      'An example that relates to personal experience creates a stronger association than an isolated definition.',
      'Gradually increasing the interval between reviews encourages independent retrieval.',
    ],
  },
  {
    easy: [
      'My team has a meeting today.',
      'We write our ideas on the board.',
      'Each person chooses one small task to finish.',
    ],
    medium: [
      'The team agrees on a clear goal before discussing individual tasks.',
      'We divide the work according to our experience and availability.',
      'A short update at the end of the day helps everyone stay informed.',
    ],
    hard: [
      'Productive collaboration depends on shared expectations and clearly defined responsibilities.',
      'A realistic deadline should account for dependencies rather than individual effort alone.',
      'Transparent communication allows potential obstacles to be addressed before they become serious problems.',
    ],
  },
  {
    easy: [
      'I save my work in a new folder.',
      'The file has a clear name and a date.',
      'I make another copy before I close the computer.',
    ],
    medium: [
      'Organizing files by project makes important documents easier to find.',
      'I save a backup before installing an update on my computer.',
      'A consistent naming system helps the whole team avoid confusion.',
    ],
    hard: [
      'A reliable backup strategy considers both accidental deletion and unexpected hardware failure.',
      'Consistent file organization reduces the time spent searching for outdated versions.',
      'Documenting a process makes it easier for colleagues to maintain continuity when responsibilities change.',
    ],
  },
  {
    easy: [
      'We walk beside a small river.',
      'A bird sits on a rock near the water.',
      'We take our empty bottles home with us.',
    ],
    medium: [
      'The riverside path is a peaceful place to walk after a busy week.',
      'We notice several kinds of birds near the reeds and shallow water.',
      'Keeping the area clean protects the animals that depend on this habitat.',
    ],
    hard: [
      'Freshwater habitats support complex relationships between plants, insects, birds, and other organisms.',
      'Changes in water quality can affect an ecosystem long before the damage becomes obvious.',
      'Conservation requires consistent observation alongside practical cooperation from nearby communities.',
    ],
  },
  {
    easy: [
      'I make soup with my father.',
      'He cuts the carrots while I wash the potatoes.',
      'We taste the soup before we add more salt.',
    ],
    medium: [
      'The recipe gives clear instructions, but we adjust the seasoning to our taste.',
      'Preparing all the ingredients first makes cooking more relaxed.',
      'We keep the remaining soup in a container for the following day.',
    ],
    hard: [
      'Cooking becomes more intuitive when techniques are understood rather than followed mechanically.',
      'Small adjustments in temperature or timing can influence texture as much as the ingredients themselves.',
      'Planning how to use leftovers encourages creativity and reduces unnecessary waste.',
    ],
  },
  {
    easy: [
      'My friend moves to a new home.',
      'I help her carry a box of books.',
      'We find a good place for the desk near the window.',
    ],
    medium: [
      'Moving to a new neighborhood takes time and careful preparation.',
      'We label the boxes so that each one goes into the correct room.',
      'Meeting the neighbors helps an unfamiliar place begin to feel like home.',
    ],
    hard: [
      'Relocating involves adapting to unfamiliar routines as well as organizing physical possessions.',
      'A practical checklist reduces the possibility of overlooking essential arrangements.',
      'Building relationships within a new neighborhood can provide a valuable sense of belonging.',
    ],
  },
  {
    easy: [
      'I want to buy a new pair of shoes.',
      'I check how much money I have saved.',
      'I wait until I have enough for the pair I like.',
    ],
    medium: [
      'Making a simple budget helps me decide which purchases matter most.',
      'I compare the cost of a new item with the amount I can comfortably save.',
      'Waiting a few days sometimes changes my mind about an unnecessary purchase.',
    ],
    hard: [
      'A household budget is more useful when it reflects actual priorities rather than unrealistic restrictions.',
      'Distinguishing recurring expenses from occasional purchases makes planning more accurate.',
      'Maintaining a small reserve can provide flexibility when circumstances change unexpectedly.',
    ],
  },
  {
    easy: [
      'The teacher gives us a science task.',
      'We put an ice cube in a small bowl.',
      'We watch it melt and write down what we see.',
    ],
    medium: [
      'Our experiment compares how quickly ice melts in different conditions.',
      'We record the results carefully and repeat the measurements.',
      'Discussing unexpected results helps us improve the next experiment.',
    ],
    hard: [
      'A meaningful experiment distinguishes between the variable being tested and the conditions held constant.',
      'Repeating measurements helps reveal whether an apparent pattern is reliable.',
      'Unexpected findings can be valuable when they lead to better questions rather than premature conclusions.',
    ],
  },
  {
    easy: [
      'We draw pictures in the art room.',
      'I mix blue and yellow to make green.',
      'My friend paints a bright sky above a hill.',
    ],
    medium: [
      'The art workshop encourages us to experiment with different materials.',
      'I sketch the basic shapes before adding color and small details.',
      "Looking at another student's work gives me a new idea for my own picture.",
    ],
    hard: [
      'Creative work often develops through experimentation rather than a perfectly defined initial plan.',
      'Constraints can encourage originality by requiring an artist to reconsider familiar techniques.',
      'Constructive feedback identifies possibilities while respecting the intention behind the work.',
    ],
  },
  {
    easy: [
      'I call my grandmother in the evening.',
      'She tells me about her garden.',
      'I tell her about a funny thing that happened at school.',
    ],
    medium: [
      'A regular phone call helps us stay connected even though we live in different towns.',
      'My grandmother describes the flowers that have started to bloom.',
      'Listening carefully is just as important as sharing news of my own.',
    ],
    hard: [
      'Maintaining relationships across a distance requires intention rather than occasional convenience.',
      'A familiar conversation can provide reassurance without offering solutions to every difficulty.',
      "Making space for another person's experiences strengthens mutual understanding.",
    ],
  },
  {
    easy: [
      'The bookshop opens early on Friday.',
      'I find a small book with a red cover.',
      'The first page makes me want to read the whole story.',
    ],
    medium: [
      'The bookshop owner recommends a novel based on the stories I already enjoy.',
      'I read the opening chapter before deciding whether to buy it.',
      'Discovering a new author makes the visit feel especially worthwhile.',
    ],
    hard: [
      'Independent bookshops often introduce readers to perspectives beyond their established preferences.',
      'A thoughtful recommendation can make an unfamiliar subject unexpectedly accessible.',
      'The relationship between a reader and a book may change as experience deepens.',
    ],
  },
  {
    easy: [
      'We go to the beach after lunch.',
      'My little brother builds a castle in the sand.',
      'We watch the waves before we walk back to the car.',
    ],
    medium: [
      'The beach is quieter in the early evening when most visitors have left.',
      'We follow the marked path to avoid disturbing the plants on the dunes.',
      'Watching the tide return reminds us how quickly the landscape can change.',
    ],
    hard: [
      'Coastal landscapes are shaped by a continuous interaction between waves, tides, wind, and sediment.',
      'Protecting fragile dunes helps preserve habitats while limiting erosion.',
      'Responsible access balances opportunities for recreation with the long-term needs of the environment.',
    ],
  },
  {
    easy: [
      'I practice typing for a few minutes.',
      'I try to use the right finger for each key.',
      'I feel happy when I finish a line without a mistake.',
    ],
    medium: [
      'A short daily typing session helps me become more comfortable with the keyboard.',
      'I focus on accuracy before trying to increase my speed.',
      'The progress report shows which habits are beginning to improve.',
    ],
    hard: [
      'Sustainable improvement depends on consistent attention rather than occasional bursts of effort.',
      'Feedback is most useful when it identifies a specific behavior that can be adjusted.',
      'Comparing current performance with an earlier baseline provides a more meaningful measure of progress.',
    ],
  },
]

const reflections = {
  easy: [
    'I have time to think about it.',
    'My friend asks me a question.',
    'We talk about it on the way home.',
    'I write a short note in my book.',
    'There is something new to learn.',
    'We share our ideas with each other.',
    'I pay attention to the small things.',
    'I tell my family about it later.',
    'We take a short break together.',
    'I try to remember the useful details.',
  ],
  medium: [
    'The experience gives us something interesting to discuss.',
    'I make a note of the details I want to remember.',
    'We compare our ideas before deciding what to do next.',
    'Taking a moment to reflect helps me understand the experience.',
    'A thoughtful question leads to a useful conversation.',
    'I notice something that I had overlooked at first.',
    "We learn more by listening to each other's ideas.",
    'Small improvements become easier to notice with practice.',
    'There is usually more than one way to approach the situation.',
    'I leave enough time to review what I have learned.',
  ],
  hard: [
    'Reflecting on the experience reveals details that were not immediately apparent.',
    'A considered question can be more productive than an immediate assumption.',
    'Different perspectives contribute to a more comprehensive understanding of the situation.',
    'The relationship between preparation and flexibility becomes increasingly clear.',
    'Careful observation makes it possible to distinguish a meaningful pattern from coincidence.',
    'Evaluating the outcome provides a useful foundation for subsequent decisions.',
    'Recognizing the limitations of an initial impression encourages further investigation.',
    'An open conversation allows participants to reconsider their original interpretations.',
    'Progress becomes easier to assess when expectations are both explicit and realistic.',
    'A willingness to revise an approach is an essential part of continued learning.',
  ],
}

const openings = {
  easy: [
    'There is a lot to notice in a normal day.',
    'Small moments can teach us new things.',
    'I enjoy learning about the world around me.',
    'Every day gives me a new story to tell.',
  ],
  medium: [
    'An ordinary experience can become an opportunity to notice something new.',
    'Paying attention to everyday routines helps us understand how things work.',
    'Learning often begins with the details of an otherwise familiar day.',
    'A shared experience can lead to a surprisingly useful conversation.',
  ],
  hard: [
    'An apparently ordinary situation can reveal the importance of attention, preparation, and perspective.',
    'Everyday experiences offer opportunities to examine the assumptions that shape our decisions.',
    'Understanding a situation requires consideration of both immediate details and a broader context.',
    'Practical experience becomes more valuable when it is accompanied by deliberate reflection.',
  ],
}

const words = await read('words')
const sentences = await read('sentences')
const paragraphs = await read('paragraphs')
const grammar = await read('grammar')
const grammarExtras = [
  {
    id: 'subject-pronouns',
    title: 'Subject pronouns',
    level: 'easy',
    description: 'Replace names with I, you, he, she, it, we, and they.',
    explanation:
      'A subject pronoun tells us who or what performs an action. Use it for a single thing and they for more than one person or thing.',
    examples: [
      'Maya is kind. She helps her friends.',
      'The books are new. They are on the shelf.',
      'My brother and I are ready. We can start.',
    ],
    question: 'The children are outside. ___ are playing.',
    options: ['It', 'They', 'He'],
    answer: 'They',
  },
  {
    id: 'possessives',
    title: 'My, your, his, and her',
    level: 'easy',
    description: 'Explain who something belongs to.',
    explanation:
      'Put a possessive adjective before a noun: my book, your desk, his bag, her bike, its color, our home, their school. Do not add an apostrophe to its when it shows possession.',
    examples: [
      'This is my notebook.',
      'They put their coats near the door.',
      'The bird opens its wings.',
    ],
    question: 'We live here. This is ___ home.',
    options: ['our', 'their', 'his'],
    answer: 'our',
  },
  {
    id: 'place-prepositions',
    title: 'In, on, and under',
    level: 'easy',
    description: 'Describe where people and things are.',
    explanation:
      'Use in for something inside a space, on for something touching a surface, and under for something below another object. Next to means beside.',
    examples: [
      'The keys are in my bag.',
      'The book is on the table.',
      'The cat is under the chair.',
    ],
    question: 'The picture hangs ___ the wall.',
    options: ['in', 'on', 'under'],
    answer: 'on',
  },
  {
    id: 'plurals',
    title: 'One book, two books',
    level: 'easy',
    description: 'Talk about more than one thing.',
    explanation:
      'Most plural nouns add -s. Many nouns ending in -s, -sh, -ch, or -x add -es. Some plurals are irregular: child becomes children and person becomes people.',
    examples: [
      'There are two buses at the station.',
      'The children are reading.',
      'I have three books in my bag.',
    ],
    question: 'There are four ___ in the classroom.',
    options: ['child', 'children', 'childs'],
    answer: 'children',
  },
  {
    id: 'future-plans',
    title: 'Going to and will',
    level: 'medium',
    description: 'Describe plans, predictions, and quick decisions.',
    explanation:
      'Use be going to plus a base verb for an intention or a prediction based on present evidence. Will plus a base verb often expresses a prediction, promise, or decision made as you speak.',
    examples: [
      'We are going to visit the museum.',
      'I will help you with that box.',
      'Look at the clouds. It is going to rain.',
    ],
    question: 'I promise I ___ call you tonight.',
    options: ['will', 'am', 'was'],
    answer: 'will',
  },
  {
    id: 'past-continuous',
    title: 'Past continuous',
    level: 'medium',
    description: 'Describe an action in progress at a past moment.',
    explanation:
      'Use was or were followed by a verb ending in -ing. Combine it with the past simple when a shorter action interrupts an activity already in progress.',
    examples: [
      'I was reading when the phone rang.',
      'They were walking home at six.',
      'She was cooking while he was studying.',
    ],
    question: 'We ___ waiting when the bus arrived.',
    options: ['was', 'were', 'is'],
    answer: 'were',
  },
  {
    id: 'countable-nouns',
    title: 'Much, many, and some',
    level: 'medium',
    description: 'Choose quantity words for countable and uncountable nouns.',
    explanation:
      'Use many with plural countable nouns and much with uncountable nouns, especially in questions and negatives. Some and a lot of can be used with both types.',
    examples: [
      'How many books do you have?',
      'There is not much milk left.',
      'We need some rice and some apples.',
    ],
    question: 'How ___ water do we need?',
    options: ['many', 'much', 'a few'],
    answer: 'much',
  },
  {
    id: 'advice-modals',
    title: 'Should, must, and have to',
    level: 'medium',
    description: 'Give advice and explain obligations.',
    explanation:
      'Should gives advice. Must and have to express strong obligations. Must not means something is forbidden; do not have to means it is not necessary. Use the base verb after should and must.',
    examples: [
      'You should review your notes.',
      'We have to arrive before nine.',
      'You must not park here.',
    ],
    question: 'You ___ not have to bring food; lunch is provided.',
    options: ['do', 'must', 'should'],
    answer: 'do',
  },
  {
    id: 'frequency',
    title: 'Adverbs of frequency',
    level: 'medium',
    description: 'Say how often something happens.',
    explanation:
      'Adverbs such as always, usually, often, sometimes, and never usually come before the main verb but after be. Some adverbs, including sometimes, can also begin a sentence.',
    examples: [
      'I usually read before bed.',
      'She is always on time.',
      'Sometimes we walk to school.',
    ],
    question: 'Choose the natural position: She ___ drinks tea in the morning.',
    options: ['usually', 'is usually', 'usually is'],
    answer: 'usually',
  },
  {
    id: 'relative-clauses',
    title: 'Relative clauses',
    level: 'hard',
    description: 'Add information about a person, thing, or place.',
    explanation:
      'Use who for people, which for things, and where for places. That can replace who or which in many defining clauses. Non-defining clauses add extra information and use commas; they do not use that.',
    examples: [
      'The woman who lives next door is a teacher.',
      'This is the cafe where we met.',
      'My bicycle, which is quite old, still works well.',
    ],
    question: 'My sister, ___ lives abroad, is visiting next week.',
    options: ['that', 'who', 'where'],
    answer: 'who',
  },
  {
    id: 'third-conditional',
    title: 'The third conditional',
    level: 'hard',
    description: 'Imagine a different result in the past.',
    explanation:
      'Use if plus had and the past participle, followed by would have and the past participle. This describes an unreal past situation and its imagined consequence.',
    examples: [
      'If I had left earlier, I would have caught the bus.',
      'She would have helped if she had known.',
      'If we had checked the map, we would not have got lost.',
    ],
    question: 'If he had studied, he ___ have passed.',
    options: ['will', 'would', 'has'],
    answer: 'would',
  },
  {
    id: 'reported-speech',
    title: 'Reported speech',
    level: 'hard',
    description: 'Tell someone what another person said.',
    explanation:
      'After a past reporting verb, the tense often moves back: am becomes was, and will becomes would. Pronouns and time expressions may change with the context. A tense change is not always necessary when something is still true.',
    examples: [
      'She said that she was tired.',
      'He told me he would call the next day.',
      'They said they had finished the work.',
    ],
    question: 'He said, "I am ready." He said that he ___ ready.',
    options: ['was', 'were', 'be'],
    answer: 'was',
  },
  {
    id: 'gerunds-infinitives',
    title: 'Gerunds and infinitives',
    level: 'hard',
    description: 'Choose -ing or to plus a verb after another verb.',
    explanation:
      'Some verbs take -ing, such as enjoy and avoid. Others take to plus a base verb, such as decide and hope. Certain verbs take both forms with a change of meaning, so learn useful combinations in context.',
    examples: [
      'I enjoy reading short stories.',
      'We decided to leave early.',
      'She avoids checking her phone during lessons.',
    ],
    question: 'They decided ___ the earlier train.',
    options: ['taking', 'to take', 'take'],
    answer: 'to take',
  },
  {
    id: 'past-perfect',
    title: 'Past perfect',
    level: 'hard',
    description: 'Show that one past event happened before another.',
    explanation:
      'Use had plus the past participle to make the earlier past event clear. The later event often uses the past simple. When the order is already obvious, the past perfect may be unnecessary.',
    examples: [
      'The train had left before we arrived.',
      'I recognized the street because I had been there before.',
      'She had saved the file before the power went off.',
    ],
    question: 'By the time I arrived, the meeting ___ started.',
    options: ['has', 'had', 'was'],
    answer: 'had',
  },
  {
    id: 'contrast-linkers',
    title: 'Although, despite, and however',
    level: 'hard',
    description: 'Connect contrasting ideas clearly.',
    explanation:
      'Although is followed by a clause with a subject and verb. Despite is followed by a noun or an -ing form. However connects contrasting statements and needs appropriate punctuation.',
    examples: [
      'Although it was raining, we went out.',
      'Despite the rain, we enjoyed the walk.',
      'It was raining. However, we continued.',
    ],
    question: '___ being tired, she finished her work.',
    options: ['Although', 'Despite', 'However'],
    answer: 'Despite',
  },
]
const expandedGrammar = [
  ...new Map(
    [...grammar, ...grammarExtras].map((lesson) => [lesson.id, lesson]),
  ).values(),
]
const correctText = (text) =>
  text
    .replaceAll('nine oclock', "nine o'clock")
    .replaceAll('another students work', "another student's work")
    .replaceAll('another persons experiences', "another person's experiences")
    .replaceAll('each others ideas', "each other's ideas")
const before = { words: 0, sentences: 0, paragraphs: 0 }
for (const level of ['easy', 'medium', 'hard']) {
  for (const category of Object.keys(vocabulary[level])) {
    before.words += words[level][category].length
    words[level][category] = unique([
      ...words[level][category],
      ...vocabulary[level][category].split(' '),
    ])
  }
  before.sentences += sentences[level].length
  before.paragraphs += paragraphs[level].length
  const addedSentences = []
  const addedParagraphs = []
  for (const topic of topics) {
    for (const sentence of topic[level]) {
      addedSentences.push(sentence)
      for (const reflection of reflections[level])
        addedSentences.push(`${sentence} ${reflection}`)
    }
    // Keep each paragraph on one topic; vary the introduction and reflection.
    for (let i = 0; i < 12; i++) {
      addedParagraphs.push(
        `${openings[level][i % 4]} ${topic[level].join(' ')} ${reflections[level][i % 10]}`,
      )
    }
  }
  sentences[level] = unique([...sentences[level], ...addedSentences].map(correctText))
  paragraphs[level] = unique([...paragraphs[level], ...addedParagraphs].map(correctText))
}
await write('words', words)
await write('sentences', sentences)
await write('paragraphs', paragraphs)
await write('grammar', expandedGrammar)
const stats = calculateContentStats({
  words,
  sentences,
  paragraphs,
  grammar: expandedGrammar,
})
await write('content-stats', stats)
console.log(JSON.stringify({ before, after: stats }, null, 2))
