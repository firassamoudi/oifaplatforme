import Box from "@material-ui/core/Box";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

import Button from "../../../common/Button";
import { EntryPasswordFormik } from "../../../common/Entry";
import Typography from "../../../common/Typography";
import AuthComposition from "../../components/AuthComposition";
import AuthInNavigation from "../../components/AuthInNavigation";

const INITIAL_STATE = {
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});

const ResetPassword = () => {
  const params = useParams();
  const token = params.token;
  const [isLoading, setIsLoading] = useState(false);
  // ...
  const onHandler = (data) => {
    const { password } = data;
    setIsLoading(true);
    // ...
    Accounts.resetPassword(token, password, () => {
      setIsLoading(false);
    });
  };
  // ...
  return (
    <Box className="AuthInContainer ForgotPassword">
      <Box className="AuthInContainer__navigation">
        <AuthInNavigation />
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
              Reset password
            </Typography>
            <Typography
              face="Book"
              color="#80858f"
              size="1.6rem"
              height="2.7rem"
              m="0 0 4rem 0"
            >
              Enter the new password.
            </Typography>

            <Formik
              initialValues={{ ...INITIAL_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                onHandler(values);
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
                  <EntryPasswordFormik
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && errors.password}
                  />
                  <Button isLoading={isLoading} onClick={handleSubmit}>
                    Reset Password
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

export default ResetPassword;
