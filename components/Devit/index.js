import Avatar from 'components/Avatar'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import useTimeAgo from 'hooks/useTimeAgo'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Devit({
  avatar,
  userName,
  content,
  createdAt,
  img,
  id,
  userId,
}) {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormatted = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = event => {
    event.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormatted}>{timeAgo}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 2px solid #eee;
        }

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
          margin-top: 10px;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        time {
          color: #555;
          font-size: 14px;
        }

        time {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }

        time:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
