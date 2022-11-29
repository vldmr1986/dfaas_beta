import React from "react";
import { Box, Button, Text } from "grommet";
import { DfModal, DfSelectField, DfTextField } from "../components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import licenseContent from "../euula.pdf";
import { countries } from "../utils";
import get from "lodash/get";

const FORM_INPUT_NAMES = {
  NAME: "name",
  SURNAME: "surname",
  EMAIL: "email",
  COUNTRY: "country",
};

const SignupForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [FORM_INPUT_NAMES.NAME]: "",
      [FORM_INPUT_NAMES.SURNAME]: "",
      [FORM_INPUT_NAMES.EMAIL]: "",
      [FORM_INPUT_NAMES.COUNTRY]: "IN",
    },
  });
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    if (data) {
      setOpen(true);
    }
    // console.log(data)
  };

  const navigate = useNavigate();

  const actionButtons = [
    {
      label: "Cancel",
      onClick: () => {
        setOpen(false);
        navigate("/error");
      },
    },
    {
      primary: true,
      label: "Accept and Register",
      onClick: () => {
        setOpen(false);
        navigate("/success");
      },
    },
  ];

  return (
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
          Sign up for HPE GreenLake for Data Fabric beta access
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
            label="Name"
            control={control}
            required
            error={get(errors, FORM_INPUT_NAMES.NAME)}
          />
          <DfTextField
            id={FORM_INPUT_NAMES.SURNAME}
            name={FORM_INPUT_NAMES.SURNAME}
            label="Surname"
            control={control}
            required
            error={get(errors, FORM_INPUT_NAMES.SURNAME)}
          />
          <DfTextField
            id={FORM_INPUT_NAMES.EMAIL}
            name={FORM_INPUT_NAMES.EMAIL}
            label="Email"
            type="Email"
            control={control}
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
            error={get(errors, FORM_INPUT_NAMES.COUNTRY)}
          />
          <Box
            direction="row"
            margin={{ top: "medium" }}
            background={{ color: "transparent", dark: false }}
          >
            <Button
              type="submit"
              primary
              reverse
              label="Read the HPE terms & conditions to Registerss"
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
      >
        <Box>
          <object style={{ minHeight: "500px" }} data={licenseContent}></object>
        </Box>
      </DfModal>
    </Box>
  );
};
export { SignupForm };
