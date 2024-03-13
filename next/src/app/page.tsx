'use client'

import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/");
      const jsonData = await response.json(); // JSON 형식의 데이터를 받아옴
      console.log(jsonData)
      setData(jsonData.message); // "message" 키를 통해 데이터를 설정
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>API Data:</h1>
        {data ? (
          <div>
            <p>Message: {data}</p> {/* 데이터를 출력 */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}