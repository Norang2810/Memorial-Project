"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (params: any) => void;  // Kakao 공유 객체 타입 정의
      };
    };
  }
}

export default function KakaoShareButton() {
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const initializeKakao = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (kakaoKey) {
          window.Kakao.init(kakaoKey);
          console.log("Kakao SDK 초기화 완료");
        } else {
          console.error("카카오 JavaScript 키가 설정되지 않았습니다.");
        }
      }
    };

    if (typeof window !== "undefined" && !window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        console.log("Kakao SDK 로드 완료");
        initializeKakao();
      };
      script.onerror = () => {
        console.error("Kakao SDK 로드 실패");
      };
      document.head.appendChild(script);
    } else {
      initializeKakao();
    }
  }, []);

  const shareToKakao = () => {
    console.log("Kakao 객체 상태:", window.Kakao);

    if (!window.Kakao) {
      alert("공유 기능이 지원되지 않습니다.");
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "추모 페이지",
          description: "추모 페이지에 함께하세요.",
          imageUrl: "https://your-website.com/images/flower.png",
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: pageUrl,
              webUrl: pageUrl,
            },
          },
        ],
      });

      alert("카카오톡 공유 완료!");
    } catch (err) {
      const error: any = err;
      console.error("카카오 공유 실패:", error);
      alert("카카오 공유에 실패했습니다.");
    }
  };

  return (
    <button
      onClick={shareToKakao}
      className="bg-yellow-400 text-black px-4 py-2 text-sm rounded shadow-lg"
    >
      공유하기
    </button>
  );
}
