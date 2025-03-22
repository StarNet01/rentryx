import Footer from "@/modules/landing/layouts/Footer";
import Header from "@/modules/landing/layouts/Header";
import {
  Container,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <Container>
        <div className="my-12">
          <h1 className="text-[#A0A0A0]">Report Face Listing</h1>
          <span className="text-[#8313B2] mt-8 block text-[14px]">
            Customer Details
          </span>
          <Divider sx={{ mb: 3, mt: 1 }} />
          <div className="flex gap-5">
            <TextField label="Name" fullWidth className="flex-1" />
            <TextField
              fullWidth
              className="flex-1"
              label="Contact Number"
              id="outlined-start-adornment"
              sx={{ width: "30ch" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">+971</InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div className="flex gap-5 mt-5">
            <TextField label="Email" fullWidth className="flex-1" />
            <FormControl fullWidth className="flex-1">
              <InputLabel id="demo-simple-select-label">Query</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Query"
              >
                <MenuItem value={10}>Customer Support</MenuItem>
                <MenuItem value={20}>Deposit refund</MenuItem>
                <MenuItem value={30}>Offered high price</MenuItem>
                <MenuItem value={302}>Report fake listing</MenuItem>
              </Select>
            </FormControl>
          </div>
          <span className="text-[#8313B2] mt-8 block text-[14px]">
            Vehicle Details
          </span>
          <Divider sx={{ mb: 3, mt: 1 }} />
          <div className="flex gap-5">
            <TextField label="Name of Car" fullWidth className="flex-1" />
            <TextField
              label="Rentryx Listing URL"
              fullWidth
              className="flex-1"
            />
          </div>
          <span className="text-[#8313B2] mt-8 block text-[14px]">
            Supplier Details
          </span>
          <Divider sx={{ mb: 3, mt: 1 }} />
          <div className="flex gap-5">
            <TextField label="Supplier Name" fullWidth className="flex-1" />
            <TextField
              fullWidth
              className="flex-1"
              label="Contact Number"
              id="outlined-start-adornment"
              sx={{ width: "30ch" }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">+971</InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div className="flex gap-5 items-end mt-5">
            <TextField
              sx={{
                "& .MuiInputBase-root": {
                  height: "100%",
                },
              }}
              fullWidth
              placeholder="Write your question"
              multiline
              rows={8}
            />
            <Button variant="contained" color="secondary" fullWidth>
              Submit
            </Button>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default page;
