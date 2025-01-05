"use client";

import React from "react";

const KakaoLoginButton = () => {
  const REST_API_KEY = "e1bc3c4db3a86b3b347d08cef1f2a65c";
  const REDIRECT_URI = "https://memorial-project-mvmdfsdk9-norang2810s-projects.vercel.app/login";

  const handleLogin = () => {
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoURL;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg"
    >
      카카오 로그인
    </button>
  );
};

export default KakaoLoginButton;
