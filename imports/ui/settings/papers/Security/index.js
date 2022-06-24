import "./style.scss";

import Box from "@material-ui/core/Box";
import { Accounts } from "meteor/accounts-base";
import React, { useState } from "react";

import Button from "../../../common/Button";
import { EntryPassword } from "../../../common/Entry";
import Typography from "../../../common/Typography";

const trimValue = (value) => value?.trim();

const isValidForm = (form) => {
  const { oldPassword, newPassword } = form;
  // ...
  return !!trimValue(oldPassword) && !!trimValue(newPassword);
};

const Security = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  // ...
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  // ...
  const onInputChange = (inp) => {
    setForm((state) => ({
      ...state,
      ...inp,
    }));
    // ...
    setIsSuccess(false);
    setIsError(false);
  };
  // - Validate Form
  const isValid = isValidForm(form);
  // ...
  const onUpdatePassword = () => {
    const { oldPassword, newPassword } = form;
    setIsLoading(true);
    setIsSuccess(false);
    setIsError("");
    // ...
    Accounts.changePassword(oldPassword, newPassword, (err) => {
      if (err) {
        if (err.reason === "Incorrect password") {
          setIsError("Please verify your current password and try again.");
        }
      } else {
        setIsSuccess(true);
      }
      // ...
      setIsLoading(false);
    });
  };
  // ...
  return (
    <Box className="Settings__Security">
      <EntryPassword
        name="oldPassword"
        label="Current password"
        placeholder="Your current password"
        value={form.oldPassword}
        error={isError}
        onInputChange={onInputChange}
      />
      <EntryPassword
        name="newPassword"
        label="New password"
        placeholder="Your new password"
        value={form.newPassword}
        onInputChange={onInputChange}
      />

      <Box className="Settings__footer">
        <Box className="Settings__footer__inner">
          {!!isSuccess && (
            <Typography
              face="Medium"
              size="1.4rem"
              height="1.6rem"
              style={{
                color: "#ffc857",
                minHeight: "1.6rem",
              }}
            >
              You password has been changed successfully
            </Typography>
          )}
          <Button
            isLoading={isLoading}
            disabled={!isValid}
            onClick={onUpdatePassword}
            style={{ height: "5rem" }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Security;
