import { Header } from "@/components/header";
import { SiteLayout } from "@/components/layout";

export default function Home() {
  return (
    <>
      <Header />
      <SiteLayout>
        <h1>Hello world!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, natus.
          Recusandae consequatur ratione neque quae repudiandae culpa facere
          similique? Cumque nisi eos nihil. Animi magni doloremque libero sint,
          aliquam aliquid.
        </p>
      </SiteLayout>
    </>
  );
}
