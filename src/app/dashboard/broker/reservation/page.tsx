"use client";
import Swal from "sweetalert2";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const reservations = [
  {
    id: "1",
    requestDate: "02/12/2025",
    brokerName: "Dave Watson",
    carModel: "Mercedes G-Class",
    carType: "Supercar",
    pickupDate: "01, feb, 2025",
    dropoffDate: "21, mar, 2025",
    totalDays: 63,
    user_id: 3,
  },
];

const page = () => {
  const {
    data: reservations,
    error,
    isLoading,
  } = useSWR("broker/reservations", (url) =>
    HttpClient.getInstance().fetcher(url)
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>; // TODO for dev

  return (
    <DashboardLayout panelType="broker">
      <h1 className="font-bold text-2xl">Reserve listing</h1>

      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
            <tr className="bg-white border-b  border-[#A0A0A0]">
              <th scope="col" className="px-6 py-3">
                Request Date
              </th>
              <th scope="col" className="px-6 py-3">
                Broker
              </th>
              <th scope="col" className="px-6 py-3">
                Car model
              </th>
              <th scope="col" className="px-6 py-3">
                Car type
              </th>
              <th scope="col" className="px-6 py-3">
                Pickup date
              </th>
              <th scope="col" className="px-6 py-3">
                Drop off date
              </th>
              <th scope="col" className="px-6 py-3">
                Total Days
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {reservations &&
              reservations?.map((reservation: any, i: number) => (
                <RowItem key={i} reservation={reservation} />
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default page;

const RowItem = ({ reservation, mutate }: any) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;
    setIsDeleting(true);
    HttpClient.getInstance()
      .delete(`broker/reservations/${reservation.id}`)
      .then(() => {
        mutate("broker/reservations");
        toast.success("deleted successfully");
      })
      .finally(() => {
        setIsDeleting(false);
      })
      .catch(() => {
        console.error("Failed to delete reservation:");
      });
  };

  const handleMakeChat = () => {
    setIsDeleting(true);
    HttpClient.getInstance()
      .post(`create_chat`, {
        withUserID: reservation.user_id,
      })
      .then((response: any) => {
        const chatId = response.data.chat_id;
        router.push(`/dashboard/broker/messages?selected=${chatId}`);
      })
      .catch(() => {
        toast.error("cant create chat");
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <>
      <tr className="bg-white border-b-2  border-[#A0A0A0]">
        <td className="px-6 py-4">{reservation.requestDate}</td>
        <td className="px-6 py-4">{reservation.brokerName}</td>
        <td className="px-6 py-4">{reservation.carModel}</td>
        <td className="px-6 py-4">{reservation.carType}</td>
        <td className="px-6 py-4">{reservation.pickupDate}</td>
        <td className="px-6 py-4">{reservation.dropoffDate}</td>
        <td className="px-6 py-4">{reservation.totalDays} Days</td>
        <td className="px-6 py-4 flex gap-3">
          <button
            onClick={() => handleDelete()}
            disabled={isDeleting}
            className="disabled:opacity-50"
          >
            <svg
              className="w-6 h-6 text-[#EB5858]"
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
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
          <button
            onClick={() => handleMakeChat()}
            disabled={isDeleting}
            className="disabled:opacity-50"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.125 9.99991C11.125 10.2224 11.059 10.4399 10.9354 10.6249C10.8118 10.8099 10.6361 10.9541 10.4305 11.0393C10.225 11.1244 9.99875 11.1467 9.78052 11.1033C9.56229 11.0599 9.36184 10.9527 9.2045 10.7954C9.04717 10.6381 8.94002 10.4376 8.89662 10.2194C8.85321 10.0012 8.87549 9.77495 8.96064 9.56939C9.04578 9.36382 9.18998 9.18812 9.37498 9.0645C9.55999 8.94089 9.7775 8.87491 10 8.87491C10.2984 8.87491 10.5845 8.99343 10.7955 9.20441C11.0065 9.41539 11.125 9.70154 11.125 9.99991ZM5.875 8.87491C5.6525 8.87491 5.43499 8.94089 5.24998 9.0645C5.06498 9.18812 4.92078 9.36382 4.83564 9.56939C4.75049 9.77495 4.72821 10.0012 4.77162 10.2194C4.81502 10.4376 4.92217 10.6381 5.0795 10.7954C5.23684 10.9527 5.43729 11.0599 5.65552 11.1033C5.87375 11.1467 6.09995 11.1244 6.30552 11.0393C6.51109 10.9541 6.68679 10.8099 6.8104 10.6249C6.93402 10.4399 7 10.2224 7 9.99991C7 9.70154 6.88147 9.41539 6.6705 9.20441C6.45952 8.99343 6.17337 8.87491 5.875 8.87491ZM14.125 8.87491C13.9025 8.87491 13.685 8.94089 13.5 9.0645C13.315 9.18812 13.1708 9.36382 13.0856 9.56939C13.0005 9.77495 12.9782 10.0012 13.0216 10.2194C13.065 10.4376 13.1722 10.6381 13.3295 10.7954C13.4868 10.9527 13.6873 11.0599 13.9055 11.1033C14.1238 11.1467 14.35 11.1244 14.5555 11.0393C14.7611 10.9541 14.9368 10.8099 15.0604 10.6249C15.184 10.4399 15.25 10.2224 15.25 9.99991C15.25 9.70154 15.1315 9.41539 14.9205 9.20441C14.7095 8.99343 14.4234 8.87491 14.125 8.87491ZM19.75 9.99991C19.7504 11.6832 19.3149 13.338 18.486 14.803C17.6572 16.2681 16.4631 17.4937 15.02 18.3604C13.577 19.2271 11.9341 19.7054 10.2514 19.7488C8.56863 19.7922 6.9033 19.3992 5.4175 18.608L2.22531 19.6721C1.96102 19.7602 1.6774 19.773 1.40624 19.709C1.13509 19.645 0.887113 19.5068 0.69011 19.3098C0.493108 19.1128 0.354864 18.8648 0.290873 18.5937C0.226882 18.3225 0.239673 18.0389 0.327812 17.7746L1.39187 14.5824C0.696389 13.2748 0.307935 11.826 0.255998 10.3458C0.20406 8.86568 0.490005 7.39316 1.09213 6.04003C1.69425 4.6869 2.59672 3.48873 3.73105 2.53646C4.86537 1.58419 6.20173 0.902854 7.63869 0.544165C9.07565 0.185476 10.5754 0.158863 12.0242 0.466346C13.473 0.773829 14.8327 1.40733 16.0001 2.31875C17.1675 3.23018 18.1119 4.39558 18.7616 5.7265C19.4114 7.05741 19.7494 8.51886 19.75 9.99991ZM18.25 9.99991C18.2496 8.7344 17.9582 7.48593 17.3981 6.3511C16.838 5.21627 16.0244 4.2255 15.0201 3.45544C14.0159 2.68537 12.8479 2.15666 11.6067 1.91021C10.3654 1.66375 9.08405 1.70616 7.86178 2.03415C6.63951 2.36215 5.50909 2.96693 4.55796 3.80171C3.60682 4.6365 2.86049 5.6789 2.37668 6.84828C1.89288 8.01766 1.68458 9.28266 1.7679 10.5454C1.85122 11.8082 2.22393 13.0349 2.85719 14.1305C2.91034 14.2225 2.94334 14.3247 2.954 14.4304C2.96467 14.5361 2.95276 14.6429 2.91906 14.7437L1.75 18.2499L5.25625 17.0808C5.33262 17.0548 5.41275 17.0415 5.49344 17.0415C5.62516 17.0417 5.7545 17.0766 5.86844 17.1427C7.12263 17.8684 8.54581 18.2509 9.99479 18.2518C11.4438 18.2527 12.8674 17.872 14.1225 17.1479C15.3776 16.4239 16.4199 15.382 17.1445 14.1272C17.869 12.8724 18.2503 11.4489 18.25 9.99991Z"
                fill="#97AFDE"
              />
            </svg>
          </button>
        </td>
      </tr>
    </>
  );
};
