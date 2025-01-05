"use client";

import React from "react";

// 카카오 REST API 키와 로그아웃 리디렉트 URI 설정
const REST_API_KEY = "e1bc3c4db3a86b3b347d08cef1f2a65c";
const LOGOUT_REDIRECT_URI = "https://memorial-project-37gobiq10-norang2810s-projects.vercel.app";  // 로그아웃 후 이동할 페이지

const handleLogout = () => {
  // 카카오 로그아웃 URL 구성
  const logoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
  
  // 로그아웃 요청 전송
  window.location.href = logoutURL;
};

const KakaoLogoutButton = () => {
  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-6 py-2 rounded-lg"
    >
      카카오 로그아웃
    </button>
  );
};

export default KakaoLogoutButton;
