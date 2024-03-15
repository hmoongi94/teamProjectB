"use client";

import React from "react";
import SignupForm from "@/components/signupForm";
import { useRouter } from "next/navigation";

function SignupPage() {
  const router = useRouter()

  const handleSubmit = async (userId: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if(data.message==="이미 존재하는 사용자입니다."){
          alert("이미 존재하는 사용자입니다.")
        } else{
          router.push('/')
        }
        
      } else {
        console.error("회원가입 실패");
        // 실패한 경우에 대한 처리
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignupPage;
