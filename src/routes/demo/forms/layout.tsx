import { component$, Slot } from "@builder.io/qwik";
import { Tabs } from "~/components/forms";

export default component$(() => (
  <>
    <Tabs items={["Login", "Payment", "Todos", "Special", "Nested"]} />
    <main>
      <Slot />
    </main>
  </>
));
