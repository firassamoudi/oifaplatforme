import "./style.scss";

import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik";
// import { withTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import * as Yup from "yup";

import Button from "../../../common/Button";
import { EntryEmailFormik } from "../../../common/Entry";
import Typography from "../../../common/Typography";
import AuthComposition from "../../components/AuthComposition";
import AuthInNavigation from "../../components/AuthInNavigation";

const INITIAL_STATE = {
  email: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Email is required").required("Email is required"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  // ...
  const onHandler = (data, setFieldError) => {
    const { email } = data;
    setIsLoading(true);
    Accounts.forgotPassword({ email }, (err) => {
      if (err) {
        if (err.reason === "User not found") {
          setFieldError("email", "Email not found");
        } else if (err.error === "too-many-requests") {
          store.set("snackbar", {
            key: "login-too-many-requests",
            msg: "Too many failed request, try again after 10 seconds",
            variant: "error",
            autoHideDuration: 10000,
          });
        }
      } else {
        setRequestSent(true);
      }
      // ...
      setIsLoading(false);
    });
  };
  // ...
  return (
    <Box className="AuthInContainer ForgotPassword">
      <Box className="AuthInContainer__navigation">
        <AuthInNavigation signin />
      </Box>
      <Box className="AuthInContainer__grid ForgotPassword__grid">
        <Box className="AuthInContainer__left ForgotPassword__left">
          <AuthComposition />
        </Box>
        <Box className="AuthInContainer__right ForgotPassword__right">
          <Box className="AuthInContainer__right__inner ForgotPassword__right__inner">
            <Typography
              face="Bold"
              color="#1e2e41"
              size="4rem"
              height="5.1rem"
              m="0 0 2rem 0"
            >
              Forgot password?
            </Typography>
            <Typography
              face="Book"
              color="#80858f"
              size="1.6rem"
              height="2.7rem"
              m="0 0 4rem 0"
            >
              Enter the email address you used when you joined and we’ll send
              your instructions to reset your password.
            </Typography>

            {requestSent && (
              <Typography
                face="Book"
                color="green"
                size="1.6rem"
                height="2.7rem"
                m="0 0 4rem 0"
              >
                A request has been sent to your email.
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
              }) => (
                <Form className="AuthInContainer__form ForgotPassword__form">
                  <EntryEmailFormik
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email}
                  />
                  <Button isLoading={isLoading} onClick={handleSubmit}>
                    Send Reset Instructions
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
