import Layout from "../../components/Layout";

export default function Home(){
  const cxMain = "flex flex-col flex-grow justify-center";
  const cxTitle = "text-5xl text-center my-2";
  const cxSub = "text-xl text-gray-700 text-center my-2";

  return (
    <Layout>
      <main className={cxMain}>
        <h1 className={cxTitle}>Notes App</h1>
        <p className={cxSub}>A simple not taking app</p>
      </main>
    </Layout>
  )
}