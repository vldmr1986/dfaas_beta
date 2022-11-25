import { Box, Heading, Text, ResponsiveContext, Anchor } from "grommet";
import { Hpe, Deploy, ContactInfo } from "grommet-icons";
import { useContext } from "react";
import { DfFooterbar, DfMetatag } from "../../components";
import { SignupForm } from "../../containers";
import { isSmallSize } from "../../utils";
import ezbgimage from "./ezbgimg.jpg";

const SignupPage = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      fill
      align="center"
      background={{
        image: `url(${ezbgimage})`,
        size: "cover",
        dark: true, // always in dark mode for log-in page
      }}
    >
      <DfMetatag
        title="HPE Ezmeral Runtime Enterprise | Signup Page"
        description="Signup page to access HPE Ezmeral Runtime Enterprise and HPE Ezmeral ML Ops"
      />
      <Box
        justify="between"
        pad="medium"
        width={{ max: "xxlarge" }}
        responsive={false}
        fill
      >
        <Box direction="row" align="center" gap="small">
          <Hpe size={isSmallSize(size) ? "medium" : "large"} color="brand" />
          <Box direction="row" gap="xxsmall">
            <Text color="text-strong" weight="bold">
              Hewlett
            </Text>
            <Text color="text-strong">Packard Enterprise</Text>
          </Box>
        </Box>
        <Box
          direction={isSmallSize(size) ? "column" : "row"}
          gap="large"
          align="center"
          justify="center"
          fill
        >
          {!isSmallSize(size) ? (
            <Box pad={{ right: "large" }} round="small" width="large">
              <Heading
                size="medium"
                margin={{ top: "none", bottom: "large" }}
                level={1}
              >
                Welcome to <br /> GreenLake for Data Fabric
              </Heading>
              <Text size="xlarge" color="text-strong">
                AI / ML, Data Analytics, App Modernization, DevOps, and more.
              </Text>

              <Box
                round="small"
                width={isSmallSize(size) ? "100%" : "574px"}
                flex={false}
                background={{ color: "#ffffff" }}
                margin={{ top: "medium" }}
                pad="medium"
              >
                <Box flex direction="row" gap="small">
                  <Deploy />
                  <Text color="text-strong" size="medium">
                    After registration you may receive an email with the link to
                    activate your HPE consumer account.
                  </Text>
                </Box>
                <Box
                  flex
                  direction="row"
                  gap="small"
                  margin={{ top: "medium" }}
                >
                  <ContactInfo />
                  <Text color="text-strong" size="medium">
                    After activation of your account, login at &nbsp;
                    <Anchor
                      href="#"
                      label="http://client.greenlake.hpe.gl-intg.com/"
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    />{" "}
                    to access the Beta program.
                  </Text>
                </Box>
              </Box>
            </Box>
          ) : (
            <></>
          )}

          <Box
            round="small"
            width={isSmallSize(size) ? "100%" : "574px"}
            flex={false}
            background={{ color: "#ffffff" }}
          >
            <SignupForm />
          </Box>
        </Box>
        <DfFooterbar />
      </Box>
    </Box>
  );
};

export { SignupPage };
