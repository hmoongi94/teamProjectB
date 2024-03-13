"use client";

import React, { useState, useEffect } from "react";

interface fetchData {

}

export default function Home() {
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/");
      const jsonData = await response.json(); // JSON 형식의 데이터를 받아옴
      console.log(jsonData);
      setMessage(jsonData.message);
      // setData(jsonData.databasedata); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {message ? (
          <div>
            <p>Message: {message}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <h1>API Data:</h1>
        <div>
          {/* {data ? (
            <ul>
              {data.map((item, index) => (
                <li key={index}>Data: {item.data}</li> 
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )} */}
        </div>
      </div>
    </main>
  );
}
