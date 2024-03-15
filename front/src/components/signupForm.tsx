'use client'

import React, { useState } from "react";

interface SignupFormProps {
  onSubmit: (userId: string, password: string) => void;
}

function SignupForm({ onSubmit }: SignupFormProps) {
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignup = () => {
    onSubmit(userId, password);
  };

  return (
    <div>
      <h1>회원가입</h1>
      <div>
        <label htmlFor="userId">아이디:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default SignupForm;