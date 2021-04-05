import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

import { addDevit, uploadImage } from 'firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Avatar from 'components/Avatar'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const user = useUser()
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [message, setMessage] = useState('')

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = event => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)

    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push('/')
      })
      .catch(err => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = e => {
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = e => {
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = e => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)

    const task = uploadImage(e.dataTransfer.files[0])
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <Head>
          <title>Nuevo devit / Devter</title>
        </Head>
        <section className="form-container">
          <section className="avatar-container">
            <Avatar src={user ? user.avatar : ''} />
          </section>
          <form onSubmit={handleSubmit}>
            <textarea
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onChange={handleChange}
              placeholder="¿Qué está pasando?"
            ></textarea>
            {imgURL && (
              <section className="remove-img">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL}></img>
              </section>
            )}
            <div>
              <Button disabled={isButtonDisabled}>Devitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }

        button {
          position: absolute;
          top: 15px;
          border-radius: 999px;
          right: 15px;
          border: 0;
          font-size: 24px;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          width: 32px;
          height: 32px;
        }

        .remove-img {
          position: relative;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        form {
          padding: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        textarea {
          width: 100%;
          font-size: 21px;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px solid transparent'};
          border-radius: 10px;
          outline: 0;
          padding: 15px;
          resize: none;
        }
      `}</style>
    </>
  )
}
