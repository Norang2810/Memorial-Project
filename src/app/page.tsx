"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DarkModeToggle from "@/components/DarkModeToggle";
import KakaoShareButton from "@/components/KakaoShareButton";
import MemorialButton from "@/components/MemorialButton";
import NicknameRoller from "@/components/NicknameRoller";
import { useRouter } from "next/navigation";

const REST_API_KEY = "e1bc3c4db3a86b3b347d08cef1f2a65c";
const LOGOUT_REDIRECT_URI = "https://memorial-project-37gobiq10-norang2810s-projects.vercel.app";

export default function HomePage() {
  const [count, setCount] = useState(703055);
  const [clicked, setClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [nicknames, setNicknames] = useState<string[]>([
    "김지수", "김철수", "신용재", "임한별", "허각",
    "김민재", "황희찬", "손흥민", "벤", "윤민수"
  ]);
  const [darkMode, setDarkMode] = useState(false);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);  // ESLint 오류 방지
  const router = useRouter();

  // 서버에서 초기 카운트 불러오기
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/counter");
        const data = await response.json();
        setCount(data.currentCount);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err: any = error; console.error("카운트 불러오기 실패", err);
      }
    };
    fetchCount();
  }, []);

  // 유저 정보 및 상태 초기화
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const parsedUser: any = JSON.parse(storedUser); setUser(parsedUser);
    } else {
      router.push("/login?message=login_required");
    }

    const lastClicked = localStorage.getItem("lastClicked");
    const today = new Date().toISOString().split("T")[0];
    if (lastClicked === today) {
      setClicked(true);
    }
  }, [router]);

  // 닉네임 데이터 추가
  useEffect(() => {
    const fetchNicknames = async () => {
      try {
        const response = await fetch("/api/tribute");
        const data = await response.json();
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newNicknames = data.map((item: any) => item.nickname);
        setNicknames((prev) => [...prev, ...newNicknames]);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err: any = error; console.error("닉네임 불러오기 실패", err);
      }
    };
  
    fetchNicknames();
  }, []);

  // 추모 버튼 클릭 핸들러
  const handleClick = async () => {
    if (clicked) {
      alert("오늘은 이미 추모 국화를 달았습니다.");
      return;
    }
  
    try {
      const response = await fetch("/api/counter", { method: "POST" });
  
      if (response.ok) {
        const data = await response.json();
        setCount(data.newCount);
        setClicked(true);
        setShowPopup(true);
  
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastClicked", today);
  
        if (user && user.nickname) {
          setNicknames((prevNicknames) => [user.nickname, ...prevNicknames]);
  
          // 서버에 사용자 ID와 닉네임 저장
          await fetch("/api/tribute", {
            method: "POST",
            body: JSON.stringify({
              userId: user.id,
              nickname: user.nickname,
            }),
            headers: { "Content-Type": "application/json" },
          });
        }
      } else {
        alert("서버에서 문제가 발생했습니다.");
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error; alert("네트워크 오류가 발생했습니다."); console.error("POST 요청 실패", err);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
    window.location.href = kakaoLogoutURL;
  };

  return (
    <div
      className={`flex flex-col ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="fixed bottom-5 right-5 z-50">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <div className="fixed top-5 right-5 z-50 flex space-x-4">
        <KakaoShareButton />
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-4 py-2 text-sm rounded shadow-lg"
        >
          로그아웃
        </button>
      </div>

      <section className="relative w-screen h-screen bg-stone-600">
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-200">
          <Image
            src="/images/flower.png"
            alt="추모 국화"
            width={700}
            height={600}
            objectFit="contain"
          />
        </div>
      </section>

      <section className="p-10 text-center w-full">
        <p className="text-lg">추모 국화로 함께 애도해 주세요</p>
        <h2 className="text-4xl font-bold mt-5">
          {count.toLocaleString()}명이 함께 하고 있습니다
        </h2>

        <MemorialButton clicked={clicked} handleClick={handleClick} />
        <br />
        <a
          href="https://map.kakao.com/?q=합동분향소"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="bg-gray-300 mt-5 w-[240px] h-[50px] rounded">
            합동 분향소
          </button>
        </a>

        <div className="pt-16 pb-16">
          <NicknameRoller nicknames={nicknames} />
        </div>
      </section>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-lg flex flex-col justify-center items-center">
            <Image
              src="/images/flower.png"
              alt="국화 이미지"
              width={250}
              height={250}
            />
            <h2 className="text-3xl font-bold mt-8">
              추모에 참여해주셔서 감사합니다
            </h2>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
              *참여 숫자는 카카오톡 ID 기준으로 1회만 집계되며, 추모 국화 달기는
              중복 참여 가능합니다.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-black text-white px-8 py-3 mt-8 rounded-lg"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}