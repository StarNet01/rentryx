"use client";
import { ArrowBack, Edit, Instagram, LinkedIn } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Divider,
  Stack,
  Chip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useBrokerRegisterFormStore from "../../store/BrokerRegisterForms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

const RegisterBrokerStep3 = () => {
  const { formData, setFormData, backStep, goToStep } =
    useBrokerRegisterFormStore();
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const router = useRouter();

  const {
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (formData.logo) {
      HttpClient.getInstance()
        .get(`/attachments/${formData.logo}`)
        .then((res: any) => {
          if (res?.data?.base64) {
            setPreview(`data:${res.data.file_type};base64,${res.data.base64}`);
          }
        })
        .catch((error) => {
          console.error("Error loading logo:", error);
        });
    }
  }, [formData.logo]);

  const onSubmit = async () => {
    try {
      console.log(formData);
      const formattedData = {
        ...formData,
        refrenceCompany: formData.refrenceCompany.map((ref: any) => ({
          company_id: ref.id,
        })),
      };
      HttpClient.getInstance()
        .post("brokers", formattedData)
        .then((res: any) => {
          if (res.data.success) {
            router.push("verifyCode");
          }
        })
        .catch((e) => {
          console.error("error", e);
        });
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4 mb-4">
        {preview && (
          <img src={preview} alt="Logo" className="w-[145px] h-[145px]" />
        )}
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

      <div className="flex gap-6 mt-3">
        <TextField
          label="Company Name"
          fullWidth
          variant="outlined"
          disabled
          value={formData.companyName || ""}
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

      <div className="flex flex-col gap-1 my-6">
        <Typography variant="caption" color="gray">
          *Full Name as Per the Official ID
        </Typography>
        <div className="flex gap-4">
          <TextField
            label={formData.emiratesID ? "Emirates ID" : "Passport Number"}
            required
            fullWidth
            disabled
            variant="outlined"
            value={formData.emiratesID || formData.passport || ""}
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
          disabled
          value={formData.phoneNumber || ""}
          sx={{ width: "30ch" }}
          InputProps={{
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
          }}
        />
      </div>

      {formData.socialNetworks && formData.socialNetworks.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          <h3 className="font-bold">Website & Social Media Address</h3>
          <div className="flex gap-4">
            {formData.socialNetworks.map((network: any, index: number) => (
              <IconButton
                key={index}
                color="primary"
                onClick={() => goToStep(0)}
              >
                {network.platform === "facebook" ? (
                  <Instagram />
                ) : network.platform === "instagram" ? (
                  <LinkedIn />
                ) : null}
              </IconButton>
            ))}
            <IconButton className="ml-3" onClick={() => goToStep(0)}>
              <Edit />
            </IconButton>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        <h3 className="font-bold">References</h3>
        <div className="flex gap-4">
          <Stack direction="row" spacing={1}>
            {formData.refrenceCompany?.map((ref: any, index: number) => (
              <Chip key={index} label={ref.name} color="primary" />
            ))}
          </Stack>
          <IconButton className="ml-3" onClick={() => goToStep(1)}>
            <Edit />
          </IconButton>
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
            type="submit"
            variant="contained"
            color="secondary"
            disabled={!(termsChecked && privacyChecked)}
          >
            Confirm
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RegisterBrokerStep3;
