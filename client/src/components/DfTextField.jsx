import React from "react";
import { Box, FormField, TextInput } from "grommet";
import { Controller } from "react-hook-form";
import { useErrorMessage } from "../hooks";
import get from "lodash/get";

const DfTextField = (props) => {
  const {
    control,
    label,
    name,
    placeholder,
    required,
    rules,
    id,
    error,
    type = "text",
    help,
    info,
    defaultValue,
    disabled,
    readOnly,
    displayRequired,
    suggestions,
    min,
  } = props;
  const errorMessage = useErrorMessage(error);

  return (
    <Box direction="column" fill="horizontal">
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
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              data-testid={id || `DfTextField.${name}`}
              name={name}
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
              type={type}
              ref={ref}
              disabled={disabled}
              readOnly={readOnly}
              plain
              min={min}
              suggestions={suggestions}
              onSuggestionSelect={(event) => {
                const selectedValue = get(event, "target.textContent");
                onChange(selectedValue);
              }}
            />
          )}
          defaultValue={defaultValue}
          rules={{ required, ...rules }}
        />
      </FormField>
    </Box>
  );
};

DfTextField.defaultProps = {
  id: "",
  label: "",
  placeholder: "",
  required: false,
  rules: {},
  error: undefined,
  type: "",
  help: "",
  info: "",
  defaultValue: "",
  disabled: false,
  readOnly: false,
  displayRequired: false,
  suggestions: [],
  min: undefined,
};

export { DfTextField };
