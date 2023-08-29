import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Student Portal | SPIT",
    description: "Student portal for Sardar Patel Institute of Technology",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-dark-blue text-white`}>
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
