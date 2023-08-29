"use client";

import { GlobalProvider } from "@/context/global";

const Providers = ({ children }) => {
    return <GlobalProvider>{children}</GlobalProvider>;
};

export default Providers;
