import { Box, Header, ResponsiveContext, Text } from "grommet";
import { useContext } from "react";
import { isSmallSize } from "../utils/utils";
import { Hpe } from "grommet-icons";

const DfHeaderbar = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Header
      pad={{ vertical: "small", horizontal: "medium" }}
      background="background-front"
    >
      <Box direction="row" align="center" gap="medium">
        <Box
          gap={isSmallSize(size) ? "none" : "small"}
          direction={isSmallSize(size) ? "column" : "row"}
        >
          <Hpe color="plain" />
          <Box direction="row" gap="small">
            <Text color="text-strong">
              <strong>HPE</strong>&nbsp; Ezmeral Runtime Enterprise
            </Text>
          </Box>
        </Box>
      </Box>
    </Header>
  );
};
export { DfHeaderbar };
