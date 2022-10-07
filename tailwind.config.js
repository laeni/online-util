/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // 禁用Tailwind的全局基本样式，因为已经使用了ant的全局基本样式了
    preflight: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
