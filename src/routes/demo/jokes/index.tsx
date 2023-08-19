import {
  component$,
  useSignal,
  useTask$,
  useStylesScoped$,
} from "@builder.io/qwik";
import {
  routeLoader$,
  Form,
  routeAction$,
  server$,
} from "@builder.io/qwik-city";
import axios from "axios";
import { type DocumentHead } from "@builder.io/qwik-city";
import styles from "./index.css?inline";

export const useDadJoke = routeLoader$(async () => {
  const response = await axios.get("https://icanhazdadjoke.com/", {
    headers: { Accept: "application/json" },
  });
  return (await response.data) as {
    id: string;
    status: number;
    joke: string;
  };
});

export const useJokeVoteAction = routeAction$((props) => {
  console.log("VOTE", props);
});

export default component$(() => {
  useStylesScoped$(styles);
  const isFavoriteSignal = useSignal(false);
  const dadJokeSignal = useDadJoke();
  const favoriteJokeAction = useJokeVoteAction();
  useTask$(({ track }) => {
    track(() => isFavoriteSignal.value);
    console.log("(isomorphic) FAVORITE is ", isFavoriteSignal.value);
    server$(() => {
      console.log("(server) FAVORITE is ", isFavoriteSignal.value);
    })();
  });
  return (
    <section class="section bright">
      <div class="container container-center">
        <p>{dadJokeSignal.value.joke}</p>
        <div class="container container-flex">
          <button
            onClick$={() => {
              isFavoriteSignal.value = !isFavoriteSignal.value;
            }}
          >
            {isFavoriteSignal.value ? "❤️" : "🤍"}
          </button>
          <Form action={favoriteJokeAction}>
            <input
              type="hidden"
              name="jokeId"
              value={dadJokeSignal.value.id}
            ></input>
            <button name="vote" value="up">
              👍
            </button>
            <button name="vote" value="down">
              👎
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Qwik Jokes API",
};
