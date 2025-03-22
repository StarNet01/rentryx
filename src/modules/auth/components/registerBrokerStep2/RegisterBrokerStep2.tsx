"use client";
import ImageUploadBox from "@/modules/share/components/imageUploadBox/ImageUploadBox";
import { Add, ArrowBack, Delete } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { form2Schema } from "../../validation/validationSchemasRegisterBroker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useBrokerRegisterFormStore from "../../store/BrokerRegisterForms";
import { IBrokerRegisterForm } from "../../interfaces/IBrokerRegisterForm";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const RegisterBrokerStep2 = () => {
  const { formData, setFormData, nextStep, backStep } =
    useBrokerRegisterFormStore();

  const [references, setReferences] = useState<
    Array<{ name: string; id: string }>
  >([{ name: "", id: "" }]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger, 
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(form2Schema),
    defaultValues: {
      logo: formData.logo || "",
      refrenceCompany: [],
    },
  });

  const { data: companiesList } = useSWR("companies", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  const uniqueCompaniesList = useMemo(() => {
    if (!companiesList) return [];

    const uniqueCompanies = new Map();
    companiesList.forEach((company: any) => {
      if (!uniqueCompanies.has(company.company_name)) {
        uniqueCompanies.set(company.company_name, company);
      }
    });

    return Array.from(uniqueCompanies.values());
  }, [companiesList]);

  const handleImageUploadComplete = (imageId: string) => {
    if (imageId) {
      setValue("logo", imageId, { shouldValidate: true });
    }
  };

  const handleImageDelete = () => {
    setValue("logo", "");
  };

  const handleReferenceChange = (index: number, newCompany: any) => {
    const newReferences = [...references];
    newReferences[index] = {
      name: newCompany?.company_name || "",
      id: newCompany?.id || "",
    };
    setReferences(newReferences);
    setValue(
      "refrenceCompany",
      newReferences.map((ref) => ({ name: ref.id })),
      { shouldValidate: true }
    );
  };

  const handleAddReference = () => {
    setReferences([...references, { name: "", id: "" }]);
  };

  const handleRemoveReference = (index: number) => {
    const newReferences = references.filter((_, i) => i !== index);
    setReferences(newReferences);
    setValue("refrenceCompany", newReferences, { shouldValidate: true });
  };

  useEffect(() => {
    if (formData.logo) {
      setValue("logo", formData.logo);
    }
    if (formData.refrenceCompany?.length > 0) {
      const formattedReferences = formData.refrenceCompany.map((ref: any) => {
        if (typeof ref === "object" && "name" in ref && "id" in ref) {
          return ref;
        }
        return { name: ref, id: "" };
      });

      setReferences(formattedReferences);
      setValue("refrenceCompany", formattedReferences);
    }

    trigger();
  }, [formData, setValue, trigger]);

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      refrenceCompany: references,
    };
    setFormData(formattedData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-black text-3xl font-bold">Broker</h1>

      <div className="mt-3">
        <h2 className="font-bold">Upload Photo</h2>
        <h3 className="text-gray-500">
          Upload Photo or Company Logo for Display on the Platform.
        </h3>
        <ImageUploadBox
          title={"Logo"}
          fileType={"image"}
          maxSizeFile={5}
          defaultImageID={formData.logo}
          upload={(data: any) => setValue("logo", data)}
          onComplete={handleImageUploadComplete}
          onDelete={handleImageDelete}
        />
      </div>
      <div className="mt-3">
        <h2 className="font-bold">References</h2>
        <h3 className="text-gray-500">
          List companies you have previously worked with
        </h3>

        {references.map((reference, index) => (
          <div
            key={`reference-container-${reference.id}`}
            className="flex gap-4 mt-3"
          >
            <Autocomplete
              key={`autocomplete-${index}`}
              fullWidth
              options={uniqueCompaniesList}
              getOptionLabel={(option: any) => option.company_name || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={
                uniqueCompaniesList.find(
                  (company: any) => company.id === reference.id
                ) || null
              }
              onChange={(_, newValue) => {
                handleReferenceChange(index, newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company Name"
                  error={!!errors.refrenceCompany?.[index]?.name}
                  helperText={errors.refrenceCompany?.[index]?.name?.message}
                />
              )}
            />
            {index > 0 && (
              <IconButton
                key={`delete-button-${index}`}
                onClick={() => handleRemoveReference(index)}
              >
                <Delete />
              </IconButton>
            )}
          </div>
        ))}

        <IconButton size="large" onClick={handleAddReference}>
          <Add fontSize="inherit" />
        </IconButton>
      </div>
      <div className="w-full flex justify-end gap-4 mt-5">
        <Button
          type="button"
          variant="outlined"
          onClick={backStep}
          color="secondary"
        >
          <ArrowBack />
        </Button>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Next
        </Button>
      </div>
    </form>
  );
};

export default RegisterBrokerStep2;
