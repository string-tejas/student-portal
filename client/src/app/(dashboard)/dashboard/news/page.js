"use client";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect } from "react";

const NewsPage = () => {
    const [techNews, setTechNews] = useState([]);
    const [scienceNews, setScienceNews] = useState([]);
    const [businessNews, setBusinessNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=43551de3a3274f8196dca4b37d12e012"
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data.articles);
                setTechNews(data.articles);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=43551de3a3274f8196dca4b37d12e012"
        )
            .then((response) => response.json())
            .then((data) => {
                setScienceNews(data.articles);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch(
            "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=43551de3a3274f8196dca4b37d12e012"
        )
            .then((response) => response.json())
            .then((data) => {
                setBusinessNews(data.articles);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div>
                    <h1 className="text-4xl mb-1 font-semibold">Technology</h1>
                    <div className="w-full border-b my-2 border-gray-500" />
                    {techNews.slice(0, 5).map((article, index) => (
                        <NewsCard article={article} key={uuid()} />
                    ))}
                </div>

                <div style={{ marginLeft: "1rem" }}>
                    <h1 className="text-4xl mb-1 font-semibold">Science</h1>
                    <div className="w-full border-b my-2 border-gray-500" />
                    {scienceNews.slice(0, 5).map((article, index) => (
                        <NewsCard article={article} key={uuid()} />
                    ))}
                </div>

                <div style={{ marginLeft: "1rem" }}>
                    <h1 className="text-4xl mb-1 font-semibold">Business</h1>
                    <div className="w-full border-b my-2 border-gray-500" />
                    {businessNews.slice(0, 5).map((article, index) => (
                        <NewsCard article={article} key={uuid()} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const NewsCard = ({ article }) => {
    return (
        <div
            style={{ marginBottom: "1rem" }}
            className="col-span-8 md:col-span-2 h-50 bg-gray-800 rounded-lg border border-gray-700 px-3 py-3"
        >
            <img src={article.urlToImage} />
            <h1
                style={{
                    fontSize: "1.2rem",
                    fontWeight: "bolder",
                    lineHeight: "1.1",
                }}
                className="my-4"
            >
                {article.title}
            </h1>
            <p>{article.description}</p>
            <a
                href={article.url}
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                Read more
            </a>
        </div>
    );
};

export default NewsPage;
