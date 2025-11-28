import type { Metadata } from "next";
import { Rajdhani, Space_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-rajdhani'
});


const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-space-mono'
});

export const metadata: Metadata = {
  title: "Tuğberk Karadağ | Creative Technologist",
  description: "Portfolio of Tuğberk Karadağ - Software Engineer & Creative Technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${rajdhani.variable} ${spaceMono.variable} font-sans antialiased bg-black text-white`}>
        <CustomCursor />
        {children}
        <div className="noise-bg"></div>
        <div className="vignette-layer"></div>
      </body>
    </html>
  );
}