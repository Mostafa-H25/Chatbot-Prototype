/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/registration",
  //       destination: `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/v1/auth/register`,
  //     },
  //     {
  //       source: "/api/login",
  //       destination: `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/v1/auth/login`,
  //     },
  //     {
  //       source: "/api/logout",
  //       destination: `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/v1/auth/logout`,
  //     },
  //     {
  //       source: "/api",
  //       destination: `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api`,
  //     },
  //     {
  //       source: "/api/folder",
  //       destination: `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/folder`,
  //     },
  //     {
  //       source: "/api/chat",
  //       destination: `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/chat`,
  //     },
  //     {
  //       source: "/api/prompt",
  //       destination: `http://${process.env.BACKEND_API_ROUTE}:${process.env.BACKEND_API_PORT}/api/prompt`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
