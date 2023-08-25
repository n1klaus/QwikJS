import { $, type QRL, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead, z } from "@builder.io/qwik-city";
import {
  type InitialValues,
  useForm,
  zodForm$,
  formAction$,
  type SubmitHandler,
} from "@modular-forms/qwik";
import { FormHeader, TextInput, FormFooter } from "~/components/forms";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("The email address is invalid"),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(8, "The password must have 8 characters or more"),
});

type LoginForm = {
  email: string;
  password: string;
};

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<LoginForm>((values) => {
  // server side form handling
  console.log("(server) Submitted form values: ", values);
}, zodForm$(LoginSchema));

export default component$(() => {
  // Use login form
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(LoginSchema),
  });

  const formSubmit: QRL<SubmitHandler<LoginForm>> = $((values) => {
    // client side form handling
    console.log("(client) Submitted form values: ", values);
  });

  return (
    <Form
      class="space-y-12 md:space-y-14 lg:space-y-16 pb-10"
      onSubmit$={formSubmit}
    >
      <FormHeader of={loginForm} heading="Login form" />
      <div class="space-y-8 md:space-y-10 lg:space-y-12">
        <Field name="email">
          {(field, props) => (
            <TextInput
              {...props}
              value={field.value}
              error={field.error}
              type="email"
              label="Email"
              placeholder="example@email.com"
              required
            />
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <TextInput
              {...props}
              value={field.value}
              error={field.error}
              type="password"
              label="Password"
              placeholder="********"
              required
            />
          )}
        </Field>
      </div>
      <FormFooter of={loginForm} />
    </Form>
  );
});

export const head: DocumentHead = {
  title: "Login form",
};
