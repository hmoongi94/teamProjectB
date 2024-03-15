"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DataItem {
  data: string;
}

interface JsonData {
  message: string;
  databasedata: DataItem[];
}

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [data, setData] = useState<DataItem[] | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/");
      const jsonData: JsonData = await response.json();
      console.log(jsonData);
      setMessage(jsonData.message);
      setData(jsonData.databasedata);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const router = useRouter();

  const handleRedirect = () => {
    if (data === null) {
      router.push("/about");
    } else {
      router.push("/data");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* fastapi에서 데이터받기 */}
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
          {data ? (
            <ul>
              {data.map((item, index) => (
                <li key={index}>Data: {item.data}</li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      {/* 페이지 라우팅 */}
      <div>
        <button type="button" onClick={() => router.push("/signup")}>
          SignUp/
        </button>
        <Link href="login">Login page</Link>
        {/* 리디렉션 */}
      </div>
      <div>
        <button type="button" onClick={handleRedirect}>
          Go to Data Page
        </button>
      </div>
    </main>
  );
}
