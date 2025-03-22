import * as Yup from "yup";

export const form1Schema = Yup.object().shape({
  idType: Yup.string(),
  firstName: Yup.string()
    .required("First name is required")
    .min(3, "Name must be at least 3 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(3, "Last name must be at least 3 characters"),
  companyName: Yup.string().optional(),
  officialID: Yup.string().when("idType", ([idType]) => {
    return idType === "emirates"
      ? Yup.string()
          .required("Emirates ID is required")
          .matches(/^[0-9-]{15,19}$/, "Invalid Emirates ID format")
      : Yup.string()
          .required("Passport number is required")
          .min(5, "Invalid passport number");
  }),
  officialImage: Yup.string().required("ID image is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[0-9]{9}$/,
      "Phone number must be exactly 9 digits (without country code)"
    ),
});

export const form2Schema = Yup.object().shape({
  logo: Yup.string().required("Logo is required"),
  refrenceCompany: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Company name is required"),
      })
    )
    .min(1, "At least one reference company is required"),
});

export const form3Schema = Yup.object().shape({
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
