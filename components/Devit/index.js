import Avatar from 'components/Avatar'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import useTimeAgo from 'hooks/useTimeAgo'

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

  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <time dateTime={createdAtFormatted}>{timeAgo}</time>
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
      `}</style>
    </>
  )
}
