import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import Hero from "~/components/starter/hero/hero";
import Infobox from "~/components/starter/infobox/infobox";

export default component$(() => {
  return (
    <>
      <Hero />

      <div class="container container-flex">
        <Infobox>
          <div q:slot="title" class="icon icon-cli">
            CLI Commands
          </div>
          <>
            <p>
              <code>npm run dev</code>
              <br />
              Starts the development server and watches for changes
            </p>
            <p>
              <code>npm run preview</code>
              <br />
              Creates production build and starts a server to preview it
            </p>
            <p>
              <code>npm run build</code>
              <br />
              Creates production build
            </p>
            <p>
              <code>npm run qwik add</code>
              <br />
              Runs the qwik CLI to add integrations
            </p>
          </>
        </Infobox>

        <Infobox>
          <div q:slot="title" class="icon icon-apps">
            Example Apps
          </div>
          <div>
            Have a look at the{" "}
            <ul>
              <li>
                <a href="/demo/flower">Flower App</a>
              </li>
              <li>
                <a href="/demo/todolist">Todo App</a>
              </li>
              <li>
                <a href="/demo/counter">Counter App</a>
              </li>
              <li>
                <a href="/demo/jokes">Jokes App</a>.
              </li>
            </ul>
          </div>
        </Infobox>
        
        <Infobox>
          <div q:slot="title" class="icon icon-community">
            Let's Connect!
          </div>
          <ul>
            <li>
              <span>Questions or just want to say hi? </span>
              <a href="https://discord.com/n11klaus" target="_blank">
                Chat on discord!
              </a>
            </li>
            <li>
              <span>Follow </span>
              <a href="https://linkedin.com/in/nicknyanjui" target="_blank">
                Linkedin
              </a>
            </li>
            <li>
              <span>Follow </span>
              <a href="https://twitter.com/uncle_saitama" target="_blank">
                @uncle_saitama
              </a>
              <span> on X</span>
            </li>
            <li>
              <span>Connect on </span>
              <a href="https://github.com/n1klaus" target="_blank">
                GitHub
              </a>
            </li>
          </ul>
        </Infobox>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "HomePage",
  meta: [
    {
      name: "description",
      content: "Home Page description",
    },
  ],
};
