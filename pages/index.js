import Head from "next/head";
import Link from "next/link"

const Home = () => (
  <>
    <Head>
      <title>Turnip Tracker</title>
    </Head>
    <div>
      <Link href="/users">Manage Users</Link>
      <Link href="/prices">Manage Prices</Link>
    </div>
  </>
);

export default Home;
