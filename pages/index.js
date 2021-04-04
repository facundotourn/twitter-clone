import { useEffect, useState } from 'react'
import Head from 'next/head'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'
import Github from '../components/Icons/Github'
import { colors } from '../styles/theme'

import { loginWithGithub, onAuthStateChanged } from '../firebase/client'

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGithub()
      .then(setUser)
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/coffee.png" alt="Logo"></img>
          <h1>Devter</h1>
          <h2>
            Talk about development <br /> with developers
          </h2>
          <div>
            {!user && (
              <Button onClick={handleClick}>
                <Github fill="#fff" height={30} width={30} />
                Log in with Github
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <img src={user.avatar} />
                <strong>{user.username}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 200px;
        }

        section {
          display: grid;
          place-items: center;
          place-content: center;
          height: 100%;
        }

        h1 {
          font-weight: 800;
          font-size: 30px;
          color: ${colors.primary};
          margin-bottom: 16px;
        }

        h2 {
          font-size: 21px;
          color: ${colors.secondary};
          margin: 0;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  )
}
