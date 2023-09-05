// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, type QRL, component$ } from "@builder.io/qwik";
import { routeLoader$, z } from "@builder.io/qwik-city";
import type { InitialValues, SubmitHandler } from "@modular-forms/qwik";
import { formAction$, useForm, zodForm$ } from "@modular-forms/qwik";
import { ShortTextInput } from "~/components/forms";

const SignupSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("The email address is invalid"),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(8, "The password must have 8 characters or more"),
});

const SignupForm = z.infer<typeof SignupSchema>;

export const useFormLoader = routeLoader$<InitialValues<SignupForm>>(() => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<SignupForm>((values) => {
  // run on server
  console.log("(server) Form values: ", values);
}, zodForm$(SignupSchema));

export default component$(() => {
  const [signupForm, { Form, Field }] = useForm<SignupForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: zodForm$(SignupSchema),
  });

  const handleSubmit: QRL<SubmitHandler<SignupForm>> = $((values, event) => {
    // Runs on client
    signupForm.submitting = true;
    setTimeout(() => {
      console.log("done"), 3000;
    });
    console.log("(client) Form values: ", values);
    signupForm.submitted = true;
  });

  return (
    <>
      <Form onSubmit$={handleSubmit}>
        <Field name="email">
          {(field, props) => (
            <div>
              <ShortTextInput
                {...props}
                type="email"
                label="Email:"
                value={field.value}
                error={field.error}
              />
            </div>
          )}
        </Field>
        <Field name="password">
          {(field, props) => (
            <div>
              <ShortTextInput
                {...props}
                type="password"
                label="Password:"
                value={field.value}
                error={field.error}
              />
            </div>
          )}
        </Field>
        <button type="submit"> Sign Up</button>
      </Form>
    </>
  );
});
