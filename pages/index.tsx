import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>在线工具</title>
      </Head>

      <Layout>
        <div className='py-16 flex flex-1 flex-col justify-center items-center'>
          <h1 className='m-0 leading-5 text-4xl md:text-5xl lg:text-6xl'>
            在线工具
          </h1>

          <p className='my-16 leading-6 text-2xl px-4'>
            一个主要以学习为目的的在线工具
          </p>

          <div className='flex items-center justify-center flex-wrap max-w-[800px] sm:w-auto flex-row sm:flex-col'>
            <Link href='/str2byte'>
              <a className={styles.card}>
                <h2>UTF编码字符串 &rarr;</h2>
                <p className='opacity-90'>采用 UTF 方式将字符串转换为二进制，并给出详细的转换过程。</p>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Home
