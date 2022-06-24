import "./style.scss";

import Box from "@material-ui/core/Box";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import store from "/imports/libs/store";

import Button from "../../../../common/Button";
import { EntryEmail, EntryPassword, EntryText } from "../../../../common/Entry";
import Typography from "../../../../common/Typography";
import AuthComposition from "../../../components/AuthComposition";
import AuthInNavigation from "../../../components/AuthInNavigation";

const MemberSignup = () => {
  const params = useParams();
  const token = params.token;
  // ...
  const [data, setData] = useState({
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError: "",
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const onInputChange = (inp) => {
    setData((state) => ({ ...state, ...inp }));
  };
  // ...
  const onHandler = () => {
    const { firstName, lastName, password } = data;
    Meteor.call(
      "user.member.register.set",
      { firstName, lastName, token },
      () => {
        Accounts.resetPassword(token, password, (err) => {
          if (err && err.reason === "Password may not be empty") {
            onInputChange({ passwordError: "Incorrect password" });
          }
          if (err && err.reason === "Token expired") {
            store.set("snackbar", {
              key: "admin-member-token-expired",
              msg: "Token expired",
              variant: "error",
              autoHideDuration: 4000,
            });
          }
        });
      }
    );
  };
  // ...
  useEffect(() => {
    Meteor.call("user.member.register.get", { token }, (err, res) => {
      if (err) {
        return store.set("snackbar", {
          key: "admin-member-user-not-found",
          msg: "User not found",
          variant: "error",
          autoHideDuration: 4000,
        });
      }
      const { firstName, lastName, email } = res;
      setData((state) => ({ ...state, firstName, lastName, email }));
    });
  }, [token]);
  // ...
  return (
    <Box className="AuthInContainer MemberSignup">
      <Box className="AuthInContainer__navigation">
        <AuthInNavigation />
      </Box>
      <Box className="AuthInContainer__grid MemberSignup__grid">
        <Box className="AuthInContainer__left MemberSignup__left">
          <AuthComposition />
        </Box>
        <Box className="AuthInContainer__right MemberSignup__right">
          <Box className="AuthInContainer__right__inner MemberSignup__right__inner">
            <Typography
              face="Bold"
              color="#1e2e41"
              size="4rem"
              height="5.1rem"
              m="0 0 2rem 0"
            >
              Welcome to OIFA - DEV
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

            <Box
              component="form"
              className="AuthInContainer__form MemberSignup__form"
            >
              <EntryText
                label="First name"
                name="firstName"
                placeholder="Your first name"
                value={data.firstName}
                onInputChange={onInputChange}
                error={data.firstNameError}
              />
              <EntryText
                label="Last name"
                name="lastName"
                placeholder="Your last name"
                value={data.lastName}
                onInputChange={onInputChange}
                error={data.lastNameError}
              />
              <EntryEmail
                name="email"
                value={data.email}
                onInputChange={onInputChange}
                readOnly
              />
              <EntryPassword
                name="password"
                label="Password"
                value={data.password}
                onInputChange={onInputChange}
                error={data.passwordError}
              />

              <Button big blue onClick={onHandler}>
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberSignup;
