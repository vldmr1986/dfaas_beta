import React from "react";
import { Box, Button, Image, Text } from "grommet";
import { DfModal, DfSelectField, DfTextField } from "../components";
import { useState } from "react";

const SignupForm = () => {
  const [open, setOpen] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const actionButtons = [
    {
      label: "Cancel",
      onClick: () => {
        setOpen(false);
      },
    },
    {
      primary: true,
      label: "Accept and Register",
      onClick: () => {
        setOpen(false);
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
          Sign Up for GreenLake for Data Fabric beta access
        </Text>

        <form
          onSubmit={handleSubmit}
          data-testid="signupForm"
          className="DfForm full"
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <DfTextField
            id="signUpName"
            name="name"
            label="Name"
            required
            error="Name is required"
          />
          <DfTextField
            id="signUpSurname"
            name="Surname"
            label="Surname"
            required
            type="Surname"
            error="Surname is required"
          />
          <DfTextField
            id="signUpEmail"
            name="Email"
            label="Email"
            required
            type="Email"
            error="Email is required"
          />
          <DfSelectField
            id="signUpCountry"
            name="Country"
            options={["India", "USA", "Ukraine"]}
            value={"India"}
            label="Country"
            required
            error="Country is required"
            onChange={({ option }) => {}}
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
              label="Read the HPE terms & conditions to Register"
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
          <Image fit="cover" src="/images/terms-and-conditions.png" />
        </Box>
      </DfModal>
    </Box>
  );
};
export { SignupForm };
