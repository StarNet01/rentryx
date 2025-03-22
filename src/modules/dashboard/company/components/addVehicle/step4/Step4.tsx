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
import dynamic from "next/dynamic";
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const Step4 = () => {
  const [preview, setPreview] = useState<string[]>([]);
  const { formData, setFormData, nextStep } = useCompanyRegisterForms();
  const [position, setPosition] = useState<LatLngTuple | null>(null);

  const defaultPosition: LatLngTuple = [23.4241, 53.8478];

  function LocationMarker() {
    return position === null ? null : (
      <Marker position={position}>
        <Popup>location</Popup>
      </Marker>
    );
  }

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
        <h1 className="text-black text-3xl font-bold">Contact info</h1>
        <Divider />
        <div className="mt-3">
          <h3 className="text-black text-xl mt-2 font-bold">Contact</h3>
          <h3 className="text-[#928B83] text-md mt-2">Choosing Contact ways</h3>
          <div className="flex gap-9">
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="E-Mail"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Phone"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Message Box"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Company Address"
            />
          </div>
        </div>
        <Divider />
        <div className="my-3">
          <h3 className="text-black text-xl my-3 font-bold">Location</h3>
          <div className="mb-4">
            <TextField label="Address" fullWidth />
          </div>
          <TextField label="City" />
        </div>
        <Divider />
        <div className="my-3">
          <h3 className="text-black text-xl my-3 font-bold">Choose Location</h3>
          <div>
            <MapContainer
              center={defaultPosition}
              zoom={10}
              style={{ width: "100%", height: "400px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainer>
            {position && (
              <div>
                <p>
                 location: {position[0]}, {position[1]}
                </p>
              </div>
            )}
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

export default Step4;
