import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello World</h1>
      <Link href="/scroll-effect">Scroll Netflix Effect</Link>
      <Link href="/sorts">Sorts</Link>
      <Link href="/spreadsheet">Spreadsheet</Link>
    </main>
  );
}
