import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{`${head.title} | Demo App}`}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta charSet="utf-8" />
      <meta name="author" content="n1klaus" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}

      <script
        // Add "dark" class for theming before browser has chance to paint to
        // prevent screen from flashing between two color modes
        dangerouslySetInnerHTML={`
          if (!window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.classList.add('dark');
          }
        `}
      />
    </>
  );
});
