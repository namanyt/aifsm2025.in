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
  aadhar: number;
  employeeId: string;
  event: string;
  healthIssues?: string;
  mealType: "Veg" | "Non-Veg" | "None" | "Both";
  profilePicture: File;
  employeeIDCard: File;
};
