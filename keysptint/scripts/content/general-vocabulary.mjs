const list = (text) => text.trim().split(/\s+/)

export default {
  easy: {
    common: list(`bedtime doorbell doorstep doormat handrail handbag backpack bookcase
      bookshelf cupboard drawer doorknob raincoat rainwear shoelace toothbrush toothpaste
      hairbrush hairband haircut pillowcase bedsheet blanket bathrobe bathtub washcloth
      teapot teaspoon tablespoon lunchbox lunchroom lunchtime playground playtime
      snowman snowball sunshine sunshade sunglasses sunrise sunset seaside seashore
      weekday weekend daybreak daytime nighttime notebook notepad postcard password
      homework housework houseplant teamwork touchscreen keyring bookmark checklist`),
    animals: list(`alpaca angelfish anteater armadillo badger barnacle beagle beaver bison
      blackbird bluebird bobcat bulldog bullfrog canary carp catfish chinchilla chipmunk
      clam cockatoo cod collie cougar coyote cricket dachshund dalmatian doberman
      dormouse dove duckling firefly goldfish greyhound guppy hamster hedgehog heron
      husky kitten ladybug lamb leech lynx magpie mallard manatee meerkat minnow
      mole mongoose mule newt otter parakeet peacock pelican poodle pug raven robin
      sardine seagull seahorse shrimp slug starling starfish tadpole terrier tuna`),
    food: list(`bagel barley beetroot biscuit blackberry blueberry breadcrumb breadstick
      bun buttermilk cabbage cantaloupe cashew celery cereal chickpea chive coleslaw
      cornbread cracker cranberry cupcake custard doughnut dumpling eggplant fig
      flatbread grapefruit granola guava hazelnut hummus icing jelly kale kiwi leek
      lentil lettuce marshmallow meatball milkshake mint mulberry nectarine noodle
      oatmeal pancake papaya pea pecan pineapple popcorn porridge pretzel prune
      radish raspberry relish ricotta sardine sesame shallot sherbet soybean squash
      strawberry syrup tangerine tofu turnip waffle walnut watercress watermelon yam`),
    technology: list(`airplane alarm app avatar backup bookmark brightness browser cable
      calculator calendar charger click clipboard command controller cursor dashboard
      delete desktop download earbud emoji file filter flashlight folder gamepad
      headphone headset hotspot icon inbox joystick keypad laptop link microphone
      monitor mousepad mute network notification offline online outbox password pause
      pointer printer profile refresh remote restart ringtone router scanner screenshot
      shortcut slideshow smartphone speaker spreadsheet stylus swipe tablet thumbnail
      toolbar trackpad undo unmute upload username vibration wallpaper webcam zoom`),
    nature: list(`acorn ash bay birch bluebell blossom bramble brook buttercup cactus
      canyon cedar chestnut clover cobweb coastline coral cornfield cottonwood daffodil
      daisy dandelion driftwood elm evergreen fern fir foothill grassland grove hawthorn
      hay hedgerow holly honeysuckle icicle juniper kelp lagoon lavender lily mangrove
      maple marsh meadow moss oak orchard pebble pine poplar puddle reed rockpool
      rosebud sapling seaweed seedling snowdrop snowflake spruce sunflower sycamore
      thistle thorn treetop tulip violet waterfall willow woodland`),
    school: list(`abacus alphabet assembly attendance backpack binder blackboard booklet
      bookcase bookmark breaktime calculator cafeteria classmate classroom clipboard
      coach compass crayon cubby dictionary doorway drawing eraser exercise flashcard
      folder fountain geometry handwriting highlighter hallway homework journal locker
      lunchbox marker notebook notepad noticeboard paintbrush playground poster
      practice printer projector puzzle reading recess register report rubber
      satchel schoolbag scissors sharpener sketchbook spelling stapler stopwatch
      storybook teamwork timetable underline workbook worksheet writing yardstick`),
    business: list(`barcode basket bid bonus booth brochure cashier catalog checkout
      counter coupon crate customer delivery deposit display flyer freight gift
      goal invoice kiosk leaflet ledger loan luggage mailbox manager memo merchant
      outlet overtime package payday payment payroll photocopy postcard product
      receipt refund register reminder reorder retailer return savings seller service
      shipment shopper signature slogan storefront supplier takeaway ticket till
      toolbox trademark trolley voucher warehouse webshop worker workspace`),
  },
  medium: {
    common:
      list(`adaptable attentively appreciatively reassuringly hesitantly thoughtfully
      cheerfully patiently noticeably reasonably steadily gradually deliberately
      considerately collaboratively confidently courteously critically dependably
      efficiently empathetically enthusiastically flexibly gratefully imaginatively
      independently informatively meaningfully methodically optimistically patiently
      perceptively persistently practically proactively professionally promptly
      realistically reflectively respectfully responsibly sensitively sincerely
      strategically supportively tactfully tentatively transparently unhurriedly
      wholeheartedly willingly workaround oversight follow-through momentum setback`),
    animals: list(`aardvark albatross anaconda anchovy angelfish anemone axolotl baboon
      bandicoot barracuda barnacle basilisk beluga bonobo bumblebee capuchin caracal
      cassowary chamois cicada coati cockatiel cuttlefish damselfly dugong echidna
      egret ermine gecko gibbon glowworm grouse guillemot hammerhead ibex iguana
      impala jackal kestrel lapwing lemur lorikeet macaque mandrill marmot marten
      narwhal ocelot okapi pangolin puffin quokka sandpiper serval shrew skylark
      tapir tarantula toucan wallaby warbler wombat wren`),
    food: list(`arugula aubergine balsamic bokchoy bulgur cannellini cannelloni caper
      cardamom cassava celeriac chervil chicory chutney clementine couscous courgette
      edamame endive escarole farro fenugreek focaccia frittata galangal gherkin
      gnocchi gooseberry gremolata halloumi harissa horseradish jackfruit jicama
      kimchi kohlrabi kumquat lasagna lemongrass lychee macadamia mandarin mascarpone
      millet muesli nutmeg okra parsnip passionfruit polenta pomelo provolone quinoa
      radicchio ravioli rhubarb risotto rocket rutabaga saffron sauerkraut semolina
      soba sorghum tahini tamarind tempeh tomatillo truffle vermicelli vinaigrette`),
    technology: list(`accelerometer adapter administrator annotation antivirus attachment
      authentication automation autosave bitrate bootloader broadband buffering
      cache calibration cartridge chatbot checksum chipset codec compatibility
      compression configuration connectivity debugging decoder digitizer directory
      docking encryption emulator executable extension firmware formatting gigabyte
      graphics hibernate hyperlink initialization installation interface iteration
      latency megapixel metadata middleware motherboard multimeter namespace
      navigation partition peripheral pixelation processor proxy rendering resolution
      responsive rollback sandbox scheduler scrollback simulator snippet snapshot
      streaming synchronization template terabyte troubleshooting updater versioning`),
    nature: list(`aquifer archipelago badlands biome biosphere canopy catchment chalkland
      cirrus conifer delta estuary floodplain freshwater geothermal geyser gorge
      headland heathland hydrology intertidal isthmus karst lakeshore lava loess
      moraine mudflat outcrop overcast peatland permafrost rainfall riparian savanna
      sediment shale silt snowmelt stalactite stalagmite steppe subtropical taiga
      tributary undergrowth upland watershed weathering windbreak windward xerophyte
      woodland wetland wildflower limestone sandstone basalt granite quartz lichen
      deciduous germination pollination salinity shoreline stratification`),
    school: list(`annotation apprenticeship assessment auditorium bibliography bursary
      coursework credential deduction dissertation enrollment elective exchange
      facilitator fieldwork fluency footnote glossary hypothesis internship lecturer
      literacy mentorship numeracy observation orientation outline peer
      placement portfolio practicum proofreading qualification rubric schoolwork
      seminar specialization submission supervision synthesis transcript tutoring
      undergraduate viva webinar workshop accreditation brainstorming citation
      comprehension concentration consultation demonstration extracurricular induction`),
    business: list(`accrual allocation appraisal arrears audit authorization beneficiary
      billing bookkeeping bottleneck breakeven broker buyback clearance consortium
      contingency convertible depreciation disbursement dividend distributor escrow
      expenditure forecast franchise fulfillment guarantor goodwill handover incentive
      installment intermediary leasing liability logistics margin milestone overhead
      procurement prospectus reconciliation remittance replenishment restructuring
      retention royalty solvency subcontractor surcharge tender turnover underwriting
      valuation venture workflow writeoff receivable payable reimbursement`),
  },
  hard: {
    common: list(`counterintuitive intersubjective incontrovertible incommensurable
      irreconcilable inconsequential disproportionate quintessentially circumspection
      conscientiousness interconnectedness institutionalization contextualization
      reconceptualization operationalization oversimplification misinterpretation
      intergenerational transdisciplinary epistemological phenomenological
      heterogeneity counterproductive disambiguation interoperability
      multidimensionality irreproducibility misrepresentation indeterminacy
      underrepresentation overgeneralization indefatigable unquantifiable
      antithetical idiosyncratic inconspicuous magnanimous perspicacious
      superfluous assiduously unequivocally disproportionately retrospectively
      comprehensibility interdependence indispensability negotiability provisionality`),
    animals: list(`acarology arachnology arthropod bivalve bryozoan chelicerate chordate
      cnidarian copepod decapod echinoderm elasmobranch entomology eusociality
      gastropod hemichordate hymenopteran ichthyology lagomorph lepidopteran
      malacology monotreme mustelid nematode nudibranch opisthobranch osteichthyan
      oviparous ovoviviparous passerine pinniped platyhelminth proboscidean
      protochordate ruminant scyphozoan solenodon tardigrade tenrec therapsid
      ungulate urochordate xenarthran zooplankton zoogeography zoosemiotics
      kleptoparasitism myrmecophagy neoteny paedomorphosis polyandry polygyny`),
    food: list(`albumin alkalization amylase anthocyanin ascorbate bioavailability
      biofortification casein coagulant denaturation dextrinization diastase
      emulsifier encapsulation fructooligosaccharide gelatinization glucosinolate
      glycemic hydrocolloid hygroscopicity isoflavone lactofermentation lycopene
      maltodextrin microencapsulation mycoprotein niacin oleoresin organoleptic
      osmolality pectinase phenylalanine phytonutrient polyphenol retrogradation
      saccharification saponification stearate syneresis thixotropy tocopherol
      triglyceride ultrafiltration umami xanthophyll zeaxanthin acidulant aeration
      brining emulsification enzymolysis isomerization pasteurization tempering`),
    technology: list(`backpropagation canonicalization containerization cryptanalysis
      deconvolution deserialization deterministic disintermediation eigenvector
      consistency exfiltration hyperthreading immutability inferencing
      introspection linearizability memoization microsegmentation multiplexing
      nonrepudiation parameterization photolithography pipelining preemption
      referentiality reentrancy reproducibility sandboxing semaphores sharding
      steganography superscalar supersampling transcompilation vectorization
      verifiability zeroization rasterization tokenization quantization debouncing
      namespacing obfuscation observability orchestration serialization
      parallelization deallocation interpolation polymorphism homomorphism`),
    nature: list(`anthropogenic biogeochemical bioaccumulation biomagnification
      chemolithotrophy chemosynthesis cryosphere dendrochronology denitrification
      diagenesis ecophysiology edaphology endemism evapotranspiration geomorphometry
      geostatistics heliotropism heterotrophy hydrogeomorphology hypsometry
      lithosphere mesosphere nitrification oligotrophic paleoclimatology
      paleolimnology palynology pedogenesis phenology phytoremediation
      radiative rhizosphere riparian salinization sclerophyllous
      sedimentology silviculture solifluction speleothem stomatal
      thermohaline xerophytic zoogeography allochthonous autochthonous
      bioturbation eutrophication isostasy limnology lithification orography`),
    school: list(`andragogy anaphora apperception autodidacticism axiomatization
      cognitivism concordance contrapositive decontextualization dialectics
      didactics differentiation ethnography hermeneutics heuristics
      intertextuality metalanguage metalinguistic morphosyntax multimodality
      norm-referencing orthography paradigmatic phonotactics pragmatics
      psycholinguistics psychometrics rubrication sociolinguistics
      sociocultural summative syntagmatic triangulation universalization
      epistemic epistemological phenomenography phenomenology
      constructivist referential inferential abductive deductive inductive
      transitivity nominalization subordination coordination collocation`),
    business: list(`antidilution assetization capital collateralization
      counterparty crosscollateralization dematerialization disintermediation
      econometrics fungibility hypothecation illiquidity indemnification
      intermediation buyout securitization subrogation syndication
      tranching receivership recapitalization rehypothecation repricing
      reinsurance forbearance defalcation defeasance demutualization
      disinvestment escheatment expropriation novation nonrecourse
      amortizable arbitrageur beneficiation divestiture fiduciary
      encumbrance subordination overcapitalization undercapitalization
      rationalization monetization capitalization externalization`),
  },
}
