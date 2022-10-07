
import { PropsWithChildren } from "react";
import Footer from "./footer";
import ShowSize from './show-size';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {/* 显示屏幕尺寸 - 仅开发环境生效 */}
      <ShowSize />

      <div className='flex flex-col justify-between min-h-screen'>
        <div>{children}</div>
        <Footer />
      </div>
    </>
  )
}
