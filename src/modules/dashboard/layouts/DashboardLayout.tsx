"use client";
import Footer from "@/modules/landing/layouts/Footer";
import Header from "@/modules/landing/layouts/Header";
import ProtectedRoute from "@/modules/share/services/ProtectedRoute";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

const activeClassName = "border-l-4 border-[#8313B2] text-[#8313B2] pl-2";

const DashboardLayout = ({
  children,
  panelType,
}: {
  children: React.ReactNode;
  panelType: "admin" | "broker" | "company";
}) => {
  return (
    <ProtectedRoute allowedRoles={[panelType]}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <aside className="w-48 bg-[#97AFDE] p-4">
            {panelType === "admin" && <MenuAdmin />}
            {panelType === "broker" && <MenuBroker />}
            {panelType === "company" && <MenuCompany />}
          </aside>
          <main className="flex-1 p-10">{children}</main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;

const MenuAdmin = () => {
  const router = usePathname();
  const [showSubMenu, setShowSubMenu] = useState({
    setting: false,
    request: false,
    users: false,
  });

  const isActive = (pathname: string) => router === pathname;

  const toggleSubMenu = (menu: string) => {
    setShowSubMenu((prev: any) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <ul className="pl-8 pt-12 space-y-4 text-white">
      <li className={isActive("/dashboard/admin") ? activeClassName : ""}>
        <Link href="/dashboard/admin">Home</Link>
      </li>
      <li className="relative">
        <div
          className={`cursor-pointer ${
            isActive("/dashboard/admin/users/companies") ||
            isActive("/dashboard/admin/users/brokers")
              ? activeClassName
              : ""
          }`}
          onClick={() => toggleSubMenu("users")}
        >
          Users
        </div>
        {showSubMenu.users && (
          <ul className="pl-4 pt-2 space-y-2">
            <li
              className={
                isActive("/dashboard/admin/users/companies")
                  ? activeClassName
                  : ""
              }
            >
              <Link href="/dashboard/admin/users/companies">Companies</Link>
            </li>
            <li
              className={
                isActive("/dashboard/admin/users/brokers")
                  ? activeClassName
                  : ""
              }
            >
              <Link href="/dashboard/admin/users/brokers">Brokers</Link>
            </li>
          </ul>
        )}
      </li>
      <li className="relative">
        <div
          className={`cursor-pointer ${
            isActive("/dashboard/admin/request/cars") ||
            isActive("/dashboard/admin/request/registration")
              ? activeClassName
              : ""
          }`}
          onClick={() => toggleSubMenu("request")}
        >
          Request
        </div>
        {showSubMenu.request && (
          <ul className="pl-4 pt-2 space-y-2">
            <li
              className={
                isActive("/dashboard/admin/request/registration") ? activeClassName : ""
              }
            >
              <Link href="/dashboard/admin/request/registration">Registration</Link>
            </li>
            <li
              className={
                isActive("/dashboard/admin/request/cars")
                  ? activeClassName
                  : ""
              }
            >
              <Link href="/dashboard/admin/request/cars">Cars</Link>
            </li>
          </ul>
        )}
      </li>
      <li
        className={isActive("/dashboard/admin/messages") ? activeClassName : ""}
      >
        <Link href="/dashboard/admin/messages">Messages</Link>
      </li>
      <li
        className={
          isActive("/dashboard/admin/transaction") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/admin/transaction">Transaction</Link>
      </li>
      <li className="relative">
        <div
          className={`cursor-pointer ${
            isActive("/dashboard/admin/setting/addAccount") ||
            isActive("/dashboard/admin/setting/subscription")
              ? activeClassName
              : ""
          }`}
          onClick={() => toggleSubMenu("setting")}
        >
          Setting
        </div>
        {showSubMenu.setting && (
          <ul className="pl-4 pt-2 space-y-2">
            <li
              className={
                isActive("/dashboard/admin/setting/subscription")
                  ? activeClassName
                  : ""
              }
            >
              <Link href="/dashboard/admin/setting/subscription">
                Subscription
              </Link>
            </li>
            <li
              className={
                isActive("/dashboard/admin/setting/addAccount")
                  ? activeClassName
                  : ""
              }
            >
              <Link href="/dashboard/admin/setting/addAccount">
                Add Account
              </Link>
            </li>
          </ul>
        )}
      </li>
      <li
        className={isActive("/dashboard/admin/report") ? activeClassName : ""}
      >
        <Link href="/dashboard/admin/report">Report</Link>
      </li>
    </ul>
  );
};

const MenuBroker = () => {
  const router = usePathname();
  const isActive = (pathname: string) => router === pathname;
  return (
    <ul className="pl-8 pt-12 space-y-4 text-white">
      <li
        className={isActive("/dashboard/broker/profile") ? activeClassName : ""}
      >
        <Link href="/dashboard/broker/profile">Profile</Link>
      </li>
      <li
        className={
          isActive("/dashboard/broker/reservation") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/broker/reservation">Reservation</Link>
      </li>
      <li
        className={
          isActive("/dashboard/broker/requests") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/broker/requests">Request</Link>
      </li>
      <li
        className={
          isActive("/dashboard/broker/messages") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/broker/messages">Messages</Link>
      </li>
    </ul>
  );
};

const MenuCompany = () => {
  const router = usePathname();
  const isActive = (pathname: string) => router === pathname;
  return (
    <ul className="pl-8 pt-12 space-y-4 text-white">
      <li
        className={
          isActive("/dashboard/company/profile") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/company/profile">Profile</Link>
      </li>
      <li
        className={
          isActive("/dashboard/company/ads") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/company/ads">Ads Detail</Link>
      </li>
      <li
        className={
          isActive("/dashboard/company/reservation") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/company/reservation">Reservation</Link>
      </li>
      <li
        className={
          isActive("/dashboard/company/messages") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/company/messages">Messages</Link>
      </li>
      <li
        className={isActive("/dashboard/company/rate") ? activeClassName : ""}
      >
        <Link href="/dashboard/company/rate">Rate & Review</Link>
      </li>
      <li
        className={
          isActive("/dashboard/company/account") ? activeClassName : ""
        }
      >
        <Link href="/dashboard/company/account">Add Account</Link>
      </li>
    </ul>
  );
};
