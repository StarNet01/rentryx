"use client";
import { Add, ArrowBack, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { form2Schema } from "@/modules/auth/validation/validationSchemasRegisterCompany";
import useCompanyRegisterForms from "@/modules/auth/store/CompanyRegisterForms";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const Step2 = () => {
  const { data: vehicleCategories, error } = useSWR(
    "getvehiclesCategoresID",
    (url) => HttpClient.getInstance().fetcher(url)
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(form2Schema),
  });
  const { formData, setFormData, nextStep, backStep } =
    useCompanyRegisterForms();

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  useEffect(() => {
    for (const key in formData) {
      setValue(key, formData[key], { shouldValidate: true });
    }
    if (formData.vehiclesCategoresID) {
      setSelectedCategories(formData.vehiclesCategoresID);
    }
  }, [formData, setValue]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const onSubmit = (data: any) => {
    data.vehiclesCategoresID = selectedCategories;
    setFormData(data);
    nextStep();
  };

  if (error) return <div>Failed to load</div>;
  if (!vehicleCategories) return <div>Loading...</div>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-black text-3xl font-bold">Company</h1>
        <div className="mt-16 flex gap-4 flex-col">
          <h2 className="font-bold">Vehicles in the fleet</h2>
          <div>
            <TextField
              label="Number of Vehicles"
              {...register("numberOfVehicles")}
              error={!!errors.numberOfVehicles}
              helperText={
                errors.numberOfVehicles &&
                (errors.numberOfVehicles.message as string)
              }
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-bold">Categories of vehicles</h2>
          <FormGroup row>
            {vehicleCategories.map((category: any) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                  />
                }
                label={category.name}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
        </div>
        <div className="mt-8 flex gap-4 flex-col">
          <h2 className="font-bold">VAT Registration (in the UAE)</h2>
          <TextField
            label="Registration Number"
            {...register("VATNumber")}
            fullWidth
            error={!!errors.VATNumber}
            helperText={
              errors.VATNumber && (errors.VATNumber.message as string)
            }
          />
        </div>

        <div className="w-full flex justify-end gap-4 mt-5">
          <Button
            type="button"
            variant="outlined"
            onClick={() => backStep()}
            color="primary"
          >
            <ArrowBack />
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
