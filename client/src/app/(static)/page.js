"use client";

import ParticleEffect from "@/components/ParticleEffect";
import SearchBar from "@/components/SearchBar";
import moment from "moment";
import Image from "next/image";

export default function Home() {
    const announcments = [
        {
            text: "CAP Reporting guidelines",
            date: "20/09/2023",
        },
        {
            text: "M. Tech Vacant Seats",
            date: "18/09/2023",
        },
        {
            text: "First year inaguration",
            date: "13/09/2023",
        },
        {
            text: "Final Merit List",
            date: "12/09/2023",
        },
        {
            text: "M. Tech Vacant Seats",
            date: "18/09/2023",
        },
        {
            text: "First year inaguration",
            date: "13/09/2023",
        },
        {
            text: "Final Merit List",
            date: "12/09/2023",
        },
        {
            text: "M. Tech Vacant Seats",
            date: "18/09/2023",
        },
        {
            text: "First year inaguration",
            date: "13/09/2023",
        },
        {
            text: "Final Merit List",
            date: "12/09/2023",
        },
    ];
    return (
        <ParticleEffect>
            <div className="md:grid grid-cols-12 md:px-16 px-4 md:py-8 py-4 gap-x-2 gap-y-4">
                <div className="md:col-span-9">
                    <h1 className="font-bold text-3xl">Welcome to,</h1>
                    <div className="flex gap-6 mt-4">
                        <Image
                            src="/images/logo.png"
                            width={120}
                            height={80}
                            alt="logo spit"
                        />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-light text-2xl">
                                Bhartiya Vidya Bhavan's
                            </h3>
                            <h1 className="font-bold text-5xl ">
                                Sardar Patel Institute of{" "}
                                <span className="text-blue-600">
                                    Technology
                                </span>
                            </h1>
                            <h4 className="font-bold text-lg">
                                An autonomous institute affiliated to the{" "}
                                <span className="text-blue-500">
                                    Mumbai University
                                </span>
                            </h4>
                        </div>
                    </div>
                    <div className="mt-8 flex items-center gap-3">
                        <SearchBar />
                        <button className="bg-blue-900 border px-3 py-2 rounded-md border-gray-700 hover:bg-blue-950">
                            UG Program
                        </button>
                        <button className="bg-blue-900 border px-3 py-2 rounded-md border-gray-700 hover:bg-blue-950">
                            PG Program
                        </button>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold">News and events</h2>
                        <Image
                            src="/images/landing-img.jpg"
                            width={1000}
                            height={500}
                            className="rounded-lg mt-4 border border-gray-700"
                        />
                    </div>
                </div>
                <div className="md:col-span-3">
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <h4 className="font-bold text-lg">Announcements</h4>
                        <div className="mt-4 ">
                            {announcments.map((a) => (
                                <div className="flex first:rounded-t-lg hover:bg-gray-600 last:rounded-b-lg border-b border-gray-600 last:border-none px-3 py-2 bg-gray-700">
                                    {a.text}
                                    <span className="ml-auto text-sm text-blue-400">
                                        {moment(a.date, "DD/MM/YYYY").fromNow()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ParticleEffect>
    );
}
