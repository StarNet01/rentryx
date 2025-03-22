export interface IBrokerRegisterSteps {
  title: string;
  levels: string[];
}

export const BrokerRegisterSteps: IBrokerRegisterSteps[] = [
  {
    title: "Step 1",
    levels: ["Basic Info", "Additional Info", "Preview"],
  },
  {
    title: "Step 2",
    levels: ["verification", "subscription"],
  },
];

export const VehicleAddSteps: IBrokerRegisterSteps[] = [
  {
    title: "Add Vehicle",
    levels: [
      "Vehicle info",
      "Features",
      "Photo & Price",
      "Contact info",
      "Preview",
    ],
  },
];
