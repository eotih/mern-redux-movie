import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Movie | Lê Trọng Hiếu</title>
        <meta name="description" content="Lê Trọng Hiếu" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://letronghieu.site">Lê Trọng Hiếu</a>
        </h1>

        <div className={styles.grid}>
          <a href="https://github.com/eotih/mern-socketio-chatapp" className={styles.card}>
            <h2>ChatApp &rarr;</h2>
            <p>Curious about socket.io, I researched and made a real-time chat app using MongoDB, ExpressJS, ReactJS, NodeJS to learn about socket.io.</p>
          </a>

          <a href="https://github.com/eotih/redux-todo-app" className={styles.card}>
            <h2>ToDoApp &rarr;</h2>
            <p>I made a website todo app to learn about Redux/Toolkit using ReactJS.</p>
          </a>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
