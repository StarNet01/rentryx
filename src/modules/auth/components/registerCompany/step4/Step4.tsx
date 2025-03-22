"use client";
import { useState, useEffect } from "react";
import {
  ArrowBack,
  Edit,
  Facebook,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import {
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Stack,
  Chip,
  Checkbox,
} from "@mui/material";
import { useRouter } from "next/navigation";
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

const Step4 = () => {
  const { formData, backStep, goToStep } = useCompanyRegisterForms();
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const router = useRouter();

  const { data: geoList } = useSWR("getgeographicalCoverage", (url) =>
    HttpClient.getInstance().fetcher(url)
  );
  const { data: vehiclesCategores } = useSWR("getvehiclesCategoresID", (url) =>
    HttpClient.getInstance().fetcher(url)
  );
  const geoData =
    geoList && formData.geographicalCoverage
      ? geoList.filter((item: any) =>
          formData.geographicalCoverage.includes(item.id)
        )
      : [];

  const vehiclesCategoresData =
    vehiclesCategores && formData.vehiclesCategoresID
      ? vehiclesCategores.filter((item: any) =>
          formData.vehiclesCategoresID.includes(item.id)
        )
      : [];

  useEffect(() => {
    if (formData.logo)
      HttpClient.getInstance()
        .get(`/attachments/${formData.logo}`)
        .then((res: any) => {
          setPreview(`data:${res.data.file_type};base64,${res.data.base64}`);
        });
    console.log("formData", formData);
  }, [formData]);

  const confirm = () => {
    HttpClient.getInstance()
      .post("companies", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        companyName: formData.companyName,
        tradeLicenseNumber: formData.tradeLicenseNumber,
        companyLicenseImageID: formData.companyLicenseImageID,
        companyAddress: formData.companyAddress,
        companyCity: formData.companyCity,
        companyPostalCode: formData.companyPostalCode,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        numberOfVehicles: formData.numberOfVehicles,
        VATNumber: formData.VATNumber,
        logoImgID: formData.logo,

        vehiclesCategoresID: formData.vehiclesCategoresID,
        sociaNetworks: formData.socialNetworks,
        workingHours: formData.workingHours,
        geographicalCoverage: formData.geographicalCoverage,
      })
      .then((res: any) => {
        if (res.data.success) {
          router.push("verifyCode");
        }
      })
      .catch((e) => {
        console.error("error", e);
      });
  };

  return (
    <>
      <form>
        <div className="flex items-center gap-4 mb-4">
          <img src={preview} alt="Logo" className="w-[145px] h-[145px]" />
          <h1 className="text-black text-3xl font-bold">
            {formData.companyName || "Company name"}
          </h1>
        </div>
        <Divider textAlign="left">
          <Typography variant="h6" color="gray">
            Personal Info
          </Typography>
        </Divider>
        <div className="flex gap-6 mt-3">
          <TextField
            label="First Name"
            required
            variant="outlined"
            disabled
            value={formData.firstName || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => goToStep(0)}>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Last Name"
            required
            variant="outlined"
            disabled
            value={formData.lastName || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => goToStep(0)}>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="mt-5">
          <TextField
            label="Address"
            required
            fullWidth
            variant="outlined"
            disabled
            value={formData.companyAddress || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => goToStep(0)}>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <div className="flex justify-between gap-16 mt-4">
            <TextField
              label="City"
              required
              fullWidth
              variant="outlined"
              disabled
              value={formData.companyCity || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => goToStep(0)}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Postal Code"
              required
              fullWidth
              variant="outlined"
              disabled
              value={formData.companyPostalCode || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => goToStep(0)}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <h3>Contact Info</h3>
          <TextField
            label="Email Address"
            required
            fullWidth
            variant="outlined"
            disabled
            value={formData.email || ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => goToStep(0)}>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Phone Number"
            id="outlined-start-adornment"
            sx={{ width: "30ch" }}
            disabled
            value={formData.phoneNumber || ""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">+971</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => goToStep(0)}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        {formData.socialNetworks && formData.socialNetworks.length > 0 && (
          <>
            <div className="mt-6 flex flex-col gap-4">
              <h3 className="font-bold">Website &amp; Social Media Address</h3>
              <div className="flex gap-4">
                {formData.socialNetworks.map((network: any, index: number) => {
                  let icon;
                  if (network.platform === "1") {
                    icon = <Facebook />;
                  } else if (network.platform === "2") {
                    icon = <Instagram />;
                  } else {
                    icon = null;
                  }
                  return (
                    <IconButton
                      key={index}
                      color="primary"
                      onClick={() => goToStep(0)}
                    >
                      {icon}
                    </IconButton>
                  );
                })}
                <IconButton className="ml-3" onClick={() => goToStep(0)}>
                  <Edit />
                </IconButton>
              </div>
              {formData.website && (
                <TextField
                  label="Website"
                  fullWidth
                  variant="outlined"
                  disabled
                  value={formData.website}
                  sx={{ marginTop: "1rem" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => goToStep(0)}>
                          <Edit />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </div>
          </>
        )}

        <Divider textAlign="left" sx={{ marginTop: "1.5rem" }}>
          <Typography variant="h6" color="gray">
            Business Info
          </Typography>
        </Divider>

        <div>
          <Typography variant="body1" component="span">
            Vehicles in the fleet:{" "}
          </Typography>
          <Typography variant="body1" component="span">
            {formData.numberOfVehicles !== undefined &&
            formData.numberOfVehicles !== null
              ? formData.numberOfVehicles
              : "0"}
          </Typography>
          <IconButton onClick={() => goToStep(1)}>
            <Edit />
          </IconButton>
          {vehiclesCategoresData && (
            <Stack direction="row" spacing={1}>
              {vehiclesCategoresData.map((tag: any, index: number) => (
                <Chip key={index} label={tag.name} color="primary" />
              ))}
            </Stack>
          )}

          <div className="mt-4">
            <TextField
              label="VAT Registration"
              required
              fullWidth
              variant="outlined"
              disabled
              value={formData.VATNumber || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => goToStep(1)}>
                      <Edit />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex mt-5 gap-10">
            <div>
              <div className="flex justify-between">
                <span>Available Hours</span>
                <IconButton onClick={() => goToStep(2)}>
                  <Edit />
                </IconButton>
              </div>
              <div className="border rounded-md border-gray-600 p-3 flex flex-col gap-3">
                {daysOfWeek.map((day) => {
                  const dayData =
                    formData.workingHours && formData.workingHours[day]
                      ? formData.workingHours[day]
                      : null;
                  const displayHours =
                    dayData && dayData.enabled
                      ? `${dayData.start} - ${dayData.end}`
                      : "Closed";
                  return (
                    <div key={day}>
                      <span className="mr-14">{day}</span>
                      <span>{displayHours}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>Geographical Coverage</span>
                <IconButton onClick={() => goToStep(2)}>
                  <Edit />
                </IconButton>
              </div>
              <div className="border rounded-md border-gray-600 p-3 flex flex-col gap-3">
                {geoData.length > 0 && (
                  <ul>
                    {geoData.map((item: any) => (
                      <li key={item.id}>{item.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={termsChecked}
                onChange={(e) => setTermsChecked(e.target.checked)}
              />
            }
            label="I have read and agree the website terms & conditions"
          />
          <FormControlLabel
            required
            control={
              <Checkbox
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
              />
            }
            label="I have read and agree the website privacy policy"
          />
          <div className="flex gap-4 mt-5">
            <Button type="button" variant="outlined" onClick={() => backStep()}>
              <ArrowBack />
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => confirm()}
              disabled={!(termsChecked && privacyChecked)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Step4;
