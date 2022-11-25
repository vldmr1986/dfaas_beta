import React from "react";
import { Box, FormField, Select } from "grommet";

const DfSelectField = (props) => {
  const {
    a11yTitle,
    name,
    id,
    disabled,
    help,
    info,
    children,
    clear,
    size,
    multiple,
    options,
    placeholder,
    label,
    defaultValue,
    required,
    error,
    onChange: onChangeValue,
    ...rest
  } = props;
  const errorMessage = error;
  return (
    <Box direction="column" fill="horizontal">
      <FormField
        label={label}
        htmlFor={id || `DfSelectField_${name}`}
        error={errorMessage}
        help={help}
        info={info}
        required={required}
        disabled={disabled}
        fill="horizontal"
        margin={label ? undefined : { top: "xsmall" }}
      >
        <Select
          name={name}
          data-testid={id || `DfSelectField_${name}`}
          a11yTitle={a11yTitle}
          placeholder={placeholder}
          options={["India", "USA", "Ukraine"]}
          onChange={(event) => {}}
          disabled={disabled}
          multiple={multiple}
          size={size}
          clear={clear}
          plain
          {...rest}
        >
          {children && children}
        </Select>
      </FormField>
    </Box>
  );
};

DfSelectField.defaultProps = {
  help: "",
  info: "",
  label: "",
  defaultValue: "",
  required: false,
  disabled: false,
  error: undefined,
  onChange: undefined,
};

export { DfSelectField };
