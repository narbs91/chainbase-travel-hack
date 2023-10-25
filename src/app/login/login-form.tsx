"use client";

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

const LoginForm = (): JSX.Element => {
  const [disableSubmit, setDisableSumbit] = useState(true);

  const validateEmail = (email: string) => {
    let error;
    if (!email) {
      error = "An email is required to login";
      setDisableSumbit(true);
    } else if (!isEmail(email)) {
      error = "Not a valid email, please try again";
      setDisableSumbit(true);
    } else {
      setDisableSumbit(false);
    }

    return error;
  };

  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props) => (
          <Form>
            <Field name="email" validate={validateEmail}>
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Enter your Email Address</FormLabel>
                  <Input type="email" {...field} placeholder="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="teal"
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

export default LoginForm;
