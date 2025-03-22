"use client";
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import { Divider, IconButton, InputAdornment, TextField } from "@mui/material";
import { Edit, Instagram, LinkedIn } from "@mui/icons-material";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import EditModProfile from "@/modules/dashboard/company/components/editProfile/EditProfileCompany";

const sociaNetworksList = [
  // TODO get from api
  { id: "1", title: "facebook" },
  { id: "2", title: "instagram" },
];

const page = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [licensePreview, setLicensePreview] = useState<string>("");
  const [onEdit, setOnEdit] = useState<boolean>(false);

  const { data: geographicalCoverage } = useSWR(
    "getgeographicalCoverage",
    (url) => HttpClient.getInstance().fetcher(url)
  );

  const { data: vehicleCategories } = useSWR("getvehiclesCategoresID", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  const { data: ProfileData } = useSWR(`companies`, (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = (await HttpClient.getInstance().post(
          "/attachments",
          formData
        )) as any;

        if (response.data?.uuid	) {
          await HttpClient.getInstance().put(`/companies`, {
            company_logo_id: response.data.uuid	,
          });

          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    if (ProfileData?.company_logo_id) {
      HttpClient.getInstance()
        .get(`/attachments/${ProfileData.company_logo_id}`)
        .then((res: any) => {
          if (res?.data?.base64) {
            setLogoPreview(
              `data:${res.data.file_type};base64,${res.data.base64}`
            );
          }
        })
        .catch((error) => {
          console.error("Error loading company logo:", error);
        });
    }
  }, [ProfileData?.company_logo_id]);

  useEffect(() => {
    if (ProfileData?.trade_license_photo_id) {
      HttpClient.getInstance()
        .get(`/attachments/${ProfileData.trade_license_photo_id}`)
        .then((res: any) => {
          if (res?.data?.base64) {
            setLicensePreview(
              `data:${res.data.file_type};base64,${res.data.base64}`
            );
          }
        })
        .catch((error) => {
          console.error("Error loading license photo:", error);
        });
    }
  }, [ProfileData?.trade_license_photo_id]);

  if (ProfileData) console.log(ProfileData);

  return (
    <>
      <DashboardLayout panelType="company">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <div className="relative w-36 h-36 border rounded-3xl border-gray-300">
              {image ? (
                <img
                  src={image as string}
                  alt="Profile"
                  className="w-full rounded-3xl h-full object-cover"
                />
              ) : logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Profile"
                  className="w-full rounded-3xl h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <label className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-full p-2 cursor-pointer">
                <svg
                  className="w-4 h-4 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <h1 className="text-black text-2xl font-bold">
              {ProfileData?.company_name}
            </h1>
          </div>
          <div className="flex gap-3">
            <div className="rounded-3xl border-[#97AFDE] border-[3px] text-center p-5 max-h-[104px]">
              <h2 className="text-[#8313B2] text-2xl font-bold">
                {ProfileData?.TotalCars || 0}
              </h2>
              <p>Total Cars</p>
            </div>
            <div className="rounded-3xl border-[#97AFDE] border-[3px] text-center p-5 max-h-[104px]">
              <h2 className="text-[#8313B2] text-2xl font-bold">
                {ProfileData?.TotalReserve || 0}
              </h2>
              <p>Total Reserve</p>
            </div>
            <div className="rounded-3xl border-[#97AFDE] border-[3px] text-center p-5 max-h-[104px]">
              <h2 className="text-[#8313B2] text-2xl font-bold">
                {ProfileData?.Subscription || 0}
              </h2>
              <p>Subscription</p>
            </div>
          </div>
        </div>

        {onEdit ? (
          <EditModProfile
            profileData={ProfileData}
            onCancel={() => setOnEdit(false)}
            onSubmit={(data) => {
              setOnEdit(false);
              mutate(`companies/${1}`);
            }}
          />
        ) : (
          <>
            <div className="flex flex-col gap-5">
              <div className="bg-[#F0F2F6] py-5 px-10 rounded-lg">
                <div className="flex justify-between">
                  <h4 className="text-[#a0a0a0]">Description</h4>
                  <IconButton
                    onClick={() => setOnEdit(!onEdit)}
                    className="ml-4"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </div>
                <p className="text-[#151413]">
                </p>
              </div>
              <div className="bg-[#F0F2F6] py-5 px-10 rounded-lg">
                <div className="flex justify-end">
                  <IconButton
                    onClick={() => setOnEdit(!onEdit)}
                    className="ml-4"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </div>
                <div className="flex gap-10 items-center">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="text-[#a0a0a0]">Full Name</h4>
                      <p className="text-[#151413]">{`${ProfileData?.first_name} ${ProfileData?.last_name}`}</p>
                    </div>
                    <div>
                      <h4 className="text-[#a0a0a0]">Company Name</h4>
                      <p className="text-[#151413]">
                        {ProfileData?.company_name}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#a0a0a0]">Email Address</h4>
                      <p className="text-[#151413]">{ProfileData?.email}</p>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <div>
                        <h4 className="text-[#a0a0a0]">License Number</h4>
                        <p className="text-[#151413]">
                          {ProfileData?.trade_license_number}
                        </p>
                      </div>
                      {licensePreview && (
                        <img
                          src={licensePreview}
                          alt="license"
                          className="max-w-[200px] object-contain"
                        />
                      )}
                    </div>
                  </div>
                  <Divider
                    variant="fullWidth"
                    flexItem
                    orientation="vertical"
                    sx={{ color: "#A0A0A0" }}
                  />
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="text-[#a0a0a0]">Company Address</h4>
                      <p className="text-[#151413]">
                        {`${ProfileData?.address}, ${ProfileData?.city}`}
                        {ProfileData?.postal_code &&
                          `, P.O. Box: ${ProfileData.postal_code}`}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#a0a0a0]">Phone Number</h4>
                      <p className="text-[#151413]">{`+ ${ProfileData?.phone_number}`}</p>
                    </div>
                    <div>
                      <h4 className="text-[#a0a0a0]">Categories car</h4>
                      {ProfileData?.categories_of_vehicles_id &&
                        JSON.parse(ProfileData.categories_of_vehicles_id).map(
                          (categoryId: string) => {
                            const category = vehicleCategories?.find(
                              (c: any) => c.id === categoryId
                            );
                            return (
                              <p key={categoryId} className="text-[#151413]">
                                {category?.name || ""}
                              </p>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#F0F2F6] py-5 px-10 rounded-lg">
                <div className="flex justify-end">
                  <IconButton
                    onClick={() => setOnEdit(!onEdit)}
                    className="ml-4"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </div>
                <div className="flex gap-16 items-start">
                  <div>
                    <h4 className="text-[#a0a0a0] mb-5">Available Hours</h4>
                    {ProfileData?.working_hours && (
                      <div className="flex gap-5">
                        <div className="flex flex-col gap-5">
                          {Object.keys(
                            JSON.parse(ProfileData.working_hours)
                          ).map((day) => (
                            <h4 key={day} className="text-[#a0a0a0]">
                              {day}
                            </h4>
                          ))}
                        </div>
                        <Divider
                          variant="fullWidth"
                          flexItem
                          orientation="vertical"
                          sx={{ color: "#A0A0A0" }}
                        />
                        <div className="flex flex-col gap-5">
                          {Object.values(
                            JSON.parse(ProfileData.working_hours)
                          ).map((hours: any, index) => (
                            <p key={index} className="text-[#151413]">
                              {hours.enabled
                                ? `${hours.start} - ${hours.end}`
                                : "Closed"}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="text-[#a0a0a0] mb-5">Coverage</h4>
                      <div>
                        {ProfileData?.geographical_coverage &&
                          JSON.parse(ProfileData.geographical_coverage).map(
                            (areaId: string) => {
                              const area = geographicalCoverage?.find(
                                (g: any) => g.id === areaId
                              );
                              return (
                                <p key={areaId} className="text-[#151413]">
                                  {area?.title || areaId}
                                </p>
                              );
                            }
                          )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[#a0a0a0]">Website & social media</h4>
                      {ProfileData?.sociaNetworks &&
                        JSON.parse(ProfileData.sociaNetworks).map(
                          (networkId: string) => {
                            const network = sociaNetworksList?.find(
                              (s: any) => s.id === networkId
                            );
                            if (network?.title === "instagram") {
                              return (
                                <IconButton key={networkId} color="primary">
                                  <Instagram />
                                </IconButton>
                              );
                            } else if (network?.title === "linkedin") {
                              return (
                                <IconButton key={networkId} color="primary">
                                  <LinkedIn />
                                </IconButton>
                              );
                            }
                            return null;
                          }
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </DashboardLayout>
    </>
  );
};

export default page;
