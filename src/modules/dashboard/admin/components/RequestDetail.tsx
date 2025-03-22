"use client";
import { TopBoxReview } from "@/modules/dashboard/admin/components/TopBoxReview";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { Instagram, LinkedIn } from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  Divider,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import toast from "react-hot-toast";

const RequestDetail = ({ data, close }: any) => {
  const formatWorkingHours = (hours: {
    enabled: boolean;
    start: string;
    end: string;
  }) => {
    if (!hours.enabled) return "Closed";
    return `${hours.start} - ${hours.end}`;
  };

  if (!data) return <></>;

  const accept = () => {
    HttpClient.getInstance()
      .post(`request/registration/accept/${data.id}`)
      .then(() => {
        toast.success("Request Accepted Successfully");
        close();
      })
      .catch(() => {
        toast.error("error");
      });
  };
  const reject = () => {
    HttpClient.getInstance()
      .post(`request/registration/reject/${data.id}`)
      .then(() => {
        toast.success("Request Rejected Successfully");
      })
      .catch(() => {
        toast.error("error");
      });
  };

  return (
    <>
      <Container className="mb-10">
        <div className="flex justify-end">
          <IconButton
            onClick={() => {
              close();
            }}
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.7756 39.4762C41.9266 39.6272 42.0463 39.8064 42.128 40.0037C42.2098 40.201 42.2518 40.4124 42.2518 40.6259C42.2518 40.8394 42.2098 41.0508 42.128 41.2481C42.0463 41.4454 41.9266 41.6246 41.7756 41.7756C41.6246 41.9266 41.4454 42.0463 41.2481 42.128C41.0508 42.2098 40.8394 42.2518 40.6259 42.2518C40.4124 42.2518 40.201 42.2098 40.0037 42.128C39.8064 42.0463 39.6272 41.9266 39.4762 41.7756L26.0009 28.2982L12.5256 41.7756C12.2207 42.0805 11.8071 42.2518 11.3759 42.2518C10.9447 42.2518 10.5311 42.0805 10.2262 41.7756C9.9213 41.4707 9.75 41.0571 9.75 40.6259C9.75 40.1947 9.9213 39.7811 10.2262 39.4762L23.7036 26.0009L10.2262 12.5256C9.9213 12.2207 9.75 11.8071 9.75 11.3759C9.75 10.9447 9.9213 10.5311 10.2262 10.2262C10.5311 9.9213 10.9447 9.75 11.3759 9.75C11.8071 9.75 12.2207 9.9213 12.5256 10.2262L26.0009 23.7036L39.4762 10.2262C39.7811 9.9213 40.1947 9.75 40.6259 9.75C41.0571 9.75 41.4707 9.9213 41.7756 10.2262C42.0805 10.5311 42.2518 10.9447 42.2518 11.3759C42.2518 11.8071 42.0805 12.2207 41.7756 12.5256L28.2982 26.0009L41.7756 39.4762Z"
                fill="#0D0D0D"
              />
            </svg>
          </IconButton>
        </div>
        <div className="flex justify-between items-center px-10">
          <div className="flex items-center gap-4">
            <Image
              src={data.logo}
              alt={data.companyName}
              width={145}
              height={145}
              priority
            />
            <h1 className="text-black text-3xl font-bold">
              {data.companyName}
            </h1>
          </div>
          <div className="flex gap-3 min-h-fit">
            <Button variant="contained" color="error" onClick={() => reject()}>
              Reject
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => accept()}
            >
              Accept
            </Button>
          </div>
        </div>
        <Divider sx={{ mt: 5, mb: 3 }} />
        <div>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={8}>
              <div className="flex justify-between">
                <div>
                  <h1 className="text-[#A0A0A0]">First Name:</h1>
                  <h2>{data.firstName}</h2>
                </div>
                <div>
                  <h1 className="text-[#A0A0A0]">Last Name:</h1>
                  <h2>{data.lastName}</h2>
                </div>
              </div>
              <div className="flex justify-between mt-24">
                <div>
                  <h1 className="text-[#A0A0A0]">Email Address:</h1>
                  <h2>{data.email}</h2>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h4 className="text-[#a0a0a0]">License Number</h4>
                    <p className="text-[#151413]">{data.tradeLicenseNumber}</p>
                  </div>
                  <img src={data.companyLicenseImageID} alt="license" />
                </div>
              </div>
              <div className="flex justify-between mt-24">
                <div>
                  <h1 className="text-[#A0A0A0]">Address:</h1>
                  <h2>{`${data.companyAddress}, ${data.companyCity}`}</h2>
                </div>
                <div>
                  <h1 className="text-[#A0A0A0]">Postal Code:</h1>
                  <h2>{data.companyPostalCode}</h2>
                </div>
              </div>
              <div className="flex justify-between mt-24">
                <div>
                  <h1 className="text-[#A0A0A0]">Phone Number:</h1>
                  <h2>{data.phoneNumber}</h2>
                </div>
                <div>
                  <h1 className="text-[#A0A0A0]">Website & social media:</h1>
                  <div className="flex gap-4">
                    {data.socialNetworks &&
                      data.socialNetworks.map((social: any, index: number) => (
                        <IconButton
                          key={index}
                          color="primary"
                          href={social.url}
                          target="_blank"
                        >
                          {social.type === "instagram" ? (
                            <Instagram />
                          ) : (
                            <LinkedIn />
                          )}
                        </IconButton>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-24">
                <div>
                  <div>
                    <h1 className="text-[#A0A0A0]">vehicles in the fleet:</h1>
                    <Typography variant="body1" component="span">
                      {data.numberOfCars}
                    </Typography>
                  </div>
                  <div className="flex gap-3">
                    {data.vehicleCategories &&
                      data.vehicleCategories.map(
                        (category: any, index: any) => (
                          <Chip key={index} label={category} color="primary" />
                        )
                      )}
                  </div>
                </div>
                <div>
                  <h1 className="text-[#A0A0A0]">VAT Registration:</h1>
                  <h2>{data.vatNumber}</h2>
                </div>
              </div>
            </Grid2>
            <Grid2 size={4}>
              <h4 className="text-[#a0a0a0] mb-5">Available Hours</h4>
              <div className="py-5 px-10 rounded-lg flex gap-16 items-start border border-[#928B83]">
                <div>
                  <div className="flex gap-5 ">
                    <div className="flex flex-col gap-5">
                      <h4 className="text-[#a0a0a0]">Mon</h4>
                      <h4 className="text-[#a0a0a0]">Tue</h4>
                      <h4 className="text-[#a0a0a0]">Wed</h4>
                      <h4 className="text-[#a0a0a0]">Thu</h4>
                      <h4 className="text-[#a0a0a0]">Fri</h4>
                      <h4 className="text-[#a0a0a0]">Sat</h4>
                      <h4 className="text-[#a0a0a0]">Sun</h4>
                    </div>
                    <Divider
                      variant="fullWidth"
                      flexItem
                      orientation="vertical"
                      sx={{ color: "#A0A0A0" }}
                    />
                    <div className="flex flex-col gap-5">
                      {data.workingHours &&
                        Object.entries(data.workingHours).map(
                          ([day, hours]) => (
                            <div key={day} className="flex flex-col gap-5">
                              <p className="text-[#151413]">
                                {formatWorkingHours(hours as any)}
                              </p>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="text-[#a0a0a0] mb-5">Geographical Coverage</h4>
                <div className="py-5 pl-5 pr-10 rounded-lg flex flex-col gap-5 items-start border border-[#928B83] w-fit">
                  {data.geographicalCoverage &&
                    data.geographicalCoverage.map((area: any, index: any) => (
                      <p key={index} className="text-[#151413]">
                        {area}
                      </p>
                    ))}
                </div>
              </div>
            </Grid2>
          </Grid2>
        </div>
        <div>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={8}>
              <div className="bg-[#F1F2F3] border rounded-3xl p-10 border-[#A0A0A0] flex flex-col gap-2 mt-16">
                <h1 className="text-[#97AFDE] text-[28px]">{`${data.package} Package`}</h1>
                <Divider />
                <div className="flex gap-3">
                  <svg
                    className="w-6 h-6 text-[#8313B2]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2>Up to 20 Cars (Per Months)</h2>
                </div>
                <div className="flex gap-3">
                  <svg
                    className="w-6 h-6 text-[#8313B2]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2>Highlighted Listing for Better Visibility</h2>
                </div>
                <div className="flex gap-3">
                  <svg
                    className="w-6 h-6 text-[#8313B2]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h2>Access to Detailed Analytics & Priority Support</h2>
                </div>
                <div className="flex justify-end">
                  <h1 className="text-[#A0A0A0]">Buy: </h1>
                  <span>{data.paymentDate}</span>
                </div>
              </div>
            </Grid2>
            <Grid2 size={4}>
              <div className="bg-[#F1F2F3] border rounded-3xl p-10 border-[#A0A0A0] flex flex-col gap-2 mt-16">
                <h1 className="text-[#97AFDE] text-[28px] text-center">
                  Payment
                </h1>
                <Divider />
                <div className="flex justify-between mt-3">
                  <h2>Date.Time</h2>
                  <h2>{`${data.paymentDate} ${data.paymentTime}`}</h2>
                </div>
                <div className="flex justify-between mt-3">
                  <h2>Card.number</h2>
                  <h2>{data.cardNumber}</h2>
                </div>
                <div className="flex justify-between mt-3">
                  <h2>Cost</h2>
                  <h2>{`AED ${
                    data.packageCost && data.packageCost.toLocaleString()
                  }`}</h2>
                </div>
              </div>
            </Grid2>
          </Grid2>
        </div>
      </Container>
    </>
  );
};

export default RequestDetail;
