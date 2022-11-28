import { Box, Text, Image } from "grommet";

const SignupWarningPage = () => {
  return (
    // <Box>
    //   <Box height="small" width="small">
    //     <Image fit="cover" src="/images/warning.png" />
    //   </Box>
    //   <Heading level={3}>Oops! Looks like the Beta got oversubscribed.</Heading>
    //   <Text>
    //     However stay tuned, we are working hard to get you in. We will email you
    //     when ready.
    //   </Text>
    // </Box>
    <Box flex align="center" margin={{ top: "xlarge" }}>
      <Box height="small" width="250px" margin={{ bottom: "large" }}>
        <Image fit="cover" src="/images/error.png" />
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
