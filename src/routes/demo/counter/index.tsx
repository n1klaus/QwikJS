import { component$ } from "@builder.io/qwik";
import Counter from "~/components/starter/counter/counter";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="container container-center container-spacing-xl">
      <h3>
        You can <span class="highlight">count</span>
        <br /> on me
      </h3>
      <Counter />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Counter",
};
