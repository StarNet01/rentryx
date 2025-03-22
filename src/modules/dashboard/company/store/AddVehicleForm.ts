import { create } from "zustand";
import { IAddVehicleForm } from "../interfaces/IAddVehicleForm";

export interface IAddVehicleStore {
  step: number;
  formData: IAddVehicleForm;
  nextStep: () => void;
  backStep: () => void;
  setFormData: (data: IAddVehicleForm) => void;
}

const useAddVehicleFormStore = create<IAddVehicleStore>((set) => ({
  step: 1,
  formData: {
    firstName: "",
    lastName: "",
    companyName: "",
    officialID: "",
    officialImage: "",
    emiratesID: "",
    email: "",
    phoneNumber: "",
  },
  nextStep: () =>
    set((state: IAddVehicleStore) => ({
      step: state.step + 1,
    })),
  backStep: () =>
    set((state: IAddVehicleStore) => ({
      step: state.step - 1,
    })),
  setFormData: (data: IAddVehicleForm) =>
    set((state: IAddVehicleStore) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
}));

export default useAddVehicleFormStore;
