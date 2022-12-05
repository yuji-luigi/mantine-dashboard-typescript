import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useNotifications, showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useForm } from "@mantine/form";
import useAuth from "../../hooks/useAuth";
import { LoginFormValues } from "../../types/context/auth/formData";
import GuestGuard from "../../guards/GuestGuard";
import { AUTH } from "../../path/page-paths";
import Page from "../../components/Page";
import { Icons } from "../../data/icons";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: "cover",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  link: {
    color: "black",
  },
  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function LoginPageComponent() {
  const { classes } = useStyles();
  const { login } = useAuth();
const a = process.env.NODE_ENV
console.log(a)
  const { notifications, queue } = useNotifications();

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
    } catch (error: any) {
      showNotification({
        title: "Error",
        color: "red",
        icon: <Icons.alert />,
        message: error.message || error || "connection error",
        autoClose: 2000,
      });
      console.error(error.message || error);
    }
  };
  return (
    <GuestGuard>
      <Page title="Login">
        <form
          className={classes.wrapper}
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
          <Paper className={classes.form} radius={0} p={30}>
            <Title
              order={2}
              className={classes.title}
              align="center"
              mt="md"
              mb={50}
            >
              Welcome back to Flatmates!
            </Title>

            <TextInput
              name="email"
              label="Email address"
              placeholder="hello@gmail.com"
              size="md"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              name="password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...form.getInputProps("password")}
            />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth type="submit" mt="xl" size="md">
              Login
            </Button>

            <Text align="center" mt="md">
              Don&apos;t have an account?{" "}
              <Link className={classes.link} href={AUTH.SIGNUP}>
                Register
              </Link>
            </Text>
          </Paper>
        </form>
      </Page>
    </GuestGuard>
  );
}

export default LoginPageComponent;
