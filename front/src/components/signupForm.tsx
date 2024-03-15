"use client";

import React, { useState } from "react";

interface SignupFormProps {
  onSubmit: (userId: string, password: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    if (userId.trim() !== "" && password.trim() !== "") {
      onSubmit(userId, password);
    } else {
      // 유효성 검사 실패 시 처리
      console.log("아이디 또는 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <div>
        <label htmlFor="userId">아이디:</label>
        <input
          className="text-black"
          type="text"
          id="userId"
          value={userId}
          onChange={handleUserIdChange}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          className="text-black"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
};

export default SignupForm;
