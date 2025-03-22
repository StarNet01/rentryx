"use client";
import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageUploadBox from "@/modules/share/components/imageUploadBox/ImageUploadBox";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const validationSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup.string().required("Phone number is required"),
  company_name: yup.string().required("Company name is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  postal_code: yup.string().required("Postal code is required"),
  trade_license_number: yup.string().required("License number is required"),
  vat_registration: yup.string().required("VAT registration is required"),
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface EditModProfileProps {
  profileData: any;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}

const EditModProfile = ({
  profileData,
  onCancel,
  onSubmit,
}: EditModProfileProps) => {
  const [workingHours, setWorkingHours] = useState(() => {
    try {
      return profileData?.working_hours
        ? JSON.parse(profileData.working_hours)
        : daysOfWeek.reduce(
            (acc, day) => ({
              ...acc,
              [day]: { enabled: false, start: "", end: "" },
            }),
            {}
          );
    } catch (e) {
      console.error("Error parsing working hours:", e);
      return {};
    }
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    try {
      return profileData?.categories_of_vehicles_id
        ? JSON.parse(profileData.categories_of_vehicles_id)
        : [];
    } catch (e) {
      console.error("Error parsing categories:", e);
      return [];
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      first_name: profileData?.first_name || "",
      last_name: profileData?.last_name || "",
      email: profileData?.email || "",
      phone_number: profileData?.phone_number || "",
      company_name: profileData?.company_name || "",
      address: profileData?.address || "",
      city: profileData?.city || "",
      postal_code: profileData?.postal_code || "",
      trade_license_number: profileData?.trade_license_number || "",
      vat_registration: profileData?.vat_registration || "",
    },
  });

  useEffect(() => {
    if (profileData) {
      const fields = [
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "company_name",
        "address",
        "city",
        "postal_code",
        "trade_license_number",
        "vat_registration",
      ];

      fields.forEach((field) => {
        setValue(field as any, profileData[field] || "");
      });
    }
  }, [profileData, setValue]);

  const handleFormSubmit = (data: any) => {
    const formData = {
      firstName: data.first_name,
      lastName: data.last_name,
      companyName: data.company_name,
      tradeLicenseNumber: data.trade_license_number,
      companyLicenseImageID: profileData?.trade_license_photo_id,
      companyAddress: data.address,
      companyCity: data.city,
      companyPostalCode: data.postal_code,
      email: data.email,
      phoneNumber: data.phone_number,
      numberOfVehicles: profileData?.number_of_vehicles,
      VATNumber: data.vat_registration,
      logoImgID: profileData?.company_logo_id,
      vehiclesCategoresID: selectedCategories,
      sociaNetworks: profileData?.sociaNetworks
        ? JSON.parse(profileData.sociaNetworks)
        : [],
      workingHours: JSON.stringify(workingHours),
      geographicalCoverage: profileData?.geographical_coverage
        ? JSON.parse(profileData.geographical_coverage)
        : [],
    };

    HttpClient.getInstance()
      .put(`companies/${profileData.id}`, formData)
      .then(() => {
        onSubmit(formData);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleWorkingHoursChange = (day: string, field: string, value: any) => {
    setWorkingHours((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="lg:max-w-[50%]">
      <div className="flex gap-6 mt-3">
        <TextField
          label="First Name"
          required
          error={!!errors.first_name}
          helperText={errors.first_name?.message as string}
          {...register("first_name")}
          fullWidth
        />
        <TextField
          label="Last Name"
          required
          error={!!errors.last_name}
          helperText={errors.last_name?.message as string}
          {...register("last_name")}
          fullWidth
        />
      </div>

      <div className="mt-6">
        <TextField
          label="Email Address"
          required
          error={!!errors.email}
          helperText={errors.email?.message as string}
          {...register("email")}
          fullWidth
        />
      </div>

      <div className="my-5">
        <TextField
          label="Phone Number"
          required
          error={!!errors.phone_number}
          helperText={errors.phone_number?.message as string}
          {...register("phone_number")}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+971</InputAdornment>
            ),
          }}
        />
      </div>

      <Divider className="my-6" />

      <div className="flex flex-col gap-4 mt-5">
        <TextField
          label="Company Name"
          required
          error={!!errors.company_name}
          helperText={errors.company_name?.message as string}
          {...register("company_name")}
          fullWidth
        />

        <TextField
          label="Address"
          required
          error={!!errors.address}
          helperText={errors.address?.message as string}
          {...register("address")}
          fullWidth
        />

        <div className="flex gap-4">
          <TextField
            label="City"
            required
            error={!!errors.city}
            helperText={errors.city?.message as string}
            {...register("city")}
            fullWidth
          />
          <TextField
            label="Postal Code"
            required
            error={!!errors.postal_code}
            helperText={errors.postal_code?.message as string}
            {...register("postal_code")}
            fullWidth
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-3">Working Hours</h3>
        {daysOfWeek.map((day) => (
          <div key={day} className="flex items-center gap-4 mb-2">
            <span className="w-24">{day}</span>
            <Switch
              checked={workingHours[day]?.enabled || false}
              onChange={(e) =>
                handleWorkingHoursChange(day, "enabled", e.target.checked)
              }
            />
            {workingHours[day]?.enabled && (
              <>
                <TextField
                  type="time"
                  value={workingHours[day]?.start || ""}
                  onChange={(e) =>
                    handleWorkingHoursChange(day, "start", e.target.value)
                  }
                  size="small"
                />
                <TextField
                  type="time"
                  value={workingHours[day]?.end || ""}
                  onChange={(e) =>
                    handleWorkingHoursChange(day, "end", e.target.value)
                  }
                  size="small"
                />
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isValid}
        >
          Save Changes
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditModProfile;
