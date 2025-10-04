// Website Configuration Constants
// This file contains all the configurable variables for the entire website

// Display Settings
export const SHOW_MASCOT = false; // Set to true to show mascot alongside AIFSM title

// Event Configuration
export const TARGET_DATE = new Date("2025-11-12T00:00:00+05:30"); // Event start date
export const REGISTRATION_OPEN = true; // Set to false to close registration

// Event Branding
export const EVENT_TITLE = "28th All India Forest Sports Meet, 2025";
export const EVENT_SHORT_NAME = "AIFSM";
export const EVENT_YEAR = "2025";
export const EVENT_DATES = "12th-16th November, 2025";
export const EVENT_WELCOME_MESSAGE = "📢 Welcome to AIFSM 2025 - All India Forest Sports Meet";

// Organization Details
export const ORGANIZING_DEPT = "Uttarakhand Forest Department";
export const ORGANIZING_GOVT = "Government of Uttarakhand";

// Contact Information
export const SUPPORT_EMAIL = "support@aifsm2025.in"; // Update with real email
export const WEBSITE_URL = "https://aifsm2025.in";

// Site Metadata
export const SITE_DESCRIPTION =
  "Official website for the 28th All India Forest Sports Meet 2025, hosted by Uttarakhand Forest Department";
export const SITE_KEYWORDS = "AIFSM, All India Forest Sports Meet, Uttarakhand, Forest Department, Sports, 2025";

// Video Configuration
export const YOUTUBE_VIDEO_URL = "https://www.youtube.com/watch?v=B-GKC3lhvsM"; // YouTube video for the carousel

// Pagination Settings
export const ITEMS_PER_PAGE = 4; // Number of news items per page

// Authentication Constants
export const DEFAULT_PASSWORD = "changeme"; // Default password for new users

// Registration Rules
export const REGISTRATION_LIMITS = {
  MAX_SOLO_EVENTS: 5,
  MAX_TEAM_EVENTS: 3,
} as const;

// Team Event Keywords - events containing these keywords are considered team events
export const TEAM_EVENT_KEYWORDS = [
  "Team",
  "Relay",
  "Hockey",
  "Football",
  "Basketball",
  "Volleyball",
  "Cricket",
] as const;

// Admin Configuration
export const ADMIN_EMAIL = "admin@aifsm2025.in";

// Helper function to check if user is admin
export const isAdminUser = (userEmailOrUsername: string | null | undefined): boolean => {
  if (!userEmailOrUsername) return false;
  // Check both email and username patterns for admin access
  return userEmailOrUsername === ADMIN_EMAIL || userEmailOrUsername === "admin";
};

// Helper function to validate organization based on username
export const validateUsernameOrganization = (usernameOrEmail: string, selectedOrg: string): boolean => {
  if (!usernameOrEmail || !selectedOrg) return false;

  // Actual user data from CSV for validation
  const USER_ORG_MAP: Record<string, string> = {
    // Username -> Organization mapping from actual CSV data
    "advait.indian": "IIFM",
    "santosh.goa": "Goa",
    "n.meghalaya": "Meghalaya",
    "amit.wildlife": "WII",
    "amlendu.indira": "IGNFA & DFE",
    "drka.jammu": "Jammu & Kashmir",
    "elusing.telangana": "Telangana",
    "shalini.chattisgarh": "Chattisgarh",
    "deepa.kerala": "Kerala",
    "s.gujarat": "Gujarat",
    "kasi.andhra": "Andhra Pradesh",
    "drpv.delhi": "Delhi",
    "pinaki.uttar": "Uttar Pradesh",
    "dharm.uttarakhand": "Uttarakhand",
    "raju.west": "West Bengal",
    "suraj.andaman": "Andaman & Nicobar Islands",
    "anand.dadra": "Dadra & Nagar Haveli & Daman & Diu",
    "rajesh.indian": "ICFRE",
    "damodhar.ar": "Aruranchal Pradesh",
    "sh.chandigarh": "Chandigarh",
    "nandakumar.puducherry": "Puducherry",
    "sanjeev.maharashtra": "Maharashtra",
    "dr.haryana": "Haryana",
    "k.himachal": "Himachal Pradesh",
    "karthick.odisha": "Odisha",
    "k.rajasthan": "Rajasthan",
    "manjunath.karnatka": "Karnatka",
    "hari.madhya": "Madhya Pradesh",
    "arvind.forest": "FSI",
    "paritosh.jharkhand": "Jharkhand",
    "anwardeen.tamil": "Tamil Nadu",
    "prabhat.nagaland": "Nagaland",
    "plt.tripura": "Tripura",
    "rajendra.ministry": "MoEFCC",
    "rajendra.assam": "Assam",
    "sanajaoba.manipur": "Manipur",
    "satyajeet.bihar": "Bihar",
    "pssk.lakshadweep": "Lakshadweep",
    "laltlanhlua.mizoram": "Mizoram",
    "udai.sikkim": "Sikkim",
    "vishal.punjab": "Punjab",
    "vishal.laddakh": "Laddakh",
    admin: "DUMMY", // Admin user for testing
    dummy: "DUMMY", // Dummy entry for testing
  };

  // Email -> Organization mapping from actual CSV data
  const EMAIL_ORG_MAP: Record<string, string> = {
    "advaite@iifmbhopal.edu.in": "IIFM",
    "agmu270@ifs.nic.in": "Goa",
    "alemokyn@gmail.com": "Meghalaya",
    "amit@wii.gov.in": "WII",
    "amlendupathak86@gmail.com": "IGNFA & DFE",
    "anandhifs2004@gmail.com": "Jammu & Kashmir",
    "elusingm@yahoo.com": "Telangana",
    "apccf-hrdit.cg@gov.in": "Chattisgarh",
    "apccfihrd@gmail.com": "Kerala",
    "apccfrtgs@gmail.com": "Gujarat",
    "apfd.aifsm@gmail.com": "Andhra Pradesh",
    "ccf.gnctd@delhi.gov.in": "Delhi",
    "ccfepr@gmail.com": "Uttar Pradesh",
    "cfbhagirathi123@gmail.com": "Uttarakhand",
    "dasraju@icloud.com": "West Bengal",
    "dcfmdchatham@gmail.com": "Andaman & Nicobar Islands",
    "dcft-dnh@ddd.gov.in": "Dadra & Nagar Haveli & Daman & Diu",
    "ddg_res@icfre.org": "ICFRE",
    "drdamodharatifs@gmail.com": "Aruranchal Pradesh",
    "forestchandiarh@gmail.com": "Chandigarh",
    "forestpuducherry@gmail.com": "Puducherry",
    "gaursanjeevgaur@gmail.com": "Maharashtra",
    "haryanacampa@gmail.com": "Haryana",
    "head-forcirshi-hp@hp.gov.in": "Himachal Pradesh",
    "karthickvifs@gmail.com": "Odisha",
    "kcaarunifs@gmail.com": "Rajasthan",
    "manjunathchavanifs@gmail.com": "Karnatka",
    "mohantahs@gmail.com": "Madhya Pradesh",
    "ms308@ifs.nic.in": "FSI",
    "paritosh1069@gmail.com": "Jharkhand",
    "pccfre@gmail.com": "Tamil Nadu",
    "prabhatkumar87@gmail.com": "Nagaland",
    "pravin.tripura@gmail.com": "Tripura",
    "raghu.prasad@gov.in": "MoEFCC",
    "rajusbharti@gmail.com": "Assam",
    "sanakhu@gmail.com": "Manipur",
    "satyajk98@gmail.com": "Bihar",
    "sskkvt@gmail.com": "Lakshadweep",
    "tlanazathang49@gmail.com": "Mizoram",
    "udaigurung@yahoo.com": "Sikkim",
    "vishalchauhan.ifs@gmail.com": "Punjab",
    "vishalsurve81@rediffmail.com": "Laddakh",
    "admin@aifsm2025.in": "DUMMY", // Admin user for testing
    "dummy@aifsm2025.in": "DUMMY", // Dummy entry for testing
  };

  // Check if it's an email (contains @)
  const isEmail = usernameOrEmail.includes("@");

  if (isEmail) {
    // Validate using email mapping
    const orgFromEmail = EMAIL_ORG_MAP[usernameOrEmail.toLowerCase()];
    return orgFromEmail === selectedOrg;
  } else {
    // Validate using username mapping
    const orgFromUsername = USER_ORG_MAP[usernameOrEmail.toLowerCase()];
    return orgFromUsername === selectedOrg;
  }
};

// Database Configuration
export const DATABASE_URL = "https://db.aifsm2025.in"; // Production database URL
export const LOCAL_DATABASE_URL = "http://localhost:8090"; // Local development database URL

// Navigation Configuration
export const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/committee", label: "Committee" },
  { href: "/schedule", label: "Schedule" },
  { href: "/events", label: "Events" },
  { href: "/results", label: "Results" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

// API Endpoints
export const API_ENDPOINTS = {
  NEWS: "/api/news",
  SESSION: "/api/session",
  FILES_PLAYERS: "/api/files/players",
  FILES: "/api/files",
} as const;

// Sports Events Data
export const SPORTS_EVENTS = [
  { name: "Athletics", icon: "🏃‍♂️" },
  { name: "Swimming", icon: "🏊‍♂️" },
  { name: "Weight Lifting", icon: "🏋️‍♂️" },
  { name: "Power Lifting", icon: "💪" },
  { name: "Badminton", icon: "🏸" },
  { name: "Cycling", icon: "🚴‍♂️" },
  { name: "Archery", icon: "🏹" },
  { name: "Golf", icon: "⛳" },
  { name: "Rifle Shooting", icon: "🎯" },
];

// Quick Links Configuration
export const QUICK_LINKS = [
  { name: "Proceedings", content: "#" },
  { name: "Officers", content: "#" },
  { name: "Important Contacts", content: "#" },
  { name: "Event Incharge Details", content: "#" },
  { name: "Venues", content: "#" },
  { name: "Route Map", content: "#" },
  { name: "AIFSM Booklet", content: "#" },
  { name: "Sports Meet Result", content: "#" },
];

// State Symbols Data
export const STATE_SYMBOLS = [
  {
    type: "State Tree",
    name: "Buransh",
    description: "Red-flowered Rhododendron.",
    image: "/ui/state_symbol/tree.png",
  },
  {
    type: "State Animal",
    name: "Musk Deer",
    description: "Shy Himalayan Deer",
    image: "/ui/state_symbol/animal.png",
  },
  {
    type: "State Bird",
    name: "Himalayan Monal",
    description: "Colorful Himalayan Pheasant.",
    image: "/ui/state_symbol/bird.png",
  },
];

// Utility Functions
export const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return "";

  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return url; // Return original URL if it's already an embed URL
};
