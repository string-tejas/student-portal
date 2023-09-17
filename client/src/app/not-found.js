import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const NotFound = () => {
    return (
        <div
            style={{
                background: "#111827",
                color: "white",
                padding: "12px 32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                src="/images/404.png"
                width={400}
                height={500}
                style={{
                    width: "min(90vw, 500px)",
                    height: "auto",
                }}
            />
            <h1 style={{ color: "white", fontWeight: "700", margin: "0" }}>
                Page Not Found
            </h1>
            <p
                style={{
                    color: "white",
                    fontWeight: "400",
                    textAlign: "center",
                    width: "min(80vw, 1000px)",
                    color: "#ccc",
                }}
            >
                The page you are looking for does not exist yet. We are still
                under development. We are extremely sorry for inconvenience.
            </p>

            <div style={{ marginTop: "12px" }}>
                Go back to{" "}
                <Link
                    href={"/"}
                    className="bg-blue-600 rounded-md hover:bg-blue-700 px-2 py-1 text-white focus:ring-4 mx-1 text-sm"
                >
                    Home
                </Link>
                .
            </div>
        </div>
    );
};

export default NotFound;
