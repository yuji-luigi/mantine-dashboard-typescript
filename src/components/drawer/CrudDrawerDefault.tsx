import { Button, createStyles, Drawer, ScrollArea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import formFields from "../../../data/dataTable/formFields";
import { useCrudSlice } from "../../hooks/redux-hooks/useCrudSlice";
import { LoginFormValues } from "../../types/context/auth/formData";
// import classes from "./CrudDrawerDefault.module.css";
import FormFields from "../input/FormFields";

const useStyles = createStyles((theme) => ({
  drawer: {
    overflow: "scroll",
  },
}));

export function CrudDrawerDefault({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const { query } = useRouter();
  const entity = query.entity as Sections;
  const sectionFormFields: FormFieldInterface[] = formFields[entity];

  /**
   * initialValues
   * defined here
   */
  const { addCrud } = useCrudSlice(entity);
  const form = useForm({
    initialValues: {
      name: "aga",
      password: "",
      termsOfService: false,
    },
    // TODO: Make Validate function and set by string value from formField.
    // validate: 'email' uses this email validator.
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCrud({ entity, newDocument: form.values });
  };
  return (
    <Drawer
      className={classes.drawer}
      opened={opened}
      onClose={() => setOpened(false)}
      title="Register"
      padding="xl"
      size="xl"
    >
      <div>
        <form onSubmit={onSubmit}>
          {sectionFormFields?.map((formField) => (
            <FormFields formField={formField} key={formField.id} />
          ))}
          <Button fullWidth type="submit" mt="xl" size="md">
            Add {entity}!
          </Button>
        </form>
      </div>
    </Drawer>
  );
}
