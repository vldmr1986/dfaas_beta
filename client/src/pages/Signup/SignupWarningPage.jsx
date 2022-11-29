import { Box, Text, Image } from "grommet";

const SignupWarningPage = () => {
  return (
    <Box flex align="center" margin={{ top: "xlarge" }}>
      <Box height="small" width="190px" margin={{ bottom: "large" }}>
        <Image fit="cover" src="/images/something-went-wrong-light.png" />
      </Box>
      <Box
        width="large"
        pad={{ horizontal: "large" }}
        margin={{ top: "large" }}
      >
        <Text size="xxlarge" color="text-strong" textAlign="center">
          Oops! Something went wrong and we are working hard to get you in.
        </Text>
      </Box>
      <Box
        width="large"
        pad={{ horizontal: "xlarge" }}
        margin={{ top: "small" }}
      >
        <Text size="large" color="text-strong" textAlign="center">
          We will email you when ready.
        </Text>
      </Box>
    </Box>
  );
};

export { SignupWarningPage };
