export type RegisterFormData = {
  email: string;
  password: string;
  org: Orgs;
};

export enum Orgs {
  "Andaman and Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Chandigarh",
  "Delhi",
  "IGNFA & DFE",
  "FSI",
  "Goa",
  "Gujarat",
  "Himachal Pradesh",
  "Haryana",
  "ICFRE",
  "IIFM",
  "Jharkhand",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman DFE (MoEFCC)",
  "WII",
  "MoEFCC HQ",
}

export type Player = {
  id: string;
  organisation: string;
  name: string;
  age: number;
  bloodGroup: string;
  mobile: string;
  aadhar: string;
  employeeId: string;
  event: string;
  healthIssues?: string;
  mealType: "Veg" | "Non-Veg" | "None" | "Both";
  tShirtSize: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
  profilePicture: File;
  employeeIDCard: File;
  modeOfTravel?: string;
  travelPlan?: File | string;
  travelPlanName?: string;
  travelPlanType?: string;
  lastUpdated?: string;
};

export type TravelPlanData = {
  modeOfTravel?: string;
  travelPlan?: File | string;
  travelPlanName?: string;
  travelPlanType?: string;
  lastUpdated?: string;
};

export type SportsDataType = {
  [sport: string]: {
    [event: string]: string[];
  };
};

export const sportsData: SportsDataType = {
  Athletics: {
    "100m Race": [
      "Men Open",
      "Men Veteran",
      "Men Senior Veteran",
      "Women Open",
      "Women Veteran",
      "Women Senior Veteran",
    ],
    "200m Race": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran"],
    "400m Race": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open"],
    "400m Walk": ["Women Open", "Women Veteran", "Women Senior Veteran"],
    "800m Race": ["Men Open", "Men Veteran", "Women Open"],
    "800m Walk": ["Men Senior Veteran", "Women Open", "Women Veteran", "Women Senior Veteran"],
    "1500m Race": ["Men Open", "Men Veteran", "Women Open"],
    "1500m Walk": ["Men Veteran", "Men Senior Veteran"],
    "5000m Race": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open"],
    "10000m Walk": ["Men Open", "Men Veteran", "Men Senior Veteran"],
    "25km Marathon": ["Men Open", "Men Veteran", "Men Senior Veteran"],
    "21km Marathon": ["Women Open", "Women Veteran", "Women Senior Veteran"],
    "100m Hurdles": ["Women Open"],
    "110m Hurdles": ["Men Open", "Men Veteran", "Men Senior Veteran"],
    "4x100 Relay": [
      "Men Open",
      "Men Veteran",
      "Men Senior Veteran",
      "Women Open",
      "Women Veteran",
      "Women Senior Veteran",
    ],
    "4x400 Relay": ["Men Open"],
    "Long Jump": [
      "Men Open",
      "Men Veteran",
      "Men Senior Veteran",
      "Women Open",
      "Women Veteran",
      "Women Senior Veteran",
    ],
    "High Jump": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open"],
    "Triple Jump": ["Men Open", "Men Veteran"],
    "Discus Throw": [
      "Men Open",
      "Men Veteran",
      "Men Senior Veteran",
      "Women Open",
      "Women Veteran",
      "Women Senior Veteran",
    ],
    "Shot Put": [
      "Men Open",
      "Men Veteran",
      "Men Senior Veteran",
      "Women Open",
      "Women Veteran",
      "Women Senior Veteran",
    ],
    "Javelin Throw": [
      "Men Open",
      "Men Veteran",
      "Men Senior Veteran",
      "Women Open",
      "Women Veteran",
      "Women Senior Veteran",
    ],
    "Hammer Throw": ["Men Open", "Men Veteran", "Men Senior Veteran"],
  },
  Swimming: {
    "100m Freestyle": ["Men Open"],
    "100m Backstroke": ["Men Open"],
    "100m Breaststroke": ["Men Open"],
    "100m Butterfly": ["Men Open"],
    "200m Medley": ["Men Open"],
    "50m Freestyle": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran"],
    "50m Butterfly": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran"],
    "50m Backstroke": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran"],
    "50m Breaststroke": ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran"],
  },
  "Weight Lifting": {
    "Men Up to 55 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 55-61 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 61-67 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 67-73 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 73-81 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 81-89 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 89-96 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 96-102 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 102-109 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men Above 109 kg": ["Open", "Veteran", "Senior Veteran"],
    "Women Up to 45 kg": ["Open"],
    "Women 45-49 kg": ["Open", "Veteran"],
    "Women 49-55 kg": ["Open", "Veteran"],
    "Women 55-59 kg": ["Open", "Veteran"],
    "Women 59-64 kg": ["Open", "Veteran"],
    "Women 64-71 kg": ["Open", "Veteran"],
    "Women 71-76 kg": ["Open", "Veteran"],
    "Women 76-81 kg": ["Open", "Veteran"],
    "Women 81-87 kg": ["Open", "Veteran"],
    "Women Above 87 kg": ["Open", "Veteran"],
  },
  "Power Lifting": {
    "Men Up to 59 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 59-66 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 66-74 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 74-83 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 83-93 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 93-105 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men 105-120 kg": ["Open", "Veteran", "Senior Veteran"],
    "Men Above 120 kg": ["Open", "Veteran", "Senior Veteran"],
    "Women Up to 47 kg": ["Open", "Veteran"],
    "Women 47-52 kg": ["Open", "Veteran"],
    "Women 52-57 kg": ["Open", "Veteran"],
    "Women 57-63 kg": ["Open", "Veteran"],
    "Women 63-72 kg": ["Open", "Veteran"],
    "Women 72-84 kg": ["Open", "Veteran"],
    "Women Above 84 kg": ["Open", "Veteran"],
  },
  Chess: {
    Classic: ["Men Open", "Women Open"],
    Rapid: ["Men Open", "Women Open"],
  },
  Carrom: {
    Singles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran", "Women Senior Veteran"],
    Doubles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran", "Women Senior Veteran"],
    "Mixed Doubles": ["Open", "Veteran", "Senior Veteran"],
  },
  "Table Tennis": {
    Singles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran", "Women Senior Veteran"],
    Doubles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran", "Women Senior Veteran"],
    "Mixed Doubles": ["Open", "Veteran", "Senior Veteran"],
  },
  Badminton: {
    Singles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran", "Women Senior Veteran"],
    Doubles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran", "Women Senior Veteran"],
    "Mixed Doubles": ["Open", "Veteran", "Senior Veteran"],
  },
  "Lawn Tennis": {
    Singles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran"],
    Doubles: ["Men Open", "Men Veteran", "Men Senior Veteran", "Women Open", "Women Veteran"],
    "Mixed Doubles": ["Open", "Veteran"],
  },
  Billiards: {
    "Open for All": ["Men Open", "Women Open"],
  },
  Snooker: {
    "Open for All": ["Men Open", "Women Open"],
  },
  Squash: {
    Singles: ["Men Open", "Men Veteran", "Men Senior Veteran"],
  },
  Quiz: {
    Team: ["Men Open"],
  },
  Golf: {
    "Individual (Gross Score)": ["Men Open"],
    "Team (2 Players, Gross Score)": ["Men Open"],
  },
  "Rifle Shooting": {
    "Three Position 50m": ["Men Open", "Men Veteran", "Women Open"],
    "Prone 50m": ["Men Open", "Men Veteran", "Women Open"],
  },
  Archery: {
    "30m": ["Men Open", "Women Open"],
  },
  Cycling: {
    "25 km": ["Women Open"],
    "40 km": ["Men Open", "Men Veteran"],
  },
  Bridge: {
    "Team Duplicate": ["Men Open", "Women Open"],
    "Master Pair": ["Men Open"],
    Progressive: ["Men Open", "Women Open"],
  },
  Cricket: {
    Team: ["Men Open"],
  },
  Hockey: {
    Team: ["Men Open"],
  },
  Volleyball: {
    Team: ["Men Open", "Women Open"],
  },
  Basketball: {
    Team: ["Men Open", "Women Open"],
  },
  Football: {
    Team: ["Men Open"],
  },
  Kabaddi: {
    Team: ["Men Open", "Women Open"],
  },
  "Tug of War": {
    Team: ["Men Open"],
  },
};

type BloodGroupType = {
  [key: string]: string;
};

export const bloodGroups: BloodGroupType = {
  "A+": "A+",
  "A-": "A-",
  "B+": "B+",
  "B-": "B-",
  "AB+": "AB+",
  "AB-": "AB-",
  "O+": "O+",
  "O-": "O-",
};

export const COMMITTEES_DATA = [
  {
    id: 1,
    name: "Accommodation Committee",
    description:
      "Arranging appropriate accommodation for all participants, guests, and officials including allowances.",
    members: [
      { name: "Shri B P Gupta", designation: "PCCF - Chairperson" },
      { name: "Shri Sushant Patnaik", designation: "CCF" },
      { name: "Shri Rajeev Dhiman", designation: "CF" },
      { name: "Shri D P Balconi", designation: "DCF" },
    ],
  },
  {
    id: 2,
    name: "Transport Committee",
    description:
      "Managing pick-up, drop, and daily transport services for participants and dignitaries between accommodation, sports venues, and event locations.",
    members: [
      { name: "Shri R K Mishra", designation: "PCCF - Chairman" },
      { name: "Shri Naresh Kumar", designation: "APCCF" },
      { name: "Shri Mahatim Yadav", designation: "DCF" },
      { name: "Shri Jeevan Dagade", designation: "DCF" },
      { name: "Shri Umesh Tiwari", designation: "DCF" },
      { name: "RTO Dehradun or officer nominated by RTO Dehradun", designation: "" },
    ],
  },
  {
    id: 3,
    name: "Catering and Food Committee",
    description:
      "Ensuring quality food and refreshments are provided to participants and guests at designated points and times.",
    members: [
      { name: "Smt Neena Grewal", designation: "PCCF- Chairperson" },
      { name: "Dr.Vinay Bhargav", designation: "CF" },
      { name: "Smt Abhilasha Singh", designation: "DCF" },
      { name: "Shri Shiva Kant", designation: "DCF" },
      { name: "Shri Sarvesh Kumar", designation: "DCF" },
      { name: "Smt Pranali", designation: "IFS" },
      { name: "Principal IIHM, Dehradun or officer nominated by IIHM, Dehradun", designation: "" },
    ],
  },
  {
    id: 4,
    name: "Sports Committee",
    description:
      "Planning and coordination of all sporting events, team registrations, rules enforcement, venue preparation, and coordination with referees/officials.",
    members: [
      { name: "Dr S P Subudhi", designation: "PCCF- Chairman" },
      { name: "Shri Nitish Mani Tripathi", designation: "CF" },
      { name: "Shri Pankaj Kumar", designation: "CF" },
      { name: "Shri C S Joshi", designation: "DCF" },
      { name: "Shri Ashutosh Singh", designation: "DCF" },
      { name: "Shri Abhimanyu", designation: "DCF" },
      { name: "Shri Tarun S", designation: "DCF" },
      { name: "Officer nominated by Special Principal Secretary Sports, Government of Uttarakhand", designation: "" },
    ],
  },
  {
    id: 5,
    name: "Event Management and Cultural Committee",
    description:
      "Organizing inaugural and closing ceremonies, cultural programmes, stage setup, and anchoring support.",
    members: [
      { name: "Dr Dhreem Pandey", designation: "CCF- Chairman" },
      { name: "Smt Kahkashan Naseem", designation: "CF" },
      { name: "Shri Deepak Singh", designation: "DCF" },
      { name: "Shri Amit Kanwar", designation: "DCF" },
      { name: "Shri Rahul Mishra", designation: "DCF" },
    ],
  },
  {
    id: 6,
    name: "Media and Publicity, IT & Control Room Committee",
    description:
      "Managing media relations, press releases, social media promotion, photography/videography, and internal communications.",
    members: [
      { name: "Smt Meenakshi Joshi", designation: "APCCF- Chairman" },
      { name: "Shri Sanjeev Chaturvedi", designation: "CCF" },
      { name: "Dr Parag M Dhakate", designation: "CF" },
      { name: "Dr Saket Badola", designation: "CF" },
      { name: "Shri Vaibhv Singh", designation: "DCF" },
      { name: "Shri Aditya Rana", designation: "IFS" },
      { name: "State informatic officer (SIO),NIC or officer nominated by SIO", designation: "" },
      { name: "Officer nominated by DG information and public relation, Government of Uttarakhand", designation: "" },
    ],
  },
  {
    id: 7,
    name: "Procurement and Finance Committee",
    description: "Procurement of materials and services, financial planning, approvals, and expenditure tracking.",
    members: [
      { name: "Shri Kapil Lall", designation: "PCCF- Chairman" },
      { name: "Shri P K Patro", designation: "CCF" },
      { name: "Shri Himansn Bagdi", designation: "DFO" },
      { name: "Shri Neeraj Kumar", designation: "DFO" },
      { name: "Finance Controller Forest Department", designation: "" },
      { name: "Finance officer, Uttarakhand CAMPA", designation: "" },
      { name: "Officer nominated by Secretary Finance, Government of Uttarakhand", designation: "" },
      { name: "Account officer nominated by PCCF(HoFF) Uttarakhand", designation: "" },
    ],
  },
  {
    id: 8,
    name: "Protocol and Reception Committee",
    description:
      "Welcoming and coordinating logistics for dignitaries, VVIPs, and guests; ensuring protocol arrangements.",
    members: [
      { name: "Dr Vivek Pandey", designation: "APCCF- Chairman" },
      { name: "Dr Koko Rose", designation: "CF" },
      { name: "Shri Puneet Tomar", designation: "DCF" },
      { name: "Shri Digant Nayak", designation: "DCF" },
      { name: "Shri Rajar Suman", designation: "IFS" },
    ],
  },
  {
    id: 9,
    name: "Result, Prize, Medal and Souvenir Committee",
    description: "Preparation and distribution of prizes, medals, certificates, mementos, and souvenirs.",
    members: [
      { name: "Dr Parag M Dhakate", designation: "CCF- Chairman" },
      { name: "Shri Akash Verma", designation: "CF" },
      { name: "Smt Kalyani", designation: "DCF" },
      { name: "Shri Kundan Kumar", designation: "DCF" },
      { name: "Shri Swapnil", designation: "DCF" },
    ],
  },
  {
    id: 10,
    name: "Medical and Emergency Committee",
    description: "Arranging first aid, ambulances, on-call doctors, and health emergency management at all venues.",
    members: [
      { name: "Dr Tejasvini Patil", designation: "CCF - Chairperson" },
      { name: "Shri T R Bijalal", designation: "CF" },
      { name: "Shri Mayank Sekhar Jha", designation: "CF" },
      { name: "Shri Akash Gangwar", designation: "DCF" },
      { name: "Shri B B Martolia", designation: "DCF" },
      { name: "Representative from Medical/ Healthcare Department", designation: "" },
    ],
  },
];

// Categorized events data based on SportsEvents categories
export const categorizedEvents = {
  Athletics: sportsData.Athletics || {},
  Swimming: sportsData.Swimming || {},
  "Power Lifting": sportsData["Power Lifting"] || {},
  "Weight Lifting": sportsData["Weight Lifting"] || {},
  "Indoor Games": {
    "Chess - Classic": sportsData.Chess?.Classic || [],
    "Chess - Rapid": sportsData.Chess?.Rapid || [],
    "Carrom - Singles": sportsData.Carrom?.Singles || [],
    "Carrom - Doubles": sportsData.Carrom?.Doubles || [],
    "Carrom - Mixed Doubles": sportsData.Carrom?.["Mixed Doubles"] || [],
    "Table Tennis - Singles": sportsData["Table Tennis"]?.Singles || [],
    "Table Tennis - Doubles": sportsData["Table Tennis"]?.Doubles || [],
    "Table Tennis - Mixed Doubles": sportsData["Table Tennis"]?.["Mixed Doubles"] || [],
    "Badminton - Singles": sportsData.Badminton?.Singles || [],
    "Badminton - Doubles": sportsData.Badminton?.Doubles || [],
    "Badminton - Mixed Doubles": sportsData.Badminton?.["Mixed Doubles"] || [],
    "Billiards - Open for All": sportsData.Billiards?.["Open for All"] || [],
    "Snooker - Open for All": sportsData.Snooker?.["Open for All"] || [],
    "Squash - Singles": sportsData.Squash?.Singles || [],
    "Quiz - Team": sportsData.Quiz?.Team || [],
    "Bridge - Team Duplicate": sportsData.Bridge?.["Team Duplicate"] || [],
    "Bridge - Master Pair": sportsData.Bridge?.["Master Pair"] || [],
    "Bridge - Progressive": sportsData.Bridge?.Progressive || [],
  },
  "Field Games": {
    "Cricket - Team": sportsData.Cricket?.Team || [],
    "Hockey - Team": sportsData.Hockey?.Team || [],
    "Volleyball - Team": sportsData.Volleyball?.Team || [],
    "Basketball - Team": sportsData.Basketball?.Team || [],
    "Football - Team": sportsData.Football?.Team || [],
    "Kabaddi - Team": sportsData.Kabaddi?.Team || [],
    "Tug of War - Team": sportsData["Tug of War"]?.Team || [],
    "Lawn Tennis - Singles": sportsData["Lawn Tennis"]?.Singles || [],
    "Lawn Tennis - Doubles": sportsData["Lawn Tennis"]?.Doubles || [],
    "Lawn Tennis - Mixed Doubles": sportsData["Lawn Tennis"]?.["Mixed Doubles"] || [],
  },
  "Rifle Shooting": sportsData["Rifle Shooting"] || {},
  Cycling: sportsData.Cycling || {},
  Archery: sportsData.Archery || {},
  Golf: sportsData.Golf || {},
};

export const SportsEventsIcons = [
  { name: "Athletics", icon: "athletics.png" },
  { name: "Swimming", icon: "swimming.png" },
  { name: "Power Lifting", icon: "weights.png" },
  { name: "Weight Lifting", icon: "weights.png" },
  { name: "Indoor Games", icon: "indoor.png" },
  { name: "Field Games", icon: "field.png" },
  { name: "Rifle Shooting", icon: "rifle.png" },
  { name: "Cycling", icon: "cycling.png" },
  { name: "Archery", icon: "archery.png" },
  { name: "Golf", icon: "golf.png" },
];

export const EventIcons = [
  { name: "Archery", icon: "archery.svg" },
  { name: "Athletics", icon: "athletics.svg" },
  { name: "Swimming", icon: "swimming.svg" },
  { name: "Power Lifting", icon: "weight.svg" },
  { name: "Weight Lifting", icon: "weight.svg" },
  { name: "Indoor Games", icon: "indoor.svg" },
  { name: "Field Games", icon: "field.svg" },
  { name: "Rifle Shooting", icon: "rifle.svg" },
  { name: "Cycling", icon: "cycling.svg" },
  { name: "Golf", icon: "golf.svg" },
];

export const COMMITTEE_PDF =
  "https://db.aifsm2025.in/api/files/9wsix8u79jd2wni/zec8p3667qco415/aifsm_office_order_XpZGY8hFet.pdf";
