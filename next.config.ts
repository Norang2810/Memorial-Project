import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true,  // 빌드 중 TypeScript 오류 무시
  },
};

export default nextConfig;
