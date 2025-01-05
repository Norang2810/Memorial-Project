"use client";

import React, { useEffect, useState, useCallback } from "react";
import KakaoLoginButton from "@/components/KakaoLoginButton";
import { useRouter } from "next/navigation";
import TearBackground from "@/components/TearEffect/TearBackground";

export default function LoginPage() {
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [alertShown, setAlertShown] = useState<boolean>(false); // 알림 상태 추가
  const router = useRouter();

  // handleKakaoLogin을 useCallback으로 감싸서 의존성 문제 해결
  const handleKakaoLogin = useCallback(async (code: string) => {
    try {
      const response = await fetch("/api/auth/kakao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;  // error를 any로 명시해 ESLint 에러 방지
      console.error("카카오 로그인 에러:", err);
    }
  }, [router]);  // router 의존성 추가

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const params = new URL(window.location.href).searchParams;
    const message = params.get("message");

    // 로그인이 필요한 경우 알림 (한 번만 실행)
    if (message === "login_required" && !alertShown) {
      alert("로그인이 필요한 페이지입니다.");
      setAlertShown(true); // 알림 상태 업데이트
      // URL에서 쿼리 파라미터 제거
      const url = new URL(window.location.href);
      url.searchParams.delete("message");
      window.history.replaceState({}, "", url.toString());
    }

    if (storedUser) {
      router.push("/");
    } else {
      const code = params.get("code");
      if (code) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _authCode = code;  // authCode는 사용되지 않으므로 변수명 앞에 _를 붙여 처리
        setAuthCode(code);
        handleKakaoLogin(code);  // useCallback으로 감싼 함수 사용
      }
    }
  }, [alertShown, router, handleKakaoLogin]);  // handleKakaoLogin을 의존성 배열에 추가

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 relative">
      <h1 className="text-5xl font-bold absolute top-16">추모 게시판</h1>
      <div className="text-2xl flex flex-col items-center mt-24">
        <TearBackground />
        <KakaoLoginButton />
      </div>
    </div>
  );
}
