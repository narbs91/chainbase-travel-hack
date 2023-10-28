import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import isEmail from "validator/lib/isEmail";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { magic, magicAdmin } from "@/auth/magic";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/context";
import { User } from "../types/user";

const LoginForm = (): JSX.Element => {
  const [disableSubmit, setDisableSubmit] = useState(true);
  const { setUser } = useGlobalContext();

  const router = useRouter();

  const validateEmail = (email: string) => {
    let error;
    if (!email) {
      error = "An email is required to login";
      setDisableSubmit(true);
    } else if (!isEmail(email)) {
      error = "Not a valid email, please try again";
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }

    return error;
  };

  const handleLoginWithProvider = async (email: string) => {
    const user = await loginUser(email);
    setUser(user);
    router.push("/dashboard");
  };

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, actions) => {
          await handleLoginWithProvider(values.email);
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel color={"black"}>
                    Enter your Email Address
                  </FormLabel>
                  <Input type="email" {...field} placeholder="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="blue"
              isLoading={props.isSubmitting}
              type="submit"
              isDisabled={disableSubmit}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

async function loginUser(email: string): Promise<User> {
  let user = {} as User;

  try {
    if (magic) {
      const didToken = await magic.auth.loginWithMagicLink({
        email,
      });

      // Validate the DID token that comes back from Magic
      const isDidTokenValid = await validateUser(didToken as string);

      if (isDidTokenValid) {
        const userMetadata = await magic.user.getMetadata();
        user.email = userMetadata.email;
        user.walletAddress = userMetadata.publicAddress;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return user;
}

async function validateUser(didToken: string): Promise<boolean> {
  try {
    if (magicAdmin) {
      await magicAdmin.token.validate(didToken);
    }
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
}

export default LoginForm;
