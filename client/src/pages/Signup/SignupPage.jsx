import { Box, Heading, Text, ResponsiveContext, Anchor } from "grommet";
import { Hpe, Deploy, ContactInfo } from "grommet-icons";
import { useContext } from "react";
import { DfFooterbar, DfMetatag } from "../../components";
import { SignupForm } from "../../containers/Singup";
import { isSmallSize } from "../../utils";
import ezbgimage from "./ezbgimg.jpg";
import {EXTERNAL_LINKS} from "../../constants";

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
        title="HPE Data Fabric"
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
                Welcome to <br /> HPE GreenLake for Data Fabric Beta
              </Heading>
              <Text size="xlarge" color="text-strong">
                Access HPE Ezmeral Data Fabric as a fully managed service. Sign
                up to get 300GB for use as files, objects and streams.
              </Text>

              <Box
                round="small"
                width={isSmallSize(size) ? "100%" : "574px"}
                flex={false}
                background={{ color: "#EFEFEF" }}
                margin={{ top: "medium" }}
                pad="medium"
              >
                <Box flex direction="row" gap="small">
                  <Deploy />
                  <Text color="text-strong" size="medium">
                    After registration you will receive an email from HPE.com
                    with a link to activate your HPE consumer account.
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
                    After activation of your account, click
                    <Anchor
                      margin={{ left: "xsmall", right: "xsmall" }}
                      href={EXTERNAL_LINKS.prodEnv}
                      label={"here"}
                      target={"_blank"}
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    />
                    <Text>to access your Data Fabric.</Text>
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
