"use client";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
  LinearProgress,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReplayIcon from "@mui/icons-material/Replay";
import toast from "react-hot-toast";
import FsLightbox from "fslightbox-react";
import axios from "axios";
import HttpClient from "../../services/httpClient/HttpClient";

enum uploadStatus {
  chooseImage,
  uploading,
  uploaded,
  error,
}

export interface IProps {
  title: string;
  fileType: "image" | "pdf" | "file" | "video";
  maxSizeFile: number;
  upload: (data: any, setProgress: (value: number) => void) => any;
  onComplete: (status: any) => void;
  onDelete?: () => any;
  defaultImage?: string;
  defaultImageID?: string;
}

const ImageUploadBox = (props: IProps) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasOpenLightBox, setHasOpenLightBox] = useState<boolean>(false);
  const [imageName, setImageName] = useState("");
  const [open, setOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<uploadStatus>(
    props.defaultImage ? uploadStatus.uploaded : uploadStatus.chooseImage
  );

  useEffect(() => {
    if (props.defaultImageID) {
      HttpClient.getInstance()
        .get(`attachments/${props.defaultImageID}`)
        .then((res: any) => {
          setDefaultImage(
            `data:${res.data.file_type};base64,${res.data.base64}`
          );
          setStatus(uploadStatus.uploaded)
        })
        .catch((err) => {
          console.error("Failed to load image:", err);
        });
    }
  }, [props.defaultImageID]);

  const handleChangeProgress = (value: number) => {
    setProgress(Math.floor(value));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleCompressedUpload(e.dataTransfer.files[0]);
    }
  };

  const handleCompressedUpload = (file: File) => {
    setImageName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result as string);
      uploadImage(file);
    };
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await HttpClient.getInstance().post<any>(
        "attachments",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setStatus(uploadStatus.uploaded);
        props.upload(response.data.uuid, handleChangeProgress);
        props.onComplete(response.data.uuid);
        console.log("Image uploaded successfully:", response.data);
      } else {
        setStatus(uploadStatus.error);
        console.error("Image upload failed:", response.data);
      }
    } catch (error) {
      setStatus(uploadStatus.error);
      console.error("Image upload error:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await props.onDelete?.();
      setStatus(uploadStatus.chooseImage);
      setDefaultImage(null);
      setImage(null);
      props.onComplete(false);
    } catch (error) {
      toast.error("Error deleting image!");
    }
  };

  function getCropData(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Box>
        <FormLabel>{props.title}</FormLabel>
        {status === uploadStatus.chooseImage && (
          <>
            <Button
              component="label"
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                alignItems: "center",
                height: "auto !important",
                border: "2.5px dashed #D1D5DB",
              }}
            >
              <Box
                className="flex-col"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5007 13.3333C13.9734 13.3333 15.1673 12.1394 15.1673 10.6667C15.1673 9.19391 13.9734 8 12.5007 8C11.0279 8 9.83398 9.19391 9.83398 10.6667C9.83398 12.1394 11.0279 13.3333 12.5007 13.3333Z"
                    stroke="#2A6DF5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.8327 2.66797H12.4993C5.83268 2.66797 3.16602 5.33464 3.16602 12.0013V20.0013C3.16602 26.668 5.83268 29.3346 12.4993 29.3346H20.4993C27.166 29.3346 29.8327 26.668 29.8327 20.0013V13.3346"
                    stroke="#2A6DF5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.5 10.668V2.66797L27.1667 5.33464"
                    stroke="#2A6DF5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.5007 2.66797L21.834 5.33464"
                    stroke="#2A6DF5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.06055 25.2661L10.6339 20.8528C11.6872 20.1461 13.2072 20.2261 14.1539 21.0394L14.5939 21.4261C15.6339 22.3194 17.3139 22.3194 18.3539 21.4261L23.9005 16.6661C24.9405 15.7728 26.6205 15.7728 27.6605 16.6661L29.8339 18.5328"
                    stroke="#2A6DF5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <Typography variant="caption" component="span" ml={2}>
                  Drag your photo here
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="gray">
                  Upload from your device
                </Typography>
              </Box>
              {dragActive && (
                <div
                  id="drag-file-element"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                ></div>
              )}
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleCompressedUpload(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </>
        )}
        {status === uploadStatus.uploading && (
          <>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F5F8FF",
                  borderRadius: "100%",
                  minWidth: "50px",
                  width: "50px",
                  height: "50px",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 17V11L7 13"
                    stroke="#034CDD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11L11 13"
                    stroke="#034CDD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                    stroke="#034CDD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                    stroke="#034CDD"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Box>
              <Box sx={{ width: "100%" }}>
                {imageName}
                <LinearProgress
                  variant="determinate"
                  color={hasError ? "error" : "primary"}
                  value={progress}
                  sx={{ height: "10px" }}
                />
                {hasError ? "Error!" : `Uploading ${progress}%`}
              </Box>
              {hasError && (
                <IconButton onClick={() => getCropData()}>
                  <ReplayIcon />
                </IconButton>
              )}
            </Stack>
          </>
        )}
        {(status === uploadStatus.uploaded || defaultImage) && (
          <>
            <Card sx={{ border: "1px solid #E5E7EB" }}>
              <CardMedia
                component="img"
                onClick={() => setHasOpenLightBox(!hasOpenLightBox)}
                alt="uploaded img"
                sx={{ height: "150px", cursor: "pointer" }}
                image={defaultImage ? defaultImage : (image as string) || ""}
              />

              <CardContent sx={{ pb: "5px !important" }}>
                <Stack
                  direction="row"
                  justifyContent="start"
                  alignItems="center"
                >
                  {props.onDelete && (
                    <IconButton
                      aria-label="delete"
                      size="large"
                      color="error"
                      onClick={handleDelete}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047"
                          stroke="#E61E1E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
                          stroke="#E61E1E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.8504 9.14062L18.2004 19.2106C18.0904 20.7806 18.0004 22.0006 15.2104 22.0006H8.79039C6.00039 22.0006 5.91039 20.7806 5.80039 19.2106L5.15039 9.14062"
                          stroke="#E61E1E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.3301 16.5H13.6601"
                          stroke="#E61E1E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.5 12.5H14.5"
                          stroke="#E61E1E"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </IconButton>
                  )}

                  <a
                    download={imageName ? `${imageName}.jpg` : "image.jpg"}
                    href={defaultImage ? defaultImage : (image as string) || ""}
                  >
                    <IconButton
                      aria-label="download"
                      size="large"
                      color="primary"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.31995 11.6797L11.8799 14.2397L14.4399 11.6797"
                          stroke="#2A6DF5"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11.88 4V14.17"
                          stroke="#2A6DF5"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 12.1797C20 16.5997 17 20.1797 12 20.1797C7 20.1797 4 16.5997 4 12.1797"
                          stroke="#2A6DF5"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </IconButton>
                  </a>
                  <Box
                    sx={{
                      maxWidth: "180px",
                      direction: "rtl",
                      justifySelf: "end",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "pre",
                      }}
                    >
                      {imageName}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            <FsLightbox
              toggler={hasOpenLightBox}
              sources={[defaultImage ? defaultImage : (image as string) || ""]}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default ImageUploadBox;
