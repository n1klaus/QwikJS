import { $, type QRL, component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import {
  insert,
  type InitialValues,
  maxLength,
  move,
  remove,
  replace,
  required,
  swap,
  useForm,
  type SubmitHandler,
} from "@modular-forms/qwik";
import {
  FormHeader,
  TextInput,
  InputLabel,
  ColorButton,
  InputError,
  FormFooter,
} from "~/components/forms";

type TodoForm = {
  heading: string;
  todos: {
    label: string;
    deadline: string;
  }[];
};

export const useFormLoader = routeLoader$<InitialValues<TodoForm>>(() => ({
  heading: "",
  todos: [
    {
      label: "3 cucumbers",
      deadline: new Date(Date.now() + 864e5).toISOString().split("T")[0],
    },
    {
      label: "5 Tomatoes",
      deadline: new Date(Date.now() + 1728e5).toISOString().split("T")[0],
    },
    {
      label: "",
      deadline: "",
    },
  ],
}));

export default component$(() => {
  // Use todo form
  const [todoForm, { Form, Field, FieldArray }] = useForm<TodoForm>({
    loader: useFormLoader(),
    fieldArrays: ["todos"],
  });

  const formSubmit: QRL<SubmitHandler<TodoForm>> = $((values) => {
    // client side form handling
    console.log("(client) Submitted form values: ", values);
  });

  return (
    <Form class="space-y-12 md:space-y-14 lg:space-y-16" onSubmit$={formSubmit}>
      <FormHeader of={todoForm} heading="Todo form" />

      <div class="space-y-8 md:space-y-10 lg:space-y-12">
        <Field name="heading" validate={required("Please enter a heading.")}>
          {(field, props) => (
            <TextInput
              {...props}
              value={field.value}
              error={field.error}
              type="text"
              label="Heading"
              placeholder="Shopping list"
              required
            />
          )}
        </Field>

        <FieldArray
          name="todos"
          validate={[
            required("Please add at least one todo."),
            maxLength(4, "You can add a maximum of 4 todos."),
          ]}
        >
          {(fieldArray) => (
            <div class="space-y-5 px-8 lg:px-10" id={fieldArray.name}>
              <InputLabel
                name={fieldArray.name}
                label="Todos"
                margin="none"
                required
              />

              <div>
                <div class="space-y-5">
                  {fieldArray.items.map((item, index) => (
                    <div
                      key={item}
                      class="flex flex-wrap gap-5 rounded-2xl border-2 border-slate-200 bg-slate-100/25 p-5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/10 dark:hover:border-slate-700"
                    >
                      <Field
                        name={`todos.${index}.label`}
                        validate={required("Please enter a label.")}
                      >
                        {(field, props) => (
                          <TextInput
                            {...props}
                            class="w-full !p-0 md:w-auto md:flex-1"
                            value={field.value}
                            error={field.error}
                            type="text"
                            placeholder="Enter task"
                            required
                          />
                        )}
                      </Field>

                      <Field
                        name={`todos.${index}.deadline`}
                        validate={required("Please enter a deadline.")}
                      >
                        {(field, props) => (
                          <TextInput
                            {...props}
                            class="flex-1 !p-0"
                            type="date"
                            value={field.value}
                            error={field.error}
                            required
                          />
                        )}
                      </Field>

                      <ColorButton
                        color="red"
                        label="Delete"
                        width="auto"
                        // TODO: Remove $() once bug is fixed
                        onClick$={$(() =>
                          remove(todoForm, "todos", { at: index }),
                        )}
                      />
                    </div>
                  ))}
                </div>
                <InputError name={fieldArray.name} error={fieldArray.error} />
              </div>

              <div class="flex flex-wrap gap-5">
                <ColorButton
                  color="green"
                  label="Add new"
                  onClick$={() =>
                    insert(todoForm, "todos", {
                      value: { label: "", deadline: "" },
                    })
                  }
                />
                <ColorButton
                  color="yellow"
                  label="Move first to end"
                  onClick$={() =>
                    move(todoForm, "todos", {
                      from: 0,
                      to: fieldArray.items.length - 1,
                    })
                  }
                />
                <ColorButton
                  color="purple"
                  label="Swap first two"
                  onClick$={() => swap(todoForm, "todos", { at: 0, and: 1 })}
                />
                <ColorButton
                  color="blue"
                  label="Replace first"
                  onClick$={() =>
                    replace(todoForm, "todos", {
                      at: 0,
                      value: { label: "test", deadline: "" },
                    })
                  }
                />
              </div>
            </div>
          )}
        </FieldArray>
      </div>

      <FormFooter of={todoForm} />
    </Form>
  );
});

export const head: DocumentHead = {
  title: "Todo form",
};
