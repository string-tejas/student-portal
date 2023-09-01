import React from "react";

const Page = () => {
    return (
        <div>
            {Array(100)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="bg-red-900 p-2">
                        Hello
                    </div>
                ))}
        </div>
    );
};

export default Page;
