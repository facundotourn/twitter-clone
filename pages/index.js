import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  console.log(router)

  return (
    <div className={styles.container}>
      <Head>
        <title>devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="https://nextjs.org" className={styles.anchor}>devter</Link>
        </h1>
        <nav className={styles.nav}>
          <Link href="/timeline" className={styles.anchor}>timeline</Link>
        </nav>
        
      </main>
    </div>
  )
}
