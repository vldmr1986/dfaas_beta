import React from "react";
import { Box, FormField, Select } from "grommet";
import { Controller } from "react-hook-form";
import { get } from "lodash";
import { useErrorMessage } from "../hooks";

const DfSelectField = (props) => {
  const {
    control,
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
    rules,
    required,
    error,
    onChange: onChangeValue,
    ...rest
  } = props;
  const hasObjectOptions = typeof options[0] === "object";
  const errorMessage = useErrorMessage(error);

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
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              name={name}
              data-testid={id || `DfSelectField_${name}`}
              a11yTitle={a11yTitle}
              value={hasObjectOptions ? { label: name, value } : value}
              placeholder={placeholder}
              options={options}
              onChange={(event) => {
                const nextValue = hasObjectOptions
                  ? get(event, "value.value")
                  : get(event, "value");
                onChange(nextValue);
                onChangeValue && onChangeValue(nextValue);
              }}
              labelKey={hasObjectOptions ? "label" : undefined}
              valueKey={hasObjectOptions ? "value" : undefined}
              defaultValue={
                defaultValue || get(options, [0, "value"], options[0] || "")
              }
              disabled={disabled}
              multiple={multiple}
              size={size}
              clear={clear}
              plain
              // Disabling the following props-no-spreading check because the Select has large set of props.
              // Refer to grommet docs for all props details (https://v2.grommet.io/select#props)
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...rest}
              ref={ref}
            >
              {children && children}
            </Select>
          )}
          defaultValue={defaultValue}
          rules={{ required, ...rules }}
        />
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
