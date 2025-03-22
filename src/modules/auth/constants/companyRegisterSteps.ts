export interface ICompanyRegisterSteps {
  title: string;
  levels: string[];
}

export const CompanyRegisterSteps: ICompanyRegisterSteps[] = [
  {
    title: "Step 1",
    levels: [
      "Basic information",
      "Business details",
      "Additional information",
      "Preview",
    ], 
  },
  {
    title: "Step 2",
    levels: ["verification", "subscription"],
  },
];
