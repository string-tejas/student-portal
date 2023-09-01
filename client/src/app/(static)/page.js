"use client";

import ParticleEffect from "@/components/ParticleEffect";

export default function Home() {
    return (
        <ParticleEffect>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl md:text-4xl font-bold text-center text-white">
                    Student <span className="text-blue-500">Portal</span>
                </h1>
                <h2 className="text-lg md:text-2xl font-semibold text-center text-white">
                    Sardar Patel Institute of Technology
                </h2>
            </div>
        </ParticleEffect>
    );
}
