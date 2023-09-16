import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-dark-blue text-white h-full overflow-hidden`}
            >
                {children}
            </body>
        </html>
    );
};

export default Layout;
