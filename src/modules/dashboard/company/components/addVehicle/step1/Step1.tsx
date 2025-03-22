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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { form1Schema } from "@/modules/auth/validation/validationSchemasRegisterCompany";
import useCompanyRegisterForms from "@/modules/auth/store/CompanyRegisterForms";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const Step1 = () => {
  const [preview, setPreview] = useState<string>("");
  const { formData, setFormData, nextStep } = useCompanyRegisterForms();
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);

  const { data: BrandsList } = useSWR("car_brands", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  const { data: ModelsList } = useSWR(
    selectedBrand ? `cars/${selectedBrand}` : null,
    (url) => HttpClient.getInstance().fetcher(url)
  );

  const { data: YearsList } = useSWR(
    selectedModel ? `car_years/${selectedModel}` : null,
    (url) => HttpClient.getInstance().fetcher(url)
  );

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
      setPreview(URL.createObjectURL(file));
      setValue("officialImage", URL.createObjectURL(file), {
        shouldValidate: true,
      });
    }
  };

  const handleBrandChange = (event: any) => {
    const brandId = event.target.value;
    setSelectedBrand(brandId);
    setValue("vehicleModel", ""); // Reset model value when brand changes
  };

  const handleModelChange = (event: any) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);
    setValue("registrationYear", ""); // Reset year when model changes
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-black text-3xl font-bold">Vehicle Info</h1>
        <h3 className="text-black text-xl mt-2 font-bold">Car Details</h3>
        <div className="flex gap-6 my-5 flex-col">
          <FormControl fullWidth required error={!!errors.carBrand}>
            <InputLabel id="car-brand-label">Car Brand</InputLabel>
            <Select
              labelId="car-brand-label"
              label="Car Brand"
              {...register("carBrand")}
              onChange={(e) => {
                register("carBrand").onChange(e);
                handleBrandChange(e);
              }}
            >
              {BrandsList?.map((brand: { id: number; name: string }) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required error={!!errors.vehicleModel}>
            <InputLabel id="model-label">Vehicle Model</InputLabel>
            <Select
              labelId="model-label"
              label="Vehicle Model"
              {...register("vehicleModel")}
              disabled={!selectedBrand}
              onChange={(e) => {
                register("vehicleModel").onChange(e);
                handleModelChange(e);
              }}
            >
              {ModelsList?.map((model: { id: number; model_name: string }) => (
                <MenuItem key={model.id} value={model.id}>
                  {model.model_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required error={!!errors.registrationYear}>
            <InputLabel id="year-label">Registration Year</InputLabel>
            <Select
              labelId="year-label"
              label="Registration Year"
              {...register("registrationYear")}
              disabled={!selectedModel}
            >
              {YearsList?.map((yearItem: { year: string }) => (
                <MenuItem key={yearItem.year} value={yearItem.year}>
                  {yearItem.year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Vehicle Type</h3>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="test"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="test2"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="test3"
          />
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Insurance</h3>
          <FormControl>
            <RadioGroup
              row
              name="insurance"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
        <Divider />
        <div className="flex flex-col gap-1 my-6">
          <h3 className="text-black text-xl mt-2 font-bold">Feature b</h3>
          <h3 className="text-black text-lg">Mileage Limit</h3>
          <Typography variant="caption" color="gray">
            Mileage limitation is the number of kilometers you can drive your
            rental car free of cost
          </Typography>
          <FormControl>
            <RadioGroup
              row
              name="limitStatus"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel
                value="unlimited"
                control={<Radio />}
                label="Unlimited"
              />
              <FormControlLabel
                value="limited"
                control={<Radio />}
                label="Limited"
              />
            </RadioGroup>
          </FormControl>
          <div className="flex">
            <div>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Daily Limited"
              />
              <TextField
                label=""
                variant="outlined"
                //   {...register("tradeLicenseNumber")}
                //   error={!!errors.tradeLicenseNumber}
                //   helperText={
                //     errors.tradeLicenseNumber && errors.tradeLicenseNumber.message
                //   }
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Weekly Limited"
              />
              <TextField
                label=""
                variant="outlined"
                //   {...register("tradeLicenseNumber")}
                //   error={!!errors.tradeLicenseNumber}
                //   helperText={
                //     errors.tradeLicenseNumber && errors.tradeLicenseNumber.message
                //   }
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Monthly Limited"
              />
              <TextField
                label=""
                variant="outlined"
                //   {...register("tradeLicenseNumber")}
                //   error={!!errors.tradeLicenseNumber}
                //   helperText={
                //     errors.tradeLicenseNumber && errors.tradeLicenseNumber.message
                //   }
              />
            </div>
          </div>
        </div>
        <Divider />

        <h3 className="text-black text-xl mt-2 font-bold">Specs</h3>
        <FormControl>
          <RadioGroup row name="specs">
            <FormControlLabel
              value="gccSpecs"
              control={<Radio />}
              label="Gcc Specs"
            />
            <FormControlLabel
              value="americanSpecs"
              control={<Radio />}
              label="American Specs"
            />
          </RadioGroup>
        </FormControl>

        <div className="w-full text-right mt-5">
          <Button type="submit" variant="contained" disabled={!isValid}>
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default Step1;
