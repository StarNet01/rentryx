import { create } from "zustand";

const defaultWorkingHours = {
  Monday: { enabled: false, start: "", end: "" },
  Tuesday: { enabled: false, start: "", end: "" },
  Wednesday: { enabled: false, start: "", end: "" },
  Thursday: { enabled: false, start: "", end: "" },
  Friday: { enabled: false, start: "", end: "" },
  Saturday: { enabled: false, start: "", end: "" },
  Sunday: { enabled: false, start: "", end: "" },
};

const useCompanyRegisterForms = create<any>((set) => ({
  step1Level: 0,
  step2Level: -1,
  formData: {
    firstName: "",
    lastName: "",
    companyName: "",
    tradeLicenseNumber: "",
    companyLicenseImageID: "",
    companyAddress: "",
    companyCity: "",
    companyPostalCode: "",
    email: "",
    phoneNumber: "",
    sociaNetworks: [],
    numberOfVehicles: 0,
    vehiclesCategoresID: [],
    VATNumber: "",
    logo: "",
    workingHours: defaultWorkingHours,
    geographicalCoverage: [],
  },
  goToStep: (goTo: number) => set((state: any) => ({ step1Level: goTo })),
  nextStep: () => set((state: any) => ({ step1Level: state.step1Level + 1 })),
  backStep: () => set((state: any) => ({ step1Level: state.step1Level - 1 })),
  setFormData: (data: any) =>
    set((state: any) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
}));

// const useCompanyRegisterForms = create<any>((set) => ({
//   step1Level: 3,
//   step2Level: -1,
//   formData: {
//     firstName: "test",
//     lastName: "test2",
//     companyName: "test2",
//     tradeLicenseNumber: "235345347",
//     companyLicenseImageID: "b16c5b4cbe5b95dfa5cc831d6c244797",
//     companyAddress: "wefwefwef",
//     companyCity: "eeee",
//     companyPostalCode: "4354444444",
//     email: "sfdsf@a8dsa.com",
//     phoneNumber: "099541233",
//     sociaNetworks: [],
//     numberOfVehicles: 3,
//     vehiclesCategoresID: ["1", "2"],
//     VATNumber: "234234",
//     logo: "a9af60250991bc7926e14fe3bdd542ac",
//     workingHours: defaultWorkingHours,
//     geographicalCoverage: ["1"],
//   },
//   goToStep: (goTo: number) => set((state: any) => ({ step1Level: goTo })),
//   nextStep: () => set((state: any) => ({ step1Level: state.step1Level + 1 })),
//   backStep: () => set((state: any) => ({ step1Level: state.step1Level - 1 })),
//   setFormData: (data: any) =>
//     set((state: any) => ({
//       formData: {
//         ...state.formData,
//         ...data,
//       },
//     })),
// }));

export default useCompanyRegisterForms;
