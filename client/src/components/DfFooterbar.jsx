import React, { useContext } from "react";
import { Box, Button, Footer, ResponsiveContext, Text } from "grommet";
import { isSmallSize } from "../utils";
import {EXTERNAL_LINKS} from "../constants";

const DfFooterbar = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Footer
      direction={!isSmallSize(size) ? "row" : "column"}
      align={!isSmallSize(size) ? "center" : undefined}
      pad={{ vertical: "small" }}
      fill="horizontal"
    >
      <Box align={isSmallSize(size) ? "center" : undefined}>
        <Text size="small">
          © 2023 Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box
        direction="row"
        gap="xsmall"
        justify={isSmallSize(size) ? "between" : undefined}
      >
        <Button label="Contact Us" href={EXTERNAL_LINKS.mailTo} target="_blank" />
      </Box>
    </Footer>
  );
};

export { DfFooterbar };
