import Image from "next/image";
import Layout from "./layout";
import Signup from "./signup/page";
import Login from "./login/page";

export default function Home() {
  return (
<Layout>
  <Login/>
</Layout>
  );
}
