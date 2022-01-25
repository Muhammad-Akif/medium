import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div>
          <h1>
            <span>Medium</span>{" "}
            is a place to wite, read, and connect.
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect with millions of readers.
          </h2>
        </div>
      </div>
    </div>
  )
}
