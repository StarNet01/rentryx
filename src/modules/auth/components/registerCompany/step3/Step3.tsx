"use client";
import ImageUploadBox from "@/modules/share/components/imageUploadBox/ImageUploadBox";
import { Add, ArrowBack, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { form3Schema } from "@/modules/auth/validation/validationSchemasRegisterCompany";
import useCompanyRegisterForms from "@/modules/auth/store/CompanyRegisterForms";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Step3 = () => {
  const { data: geographicalCoverage, error } = useSWR(
    "getgeographicalCoverage",
    (url) => HttpClient.getInstance().fetcher(url)
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(form3Schema),
  });
  const { formData, setFormData, nextStep, backStep } =
    useCompanyRegisterForms();

  const [workingHours, setWorkingHours] = useState<any>({});
  const [selectedGeographicalCoverage, setSelectedGeographicalCoverage] =
    useState<number[]>([]);

  useEffect(() => {
    for (const key in formData) {
      setValue(key, formData[key], { shouldValidate: true });
    }

    if (formData.workingHours) {
      setWorkingHours(formData.workingHours);
      setValue("workingHours", formData.workingHours, { shouldValidate: true }); 
    }
    if (formData.geographicalCoverage) {
      setSelectedGeographicalCoverage(formData.geographicalCoverage);
      setValue("geographicalCoverage", formData.geographicalCoverage, {
        shouldValidate: true,
      }); 
    }
  }, [formData, setValue]);

  const handleWorkingHoursChange = (
    day: string,
    field: string,
    value: string
  ) => {
    const updatedHours = {
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [field]: value,
      },
    };
    setWorkingHours(updatedHours);
    setValue("workingHours", updatedHours, { shouldValidate: true });
  };

  const handleGeographicalCoverageChange = (id: number) => {
    const updatedSelection = selectedGeographicalCoverage.includes(id)
      ? selectedGeographicalCoverage.filter((selectedId) => selectedId !== id)
      : [...selectedGeographicalCoverage, id];

    setSelectedGeographicalCoverage(updatedSelection);
    setValue("geographicalCoverage", updatedSelection, {
      shouldValidate: true,
    });
  };

  const onSubmit = (data: any) => {
    data.workingHours = workingHours;
    data.geographicalCoverage = selectedGeographicalCoverage;
    setFormData(data);
    nextStep();
  };

  const handleImageUploadComplete = (imageId: string) => {
    if (imageId) {
      setValue("logo", imageId, { shouldValidate: true });
    } else {
      console.log("Image upload failed.");
    }
  };

  const handleImageDelete = () => {
    setValue("logo", "");
  };

  if (error) return <div>Failed to load</div>;
  if (!geographicalCoverage) return <div>Loading...</div>;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-black text-3xl font-bold">Company</h1>
        <div className="mt-16">
          <h2 className="font-bold">Company Logo</h2>
          <h3 className="text-gray-500">
            *Upload Company Logo for Display on the Platform.
          </h3>
          <div className="max-w-[306px] pt-3">
            <ImageUploadBox
              title={""}
              fileType={"image"}
              maxSizeFile={5}
              {...register("logo")}
              defaultImageID={formData.logo}
              upload={function (
                data: any,
                setProgress: (value: number) => void
              ) {
                setValue("logo", data);
              }}
              onComplete={handleImageUploadComplete}
              onDelete={handleImageDelete}
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-bold">Working Hours</h2>
          <h3 className="text-gray-500">*Days and Hours of Operation.</h3>

          <div className="flex flex-col">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center mb-2 gap-4 space-y-2">
                <h4 className="mr-4 w-[110px]">{day}</h4>
                <Switch
                  checked={!!workingHours[day]?.enabled}
                  onChange={(e: any) =>
                    handleWorkingHoursChange(day, "enabled", e.target.checked)
                  }
                />
                <h4 className="text-gray-500">
                  {workingHours[day]?.enabled ? "Available" : "Closed"}
                </h4>
                {workingHours[day]?.enabled && (
                  <>
                    <TextField
                      label="Start at"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      {...register(`${day.toLowerCase()}Open`)}
                      value={workingHours[day]?.start || ""}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "start", e.target.value)
                      }
                    />
                    <TextField
                      label="End at"
                      type="time"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      {...register(`${day.toLowerCase()}Close`)}
                      value={workingHours[day]?.end || ""}
                      onChange={(e) =>
                        handleWorkingHoursChange(day, "end", e.target.value)
                      }
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <h2 className="font-bold">Geographical Coverage</h2>
          <h3 className="text-gray-500">
            *Services Available Across All Emirates or Partially.
          </h3>

          <FormGroup>
            {geographicalCoverage.map((coverage: any) => (
              <FormControlLabel
                key={coverage.id}
                control={
                  <Checkbox
                    checked={selectedGeographicalCoverage.includes(coverage.id)}
                    onChange={() =>
                      handleGeographicalCoverageChange(coverage.id)
                    }
                  />
                }
                label={coverage.title}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
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
            {/* <Button type="submit" variant="contained"> */}
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default Step3;
