import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider >
  )
}

export default MyApp
