import "./style.scss";

import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik";
import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import store from "/imports/libs/store";

import Button from "../../../common/Button";
import {
  EntryCheckBox,
  EntryEmailFormik,
  EntryPasswordFormik,
} from "../../../common/Entry";
import NavLink from "../../../common/NavLink";
import Typography from "../../../common/Typography";
import AuthComposition from "../../components/AuthComposition";
import AuthInNavigation from "../../components/AuthInNavigation";

const INITIAL_STATE = {
  selector: "",
  password: "",
  // ...
  remember: false,
};

const FORM_VALIDATION = Yup.object().shape({
  selector: Yup.string()
    .email("Email is required")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [accountIsPending, setAccountIsPending] = useState(false);
  const [emailIsPending, setEmailIsPending] = useState(false);
  // ...
  const onHandler = (data, setFieldError) => {
    const { selector, password } = data;
    setIsLoading(true);
    Meteor.loginWithPassword(selector, password, (err) => {
      if (err) {
        // ...
        if (err.reason === "Incorrect password") {
          setFieldError("password", "Incorrect password");
        } else if (err.reason === "User not found") {
          setFieldError("selector", "Account not found");
        } else if (err.reason === "Email not verified") {
          setEmailIsPending(true);
        } else if (err.reason === "Account not accepted") {
          setAccountIsPending(true);
        } else if (err.error === "too-many-requests") {
          store.set("snackbar", {
            key: "login-too-many-requests",
            msg: "Too many failed request, try again after 10 seconds",
            variant: "error",
            autoHideDuration: 10000,
          });
        }
      }
      // ...
      setIsLoading(false);
    });
  };
  // ...
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        if (!isLoading) {
          onHandler();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  // ...
  return (
    <Box className="AuthInContainer SignIn">
      <Box className="AuthInContainer__navigation">
        <AuthInNavigation signup />
      </Box>
      <Box className="AuthInContainer__grid SignIn__grid">
        <Box className="AuthInContainer__left SignIn__left">
          <AuthComposition />
        </Box>
        <Box className="AuthInContainer__right SignIn__right">
          <Box className="AuthInContainer__right__inner SignIn__right__inner">
            <Typography
              face="Bold"
              color="#1e2e41"
              size="4rem"
              height="5.1rem"
              m="0 0 2rem 0"
            >
              Welcome to OIFA
            </Typography>

            <Typography
              face="Book"
              color="#80858f"
              size="1.6rem"
              height="2.7rem"
              m="0 0 4rem 0"
            >
              Discover the top Open innovation challenges in Africa for
              Startups, Creatives and Developers
            </Typography>

            {accountIsPending && (
              <Typography
                face="Book"
                color="#f44336"
                size="1.4rem"
                height="1.6rem"
                m="0 0 2rem 0"
              >
                Your account is pending approval, please verify with an admin
              </Typography>
            )}

            {emailIsPending && (
              <Typography
                face="Book"
                color="#f44336"
                size="1.4rem"
                height="1.6rem"
                m="0 0 2rem 0"
              >
                Please verify your email to validate you account.
              </Typography>
            )}

            <Formik
              initialValues={{ ...INITIAL_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, { setFieldError }) => {
                onHandler(values, setFieldError);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => {
                // ...
                return (
                  <Form className="AuthInContainer__form SignIn__form">
                    <EntryEmailFormik
                      name="selector"
                      value={values.selector}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.selector && errors.selector}
                    />
                    <EntryPasswordFormik
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && errors.password}
                    />
                    <Box className="__remember">
                      <EntryCheckBox
                        name="remember"
                        value={values.remember}
                        onInputChange={() => {
                          setFieldValue("remember", !values.remember);
                        }}
                        label={
                          <Typography
                            face="Medium"
                            color="#80858f"
                            size="1.3rem"
                            height="1.7rem"
                          >
                            Remember me
                          </Typography>
                        }
                      />
                      <Box className="__remember__forgot-password">
                        <NavLink to="/auth/forgot-password">
                          <Typography
                            face="Medium"
                            color="#03256c"
                            size="1.3rem"
                            height="1.5rem"
                            style={{ textDecoration: "underline" }}
                          >
                            Forgot password?
                          </Typography>
                        </NavLink>
                      </Box>
                    </Box>
                    <Button isLoading={isLoading} onClick={handleSubmit}>
                      Sign in
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
