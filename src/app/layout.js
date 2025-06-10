
import Header from "@/components/Header";
import "./globals.css";
import ReduxProvider from "./redux-provider";
import SideNav from "@/components/SideNav";

// import { Analytics } from "@vercel/analytics/react";
import AuthProvider from "@/AuthProvider"


export const metadata = {
  title: "Crowd-Quest",
  description:
    "hello world",

};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <ReduxProvider>
        <body className=" relative sm:flex flex-row ">
          <SideNav />
          <div className="h-screen relative sm:w-4/6 xl:w-5/6 w-full " >
            <Header /> <div className="flex justify-center w-full pt-20  h-full overflow-y-scroll ">
              <AuthProvider>
                {children}
              </AuthProvider>
            </div>
          </div>
          {/* <Analytics /> */}
        </body>
      </ReduxProvider>
    </html>
  );
}

