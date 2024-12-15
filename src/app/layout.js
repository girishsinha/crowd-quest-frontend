
import "./globals.css";

import SideNav from "@/components/SideNav";

// import { Analytics } from "@vercel/analytics/react";



export const metadata = {
  title: "Crowd-Quest",
  description:
    "hello world",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-row" >
        <SideNav />
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
