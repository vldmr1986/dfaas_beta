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
      <Box height="xsmall" width="160px" margin={{ bottom: "large" }}>
        <Image fit="cover" src="/images/warning.png" />
      </Box>
      <Box
        width="xlarge"
        pad={{ horizontal: "large" }}
        margin={{ top: "large" }}
      >
        <Text size="xxlarge" color="text-strong" textAlign="center">
          Sorry, at this point of time we cannot activate the beta access for
          the Greenlake for Data Fabric.
        </Text>
      </Box>
      <Box
        width="large"
        pad={{ horizontal: "xlarge" }}
        margin={{ top: "small" }}
      >
        <Text size="large" color="text-strong" textAlign="center">
          Your request has been noted, and we will get in touch with you via the
          email you provided to authorize your access.
        </Text>
      </Box>
    </Box>
  );
};

export { SignupWarningPage };
