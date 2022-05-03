import Layout from "../../components/Layout";

export default function Home(){
  const cxMain = "flex flex-col flex-grow py-48";
  const cxTitle = "text-4xl text-center my-2";

  return (
    <Layout>
      <main className={cxMain}>
        <h1 className={cxTitle}>Page not found</h1>
      </main>
    </Layout>
  )
}