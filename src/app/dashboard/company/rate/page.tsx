"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { Divider, Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const page = () => {
  const { data: rateList, isLoading } = useSWR("CompanyRate", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  if (isLoading) return <></>;

  return (
    <div>
      <DashboardLayout panelType="company">
        <div className="flex gap-2 items-center">
          <h1 className="font-bold text-2xl">
            {rateList && rateList?.average}
          </h1>
          <StarShow value={rateList && rateList?.average} />
          <span>{rateList && rateList?.count} Review</span>
        </div>
        <div>
          {rateList &&
            rateList.list((item: any, i: number) => {
              return <ReviewItem data={item} key={i} />;
            })}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default page;

const ReviewItem = ({ data }: any) => {
  return (
    <>
      <div className="flex xl:gap-20 lg:gap-10 md:gap-15 items-center justify-between mb-8">
        <div>
          <div className="flex gap-2 items-end mb-3">
            <Image
              src={data.vehicle_image}
              alt="img"
              width={102}
              height={87}
              className="rounded-lg"
            />
            <h3 className="text-[24px] font-bold">{data.vehicle_name}</h3>
            <h3>{data.vehicle_year}</h3>
          </div>
          <Divider />
          <div className="flex gap-2 items-center mt-3">
            <div>
              <Image
                src={data.user_image}
                alt="img"
                width={48}
                height={48}
                className="rounded-full mb-2"
              />
              <span>{data.user_full_name}</span>

              <div className="mt-3">
                <Rating name="disabled" value={data.rate} disabled />
              </div>
            </div>
            <p>{data.text}</p>
          </div>
        </div>
        <div className="xl:min-w-[500px] md:min-w-[300px] min-w-[200px]">
          <div>
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Value for price
              </dt>
              <dd className="flex items-center mb-3">
                <div className="w-full bg-[#D9D9D9] rounded-lg h-2.5 me-2">
                  <div
                    className="bg-[#79F6A7] h-2.5 rounded-lg"
                    style={{
                      width: convertToPercentage(data.rateItem.value_for_price),
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {data.rateItem.value_for_price}
                </span>
              </dd>
            </dl>
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Easy to find
              </dt>
              <dd className="flex items-center mb-3">
                <div className="w-full bg-[#D9D9D9] rounded-lg h-2.5 me-2">
                  <div
                    className="bg-[#79F6A7] h-2.5 rounded-lg"
                    style={{
                      width: convertToPercentage(data.rateItem.easy_to_find),
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {data.rateItem.easy_to_find}
                </span>
              </dd>
            </dl>
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Car cleanliness
              </dt>
              <dd className="flex items-center mb-3">
                <div className="w-full bg-[#D9D9D9] rounded-lg h-2.5 me-2">
                  <div
                    className="bg-[#79F6A7] h-2.5 rounded-lg"
                    style={{
                      width: convertToPercentage(data.rateItem.car_cleanliness),
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {data.rateItem.car_cleanliness}
                </span>
              </dd>
            </dl>
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Helpfulness
              </dt>
              <dd className="flex items-center">
                <div className="w-full bg-[#D9D9D9] rounded-lg h-2.5 me-2">
                  <div
                    className="bg-[#79F6A7] h-2.5 rounded-lg"
                    style={{
                      width: convertToPercentage(data.rateItem.helpfulness),
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {data.rateItem.helpfulness}
                </span>
              </dd>
            </dl>
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Car condition
              </dt>
              <dd className="flex items-center">
                <div className="w-full bg-[#D9D9D9] rounded-lg h-2.5 me-2">
                  <div
                    className="bg-[#79F6A7] h-2.5 rounded-lg"
                    style={{
                      width: convertToPercentage(data.rateItem.car_condition),
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {data.rateItem.car_condition}
                </span>
              </dd>
            </dl>
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Quick Response
              </dt>
              <dd className="flex items-center">
                <div className="w-full bg-[#D9D9D9] rounded-lg h-2.5 me-2">
                  <div
                    className="bg-[#79F6A7] h-2.5 rounded-lg"
                    style={{
                      width: convertToPercentage(data.rateItem.quick_response),
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {data.rateItem.quick_response}
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <Divider sx={{ mb: 5 }} />
    </>
  );
};

const StarShow = ({ value }: any) => {
  if (value <= 4.9999 && value >= 1) {
    return (
      <svg
        className="w-6 h-6 text-[#E4BF41]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M13 4.024v-.005c0-.053.002-.353-.217-.632a1.013 1.013 0 0 0-1.176-.315c-.192.076-.315.193-.35.225-.052.05-.094.1-.122.134a4.358 4.358 0 0 0-.31.457c-.207.343-.484.84-.773 1.375a168.719 168.719 0 0 0-1.606 3.074h-.002l-4.599.367c-1.775.14-2.495 2.339-1.143 3.488L6.17 15.14l-1.06 4.406c-.412 1.72 1.472 3.078 2.992 2.157l3.94-2.388c.592-.359.958-.996.958-1.692v-13.6Zm-2.002 0v.025-.025Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  if (value === 5)
    return (
      <svg
        className="w-6 h-6 text-[#E4BF41]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
      </svg>
    );
  if (value < 1)
    return (
      <svg
        className="w-6 h-6 text-[#E4BF41]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
        />
      </svg>
    );
};

function convertToPercentage(value: number) {
  if (value < 0 || value > 5) {
    throw new Error("number bet 0 to 5");
  }
  return ((value / 5) * 100).toString() + "%";
}
