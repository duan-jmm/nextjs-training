import "@/src/assets/sass/main.scss";
import "@/src/assets/sass/styles.css";
import { Navbar } from "@/src/components/navbar.component";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />;
    </div>
  );
}
