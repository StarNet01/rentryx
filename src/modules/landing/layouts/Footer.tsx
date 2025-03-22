"use client";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#97AFDE] text-white">
      <div className="flex justify-between p-5 px-16">
        <div className="flex">
          <div className="mr-16 flex flex-col gap-3">
            <h6 className="font-bold">Download App</h6>
            <a href="#">
              <Image
                src="/AppStore.png"
                alt={"app store"}
                width={100}
                height={36}
              />
            </a>
            <a href="#">
              <Image
                src="/googlePlay.jpg"
                alt={"google play"}
                width={100}
                height={36}
              />
            </a>
          </div>
          <div>
            <ul className="space-y-2">
              <li>
                <a href="/aboutUs">About Us</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                <a href="">Terms of Use</a>
              </li>
              <li>
                <a href="">Terms & Condition</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <Image src="/testMap.jpg" alt={"Loc"} width={253} height={139} />
        </div>
      </div>
      <div className="border border-solid border-[#fff] text-center p-2">
        <p>Develop & Design By Techblend Studio | © 2025 all rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
