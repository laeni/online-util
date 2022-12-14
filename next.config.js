/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 尾斜杠 - 将'/xxx.html'输出为'/xxx/index.html',以解决导出静态文件后直接访问子页面404的问题
  trailingSlash: true,
  swcMinify: true,
}

module.exports = nextConfig
