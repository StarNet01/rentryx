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

const Step2 = () => {
  const [preview, setPreview] = useState<string>("");
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
      setPreview(URL.createObjectURL(file));
      setValue("officialImage", URL.createObjectURL(file), {
        shouldValidate: true,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-black text-3xl font-bold">features</h1>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Number of Seat</h3>
          <FormControl>
            <RadioGroup
              row
              name="numberOfSeat"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Test1" />
              <FormControlLabel value="no" control={<Radio />} label="Test2" />
            </RadioGroup>
          </FormControl>
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Fuel Type</h3>
          <FormControl>
            <RadioGroup
              row
              name="numberOfSeat"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Test1" />
              <FormControlLabel value="no" control={<Radio />} label="Test2" />
            </RadioGroup>
          </FormControl>
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Number Of Doors</h3>
          <FormControl>
            <RadioGroup
              row
              name="numberOfSeat"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Test1" />
              <FormControlLabel value="no" control={<Radio />} label="Test2" />
            </RadioGroup>
          </FormControl>
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Gearbox Type</h3>
          <FormControl>
            <RadioGroup
              row
              name="numberOfSeat"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Test1" />
              <FormControlLabel value="no" control={<Radio />} label="Test2" />
            </RadioGroup>
          </FormControl>
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Engine Capacity</h3>
          <FormControl>
            <RadioGroup
              name="numberOfSeat"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Small engine (1000cc to 1500cc)"
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Medium engine (1600cc to 2500cc)"
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Large engine (2500cc to 4000cc)"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="High Performance engine (4000cc to Above)"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl my-3 font-bold">Luggage bag</h3>
          <TextField label="Number of Luggage" />
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Cylinder</h3>
          <FormControl>
            <RadioGroup
              row
              name="numberOfSeat"
              //   value={true}
              //   onChange={handleChange}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Test1" />
              <FormControlLabel value="no" control={<Radio />} label="Test2" />
            </RadioGroup>
          </FormControl>
        </div>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Color</h3>
          <FormControlLabel control={<Checkbox />} label="test" />
          <FormControlLabel control={<Checkbox />} label="test2" />
          <FormControlLabel control={<Checkbox />} label="test3" />
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

export default Step2;
