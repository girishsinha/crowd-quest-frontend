
import "./globals.css";
import ReduxProvider from "./redux-provider";
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
      <body className="flex flex-row">
        <ReduxProvider>
          <SideNav />
          <div className="w-[80vw] h-screen overflow-y-scroll" > {children}</div>
          {/* <Analytics /> */}
        </ReduxProvider>
      </body>
    </html>
  );
}

