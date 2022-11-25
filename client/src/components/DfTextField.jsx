import React from "react";
import { Box, FormField, TextInput } from "grommet";

const DfTextField = (props) => {
  const {
    label,
    name,
    placeholder,
    required,
    type = "text",
    help,
    info,
    disabled,
    readOnly,
    displayRequired,
    min,
    error,
  } = props;
  const errorMessage = error;

  return (
    <Box direction="column" fill="horizontal" size="large">
      <FormField
        label={label}
        htmlFor={name}
        required={required || displayRequired}
        error={errorMessage}
        help={help}
        info={info}
        disabled={disabled}
        fill="horizontal"
        margin={label ? undefined : { top: "xsmall" }}
      >
        <TextInput
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          readOnly={readOnly}
          plain
          min={min}
        />
      </FormField>
    </Box>
  );
};

DfTextField.defaultProps = {
  label: "",
  placeholder: "",
  required: false,
  error: undefined,
  type: "",
  help: "",
  info: "",
  disabled: false,
  readOnly: false,
  displayRequired: false,
  min: undefined,
};

export { DfTextField };
