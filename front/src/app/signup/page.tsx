import React from "react";
import SignupForm from "@/components/signupForm";

function SignupPage() {
  const handleSubmit = (userId: string, password: string) => {
    // 이 부분에서 서버로 회원가입 요청을 보낼 수 있습니다.
    console.log("회원가입 요청:", userId, password);
  };

  return (
    <div>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignupPage;
