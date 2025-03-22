import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useBrokerRegisterFormStore from "../../store/BrokerRegisterForms";
import { yupResolver } from "@hookform/resolvers/yup";
import { form1Schema } from "../../validation/validationSchemasRegisterBroker";
import { useForm } from "react-hook-form";
import { Key, useEffect, useState } from "react";
import { IBrokerRegisterForm } from "../../interfaces/IBrokerRegisterForm";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const sociaNetworksList = [ // TODO get from api
  { id: "1", title: "facebook" },
  { id: "2", title: "instagram" },
];

const RegisterBrokerStep1 = () => {
  const [idType, setIdType] = useState("emirates");
  const [preview, setPreview] = useState<string>("");
  const { formData, setFormData, nextStep } = useBrokerRegisterFormStore();
  const [socialMediaLinks, setSocialMediaLinks] = useState<any[]>([
    { platform: "", url: "" },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(form1Schema),
    defaultValues: {
      idType: "emirates",
      ...formData,
    },
  });

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
          setValue("officialImage", res.data.uuid, {
            shouldValidate: true,
          });
          setPreview(URL.createObjectURL(file));
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        ...data,
        socialNetworks: socialMediaLinks,
        [idType === "emirates" ? "emiratesID" : "passport"]: data.officialID,
      };

      setFormData(formattedData);
      nextStep();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  useEffect(() => {
    for (const key in formData) {
      setValue(
        key as keyof IBrokerRegisterForm as any,
        formData[key as keyof IBrokerRegisterForm],
        { shouldValidate: true }
      );

      if (formData.emiratesID) {
        setIdType("emirates");
      } else if (formData.passport) {
        setIdType("passport");
      }

      if (
        key === "officialImage" &&
        formData[key as keyof IBrokerRegisterForm]
      ) {
        const officialImage = formData[key as keyof IBrokerRegisterForm];
        HttpClient.getInstance()
          .get(`/attachments/${officialImage}`)
          .then((res: any) => {
            if (res?.data?.base64) {
              setPreview(
                `data:${res.data.file_type};base64,${res.data.base64}`
              );
            }
          })
          .catch((error) => {
            console.error("Error loading image:", error);
          });
      }
    }
    if (formData.socialNetworks?.length > 0) {
      setSocialMediaLinks(formData.socialNetworks);
    }
  }, [formData, setValue]);

  const handleAddSocialMediaLink = () => {
    setSocialMediaLinks([...socialMediaLinks, { platform: "", url: "" }]);
  };

  const handleRemoveSocialMediaLink = (index: number) => {
    const newLinks = socialMediaLinks.filter(
      (_: any, i: number) => i !== index
    );
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-black text-3xl font-bold">Broker</h1>
        <Typography variant="caption" color="gray">
          *Full Name as Per the{" "}
          {idType === "emirates" ? "Emirates ID" : "Passport"}
        </Typography>
        <div className="flex gap-6 mt-3">
          <TextField
            label="First Name"
            required
            variant="outlined"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName && (errors.firstName.message as any)}
          />
          <TextField
            label="Last Name"
            required
            variant="outlined"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName && (errors.lastName.message as any)}
          />
        </div>
        <div className="flex gap-6 mt-3">
          <TextField
            label="Company Name"
            fullWidth
            variant="outlined"
            {...register("companyName")}
            error={!!errors.companyName}
            helperText={
              errors.companyName && (errors.companyName.message as any)
            }
          />
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <h3>Identification</h3>
          <RadioGroup
            row
            value={idType}
            onChange={(e) => {
              setIdType(e.target.value);
              setValue("idType", e.target.value);
            }}
          >
            <FormControlLabel
              value="emirates"
              control={<Radio />}
              label="Emirates ID"
            />
            <FormControlLabel
              value="passport"
              control={<Radio />}
              label="Passport Number"
            />
          </RadioGroup>
          <div className="flex gap-4">
            <TextField
              label={idType === "emirates" ? "Emirates ID" : "Passport Number"}
              required
              fullWidth
              variant="outlined"
              {...register("officialID")}
              error={!!errors.officialID}
              helperText={
                errors.officialID && (errors.officialID.message as any)
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
              {...register("officialImage", {
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
            {errors.officialImage && (
              <p className="text-red-800">
                {errors.officialImage.message as any}
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
        <div className="mt-6 flex flex-col gap-4">
          <h3>Contact Info</h3>
          <TextField
            label="Email Address"
            required
            fullWidth
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email && (errors.email.message as any)}
          />
          <TextField
            label="Phone Number"
            id="outlined-start-adornment"
            sx={{ width: "30ch" }}
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={
              errors.phoneNumber && (errors.phoneNumber.message as any)
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">+971</InputAdornment>
                ),
              },
            }}
          />
        </div>
        <div className="mt-12 flex flex-col gap-4">
          <h3>Website / Social Media Address</h3>
          {socialMediaLinks.map((link, index) => (
            <div key={index} className="flex gap-4">
              <FormControl fullWidth>
                <InputLabel id={`select-id-${index}`}>Platform</InputLabel>
                <Select
                  labelId={`select-id-${index}`}
                  id={`select-link-${index}`}
                  label="Platform"
                  value={link.platform}
                  onChange={(e) =>
                    handleSocialMediaChange(index, "platform", e.target.value)
                  }
                >
                  {sociaNetworksList.map((item) => (
                    <MenuItem value={item.title} key={item.id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="URL"
                value={link.url}
                onChange={(e) =>
                  handleSocialMediaChange(index, "url", e.target.value)
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
    </>
  );
};

export default RegisterBrokerStep1;
