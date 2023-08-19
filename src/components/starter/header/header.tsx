import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { QwikLogo } from "../icons/qwik";
import styles from "./header.module.css";

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <QwikLogo height={50} width={143} />
          </a>
        </div>
        <ul>
          <li>
            <Link href="/demo/jokes">Jokes App</Link>
          </li>
          <li>
            <Link href="/demo/todolist">Todolist App</Link>
          </li>
          <li>
            <Link href="/demo/flower">Flower App</Link>
          </li>
          <li>
            <Link href="/demo/counter">Counter App</Link>
          </li>
        </ul>
      </div>
    </header>
  );
});
