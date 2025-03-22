"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import { Box, Divider, Grid2, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  BarElement,
  Tooltip,
} from "chart.js";
import CustomTabPanel from "@/modules/share/components/ctp/CTP";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  BarElement
);

interface IUserAd {
  id: string;
  car_title: string;
  manufacture_year: number;
  address: string;
  car_image: string;
  view: number;
  reservations_count: number;
  rating: number;
  price: number;
  status: "active" | "inactive";
  publishDate: string;
}

const mockAds: IUserAd[] = [
  {
    id: "1",
    car_title: "BMW X6 M Sport",
    manufacture_year: 2023,
    address: "Dubai Marina, Dubai",
    car_image: "/cars/bmw-x6.jpg",
    view: 1250,
    reservations_count: 85,
    rating: 4.8,
    price: 500,
    status: "active",
    publishDate: "2024-03-15",
  },
  {
    id: "2",
    car_title: "Mercedes-Benz G63 AMG",
    manufacture_year: 2024,
    address: "Sheikh Zayed Road, Dubai",
    car_image: "/cars/g63.jpg",
    view: 2100,
    reservations_count: 120,
    rating: 4.9,
    price: 1200,
    status: "active",
    publishDate: "2024-03-14",
  },
  {
    id: "3",
    car_title: "Range Rover Sport",
    manufacture_year: 2023,
    address: "Jumeirah Beach Road, Dubai",
    car_image: "/cars/range-rover.jpg",
    view: 980,
    reservations_count: 45,
    rating: 4.7,
    price: 800,
    status: "active",
    publishDate: "2024-03-13",
  },
  {
    id: "4",
    car_title: "Porsche 911 GT3",
    manufacture_year: 2024,
    address: "Downtown Dubai",
    car_image: "/cars/porsche-911.jpg",
    view: 1800,
    reservations_count: 95,
    rating: 5.0,
    price: 1500,
    status: "active",
    publishDate: "2024-03-12",
  },
];

interface IRevenueStats {
  id: string;
  title: string;
  percentage: number;
  trend: "up" | "down";
  data: number[];
  comparedTo: string;
  value: number;
  currency: string;
}

interface ITimeFilter {
  type: "day" | "week" | "month" | "year";
  label: string;
}

const mockRevenueStats: IRevenueStats[] = [
  {
    id: "1",
    title: "Weekly Revenue",
    percentage: 25,
    trend: "up",
    data: [10, 20, 15, 25, 30, 35],
    comparedTo: "last Week",
    value: 25000,
    currency: "AED",
  },
  {
    id: "2",
    title: "Weekly Reserves",
    percentage: 15,
    trend: "up",
    data: [15, 25, 20, 30, 35, 40],
    comparedTo: "last Week",
    value: 156,
    currency: "Orders",
  },
  {
    id: "3",
    title: "Weekly Activity",
    percentage: -10,
    trend: "down",
    data: [40, 35, 30, 25, 20, 15],
    comparedTo: "last Week",
    value: 1253,
    currency: "Views",
  },
];

interface IUserOverview {
  id: string;
  brokerName: string;
  vatNumber: string;
  acceptRate: number;
  subscriptionInfo: {
    type: string;
    remainingDays: number;
  };
  stats: {
    revenue: {
      monthly: number;
      currency: string;
    };
    visits: {
      monthly: number;
    };
    reservations: {
      total: number;
    };
    activityHours: number;
    subsAccounts: number;
  };
  ratings: {
    staff: number;
    comfort: number;
    wifi: number;
    valueForMoney: number;
    cleanliness: number;
    location: number;
  };
  activities: Array<{
    date: string;
    description: string;
  }>;
}

interface IUserListItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  avatarUrl?: string;
}

const mockUsersList: IUserListItem[] = [
  {
    id: "1",
    name: "Broker Name 1",
    status: "active",
    avatarUrl: "/avatars/1.jpg",
  },
];

interface IUserPersonalInfo {
  fullName: string;
  companyName: string;
  email: string;
  license: {
    number: string;
    imageUrl: string;
  };
  companyAddress: string;
  phoneNumber: string;
  categories: string[];
  workingHours: {
    [key: string]: string | "Closed";
  };
  coverageAreas: string[];
}

export const mockUserOverview: IUserOverview = {
  id: "1",
  brokerName: "Broker Name 1",
  vatNumber: "ase43857fjkdgh",
  acceptRate: 65,
  subscriptionInfo: {
    type: "3 Month Free",
    remainingDays: 123,
  },
  stats: {
    revenue: {
      monthly: 220000,
      currency: "AED",
    },
    visits: {
      monthly: 369,
    },
    reservations: {
      total: 125,
    },
    activityHours: 65,
    subsAccounts: 13,
  },
  ratings: {
    staff: 8.8,
    comfort: 8.9,
    wifi: 8.8,
    valueForMoney: 8.9,
    cleanliness: 7.0,
    location: 8.9,
  },
  activities: [
    { date: "03, Jan", description: "Buy package & join us" },
    { date: "03, Jan", description: "Completed profile" },
    { date: "10, Jan", description: "Sharing First Ad" },
    { date: "10, Jan", description: "Sharing Ad" },
    { date: "12, Feb", description: "Replied messages" },
    { date: "Today", description: "Sharing Ads" },
  ],
};

export const mockPersonalInfo: IUserPersonalInfo = {
  fullName: "Jerad Whitt",
  companyName: "Test",
  email: "Test@test.com",
  license: {
    number: "56465df654",
    imageUrl: "/testLice.jpg",
  },
  companyAddress: "P.O. Box: 52546 , Dubai",
  phoneNumber: "+ 971-2823591",
  categories: ["Luxury", "Economy"],
  workingHours: {
    Mon: "7.30 am - 8.30 pm",
    Tue: "7.30 am - 8.30 pm",
    Wed: "7.30 am - 8.30 pm",
    Thu: "7.30 am - 8.30 pm",
    Fri: "7.30 am - 8.30 pm",
    Sat: "Closed",
    Sun: "Closed",
  },
  coverageAreas: ["Dubai", "Fujairah", "Sharjah"],
};

const fetchUserAds = async (userId: string, page: number = 1) => {
  const response = await fetch(`/api/admin/users/${userId}/ads?page=${page}`);
  return response.json();
  return mockAds;
};

const fetchUserPersonalInfo = async (userId: string) => {
  const response = await fetch(`/api/admin/users/${userId}/personal-info`);
  return response.json();
  return mockPersonalInfo;
};

const fetchUserOverview = async (userId: string) => {
  const response = await fetch(`/api/admin/users/${userId}/overview`);
  return response.json();
  return mockUserOverview;
};

const fetchUsers = async () => {
  const response = await fetch('/api/admin/users');
  return response.json();
  return mockUsersList;
};

const events = [
  { date: "03, Jan", description: "Buy package & join us" },
  { date: "03, Jan", description: "Completed profile" },
  { date: "10, Jan", description: "Sharing First Ad" },
  { date: "10, Jan", description: "Sharing Ad" },
  { date: "12, Feb", description: "Replied messages" },
  { date: "Today", description: "Sharing Ads" },
];

const page = () => {
  const [value, setValue] = React.useState(0);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<IUserListItem[]>([]);
  const [userOverview, setUserOverview] = useState<IUserOverview | null>(null);
  const [personalInfo, setPersonalInfo] = useState<IUserPersonalInfo | null>(
    null
  );
  const [userAds, setUserAds] = useState<IUserAd[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadUserData(selectedUser);
    }
  }, [selectedUser]);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
      if (data.length > 0) {
        setSelectedUser(data[0].id);
      } // TODO make api
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const loadUserData = async (userId: string) => {
    setLoading(true);
    try {
      const [overview, info, ads] = await Promise.all([
        fetchUserOverview(userId),
        fetchUserPersonalInfo(userId),
        fetchUserAds(userId),
      ]);

      setUserOverview(overview);
      setPersonalInfo(info);
      setUserAds(ads);
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <DashboardLayout panelType="admin">
        <div className="flex gap-4">
          <div className="overflow-y-scroll h-[900px] flex flex-col gap-5 w-2/6">
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                isSelected={selectedUser === user.id}
                onClick={() => setSelectedUser(user.id)}
              />
            ))}
          </div>
          <div className="border border-[#A0A0A0] rounded-xl p-5 h-fit w-full">
            {loading ? (
              <div className="flex justify-center items-center h-96">
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <UserHeader userOverview={userOverview} />
                <StatsSection stats={userOverview?.stats} />
                <TabsSection
                  value={value}
                  onChange={handleChange}
                  overview={userOverview}
                  personalInfo={personalInfo}
                  ads={userAds}
                />
              </>
            )}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default page;

const UserItem = ({
  user,
  isSelected,
  onClick,
}: {
  user: IUserListItem;
  isSelected?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex cursor-pointer ${
        isSelected ? "bg-[#E5E7EB]" : "bg-[#F0F2F6]"
      } p-5 items-center rounded-xl gap-3`}
      onClick={onClick}
    >
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt="img"
          className="rounded-lg h-[35px] w-[35px] object-cover"
        />
      ) : (
        <div className="bg-[#D9D9D9] rounded-lg h-[35px] w-[35px]"></div>
      )}
      <h1>{user.name}</h1>
      <span
        className={`text-sm text-white font-medium me-2 px-2.5 py-0.5 rounded-full ${
          user.status === "active" ? "bg-[#79F6A7]" : "bg-[#FF4D4D]"
        }`}
      >
        {user.status}
      </span>
    </div>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TopBoxReview = ({ stats }: { stats: IRevenueStats }) => {
  return (
    <>
      <div className="border rounded-3xl p-5 border-[#A0A0A0] flex flex-col gap-2 max-w-[250px]">
        <span>{stats.title}</span>
        <div className="flex items-end gap-1">
          <ArrowCircleUpIcon
            color={stats.trend === "up" ? "success" : "error"}
          />
          <span
            className={
              stats.trend === "up" ? "text-[#20CF10]" : "text-[#FF4D4D]"
            }
          >
            {stats.percentage}%
          </span>
          <span className="ml-auto">
            {stats.value} {stats.currency}
          </span>
        </div>
        <LineChart datas={stats.data} trend={stats.trend} />
        <span>Compared to {stats.comparedTo}</span>
      </div>
    </>
  );
};

const LineChart = ({
  datas,
  trend,
}: {
  datas: number[];
  trend: "up" | "down";
}) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: datas,
        borderColor: "#20CF10",
        backgroundColor: "#20CF1033",
        fill: "start",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "40px", overflow: "hidden" }}>
      <Line data={data} options={options} />
    </div>
  );
};

const PersonalInfoTab = ({
  personalInfo,
}: {
  personalInfo: IUserPersonalInfo | null;
}) => {
  if (!personalInfo) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-[#F0F2F6] py-5 px-10 rounded-lg flex gap-10 items-center">
        <div className="flex flex-col gap-3">
          <InfoField label="Full Name" value={personalInfo.fullName} />
          <InfoField label="Company Name" value={personalInfo.companyName} />
          <InfoField label="Email Address" value={personalInfo.email} />
          <div className="flex justify-between items-center gap-4">
            <InfoField
              label="License Number"
              value={personalInfo.license.number}
            />
            <img
              src={personalInfo.license.imageUrl}
              alt="license"
              className="w-24 h-16 object-cover rounded"
            />
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="flex flex-col gap-3">
          <InfoField
            label="Company Address"
            value={personalInfo.companyAddress}
          />
          <InfoField label="Phone Number" value={personalInfo.phoneNumber} />
          <div>
            <h4 className="text-[#a0a0a0]">Categories car</h4>
            {personalInfo.categories.map((category, index) => (
              <p key={index} className="text-[#151413]">
                {category}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#F0F2F6] py-5 px-10 rounded-lg flex gap-16 items-start">
        <WorkingHoursSection hours={personalInfo.workingHours} />
        <CoverageSection areas={personalInfo.coverageAreas} />
      </div>
    </div>
  );
};

const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <h4 className="text-[#a0a0a0]">{label}</h4>
    <p className="text-[#151413]">{value}</p>
  </div>
);

const WorkingHoursSection = ({
  hours,
}: {
  hours: { [key: string]: string | "Closed" };
}) => (
  <div>
    <h4 className="text-[#a0a0a0] mb-5">Available Hours</h4>
    <div className="flex gap-5">
      <div className="flex flex-col gap-5">
        {Object.keys(hours).map((day) => (
          <h4 key={day} className="text-[#a0a0a0]">
            {day}
          </h4>
        ))}
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex flex-col gap-5">
        {Object.values(hours).map((time, index) => (
          <p key={index} className="text-[#151413]">
            {time}
          </p>
        ))}
      </div>
    </div>
  </div>
);

const CoverageSection = ({ areas }: { areas: string[] }) => (
  <div className="flex flex-col gap-3">
    <h4 className="text-[#a0a0a0] mb-5">Coverage</h4>
    <div>
      {areas.map((area, index) => (
        <p key={index} className="text-[#151413]">
          {area}
        </p>
      ))}
    </div>
  </div>
);

const AdsTab = ({ ads }: { ads: IUserAd[] }) => (
  <Grid2 container rowSpacing={3} columnSpacing={2}>
    {ads.map((ad, i) => (
      <Grid2 key={i} xs={6}>
        <AdItem data={ad} />
      </Grid2>
    ))}
  </Grid2>
);

const AdItem = ({ data }: any) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-3xl shadow-sm">
      <a href="#" className="block w-full">
        <img className="rounded-t-3xl w-full" src={data.car_image} alt="Img" />
      </a>
      <div className="p-7">
        <a href="#" className="flex items-center gap-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {data.car_title}
          </h5>
          <span>{data.manufacture_year}</span>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {data.address}
        </p>
        <Divider />
        <div className="flex items-center justify-between gap-5">
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">View</h6>
            <h6 className="text-[20px]">{data.view}</h6>
          </div>
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">Reserve</h6>
            <h6 className="text-[20px]">{data.reservations_count}</h6>
          </div>
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">Rate</h6>
            <h6 className="text-[20px]">{data.rating}</h6>
          </div>
        </div>
      </div>
      <a
        href="#" // TODO show car in landing
        className="inline-flex items-center justify-center w-full px-3 py-7 text-[16px] text-center text-white bg-[#8313B2] rounded-b-3xl hover:bg-[#9b4bbd] focus:ring-4 focus:outline-none"
      >
        See Details
      </a>
    </div>
  );
};

const UserHeader = ({
  userOverview,
}: {
  userOverview: IUserOverview | null;
}) => {
  if (!userOverview) return null;

  return (
    <div className="flex justify-between mb-5">
      <div className="flex gap-3">
        <div className="flex gap-2 justify-center">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-bold">{userOverview.brokerName}</h1>
            <span className="text-[#A0A0A0]">
              VAT: {userOverview.vatNumber}
            </span>
            <span>Accept Rate {userOverview.acceptRate}%</span>
          </div>
          <svg
            className="w-8 h-8 text-[#47a76a]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-[#A0A0A0]">
            ({userOverview.subscriptionInfo.type})
          </span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-right">
          <img src="/phonePC.png" alt="phone" className="inline-block" />
        </div>
        <span className="text-[#A0A0A0]">Remaining Credit:</span>
        <span>{userOverview.subscriptionInfo.remainingDays} Days</span>
      </div>
    </div>
  );
};

const StatsSection = ({
  stats,
}: {
  stats: IUserOverview["stats"] | undefined;
}) => {
  if (!stats) return null;

  return (
    <div className="flex flex-wrap gap-5 my-5">
      <StatBox
        icon="/money.png"
        value={stats.revenue.monthly.toString()}
        label="Revenue monthly"
        subLabel={stats.revenue.currency}
      />
      <StatBox
        icon="/users.png"
        value={stats.visits.monthly.toString()}
        label="Visit"
        subLabel="Monthly"
      />
      <StatBox
        icon="/booking.png"
        value={stats.reservations.total.toString()}
        label="Reserve"
        subLabel="Total"
      />
      <StatBox
        icon="/target.png"
        value={stats.activityHours.toString()}
        label="Activity"
        subLabel="Hours"
      />
      <StatBox
        icon="/subs.png"
        value={stats.subsAccounts.toString()}
        label="Subs"
        subLabel="Account"
      />
    </div>
  );
};

const StatBox = ({
  icon,
  value,
  label,
  subLabel,
}: {
  icon: string;
  value: string;
  label: string;
  subLabel: string;
}) => (
  <div className="border border-[#A0A0A0] rounded-xl px-3 p-3">
    <div className="flex gap-4">
      <img src={icon} alt={label.toLowerCase()} />
      <h1>{value}</h1>
    </div>
    <div className="flex gap-4">
      <span className="text-[#A0A0A0]">{subLabel}</span>
      <span className="text-[#A0A0A0]">{label}</span>
    </div>
  </div>
);

const TabsSection = ({
  value,
  onChange,
  overview,
  personalInfo,
  ads,
}: {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  overview: IUserOverview | null;
  personalInfo: IUserPersonalInfo | null;
  ads: IUserAd[];
}) => {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={onChange}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#8313B2",
            },
          }}
        >
          <Tab
            label="Overview"
            {...a11yProps(0)}
            sx={{
              "&.Mui-selected": {
                color: "#8313B2",
              },
            }}
          />
          <Tab
            label="Personal Info"
            {...a11yProps(1)}
            sx={{
              "&.Mui-selected": {
                color: "#8313B2",
              },
            }}
          />
          <Tab
            label="Ads"
            {...a11yProps(2)}
            sx={{
              "&.Mui-selected": {
                color: "#8313B2",
              },
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OverviewContent overview={overview} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PersonalInfoTab personalInfo={personalInfo} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AdsTab ads={ads} />
      </CustomTabPanel>
    </>
  );
};

const OverviewContent = ({ overview }: { overview: IUserOverview | null }) => {
  if (!overview) return null;
  const calculateWidth = (value: number) => `${(value / 10) * 100}%`;
  const [selectedPeriod, setSelectedPeriod] = useState<
    "day" | "week" | "month" | "year"
  >("week");
  const [revenueStats, setRevenueStats] =
    useState<IRevenueStats[]>(mockRevenueStats);

  const fetchRevenueStats = async (
    period: "day" | "week" | "month" | "year"
  ) => {
    const response = await fetch(`/api/admin/users/${overview?.id}/revenue-stats?period=${period}`);
    const data = await response.json();
    return mockRevenueStats;
  };

  useEffect(() => {
    if (overview) {
      fetchRevenueStats(selectedPeriod).then(setRevenueStats);
    }
  }, [selectedPeriod, overview]);

  const timeFilters: ITimeFilter[] = [
    { type: "day", label: "Day" },
    { type: "week", label: "Week" },
    { type: "month", label: "Month" },
    { type: "year", label: "Year" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-end gap-4 items-center mb-5">
        {timeFilters.map((filter) => (
          <a
            key={filter.type}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedPeriod(filter.type);
            }}
            className={`${
              selectedPeriod === filter.type
                ? "bg-[#97AFDE] text-white"
                : "text-gray-600"
            } rounded-xl p-3 px-4`}
          >
            {filter.label}
          </a>
        ))}
      </div>
      <Grid2
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent={"center"}
      >
        {revenueStats.map((stats) => (
          <Grid2 key={stats.id} size={3}>
            <TopBoxReview stats={stats} />
          </Grid2>
        ))}
      </Grid2>

      <div className="flex justify-around">
        <div className="bg-white border rounded-xl">
          <div className="border-b-2 p-4 pb-1">
            <h2 className="text-xl font-bold mb-4">Activity</h2>
          </div>
          <div className="relative p-4">
            {overview.activities.map((activity, index) => (
              <div key={index} className="flex items-start">
                <span className="text-gray-500 text-sm mb-2 w-[80px]">
                  {activity.date}
                </span>
                <div className="flex flex-col items-center mr-4">
                  <div className="w-4 h-4 bg-white border-2 border-[#8313B2] rounded-full"></div>
                  {index < overview.activities.length - 1 && (
                    <div className="w-px h-10 bg-gray-300"></div>
                  )}
                </div>
                <div className="mt-1">
                  <div className="text-gray-800 font-medium">
                    {activity.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-1/2">
          <div className="flex items-center mb-1">
            <p>Rating</p>
          </div>
          <div className="gap-8 sm:grid sm:grid-cols-2">
            <div>
              <dl>
                <dt className="text-sm font-medium text-gray-500">Staff</dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded-3xl h-2.5 me-2">
                    <div
                      className="bg-[#97AFDE] h-2.5 rounded-3xl"
                      style={{ width: calculateWidth(overview.ratings.staff) }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {overview.ratings.staff}
                  </span>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500">Comfort</dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded-3xl h-2.5 me-2">
                    <div
                      className="bg-[#97AFDE] h-2.5 rounded-3xl"
                      style={{
                        width: calculateWidth(overview.ratings.comfort),
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {overview.ratings.comfort}
                  </span>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500">Free WiFi</dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded-3xl h-2.5 me-2">
                    <div
                      className="bg-[#97AFDE] h-2.5 rounded-3xl"
                      style={{ width: calculateWidth(overview.ratings.wifi) }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {overview.ratings.wifi}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt className="text-sm font-medium text-gray-500">
                  Value for money
                </dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded-3xl h-2.5 me-2">
                    <div
                      className="bg-[#97AFDE] h-2.5 rounded-3xl"
                      style={{
                        width: calculateWidth(overview.ratings.valueForMoney),
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {overview.ratings.valueForMoney}
                  </span>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500">
                  Cleanliness
                </dt>
                <dd className="flex items-center mb-3">
                  <div className="w-full bg-gray-200 rounded-3xl h-2.5 me-2">
                    <div
                      className="bg-[#97AFDE] h-2.5 rounded-3xl"
                      style={{
                        width: calculateWidth(overview.ratings.cleanliness),
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {overview.ratings.cleanliness}
                  </span>
                </dd>
              </dl>
              <dl>
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-3xl h-2.5 me-2">
                    <div
                      className="bg-[#97AFDE] h-2.5 rounded-3xl"
                      style={{
                        width: calculateWidth(overview.ratings.location),
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {overview.ratings.location}
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
