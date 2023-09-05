import { component$ } from "@builder.io/qwik";
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
            <a href="/demo/forms">Modular Forms</a>
          </li>
          <li>
            <a href="/demo/jokes">Jokes App</a>
          </li>
          <li>
            <a href="/demo/todolist">Todolist App</a>
          </li>
          <li>
            <a href="/demo/flower">Flower App</a>
          </li>
          <li>
            <a href="/demo/counter">Counter App</a>
          </li>
        </ul>
      </div>
    </header>
  );
});
