"use client";
import React, { useState } from "react";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Add,
  Check,
  Edit,
  Facebook,
  Instagram,
  LinkedIn,
  Remove,
} from "@mui/icons-material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

export const profileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  officialID: yup.string().when("idType", {
    is: "emirates",
    then: (schema) => schema.required("Emirates ID is required"),
    otherwise: (schema) => schema,
  }),
  passport: yup.string().when("idType", {
    is: "passport",
    then: (schema) => schema.required("Passport number is required"),
    otherwise: (schema) => schema,
  }),
  officialImage: yup.string(),
  description: yup.string(),
  address: yup.string().required("Address is required"),
  postalCode: yup.string().required("Postal code is required"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .required("Phone number is required"),
  socialNetworks: yup.array().of(
    yup.object().shape({
      platform: yup.string().required("Platform is required"),
      url: yup.string().required("URL is required"),
    })
  ),
  refrenceCompany: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Company name is required"),
      id: yup.string(),
    })
  ),
});

const broker = {
  firstName: "test",
  lastName: "test2",
  companyName: "",
  officialID: "32345435",
  officialImage: "",
  email: "test@testdsf.com",
  phoneNumber: "09365025541",
  description: "etssdfds fsdfewtewt",
  address: "ewtsdf",
  postalCode: "435456456",
  profile_img: "ksad",
  socialNetworks: [
    { platform: "instagram", url: "test" },
    { platform: "linkedin", url: "test3" },
    { platform: "facebook", url: "test4" },
  ],
  refrenceCompany: [
    { name: "test214532", id: "1" },
    { name: "test3214532", id: "2" },
    { name: "test4214532", id: "3" },
  ],
  totalReserve: 25,
  subscription: 45,
};
const page = () => {
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [isEditingReferences, setIsEditingReferences] = useState(false);
  const [idType, setIdType] = useState("emirates"); 
  const [formData, setFormData] = useState<any>(broker); 
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    formData.profile_img || null
  );

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(profileSchema as any),
    defaultValues: formData,
  });

  const handleFieldSave = async (name: any, value: any) => {
    try {
      setValue(name, value, { shouldValidate: true });

      const fieldData: any = {
        [name]: value,
      };

      if (name === "socialNetworks") {
        fieldData.socialNetworks = value.map((item: any) => ({
          platform: item.platform,
          url: item.url,
        }));
      }

      if (name === "refrenceCompany") {
        fieldData.refrenceCompany = value.map((item: any) => ({
          company_id: item.id,
          name: item.name,
        }));
      }

      const updatedFormData = {
        ...formData,
        ...fieldData,
      };

      setFormData(updatedFormData);

      console.log(updatedFormData);
      // TODO: API call to update field
      await HttpClient.getInstance().put(`/brokers/profile`, fieldData);
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        // TODO: API call to upload image
        const response = await HttpClient.getInstance().post("/attachments", formData);

        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <>
      <DashboardLayout panelType="broker">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <div className="relative w-36 h-36 border rounded-3xl border-gray-300">
              {image ? (
                <img
                  src={image as string}
                  alt="Profile"
                  className="w-full rounded-3xl h-full object-cover"
                />
              ) : image ? (
                <img
                  src={image as string}
                  alt="Profile"
                  className="w-full rounded-3xl h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <label className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-full p-2 cursor-pointer">
                <svg
                  className="w-4 h-4 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <h1 className="text-black text-2xl font-bold">
              {formData.firstName} {formData.lastName}
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="rounded-3xl border-[#97AFDE] border-[3px] text-center p-5 max-h-[104px]">
              <h2 className="text-[#8313B2] text-2xl font-bold">
                {formData.totalReserve}
              </h2>
              <p>Total Reserve</p>
            </div>
            <div className="rounded-3xl border-[#97AFDE] border-[3px] text-center p-5 max-h-[104px]">
              <h2 className="text-[#8313B2] text-2xl font-bold">
                {formData.subscription}
              </h2>
              <p>Subscription</p>
            </div>
          </div>
        </div>

        <div className="lg:max-w-[50%]">
          <div className="flex gap-6 mt-3">
            <EditField
              label="First Name"
              value={formData.firstName}
              name="firstName"
              onSave={handleFieldSave}
              error={errors.firstName?.message as any}
              required
            />
            <EditField
              label="Last Name"
              value={formData.lastName}
              name="lastName"
              onSave={handleFieldSave}
              error={errors.lastName?.message as any}
              required
            />
          </div>

          <div className="mt-6">
            <EditField
              label="Email Address"
              value={formData.email}
              name="email"
              onSave={handleFieldSave}
              error={errors.email?.message as any}
              required
            />
          </div>

          <div className="flex flex-col gap-1 my-6">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <h3 className="text-black font-bold">Official ID Type</h3>
              </div>
              <EditField
                label={
                  idType === "emirates" ? "Emirates ID" : "Passport Number"
                }
                value={
                  formData[idType === "emirates" ? "officialID" : "passport"]
                }
                name={idType === "emirates" ? "officialID" : "passport"}
                onSave={handleFieldSave}
                error={
                  errors[idType === "emirates" ? "officialID" : "passport"]
                    ?.message as any
                }
                required
                customEditingContent={
                  <div className="flex gap-2 mb-4">
                    <Button
                      variant={idType === "emirates" ? "contained" : "outlined"}
                      onClick={() => setIdType("emirates")}
                      size="small"
                    >
                      Emirates ID
                    </Button>
                    <Button
                      variant={idType === "passport" ? "contained" : "outlined"}
                      onClick={() => setIdType("passport")}
                      size="small"
                    >
                      Passport
                    </Button>
                  </div>
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 my-6">
            <h3 className="text-black my-3 font-bold">Description</h3>
            <EditField
              label="Write about yourself ...."
              value={formData.description}
              name="description"
              onSave={handleFieldSave}
              error={errors.description?.message as any}
              sx={{
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
              multiline
              rows={4}
            />
          </div>

          <Divider />

          <div className="mt-6 flex flex-col gap-4">
            <EditField
              label="Address"
              value={formData.address}
              name="address"
              onSave={handleFieldSave}
              error={errors.address?.message as any}
              required
            />
            <div className="flex gap-5">
              <EditField
                label="Postal Code"
                value={formData.postalCode}
                name="postalCode"
                onSave={handleFieldSave}
                error={errors.postalCode?.message as any}
                required
                sx={{ width: "30ch" }}
              />
              <EditField
                label="Phone Number"
                value={formData.phoneNumber}
                name="phoneNumber"
                onSave={handleFieldSave}
                error={errors.phoneNumber?.message as any}
                required
                sx={{ width: "30ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+971</InputAdornment>
                  ),
                }}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {isEditingSocial ? (
                <SocialMediaEdit
                  socialNetworks={formData.socialNetworks}
                  onSave={(networks) => {
                    handleFieldSave("socialNetworks", networks);
                    setIsEditingSocial(false);
                  }}
                  onCancel={() => setIsEditingSocial(false)}
                />
              ) : (
                <SocialMediaSection
                  socialNetworks={formData.socialNetworks}
                  onEdit={() => setIsEditingSocial(true)}
                />
              )}
            </div>
          </div>

          <Divider />

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              {isEditingReferences ? (
                <ReferencesEdit
                  references={formData.refrenceCompany}
                  onSave={(refs) => {
                    handleFieldSave("refrenceCompany", refs);
                    setIsEditingReferences(false);
                  }}
                  onCancel={() => setIsEditingReferences(false)}
                />
              ) : (
                <ReferencesSection
                  references={formData.refrenceCompany}
                  onEdit={() => setIsEditingReferences(true)}
                />
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default page;

interface EditFieldProps {
  label: string;
  value: string;
  name: string;
  onSave: (name: string, value: string) => void;
  error?: string;
  sx?: any;
  required?: boolean;
  multiline?: boolean;
  InputProps?: any;
  rows?: number;
  customEditingContent?: React.ReactNode;
}

const EditField = ({
  label,
  sx,
  value,
  name,
  InputProps,
  onSave,
  error,
  required = false,
  multiline = false,
  rows = 1,
  customEditingContent,
}: EditFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onSave(name, currentValue);
  };

  return (
    <div className="flex flex-col">
      {isEditing && customEditingContent}
      <TextField
        label={label}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        required={required}
        fullWidth
        sx={sx}
        multiline={multiline}
        rows={rows}
        disabled={!isEditing}
        error={!!error}
        helperText={error}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? <Check /> : <Edit />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

interface SocialMediaSectionProps {
  socialNetworks: Array<{ platform: string; url: string }>;
  onEdit: () => void;
}

const platformIcons: { [key: string]: any } = {
  instagram: Instagram,
  linkedin: LinkedIn,
  facebook: Facebook,
};

const SocialMediaSection = ({
  socialNetworks,
  onEdit,
}: SocialMediaSectionProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Website & Social Media Address</h3>
        <Button
          startIcon={<Edit />}
          onClick={onEdit}
          variant="outlined"
          size="small"
        >
          Edit
        </Button>
      </div>
      <div className="flex gap-4 flex-wrap">
        {socialNetworks.map((social, index) => {
          const Icon = platformIcons[social.platform.toLowerCase()];
          return (
            <div key={index} className="flex items-center gap-2">
              <IconButton
                color="primary"
                component="a"
                href={social.url}
                target="_blank"
              >
                {Icon && <Icon />}
              </IconButton>
              {/* <span className="text-sm text-gray-600">{social.url}</span> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface SocialMediaEditProps {
  socialNetworks: Array<{ platform: string; url: string }>;
  onSave: (networks: Array<{ platform: string; url: string }>) => void;
  onCancel: () => void;
}

const platforms = [
  { id: "1", title: "facebook" },
  { id: "2", title: "instagram" },
  { id: "3", title: "linkedin" },
];

const SocialMediaEdit = ({
  socialNetworks,
  onSave,
  onCancel,
}: SocialMediaEditProps) => {
  const [networks, setNetworks] = useState(socialNetworks);

  const handleAddNetwork = () => {
    setNetworks([...networks, { platform: "", url: "" }]);
  };

  const handleRemoveNetwork = (index: number) => {
    setNetworks(networks.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: string, value: string) => {
    const newNetworks = [...networks];
    newNetworks[index] = { ...newNetworks[index], [field]: value };
    setNetworks(newNetworks);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        {networks.map((network, index) => (
          <div key={index} className="flex items-start gap-4">
            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select
                value={network.platform}
                label="Platform"
                onChange={(e) =>
                  handleChange(index, "platform", e.target.value)
                }
              >
                {platforms.map((platform) => (
                  <MenuItem key={platform.id} value={platform.title}>
                    {platform.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="URL"
              value={network.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
            />
            <Button color="error" onClick={() => handleRemoveNetwork(index)}>
              <Remove />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button startIcon={<Add />} onClick={handleAddNetwork}>
          Add Social Media
        </Button>
        <div className="flex gap-2">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onSave(networks)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ReferencesEditProps {
  references: Array<{ name: string; id: string }>;
  onSave: (references: Array<{ name: string; id: string }>) => void;
  onCancel: () => void;
}

const ReferencesEdit = ({
  references,
  onSave,
  onCancel,
}: ReferencesEditProps) => {
  const [refs, setRefs] = useState(references);

  const handleAddReference = () => {
    setRefs([...refs, { name: "", id: "" }]);
  };

  const handleRemoveReference = (index: number) => {
    setRefs(refs.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newRefs = [...refs];
    newRefs[index] = { ...newRefs[index], name: value };
    setRefs(newRefs);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4">
        {refs.map((ref, index) => (
          <div key={index} className="flex items-start gap-4">
            <TextField
              fullWidth
              label={`Reference ${index + 1}`}
              value={ref.name}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <Button color="error" onClick={() => handleRemoveReference(index)}>
              <Remove />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Button startIcon={<Add />} onClick={handleAddReference}>
          Add Reference
        </Button>
        <div className="flex gap-2">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => onSave(refs)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ReferencesSectionProps {
  references: Array<{ name: string; id: string }>;
  onEdit: () => void;
}

const ReferencesSection = ({ references, onEdit }: ReferencesSectionProps) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">References</h3>
        <Button
          startIcon={<Edit />}
          onClick={onEdit}
          variant="outlined"
          size="small"
        >
          Edit
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {references.map((reference, index) => (
          <div
            key={index}
            className="p-3 border rounded-md flex justify-between items-center"
          >
            <span>{reference.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
