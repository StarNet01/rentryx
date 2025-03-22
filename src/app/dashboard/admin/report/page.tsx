// TODO handle status and open modal

"use client";
import DashboardLayout from "@/modules/dashboard/layouts/DashboardLayout";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  styled,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import useSWR from "swr";
import HttpClient from "@/modules/share/services/httpClient/HttpClient";

export interface ReportItem {
  id: string;
  report_date: string;
  name: string;
  query: string;
  message: string;
  status: "pending" | "reviewed" | "rejected";
}

export const Reports: ReportItem[] = [
  {
    id: "1",
    report_date: "2025-03-19",
    name: "John Doe",
    query: "Payment Issue",
    message: "I have a problem with my last payment transaction...",
    status: "pending",
  },
  {
    id: "2",
    report_date: "2025-03-18",
    name: "Jane Smith",
    query: "Account Access",
    message: "Cannot access my dashboard after password reset...",
    status: "pending",
  },
];

const page = () => {
  const { data: Reports, mutate } = useSWR("user_reports", (url) =>
    HttpClient.getInstance().fetcher(url)
  );
  // TODO for dev
  return (
    <DashboardLayout panelType="admin">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-[#A0A0A0] uppercase bg-gray-50 ">
            <tr className="bg-white border-b  border-[#A0A0A0]">
              <th scope="col" className="px-6 py-3">
                Report Date
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Query
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Reports &&
              Reports.map((item: any, i: number) => (
                <RowItem key={i} data={item} mutate={mutate} />
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default page;

const RowItem = ({ data, mutate }: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleReviewReport = async () => {
    try {
      await HttpClient.getInstance().put(`/reports/${data.id}/review`);
      handleClose();
      mutate("user_reports");
    } catch (error) {
      console.error("Error reviewing report:", error);
    }
  };

  const handleRejectReport = async () => {
    try {
      await HttpClient.getInstance().put(`/reports/${data.id}/reject`);
      mutate("user_reports");
    } catch (error) {
      console.error("Error rejecting report:", error);
    }
  };

  return (
    <>
      <tr className="bg-white border-b-2  border-[#A0A0A0]">
        <td className="px-6 py-4">{data.report_date}</td>
        <td className="px-6 py-4">{data.name}</td>
        <td className="px-6 py-4">{data.query}</td>
        <td className="px-6 py-4">{data.message}</td>
        <td className="px-6 py-4 flex gap-3">
          <button onClick={handleClickOpen}>
            <svg
              className="w-6 h-6 text-[#79F6A7]"
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
                d="M5 11.917 9.724 16.5 19 7.5"
              />
            </svg>
          </button>
          <button onClick={handleRejectReport}>
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
        </td>
      </tr>

      <BootstrapDialog
        onClose={handleClose}
        open={open}
        maxWidth={"md"}
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ mt: 4 }}>
          <div className="flex gap-5">
            <div className="flex flex-col gap-5 justify-between w-full">
              <div>
                <span>Report Date</span>
                <p className="bg-[#F0F2F6] p-3 w-full rounded-lg">
                  {data.report_date}
                </p>
              </div>
              <div>
                <span>Name</span>
                <p className="bg-[#F0F2F6] p-3 w-full rounded-lg">
                  {data.name}
                </p>
              </div>
              <div>
                <span>Query</span>
                <p className="bg-[#F0F2F6] p-3 w-full rounded-lg">
                  {data.query}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5 justify-between w-full">
              <div>
                <span>Message</span>
                <p className="bg-[#F0F2F6] p-3 w-full rounded-lg">
                  {data.message}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button
              variant="contained"
              color="primary"
              onClick={handleReviewReport}
            >
              Reviewed
            </Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
