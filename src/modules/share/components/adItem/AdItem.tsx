import { Divider } from "@mui/material";

export default function AdItem() {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-3xl shadow-sm">
      <a href="#" className="block w-full">
        <img className="rounded-t-3xl w-full" src="/testAd.jpg" alt="Img" />
      </a>
      <div className="p-7">
        <a href="#" className="flex items-center gap-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Range Rover Vogue V6
          </h5>
          <span>2023</span>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          1 Street 8A, Za'abeel 2, Dubai, ARE
        </p>
        <Divider />
        <div className="flex items-center justify-between gap-5">
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">View</h6>
            <h6 className="text-[20px]">56</h6>
          </div>
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">Reserve</h6>
            <h6 className="text-[20px]">34</h6>
          </div>
          <div className="text-center">
            <h6 className="text-[#928B83] text-[14px]">Rate</h6>
            <h6 className="text-[20px]">4.5</h6>
          </div>
        </div>
      </div>
      <a
        href="#"
        className="inline-flex items-center justify-center w-full px-3 py-7 text-[16px] text-center text-white bg-[#8313B2] rounded-b-3xl hover:bg-[#9b4bbd] focus:ring-4 focus:outline-none"
      >
        See Details
      </a>
    </div>
  );
}
