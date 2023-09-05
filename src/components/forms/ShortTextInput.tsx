import {
  component$,
  type PropFunction,
  type QwikChangeEvent,
  type QwikFocusEvent,
} from "@builder.io/qwik";

type TextInputProps = {
  name: string;
  type: "text" | "email" | "tel" | "password" | "url" | "date";
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error: string;
  required?: boolean;
  ref: PropFunction<(element: Element) => void>;
  onInput$: PropFunction<(event: Event, element: HTMLInputElement) => void>;
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLInputElement>,
      element: HTMLInputElement,
    ) => void
  >;
  onBlur$: PropFunction<
    (event: QwikFocusEvent<HTMLInputElement>, element: HTMLInputElement) => void
  >;
};

export const ShortTextInput = component$(
  ({ label, error, ...props }: TextInputProps) => {
    return (
      <div>
        {label && (
          <label for={props.name}>
            {label} {props.required && <span>*</span>}
          </label>
        )}
        <input
          {...props}
          id={props.name}
          aria-invalid={!!error}
          aria-errormessage={`${props.name}-error`}
        />
        {error && <div id={`${props.name}-error`}>{error}</div>}
      </div>
    );
  },
);
