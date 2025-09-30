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
