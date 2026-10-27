// Static heritage dataset for the 10 featured Indian states.
// No backend: everything ships with the app bundle.

import maharashtra from "@/assets/state-maharashtra.jpg";
import tamilnadu from "@/assets/state-tamilnadu.jpg";
import kerala from "@/assets/state-kerala.jpg";
import rajasthan from "@/assets/state-rajasthan.jpg";
import gujarat from "@/assets/state-gujarat.jpg";
import westbengal from "@/assets/state-westbengal.jpg";
import karnataka from "@/assets/state-karnataka.jpg";
import telangana from "@/assets/state-telangana.jpg";
import punjab from "@/assets/state-punjab.jpg";
import uttarpradesh from "@/assets/state-uttarpradesh.jpg";

export type HeritageItem = {
  name: string;
  description: string;
};

export type VideoLink = {
  title: string;
  description: string;
  url: string;
};

export type HeritageState = {
  id: number;
  slug: string;
  name: string;
  heroImage: string;
  description: string;
  folkArts: HeritageItem[];
  cuisine: HeritageItem[];
  traditions: HeritageItem[];
  videos: VideoLink[];
};

/** Builds a YouTube search URL so every video link always resolves. */
const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const HERITAGE_STATES: HeritageState[] = [
  {
    id: 1,
    slug: "maharashtra",
    name: "Maharashtra",
    heroImage: maharashtra,
    description:
      "Forts of the Marathas, the rhythm of Lavani and a food culture built on spice and street corners.",
    folkArts: [
      {
        name: "Lavani",
        description:
          "A powerful song-and-dance form performed to the beat of the dholki, known for its quick footwork and expressive storytelling in nauvari sarees.",
      },
      {
        name: "Tamasha",
        description:
          "Travelling folk theatre mixing music, dance and satire, traditionally performed through the night in village squares.",
      },
      {
        name: "Powada",
        description:
          "Ballads sung by Shahirs that narrate the valour of Chhatrapati Shivaji Maharaj and Maratha warriors.",
      },
    ],
    cuisine: [
      {
        name: "Misal Pav",
        description:
          "Sprouted moth beans in a fiery tarri gravy, topped with farsan, onion and coriander, served with buttered pav.",
      },
      {
        name: "Poha",
        description:
          "Flattened rice tempered with mustard, turmeric, curry leaves and peanuts — the state's favourite breakfast.",
      },
      {
        name: "Puran Poli",
        description:
          "Soft flatbread stuffed with jaggery and chana dal, cooked in ghee and eaten during festivals.",
      },
    ],
    traditions: [
      {
        name: "Gudi Padwa",
        description:
          "The Marathi new year, marked by raising a silk-draped gudi at the doorway and sharing neem-jaggery for a sweet year ahead.",
      },
      {
        name: "Ganesh Chaturthi",
        description:
          "Ten days of clay Ganpati idols, community pandals, drumming troupes and an immersion procession that fills the streets.",
      },
    ],
    videos: [
      { title: "Lavani dance performance", description: "Traditional Lavani on stage", url: yt("Lavani dance Maharashtra performance") },
      { title: "Ganesh Chaturthi in Mumbai", description: "Festival scenes and processions", url: yt("Ganesh Chaturthi Mumbai documentary") },
      { title: "Maratha forts of Maharashtra", description: "History of Shivaji's hill forts", url: yt("Maratha forts Shivaji history documentary") },
      { title: "Maharashtrian food trail", description: "Misal, vada pav and more", url: yt("Maharashtrian street food misal pav") },
    ],
  },
  {
    id: 2,
    slug: "tamil-nadu",
    name: "Tamil Nadu",
    heroImage: tamilnadu,
    description:
      "Temple gopurams, Carnatic music and a classical dance tradition that is over two thousand years old.",
    folkArts: [
      {
        name: "Bharatanatyam",
        description:
          "A classical dance of precise geometry, hand gestures and abhinaya, born in the temples of Tanjore.",
      },
      {
        name: "Kolattam",
        description:
          "A stick dance performed in circles by groups of women, with the clacking sticks keeping the rhythm.",
      },
      {
        name: "Karagattam",
        description:
          "Balancing an ornate water pot on the head while dancing, performed in praise of the rain goddess Mariamman.",
      },
    ],
    cuisine: [
      { name: "Dosa", description: "Fermented rice and lentil crepe, crisp at the edges, served with chutney and sambar." },
      { name: "Idli", description: "Steamed rice cakes, feather-light and eaten with coconut chutney and milagai podi." },
      { name: "Sambar", description: "Tamarind and toor dal stew with drumstick, shallots and a roasted spice blend." },
      { name: "Chettinad Curry", description: "Deeply spiced curry with star anise, stone flower and freshly ground masala." },
    ],
    traditions: [
      { name: "Pongal", description: "A four-day harvest festival where rice boils over in new pots as a sign of abundance, with kolam at every doorstep." },
      { name: "Deepavali", description: "Dawn oil baths, new clothes, firecrackers and trays of sweets shared across neighbourhoods." },
    ],
    videos: [
      { title: "Bharatanatyam arangetram", description: "A full classical recital", url: yt("Bharatanatyam performance classical") },
      { title: "Pongal celebrations", description: "Harvest festival traditions", url: yt("Pongal festival Tamil Nadu celebration") },
      { title: "Temples of Tamil Nadu", description: "Dravidian architecture tour", url: yt("Tamil Nadu temples Dravidian architecture documentary") },
      { title: "Chettinad kitchen", description: "Cooking traditional Tamil dishes", url: yt("Chettinad cuisine traditional cooking") },
    ],
  },
  {
    id: 3,
    slug: "kerala",
    name: "Kerala",
    heroImage: kerala,
    description:
      "Backwaters, coconut groves and the painted faces of Kathakali telling epics through the night.",
    folkArts: [
      { name: "Kathakali", description: "Classical dance-drama with towering headgear and green chutti makeup, enacting scenes from the Mahabharata and Ramayana." },
      { name: "Mohiniyattam", description: "The graceful 'dance of the enchantress', performed in off-white kasavu costume with swaying torso movements." },
      { name: "Theyyam", description: "A ritual performance of north Kerala where the dancer becomes the deity, in fire, red pigment and enormous headdresses." },
    ],
    cuisine: [
      { name: "Appam with Stew", description: "Lacy fermented rice hoppers with a mild coconut-milk stew of vegetables or chicken." },
      { name: "Puttu", description: "Steamed cylinders of rice flour layered with grated coconut, eaten with kadala curry." },
      { name: "Meen Curry", description: "Fish simmered in kudampuli tamarind, chilli and coconut oil in a clay pot." },
      { name: "Sadya", description: "A vegetarian banquet of two dozen dishes served on a banana leaf." },
    ],
    traditions: [
      { name: "Onam", description: "Ten days honouring King Mahabali with flower carpets, snake-boat races, Pulikali tiger dancers and the grand Onasadya." },
      { name: "Thrissur Pooram", description: "A temple festival of caparisoned elephants, percussion ensembles and a legendary parasol exchange." },
    ],
    videos: [
      { title: "Kathakali performance", description: "Classical dance-drama on stage", url: yt("Kathakali performance Kerala") },
      { title: "Onam festival", description: "Pookalam, sadya and boat races", url: yt("Onam festival Kerala celebration") },
      { title: "Kerala backwaters", description: "Alleppey houseboat journey", url: yt("Kerala backwaters Alleppey documentary") },
      { title: "Kerala sadya cooking", description: "The banana-leaf feast", url: yt("Kerala sadya cooking traditional") },
    ],
  },
  {
    id: 4,
    slug: "rajasthan",
    name: "Rajasthan",
    heroImage: rajasthan,
    description:
      "Desert forts, mirror-work skirts and folk music carried across the dunes by Manganiyar singers.",
    folkArts: [
      { name: "Ghoomar", description: "A twirling dance of the Rajput courts, performed in flowing ghagras with graceful clapping patterns." },
      { name: "Kalbelia", description: "The snake-charmer community's serpentine dance in black swirling skirts, recognised by UNESCO." },
      { name: "Kathputli", description: "String puppetry that has carried folk tales and royal legends through Rajasthan's villages for centuries." },
    ],
    cuisine: [
      { name: "Dal Baati Churma", description: "Baked wheat balls dunked in ghee with spiced dal and sweet crushed churma." },
      { name: "Ker Sangri", description: "Desert berries and beans cooked with red chilli and dried mango — a true arid-land dish." },
      { name: "Laal Maas", description: "Fiery mutton curry built on Mathania chillies and smoky ghee." },
    ],
    traditions: [
      { name: "Pushkar Camel Fair", description: "A week of camel trading, folk performances and a holy dip at Pushkar lake under the full moon." },
      { name: "Desert Festival, Jaisalmer", description: "Turban-tying contests, folk music on the Sam dunes and camel polo against a sandstone city." },
    ],
    videos: [
      { title: "Ghoomar dance", description: "Traditional Rajasthani folk dance", url: yt("Ghoomar dance Rajasthan folk") },
      { title: "Pushkar camel fair", description: "Inside the desert fair", url: yt("Pushkar camel fair documentary") },
      { title: "Forts of Rajasthan", description: "Amber, Mehrangarh and Jaisalmer", url: yt("Rajasthan forts documentary Mehrangarh Amber") },
      { title: "Rajasthani thali", description: "Dal baati churma and more", url: yt("Rajasthani thali dal baati churma cooking") },
    ],
  },
  {
    id: 5,
    slug: "gujarat",
    name: "Gujarat",
    heroImage: gujarat,
    description:
      "Nine nights of Garba, salt flats that glow white and a kitchen that loves the sweet-savoury balance.",
    folkArts: [
      { name: "Garba", description: "Circular devotional dance around a lamp-lit earthen garbo, performed through the nine nights of Navratri." },
      { name: "Dandiya Raas", description: "Paired stick dance re-enacting the play of Krishna and the gopis, danced at furious speed." },
      { name: "Bhavai", description: "Folk theatre of north Gujarat mixing social satire, music and bhungal trumpet." },
    ],
    cuisine: [
      { name: "Dhokla", description: "Steamed fermented gram-flour squares, tempered with mustard seeds and curry leaves." },
      { name: "Fafda–Jalebi", description: "Crisp gram-flour strips with hot syrupy jalebi, the Sunday morning ritual." },
      { name: "Undhiyu", description: "Winter casserole of surti beans, yam and muthiya, slow-cooked upside down in an earthen pot." },
      { name: "Khichdi Kadhi", description: "Comfort food of soft rice-lentil khichdi with sweet-tangy yoghurt kadhi." },
    ],
    traditions: [
      { name: "Navratri", description: "Nine nights of Garba in every street and ground, with communities dancing till dawn." },
      { name: "Uttarayan", description: "The kite festival of mid-January when Ahmedabad's skies fill with colour and rooftop feasts." },
    ],
    videos: [
      { title: "Navratri Garba nights", description: "Traditional Garba in Gujarat", url: yt("Navratri Garba Gujarat traditional") },
      { title: "Uttarayan kite festival", description: "Kite flying in Ahmedabad", url: yt("Uttarayan kite festival Ahmedabad") },
      { title: "Rann of Kutch", description: "White desert and craft villages", url: yt("Rann of Kutch documentary crafts") },
      { title: "Gujarati thali", description: "Classic dishes explained", url: yt("Gujarati thali cooking traditional") },
    ],
  },
  {
    id: 6,
    slug: "west-bengal",
    name: "West Bengal",
    heroImage: westbengal,
    description:
      "Durga Puja pandals, Baul wanderers with ektaras and a sweet shop on every corner.",
    folkArts: [
      { name: "Baul", description: "Mystic minstrels who sing of the 'man of the heart', accompanied by ektara and duggi." },
      { name: "Chhau (Purulia)", description: "Masked martial dance retelling epic battles with acrobatic leaps and drum ensembles." },
      { name: "Patachitra", description: "Scroll painters who unroll painted narratives while singing the accompanying pater gaan." },
    ],
    cuisine: [
      { name: "Shorshe Ilish", description: "Hilsa fish in a pungent mustard paste, steamed with green chillies and mustard oil." },
      { name: "Rosogolla", description: "Spongy chhena balls simmered in light sugar syrup — Bengal's most argued-over sweet." },
      { name: "Sandesh", description: "Delicate fresh-cheese sweet flavoured with nolen gur in winter." },
      { name: "Luchi Aloor Dom", description: "Puffed white flour bread with a spiced baby-potato curry." },
    ],
    traditions: [
      { name: "Durga Puja", description: "Five days of artistic pandals, dhak drumming, dhunuchi dance and sindoor khela before immersion." },
      { name: "Poila Boishakh", description: "Bengali new year with new account books, new clothes and family feasts." },
    ],
    videos: [
      { title: "Durga Puja in Kolkata", description: "Pandal hopping and rituals", url: yt("Durga Puja Kolkata documentary") },
      { title: "Baul songs of Bengal", description: "Mystic folk music", url: yt("Baul song Bengal folk music") },
      { title: "Bengali sweets", description: "How rosogolla is made", url: yt("Bengali sweets rosogolla making") },
      { title: "Chhau dance", description: "Masked folk dance of Purulia", url: yt("Purulia Chhau dance performance") },
    ],
  },
  {
    id: 7,
    slug: "karnataka",
    name: "Karnataka",
    heroImage: karnataka,
    description:
      "Hampi's stone chariots, all-night Yakshagana theatre and filter coffee that starts every morning.",
    folkArts: [
      { name: "Yakshagana", description: "Coastal night-long theatre combining dance, painted faces, towering headgear and improvised dialogue." },
      { name: "Dollu Kunitha", description: "Powerful drum dance performed by groups with large decorated drums slung at the waist." },
      { name: "Veeragase", description: "Vigorous dance of Shaiva devotion performed during Dasara with sword and unsheathed energy." },
    ],
    cuisine: [
      { name: "Bisi Bele Bath", description: "Hot lentil-rice one-pot dish with tamarind, vegetables and a unique roasted masala." },
      { name: "Mysore Masala Dosa", description: "Dosa smeared with red chutney, stuffed with potato palya and finished in ghee." },
      { name: "Ragi Mudde", description: "Finger-millet balls eaten with spiced saaru — the staple of the southern plains." },
      { name: "Mysore Pak", description: "Melting gram-flour and ghee sweet born in the Mysore palace kitchen." },
    ],
    traditions: [
      { name: "Mysuru Dasara", description: "Ten days of royal procession, lit palaces and the Jamboo Savari elephant parade." },
      { name: "Makara Sankranti", description: "Exchanging ellu-bella sesame and jaggery with the words 'speak sweetly' to mark the harvest." },
    ],
    videos: [
      { title: "Yakshagana night", description: "Coastal Karnataka theatre", url: yt("Yakshagana performance Karnataka") },
      { title: "Mysuru Dasara", description: "The royal procession", url: yt("Mysuru Dasara procession") },
      { title: "Hampi heritage", description: "Vijayanagara ruins", url: yt("Hampi Vijayanagara documentary") },
      { title: "Karnataka cuisine", description: "Bisi bele bath and dosa", url: yt("Karnataka cuisine bisi bele bath cooking") },
    ],
  },
  {
    id: 8,
    slug: "telangana",
    name: "Telangana",
    heroImage: telangana,
    description:
      "Charminar's arches, Deccan dynasties and a biryani that sparked its own school of cooking.",
    folkArts: [
      { name: "Perini Shivatandavam", description: "The warriors' dance once performed before battle, revived from Kakatiya temple sculptures." },
      { name: "Oggu Katha", description: "Narrative ballad tradition of the Yadava community praising Mallanna and Beerappa." },
      { name: "Kuchipudi", description: "Classical dance-drama of the Telugu lands, famed for the brass-plate tarangam sequence." },
    ],
    cuisine: [
      { name: "Hyderabadi Biryani", description: "Dum-cooked layered rice and marinated meat sealed under dough, served with mirchi ka salan." },
      { name: "Haleem", description: "Wheat, lentils and slow-pounded meat cooked for hours, a Ramzan speciality." },
      { name: "Sarva Pindi", description: "Rice-flour savoury pancake with peanuts and chana dal, pressed into a pan and baked crisp." },
    ],
    traditions: [
      { name: "Bonalu", description: "Women carry decorated pots of rice and jaggery to Mahankali temples with Pothuraju dancers leading." },
      { name: "Bathukamma", description: "A flower-stack festival where women build colourful floral towers and float them in water." },
    ],
    videos: [
      { title: "Bonalu festival", description: "Hyderabad temple festival", url: yt("Bonalu festival Hyderabad") },
      { title: "Perini Shivatandavam", description: "The warrior dance revived", url: yt("Perini Shivatandavam dance Telangana") },
      { title: "Hyderabadi biryani", description: "The dum cooking method", url: yt("Hyderabadi biryani dum cooking traditional") },
      { title: "Charminar and old city", description: "Heritage walk", url: yt("Charminar Hyderabad heritage walk") },
    ],
  },
  {
    id: 9,
    slug: "punjab",
    name: "Punjab",
    heroImage: punjab,
    description:
      "Mustard fields, dhol beats and a table that never lets anyone leave hungry.",
    folkArts: [
      { name: "Bhangra", description: "High-energy harvest dance of leaps and shoulder work, driven by the dhol and boliyan couplets." },
      { name: "Giddha", description: "Women's folk dance of rhythmic claps and witty boliyan about village life and family." },
      { name: "Jhummar", description: "A slower, circular dance of grace from the Sandalbar tradition, performed in a soft 4/4 beat." },
    ],
    cuisine: [
      { name: "Sarson ka Saag", description: "Slow-cooked mustard greens finished with ghee, eaten with makki di roti and jaggery." },
      { name: "Butter Chicken", description: "Tandoori chicken in a tomato-butter gravy that travelled from Punjab to the world." },
      { name: "Amritsari Kulcha", description: "Stuffed crisp bread baked in a tandoor, served with chole and white butter." },
    ],
    traditions: [
      { name: "Baisakhi", description: "The harvest festival and Khalsa founding day, marked by nagar kirtan, bhangra and gurdwara visits." },
      { name: "Lohri", description: "Bonfire night in mid-January with popcorn, rewri and songs of Dulla Bhatti." },
    ],
    videos: [
      { title: "Bhangra performance", description: "Traditional Punjabi folk dance", url: yt("Bhangra performance Punjab traditional") },
      { title: "Baisakhi celebrations", description: "Harvest festival in Punjab", url: yt("Baisakhi festival Punjab celebration") },
      { title: "Golden Temple langar", description: "The world's largest community kitchen", url: yt("Golden Temple langar documentary") },
      { title: "Punjabi village food", description: "Saag, roti and lassi", url: yt("Punjabi village food sarson ka saag cooking") },
    ],
  },
  {
    id: 10,
    slug: "uttar-pradesh",
    name: "Uttar Pradesh",
    heroImage: uttarpradesh,
    description:
      "The Taj at sunrise, ghats of Varanasi, Kathak footwork and the slow smoke of Awadhi kitchens.",
    folkArts: [
      { name: "Kathak", description: "Classical dance of spins and intricate footwork, shaped in the temples of Braj and the Lucknow court." },
      { name: "Raslila", description: "Devotional theatre of Vrindavan re-enacting Krishna's life through song and dance." },
      { name: "Nautanki", description: "Loud, lively folk opera with nakkara drums, sung dialogue and moral tales." },
    ],
    cuisine: [
      { name: "Awadhi Biryani", description: "Fragrant pakki-style biryani cooked on dum with saffron, kewra and tender meat." },
      { name: "Galouti Kebab", description: "Melt-in-the-mouth minced kebab of Lucknow with over a hundred spices, served with sheermal." },
      { name: "Agra Petha", description: "Translucent ash-gourd sweet, plain or flavoured with kesar and paan." },
      { name: "Banarasi Chaat", description: "Tamarind, yoghurt and crisp papdi layered into the street food of Varanasi." },
    ],
    traditions: [
      { name: "Kumbh Mela", description: "The world's largest gathering of pilgrims, with holy dips at the Sangam in Prayagraj." },
      { name: "Holi in Braj", description: "Barsana's Lathmar Holi and Mathura's colour-soaked week celebrating Krishna and Radha." },
      { name: "Dev Deepawali", description: "Varanasi ghats lit with lakhs of diyas on Kartik Purnima." },
    ],
    videos: [
      { title: "Kathak recital", description: "Lucknow gharana footwork", url: yt("Kathak dance performance Lucknow gharana") },
      { title: "Kumbh Mela", description: "Inside the great pilgrimage", url: yt("Kumbh Mela Prayagraj documentary") },
      { title: "Varanasi ghats", description: "Ganga aarti at dusk", url: yt("Varanasi Ganga aarti ghats") },
      { title: "Awadhi cuisine", description: "Lucknow kebabs and biryani", url: yt("Awadhi cuisine Lucknow kebab biryani") },
    ],
  },
];

export const STATE_NAMES = HERITAGE_STATES.map((s) => s.name);

export const POST_CATEGORIES = [
  "Folk Art",
  "Cuisine",
  "Tradition",
  "Monument",
  "Other",
] as const;

export const getStateBySlug = (slug: string) =>
  HERITAGE_STATES.find((s) => s.slug === slug);
