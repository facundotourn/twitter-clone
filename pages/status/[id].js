import Devit from 'components/Devit'
import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'

export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return 'Loading...'
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'tiuCwlDXUGl6Jm7KuKBf' } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data()
      const id = doc.id

      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}
