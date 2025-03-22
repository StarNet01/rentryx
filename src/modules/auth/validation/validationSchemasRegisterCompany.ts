import * as Yup from "yup";

export const form1Schema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  companyName: Yup.string().required("Company name is required"),
  tradeLicenseNumber: Yup.string()
    .required("Trade license number is required")
    .matches(/^[0-9]+$/, "Trade license number must be a number"),
  companyLicenseImageID: Yup.string().required(
    "Company license image is required"
  ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[0-9]{9}$/,
      "Phone number must be exactly 9 digits (without country code)"
    ),
  companyAddress: Yup.string().required("Company address is required"),
  companyCity: Yup.string().required("Company city is required"),
  companyPostalCode: Yup.string().required("Company postal code is required"),
});

export const form2Schema = Yup.object().shape({
  numberOfVehicles: Yup.number().required("Number of vehicles is required"),
  vehiclesCategoresID: Yup.array()
    .of(Yup.number())
    .required("At least one vehicle category is required"),
  VATNumber: Yup.string().required("VAT registration number is required"),
});

const workingHoursSchema = Yup.object().shape({
  enabled: Yup.boolean(),
  start: Yup.string().test(
    "start-required",
    "Start time is required",
    function (value) {
      const { enabled } = this.parent;
      if (enabled) {
        return !!value && value.trim() !== "";
      }
      return true;
    }
  ),
  end: Yup.string().test(
    "end-required",
    "End time is required",
    function (value) {
      const { enabled } = this.parent;
      if (enabled) {
        return !!value && value.trim() !== "";
      }
      return true;
    }
  ),
});

export const form3Schema = Yup.object().shape({
  logo: Yup.string().required("Logo is required"),
  workingHours: Yup.object().shape({
    Monday: workingHoursSchema,
    Tuesday: workingHoursSchema,
    Wednesday: workingHoursSchema,
    Thursday: workingHoursSchema,
    Friday: workingHoursSchema,
    Saturday: workingHoursSchema,
    Sunday: workingHoursSchema,
  }),
  geographicalCoverage: Yup.array()
    .of(Yup.number())
    .required("At least one geographical coverage is required"),
});

export const form4Schema = Yup.object().shape({
  firstName: Yup.string()
    .required("first name is required")
    .min(3, "Name must be at least 3 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  companyName: Yup.string().min(
    3,
    "company name must be at least 3 characters"
  ),
  officialID: Yup.number()
    .required("officialID is required")
    .integer("officialID must be an integer"),
  emiratesID: Yup.number()
    .required("emiratesID is required")
    .integer("emiratesID must be an integer"),
  officialImage: Yup.string().required("emiratesImage is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[0-9]{9}$/,
      "Phone number must be exactly 9 digits (without country code)"
    ),
  logo: Yup.string().required("Logo is required"),
  references: Yup.string(),
});
