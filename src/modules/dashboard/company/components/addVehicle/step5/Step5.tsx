"use client";
import Layout from "@/modules/landing/layouts/Layout";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Divider,
  TextField,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import fjGallery from "flickr-justified-gallery";
import Grid from "@mui/material/Grid2";
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const Step5 = () => {
  const defaultPosition: LatLngTuple = [23.4241, 53.8478];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const galleryElements = document.querySelectorAll(".gallery");
      if (galleryElements.length > 0) {
        fjGallery(galleryElements, {
          itemSelector: ".gallery__item",
          rowHeight: 180,
          lastRow: "start",
          maxRowsCount: 2,
          gutter: 2,
          rowHeightTolerance: 0,
          calculateItemsHeight: false,
        });
      }
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <Layout blueBackground={false}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={8}>
            <div>
              <h1 className="text-[#8313B2] text-[28px] font-bold">Preview</h1>
              <div className="mt-5">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/testLogo.png"
                    alt={"logo"}
                    width={30}
                    height={30}
                  />
                  <h2 className="text-[22px] font-bold">
                    Mercedes Benz AMG G63
                  </h2>
                  <span className="text-[20]">2024</span>
                </div>
                <div className="py-4">
                  <LightGallery
                    plugins={[lgZoom, lgThumbnail]}
                    mode="lg-fade"
                    pager={false}
                    thumbnail={true}
                    galleryId={"nature"}
                    elementClassNames={"gallery"}
                  >
                    <a href="/car/test1.jpg" className="gallery__item">
                      <img alt="img1" src="/car/test1.jpg" />
                    </a>
                    <a href="/car/test2.jpg" className="gallery__item">
                      <img alt="img2" src="/car/test2.jpg" />
                    </a>
                    <a href="/car/test3.jpg" className="gallery__item">
                      <img alt="img2" src="/car/test3.jpg" />
                    </a>
                  </LightGallery>
                </div>
                <div className="mb-3">
                  <h3 className="font-bold text-[20px]">Description</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
                <Divider />
                <div className="my-3">
                  <h3 className="font-bold text-[20px]">Features & Specs</h3>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 2, sm: 3, md: 8 }}
                  >
                    <Grid size={3}>test</Grid>
                    <Grid size={3}>test</Grid>
                    <Grid size={3}>test</Grid>
                    <Grid size={3}>test</Grid>
                  </Grid>
                </div>
                <Divider />
                <div className="my-3">
                  <h3 className="font-bold text-[20px]">Delivery & Pick-up</h3>
                  <div className="w-full border-[#A0A0A0] border-[2px] rounded flex gap-4 justify-center items-center">
                    <div className="flex p-4 gap-4">
                      <img src="/svg/carIcon.svg" alt="car" />
                      <span className="text-[#A0A0A0]">pick up date</span>
                      <Divider
                        orientation="vertical"
                        variant="fullWidth"
                        flexItem
                      />
                      <img src="/svg/time.svg" alt="time" />
                      <span className="text-[#A0A0A0]">Time</span>
                    </div>
                    <Divider
                      orientation="vertical"
                      variant="fullWidth"
                      flexItem
                    />
                    <div className="flex p-4 gap-4">
                      <img src="/svg/backCar.svg" alt="car" />
                      <span className="text-[#A0A0A0]">Drop off date</span>
                      <Divider
                        orientation="vertical"
                        variant="fullWidth"
                        flexItem
                      />
                      <img src="/svg/time.svg" alt="time" />
                      <span className="text-[#A0A0A0]">Time</span>
                    </div>
                    <Button variant="contained" color="secondary">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid size={4}>
            <Card variant="outlined">
              <div className="flex items-center justify-center gap-5 p-6">
                <Image
                  src="/test.jpg"
                  alt={"Logo"}
                  className="rounded-full border-[#928B83] border-[2px]"
                  width={110}
                  height={110}
                />
                <div>
                  <h3 className="font-bold text-[22px]">Company Name</h3>
                  <img
                    src="/svg/shield.svg"
                    alt="shild"
                    className="inline-block"
                  />
                  <p className="ml-1 inline-block">Verify</p>
                </div>
              </div>
            </Card>
            <div className="text-center w-full my-5">
              <span>BOOK DIRECTLY FROM SUPPLIER</span>
              <ButtonGroup size="large" fullWidth>
                <Button key="one">Email</Button>
                <Button key="two" color="success">
                  Whats app
                </Button>
              </ButtonGroup>
            </div>
            <div>
              <h3 className="font-bold text-[20px]">Message</h3>
              <TextField
                placeholder="Write your message ..."
                label=""
                multiline
                rows={4}
                fullWidth
                maxRows={4}
              />
              <Button variant="contained" color="secondary" fullWidth>
                Message
              </Button>
            </div>
          </Grid>
        </Grid>
        <div>
          <MapContainer
            center={defaultPosition}
            zoom={10}
            style={{ width: "100%", height: "220px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </div>
        <div className="w-full my-8 flex justify-center gap-3">
          <Button type="button" variant="outlined">
            Back
          </Button>
          <Button type="submit" variant="contained">
            Publish
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

export default Step5;
