import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";  // Prisma 클라이언트 불러오기

export async function POST(req: Request) {
  const { code } = await req.json();
  const REST_API_KEY = process.env.KAKAO_REST_API_KEY || "e1bc3c4db3a86b3b347d08cef1f2a65c";
  const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || "https://memorial-project.vercel.app";

  try {
    console.log("전달된 Authorization Code:", code);
    console.log("REST API KEY:", REST_API_KEY);
    console.log("Redirect URI:", REDIRECT_URI);

    // 액세스 토큰 요청
    const tokenResponse = await fetch(
      "https://kauth.kakao.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: code,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error("토큰 발급 실패:", errorData.error_description || "알 수 없는 오류");
      return NextResponse.json({ success: false, error: errorData.error_description || "토큰 발급 실패" });
    }

    const tokenData = await tokenResponse.json();
    console.log("토큰 데이터 응답:", tokenData);

    // 사용자 정보 요청
    const userInfoResponse = await fetch(
      "https://kapi.kakao.com/v2/user/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    if (!userInfoResponse.ok) {
      console.error("사용자 정보 요청 실패");
      return NextResponse.json({ success: false, error: "사용자 정보를 불러오는데 실패했습니다." });
    }

    const userInfo = await userInfoResponse.json();
    console.log("사용자 정보:", userInfo);

    // Prisma를 사용해 DB에 유저 정보 저장 (카카오 ID 기준으로 upsert)
    const user = await prisma.user.upsert({
      where: { kakaoId: String(userInfo.id) },
      update: {
        email: userInfo.kakao_account?.email,
        nickname: userInfo.properties?.nickname,
      },
      create: {
        kakaoId: String(userInfo.id),
        email: userInfo.kakao_account?.email,
        nickname: userInfo.properties?.nickname,
      },
    });

    console.log("DB에 저장된 사용자 정보:", user);

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("API 요청 실패:", error);
    return NextResponse.json({ success: false, error: "서버 오류 발생" });
  }
}
