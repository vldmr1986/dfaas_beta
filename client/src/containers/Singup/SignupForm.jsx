import React, { useEffect } from "react";
import { Box, Button, Text } from "grommet";
import {
  DfLoading,
  DfModal,
  DfSelectField,
  DfTextField,
} from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import licenseContent from "../../euula.pdf";
import { countries, dfRegEx } from "../../utils";
import get from "lodash/get";
import { useUserMutations } from "../../hooks";
import {ALLOWED_EMAIL_DOMAINS, BACKEND_STATUSES} from "../../constants";

const FORM_INPUT_NAMES = {
  NAME: "name",
  SURNAME: "surname",
  EMAIL: "email",
  COUNTRY: "country",
};

const defaultValues = {
  [FORM_INPUT_NAMES.NAME]: "",
  [FORM_INPUT_NAMES.SURNAME]: "",
  [FORM_INPUT_NAMES.EMAIL]: "",
  [FORM_INPUT_NAMES.COUNTRY]: "US",
};

const SignupForm = () => {
  const { registerUser } = useUserMutations();
  const { mutate: signupUser, isSuccess, isLoading, data: registrationResponse } = registerUser;
  const {
    handleSubmit,
    getValues,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && registrationResponse.status !== BACKEND_STATUSES.ERROR) {
      setOpen(false);
      navigate("/success");
    } else {
      setOpen(false);
    }
  }, [isSuccess]);

  const onSubmit = () => {
    if (Object.entries(errors).length === 0) {
      setOpen(true);
    }
  };

  const validateInput = (value, field) => {
    switch (field) {
      case FORM_INPUT_NAMES.EMAIL:
        const emailMatch = dfRegEx.email_address.exec(value);
        if (!emailMatch) {
          return "Enter a valid email address.";
        }
        if (!ALLOWED_EMAIL_DOMAINS.includes(emailMatch?.groups?.domain)) {
          return "Enter your corporate email address.";
        }
        return true;
      case FORM_INPUT_NAMES.COUNTRY:
        if (value === "OTHERS") {
          return "Sorry, service not available in your country at present.";
        }
        return true;
      default:
        return true;
    }
  };

  const actionButtons = [
    {
      label: "Cancel",
      disabled: isLoading,
      onClick: () => {
        setOpen(false);
      },
    },
    {
      primary: true,
      disabled: isLoading,
      label: "Accept and Register",
      onClick: () => {
        const data = getValues();
        localStorage.setItem("email", data.email);
        signupUser(data);
      },
    },
  ];

  return (
    <>
      <Box
        pad="medium"
        direction="row"
        flex="grow"
        align="start"
        justify="center"
        responsive={false}
      >
        <Box direction="column" align="start" width="100%">
          <Text size="xxlarge" weight="bold" color="text-strong">
            Sign Up
          </Text>
          <Text size="small" color="text-strong">
            Sign up for HPE GreenLake for Data Fabric beta.
          </Text>

          <form
            id="signupForm"
            onSubmit={handleSubmit(onSubmit)}
            data-testid="signupForm"
            noValidate={false}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <DfTextField
              id={FORM_INPUT_NAMES.NAME}
              name={FORM_INPUT_NAMES.NAME}
              label="First Name"
              control={control}
              required
              error={get(errors, FORM_INPUT_NAMES.NAME)}
            />
            <DfTextField
              id={FORM_INPUT_NAMES.SURNAME}
              name={FORM_INPUT_NAMES.SURNAME}
              label="Last Name"
              control={control}
              required
              error={get(errors, FORM_INPUT_NAMES.SURNAME)}
            />
            <DfTextField
              id={FORM_INPUT_NAMES.EMAIL}
              name={FORM_INPUT_NAMES.EMAIL}
              label="Email"
              control={control}
              rules={{
                validate: (value) =>
                  validateInput(value, FORM_INPUT_NAMES.EMAIL),
              }}
              required
              error={get(errors, FORM_INPUT_NAMES.EMAIL)}
            />
            <DfSelectField
              id={FORM_INPUT_NAMES.COUNTRY}
              name={FORM_INPUT_NAMES.COUNTRY}
              options={countries}
              label="Country"
              control={control}
              required
              onChange={() => trigger(FORM_INPUT_NAMES.COUNTRY)}
              error={get(errors, FORM_INPUT_NAMES.COUNTRY)}
              rules={{
                validate: (value) =>
                  validateInput(value, FORM_INPUT_NAMES.COUNTRY),
              }}
            />
            {registrationResponse?.status === "ERROR" && registrationResponse?.message
                ? <Text margin={{top: "small"}} color={"red"} weight={"bolder"}>Error: {registrationResponse?.message}</Text>
                : null
            }


            <Box
              direction="row"
              margin={{ top: "medium" }}
              align={"center"}
              background={{ color: "transparent", dark: false }}
            >
              <Button
                type="submit"
                primary
                disabled={isLoading}
                reverse
                label="Read the HPE Terms & Conditions to Register"
              />
            </Box>
          </form>
        </Box>
        <DfModal
          id="termsAndConditionsModal"
          title="Terms & Conditions"
          open={open}
          setOpen={setOpen}
          onClose={() => {}}
          actionButtons={actionButtons}
          width="large"
          closeOnClickOutside={false}
        >
          <Box>
            <object
              style={{ minHeight: "500px" }}
              data={licenseContent}
            ></object>
          </Box>
        </DfModal>
      </Box>
      {isLoading && <DfLoading layer title="Signing Up..." />}
    </>
  );
};
export { SignupForm };
