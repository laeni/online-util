/**
 * 页脚.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex-none relative z-50 leading-3 ring-1 ring-gray-900 ring-opacity-5 shadow-sm py-6 text-xs sm:text-sm text-gray-400">
      <div className="flex justify-center">
        <div className="px-2">
          <span>{`© ${year !== 2022 ? '2022-' : ''}${year} All Right Reserved `}</span>
          <a target="_black" href="https://beian.miit.gov.cn/">滇ICP备17005647号-2</a>
        </div>
      </div>
    </div>
  )
}
