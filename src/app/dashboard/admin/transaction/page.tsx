"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import useSWR from "swr";

const page = () => {
  const { data: BrokerTransaction } = useSWR("broker_transactions", (url) =>
    HttpClient.getInstance().fetcher(url)
  );
  const { data: CompanyTransaction } = useSWR("company_transactions", (url) =>
    HttpClient.getInstance().fetcher(url)
  );
  const { data: paymentList } = useSWR("payment_list", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  return (
    <DashboardLayout panelType="admin">
      <div className="flex items-center gap-10">
        <h1>Broker Packages</h1>
        {BrokerTransaction &&
          BrokerTransaction.map((item: any, i: number) => {
            return (
              <SemiCircularProgressBar
                key={i}
                percentage={item.percentage.toString().replace("%", "")}
                label={item.title}
              />
            );
          })}
      </div>
      <div className="flex items-center gap-10 my-7">
        <h1>Company Packages</h1>
        {CompanyTransaction &&
          CompanyTransaction.map((item: any, i: number) => {
            return (
              <SemiCircularProgressBar
                key={i}
                percentage={item.percentage.toString().replace("%", "")}
                label={item.title}
              />
            );
          })}
      </div>

      <h1 className="font-bold text-2xl">Payment List</h1>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
            <tr className="bg-white border-b  border-[#A0A0A0]">
              <th scope="col" className="px-6 py-3">
                circuit
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Bank
              </th>
              <th scope="col" className="px-6 py-3">
                Card Number
              </th>
              <th scope="col" className="px-6 py-3">
                Name in Card
              </th>
              <th scope="col" className="px-6 py-3">
                Subscriber
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentList &&
              paymentList.map((item: any, i: number) => (
                <RowItem key={i} data={item} />
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default page;

const SemiCircularProgressBar = ({ percentage, label }: any) => {
  const radius = 45;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="overflow-visible">
        <path
          d={`
            M ${stroke / 2} ${radius}
            A ${normalizedRadius} ${normalizedRadius} 0 1 1 ${
            radius * 2 - stroke / 2
          } ${radius}
          `}
          fill="transparent"
          stroke="#D1D5DB"
          strokeWidth={2}
          strokeDasharray="3 8"
          strokeDashoffset="0"
          strokeLinecap="round"
        />
        <path
          d={`
            M ${stroke / 2} ${radius}
            A ${normalizedRadius} ${normalizedRadius} 0 1 1 ${
            radius * 2 - stroke / 2
          } ${radius}
          `}
          fill="transparent"
          stroke="#79F6A7"
          strokeWidth={stroke}
          strokeDasharray={`${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute top-5 text-xl font-bold text-black">
        {percentage}%
      </div>
      <div className="absolute top-16 text-sm">{label}</div>
    </div>
  );
};

const RowItem = ({ data }: any) => {
  return (
    <>
      <tr className="bg-white border-b-2  border-[#A0A0A0]">
        <td className="px-6 py-4">
          {data.circuir}
          {/* <img src="/visa.png" alt="icon" /> */}
        </td>
        <td className="px-6 py-4">{data.date}</td>
        <td className="px-6 py-4">{data.bank}</td>
        <td className="px-6 py-4">{data.card_number}</td>
        <td className="px-6 py-4">{data.name_in_card}</td>
        <td className="px-6 py-4">{data.subscriber}</td>
        <td className="px-6 py-4">
          {data.price}
          {/* 200 <span className="text-[#928B83]">AED</span> */}
        </td>
      </tr>
    </>
  );
};
