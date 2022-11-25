import React from "react";
import { Box, Button, Text } from "grommet";
import { DfSelectField, DfTextField } from "../components";

const SignupForm = () => {
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
          onSubmit={() => {}}
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
    </Box>
  );
};
export { SignupForm };
