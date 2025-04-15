import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  matcher: ['/cofrinho/:path*', '/auth/:path*'],
};

export default nextConfig;
