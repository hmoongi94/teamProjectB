"use client";

import React from "react";
import SignupForm from "@/components/signupForm";

function SignupPage() {
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
      if (response.ok) {
        console.log("회원가입 성공!");
        // 성공적으로 회원가입을 처리한 경우에는 다른 작업을 수행할 수 있습니다.
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
