import { useEffect, useState } from "react";

const useErrorMessage = (error) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let message;
    // if error is undefined
    if (!error) {
      message = "";
    }
    // error has message
    else if (error.message) {
      message = error.message;
    }
    // else return error message by type
    else {
      switch (error.type) {
        case "required":
          message = "This field is required.";
          break;
        case "min":
          message = "The value is lower than the required minimum.";
          break;
        case "max":
          message = "The value is greater than the accepted maximum.";
          break;
        case "minLength":
          message =
            "The length of the value is lower than the required minimum.";
          break;
        case "maxLength":
          message =
            "The length of the value is greater than the accepted maximum.";
          break;
        case "pattern":
          message = "The value has invalid characters/pattern.";
          break;
        case "valueAsNumber":
          message = "The value needs to be a number.";
          break;
        case "valueAsDate":
          message = "The value needs to be a date.";
          break;
        default:
          message = "This is invalid input.";
      }
    }
    setErrorMessage(message);
  }, [error]);
  return errorMessage;
};

export { useErrorMessage };
