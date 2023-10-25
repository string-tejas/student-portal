"use client";

import React, { useState, useEffect } from 'react';

const NewsPage = () => {
    const [techNews, setTechNews] = useState([]);
    const [scienceNews, setScienceNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=43551de3a3274f8196dca4b37d12e012') 
          .then((response) => response.json())
          .then((data) => {
            setTechNews(data.articles);
            setLoading(false);
          })
          .catch((error) => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=43551de3a3274f8196dca4b37d12e012') 
          .then((response) => response.json())
          .then((data) => {
            setScienceNews(data.articles);
            setLoading(false);
          })
          .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return <div>

      <div style={{display:"flex"}}>
        <div>
          <h1 style={{fontSize:"2rem"}}>Technology</h1>
          <hr />
          <br />
        {techNews.map((article, index) => ( 
        <div style={{marginBottom:"1rem"}} key={index} className="col-span-8 md:col-span-2 h-48 bg-gray-800 rounded-lg border border-gray-700 px-3 py-3">
            <h1 style={{fontSize:"1.5rem", fontWeight:"bolder"}}>{article.title}</h1>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
        </div> ))}
        </div>

        <div style={{marginLeft:"1rem"}}>
          <h1 style={{fontSize:"2rem"}}>Science</h1>
          <hr />
          <br />
        {scienceNews.map((article, index) => ( 
        <div style={{marginBottom:"1rem"}} key={index} className="col-span-8 md:col-span-2 h-48 bg-gray-800 rounded-lg border border-gray-700 px-3 py-3">
            <h1 style={{fontSize:"1.5rem", fontWeight:"bolder"}}>{article.title}</h1>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
        </div> ))}
        </div>
        </div>
    </div>;
};

export default NewsPage;
