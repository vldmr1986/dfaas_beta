import { useMutation } from "react-query";
import { api } from "../utils";

const useUserMutations = () => {
  const registerUser = useMutation(
    ({ formData }) =>
      api({
        method: "POST",
        url: "/api/signup",
        data: formData,
      }),
    {
      onSettled: (data, error, { name, clusterId, showFeedback = true }) => {
        if (error && showFeedback) {
          console.log("error=>", error);
        }
      },
    }
  );

  return { registerUser };
};

export { useUserMutations };
