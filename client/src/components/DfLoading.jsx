import {
  Box,
  Button,
  Card,
  Layer,
  ResponsiveContext,
  Spinner,
  Text,
} from "grommet";
import { useContext } from "react";
import { isSmallSize, uniqueKey } from "../utils";

const DfLoading = ({ layer, text, title, actionButtons }) => {
  const size = useContext(ResponsiveContext);

  if (!layer) {
    return <Spinner data-testid="loadingIcon" />;
  }

  return (
    <Layer background="transparent">
      <Card
        align="center"
        justify="center"
        gap="small"
        pad="medium"
        height={{ min: "small" }}
        width={!isSmallSize(size) ? { min: "medium", max: "large" } : undefined}
      >
        <Spinner data-testid="loadingIcon" />

        <Text color="text-strong" size="large" textAlign="center">
          {title || "Loading..."}
        </Text>

        {text && <Text>{text}</Text>}

        {actionButtons && (
          <Box
            direction="row"
            gap="small"
            margin={{ top: "medium", bottom: "none" }}
          >
            {actionButtons?.map((button, index) => (
              <Button key={uniqueKey(index)} {...button} />
            ))}
          </Box>
        )}
      </Card>
    </Layer>
  );
};

DfLoading.defaultProps = {
  layer: false,
  title: "",
  text: "",
  actionButtons: null,
};

export { DfLoading };
