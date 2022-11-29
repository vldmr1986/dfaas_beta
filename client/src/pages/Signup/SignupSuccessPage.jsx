import { Box, Image, Text, Anchor } from "grommet";
import {LINK_ENV} from "../../constants";

const SignupSuccessPage = () => {
  const email = localStorage.getItem("email");
  return (
    <Box flex align="center" margin={{ top: "medium" }}>
      <Box height="xsmall" width="xsmall">
        <Image fit="cover" src="/images/signup-success.png" />
      </Box>
      <Box flex direction="row" gap="small">
        <Box width="12px">
          <Image fit="contain" src="/images/roadmap.png" />
        </Box>
        <Box margin={{ top: "large" }} width="575px">
          <Text size="xxlarge" color="text-strong">
            Your registration is completed.
          </Text>
          <Box margin={{ top: "large" }}>
            <Text size="medium" color="text-strong">
              Activate Account
            </Text>
            <Text size="large" color="text-strong">
              You’re almost there! We have sent an email to {email}
            </Text>
            <Text size="large" color="text-strong">
              <Anchor href="#" color="text-strong">
                Resend mail
              </Anchor>{" "}
              if you did not recieve an email.
            </Text>
          </Box>
          <Box margin={{ top: "large" }}>
            <Text size="medium" color="text-weak">
              Access GreenLake for Data Fabric Dashboard.
            </Text>
            <Text size="large" color="text-weak">
              Go to link{" "}
              <Anchor color="text-weak" href={LINK_ENV} target={"_blank"}>
                {LINK_ENV}
              </Anchor>
              to access the Beta program.
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { SignupSuccessPage };
