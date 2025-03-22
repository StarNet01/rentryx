import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { form1Schema } from "@/modules/auth/validation/validationSchemasRegisterCompany";
import useCompanyRegisterForms from "@/modules/auth/store/CompanyRegisterForms";
import { IBrokerRegisterForm } from "@/modules/auth/interfaces/IBrokerRegisterForm";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import useSWR from "swr";

const sociaNetworksList = [
  { id: "1", title: "facebook" },
  { id: "2", title: "instagram" },
];

const Step1 = () => {
  const [preview, setPreview] = useState<string>("");
  const { formData, setFormData, nextStep } = useCompanyRegisterForms();

  const { data: sociaNetworksList } = useSWR("getsociaNetworks", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  const [socialMediaLinks, setSocialMediaLinks] = useState([
    { platform: "", id: "" },
  ]);

  const handleAddSocialMediaLink = () => {
    setSocialMediaLinks([...socialMediaLinks, { platform: "", id: "" }]);
  };

  const handleRemoveSocialMediaLink = (index: number) => {
    const newLinks = socialMediaLinks.filter((_, i) => i !== index);
    setSocialMediaLinks(newLinks);
  };

  const handleSocialMediaChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newLinks = socialMediaLinks.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setSocialMediaLinks(newLinks);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(form1Schema),
  });

  useEffect(() => {
    for (const key in formData) {
      setValue(
        key as keyof IBrokerRegisterForm as any,
        formData[key as keyof IBrokerRegisterForm],
        { shouldValidate: true }
      );
      if (
        key === "companyLicenseImageID" &&
        formData[key as keyof IBrokerRegisterForm]
      ) {
        const companyLicenseImageID =
          formData[key as keyof IBrokerRegisterForm];
        HttpClient.getInstance()
          .get(`/attachments/${companyLicenseImageID}`)
          .then((res: any) => {
            setPreview(`data:${res.data.file_type};base64,${res.data.base64}`);
          });
      }
    }
    if (formData.socialNetworks) {
      setSocialMediaLinks(formData.socialNetworks);
    }
  }, [formData, setValue]);

  const onSubmit = (data: any) => {
    data.socialNetworks = socialMediaLinks;
    setFormData(data);
    console.log("sag", formData);
    nextStep();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      HttpClient.getInstance()
        .post("attachments", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res: any) => {
          setValue("companyLicenseImageID", res.data.uuid, {
            shouldValidate: true,
          });
          setPreview(URL.createObjectURL(file));
        });
    }
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-black text-3xl font-bold">Company</h1>
          <div className="flex gap-6 mt-16">
            <TextField
              label="First Name"
              required
              variant="outlined"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName && errors.firstName.message}
            />
            <TextField
              label="Last Name"
              required
              variant="outlined"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
            />
          </div>
          <div className="mt-3">
            <Typography variant="caption" color="gray">
              * Full Legal Name of the Company
            </Typography>
            <TextField
              sx={{ mt: 1 }}
              label="Company Name"
              fullWidth
              variant="outlined"
              {...register("companyName")}
              error={!!errors.companyName}
              helperText={errors.companyName && errors.companyName.message}
            />
          </div>
          <div className="flex flex-col gap-1 mt-6">
            <Typography variant="h6">Company License</Typography>
            <Typography variant="caption" color="gray">
              * Scanned copy of the Trade License
            </Typography>

            <div className="flex gap-4 mt-1">
              <TextField
                label="Trade License Number"
                required
                className="lg:w-[30%]"
                variant="outlined"
                {...register("tradeLicenseNumber")}
                error={!!errors.tradeLicenseNumber}
                helperText={
                  errors.tradeLicenseNumber && errors.tradeLicenseNumber.message
                }
              />
              <IconButton
                className="flex flex-col hover:rounded"
                size="large"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <AddPhotoAlternateOutlined />
                <span className="text-sm mt-1">Upload Photo</span>
              </IconButton>
              <input
                type="file"
                id="file-input"
                className="hidden"
                accept="image/*"
                {...register("companyLicenseImageID", {
                  required: "Image is required",
                  validate: {
                    fileType: (file: any) =>
                      file && file.type.startsWith("image/")
                        ? true
                        : "Only image files are allowed",
                  },
                })}
                onChange={handleFileChange}
              />
              {errors.companyLicenseImageID && (
                <p className="text-red-800">
                  {errors.companyLicenseImageID.message}
                </p>
              )}
            </div>

            {preview && (
              <div className="mb-3">
                <p className="text-sm">Preview:</p>
                <img
                  src={preview}
                  alt="Selected"
                  className="w-32 h-32 object-cover border"
                />
              </div>
            )}
          </div>
          <div>
            <Typography variant="h6">Company Address</Typography>
            <TextField
              label="Address"
              required
              fullWidth
              variant="outlined"
              {...register("companyAddress")}
              error={!!errors.companyAddress}
              helperText={
                errors.companyAddress && errors.companyAddress.message
              }
            />
            <div className="flex justify-between gap-16 mt-4">
              <TextField
                label="City"
                required
                fullWidth
                variant="outlined"
                {...register("companyCity")}
                error={!!errors.companyCity}
                helperText={errors.companyCity && errors.companyCity.message}
              />
              <TextField
                label="Postal Code"
                required
                fullWidth
                variant="outlined"
                {...register("companyPostalCode")}
                error={!!errors.companyPostalCode}
                helperText={
                  errors.companyPostalCode && errors.companyPostalCode.message
                }
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <Typography variant="h6">Contact Info</Typography>
            <TextField
              label="Email Address"
              required
              className="lg:w-[50%]"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              label="Phone Number"
              id="outlined-start-adornment"
              sx={{ width: "30ch" }}
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber && errors.phoneNumber.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+971</InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mt-12 flex flex-col gap-4">
            <h3>Website / Social Media Address</h3>
            {socialMediaLinks.map((link, index) => (
              <div key={index} className="flex gap-4">
                <FormControl fullWidth>
                  <InputLabel id={`select-id-${index}`}>Select</InputLabel>
                  <Select
                    labelId={`select-id-${index}`}
                    id={`select-link-${index}`}
                    label="Select"
                    value={link.platform}
                    onChange={(e) =>
                      handleSocialMediaChange(index, "platform", e.target.value)
                    }
                  >
                    {sociaNetworksList.map((item: any) => {
                      return (
                        <MenuItem value={item.id} key={item.id}>
                          {item.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="ID"
                  value={link.id}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "id", e.target.value)
                  }
                />
                {index === socialMediaLinks.length - 1 ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddSocialMediaLink}
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveSocialMediaLink(index)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="w-full text-right mt-5">
            <Button type="submit" variant="contained" disabled={!isValid}>
              Next
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Step1;
