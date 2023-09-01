import "../globals.css";
import { Inter } from "next/font/google";
import StaticNavbar from "@/components/StaticNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Student Portal | SPIT",
    description: "Student portal for Sardar Patel Institute of Technology",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-dark-blue text-white`}>
                <StaticNavbar />
                {children}
            </body>
        </html>
    );
}
