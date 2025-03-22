"use client";
import React, { useEffect, useRef, useState } from "react";

interface GoogleMapProps {
  apiKey: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markers?: Array<{
    id: string;
    position: {
      lat: number;
      lng: number;
    };
    title?: string;
    onClick?: () => void;
  }>;
  style?: React.CSSProperties;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center,
  zoom,
  markers = [],
  style = { width: "100%", height: "400px" },
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setGoogleMapsLoaded(true);
      return;
    }

    if (scriptRef.current) {
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.id = "google-maps-script";
    scriptRef.current = script;

    window.initMap = () => {
      setGoogleMapsLoaded(true);
    };
    script.onload = window.initMap;

    document.head.appendChild(script);

    return () => {
      window.initMap = undefined;
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, [apiKey]);

  useEffect(() => {
    if (!googleMapsLoaded || !mapRef.current) return;

    const newMap = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true,
    });

    setMap(newMap);

    return () => {
      setMap(null);
    };
  }, [googleMapsLoaded, center, zoom]);

  useEffect(() => {
    if (!map || !markers.length) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    const carIcon = {
      url: "/svg/car-marker.svg",
      scaledSize: new google.maps.Size(32, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 16),
    };

    const newMarkers = markers.map((markerData) => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map,
        title: markerData.title || `Car ${markerData.id}`,
        icon: carIcon,
        animation: google.maps.Animation.DROP,
      });

      if (markerData.onClick) {
        marker.addListener("click", markerData.onClick);
      }

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 5px 0; font-size: 16px;">${
              markerData.title || `Car ${markerData.id}`
            }</h3>
            <p style="margin: 0; font-size: 12px;">Click to see details</p>
          </div>
        `,
      });

      marker.addListener("mouseover", () => {
        infoWindow.open(map, marker);
      });

      marker.addListener("mouseout", () => {
        infoWindow.close();
      });

      return marker;
    });

    markersRef.current = newMarkers;

    if (newMarkers.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition()!);
      });
      map.fitBounds(bounds);
    }

    return () => {
      newMarkers.forEach((marker) => marker.setMap(null));
    };
  }, [map, markers]);

  return <div ref={mapRef} style={style} />;
};

declare global {
  interface Window {
    initMap?: () => void;
    google?: any;
  }
}

export default GoogleMap;
