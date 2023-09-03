import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-dark-blue text-white h-full overflow-hidden`}
                style={{
                    background: "#111827",
                    margin: 0,
                    padding: 0,
                    color: "white",
                }}
            >
                {children}
            </body>
        </html>
    );
};

export default Layout;
