import { create } from "zustand";
import { IBrokerRegisterForm } from "../interfaces/IBrokerRegisterForm";

export interface IBrokerRegisterStore {
  step1Level: number;
  step2Level: number;
  formData: IBrokerRegisterForm;
  nextStep: () => void;
  backStep: () => void;
  setFormData: (data: IBrokerRegisterForm) => void;
}

const useBrokerRegisterFormStore = create<any>((set) => ({
  step1Level: 0,
  step2Level: -1,
  formData: {
    firstName: "",
    lastName: "",
    companyName: "",
    passport: "",
    officialID: "",
    officialImage: "",
    emiratesID: "",
    email: "",
    phoneNumber: "",
    socialNetworks: [],
    logo: "",
    refrenceCompany: [],
  },
  goToStep: (goTo: number) => set((state: any) => ({ step1Level: goTo })),
  nextStep: () =>
    set((state: IBrokerRegisterStore) => ({
      step1Level: state.step1Level + 1,
    })),
  backStep: () =>
    set((state: IBrokerRegisterStore) => ({
      step1Level: state.step1Level - 1,
    })),
  setFormData: (data: IBrokerRegisterForm) =>
    set((state: IBrokerRegisterStore) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
}));

export default useBrokerRegisterFormStore;
