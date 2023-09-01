import "../globals.css";
import React from "react";
import Providers from "./providers";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Dashboard",
    description: "Dashboard for Sardar Patel Institute of Technology",
};

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-dark-blue text-white h-full overflow-hidden`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
};

export default Layout;
