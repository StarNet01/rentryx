"use client";
import { AddPhotoAlternateOutlined } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Divider,
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import useCompanyRegisterForms from "@/modules/auth/store/CompanyRegisterForms";

const Step3 = () => {
  const [preview, setPreview] = useState<string[]>([]);
  const { formData, setFormData, nextStep } = useCompanyRegisterForms();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    //  resolver: yupResolver(form1Schema),
  });

  //   useEffect(() => {
  //     // Set form values from store data
  //     for (const key in formData) {
  //       setValue(
  //         key as keyof IBrokerRegisterForm as any,
  //         formData[key as keyof IBrokerRegisterForm],
  //         { shouldValidate: true }
  //       );
  //       if (
  //         key === "officialImage" &&
  //         formData[key as keyof IBrokerRegisterForm]
  //       ) {
  //         const officialImage = formData[key as keyof IBrokerRegisterForm];
  //         if (officialImage instanceof File) {
  //           setPreview(URL.createObjectURL(officialImage));
  //         } else if (typeof officialImage === "string") {
  //           setPreview(officialImage);
  //         }
  //       }
  //     }
  //   }, [formData, setValue]);

  const onSubmit = (data: any) => {
    // TODO type
    console.log("formdata", data);
    setFormData(data);
    nextStep();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setPreview((prev) => [...prev, URL.createObjectURL(file)]);
      setValue("officialImage", URL.createObjectURL(file), {
        shouldValidate: true,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-black text-3xl font-bold">Photo & Price</h1>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Upload Photo</h3>
          <h3 className="text-[#928B83] text-md  mt-2">
            You’ll need 5 photos/videoes to get started. You can add more or
            make change later.
          </h3>
          <div>
            <div className="image-upload-container"></div>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-photo"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="upload-photo">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <AddPhotoAlternateOutlined />
              </IconButton>
            </label>
            <div className="gallery">
              {preview.map((src, index) => (
                <div key={index} className="image-preview">
                  <img src={src} alt={`Preview ${index}`} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setPreview(preview.filter((_, i) => i !== index));
                      setValue(
                        "officialImage",
                        preview.filter((_, i) => i !== index),
                        { shouldValidate: true }
                      );
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Divider />
        <div className="my-3">
          <h3 className="text-black text-xl my-3 font-bold">Description</h3>
          <TextField
            label="Car Description"
            placeholder=""
            multiline
            fullWidth
            rows={4}
          />
        </div>
        <Divider />
        <div className="my-3">
          <h3 className="text-black text-xl my-3 font-bold">Price</h3>
          <div className="flex items-center gap-3 mb-3">
            <FormControlLabel
              sx={{ width: "100px" }}
              control={<Checkbox defaultChecked />}
              label="Daily"
            />
            <TextField label="" placeholder="" />
            <span>AED</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FormControlLabel
              sx={{ width: "100px" }}
              control={<Checkbox defaultChecked />}
              label="Weekly"
            />
            <TextField label="" placeholder="" />
            <span>AED</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FormControlLabel
              sx={{ width: "100px" }}
              control={<Checkbox defaultChecked />}
              label="Monthly"
            />
            <TextField label="" placeholder="" />
            <span>AED</span>
          </div>
        </div>
        <div className="w-full mt-5 flex justify-end gap-3">
          <Button type="submit" variant="outlined">
            Back
          </Button>
          <Button type="submit" variant="contained" disabled={!isValid}>
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default Step3;
