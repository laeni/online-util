import { GithubOutlined } from '@ant-design/icons';

/**
 * 页脚.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="flex-none relative z-50 leading-3 ring-1 ring-gray-900 ring-opacity-5 shadow-sm py-6 text-xs sm:text-sm text-gray-400">
      <div className="flex justify-center items-center">
        <div className="px-2">
          <span>{`© ${year !== 2022 ? '2022-' : ''}${year} All Right Reserved `}</span>
          <a target="_black" href="https://beian.miit.gov.cn/">滇ICP备17005647号-2</a>
        </div>
        {/* github */}
        <div className="mx-0 sm:mx-2">
          <a href="https://github.com/laeni/online-util" target="_blank" rel="noreferrer">
            <GithubOutlined />
          </a>
        </div>
      </div>
    </div>
  )
}
