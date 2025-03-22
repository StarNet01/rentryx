"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Link,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Layout from "@/modules/landing/layouts/Layout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { useAuthStore } from "@/modules/auth/store/auth";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const { login } = useAuthStore();
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    HttpClient.getInstance()
      .post(
        "login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res: any) => {
        login({ role: res.data.role, roleName: res.data.role_name || "" });

        if (res.data.role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/home");
        }
      });
  };

  return (
    <Layout blueBackground={true}>
      <div className="box-login min-h-[700px]">
        <Container maxWidth="lg">
          <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={
                          showPassword
                            ? "hide the password"
                            : "display the password"
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                margin="normal"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
              <div className="flex justify-between items-center">
                <FormControlLabel
                  control={<Checkbox {...register("rememberMe")} />}
                  label="Remember me"
                />
                <Link href="#" variant="body2" color="#000">
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ color: "#fff" }}
              >
                Login
              </Button>

              <div className="mt-2">
                <Link href="#" variant="body2" color="#14A2F7">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Login;
