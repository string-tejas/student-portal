import Link from "next/link";

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
            <img
                src="/images/404.png"
                style={{
                    width: "min(90vw, 500px)",
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
                Go back to <Link href={"/"}>Home</Link>.
            </div>
        </div>
    );
};

export default NotFound;
