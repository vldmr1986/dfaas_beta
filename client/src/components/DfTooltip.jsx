import React from "react";
import { Box, Text, Tip } from "grommet";
import isArray from "lodash/isArray";
import { uniqueKey } from "../utils";

const DfTooltip = (props) => {
  const {
    children,
    content,
    color,
    textAlign,
    textSize,
    textMargin,
    dropProps,
    pad,
    gap,
    width,
    weight,
  } = props;

  const contentValues = isArray(content) ? content : [content];
  return (
    <Tip
      dropProps={dropProps}
      content={
        <Box pad={pad} gap={gap} width={width} direction="column">
          {contentValues.map((contentValue, index) => (
            <Text
              key={uniqueKey(index)}
              alignSelf={contentValues.length > 1 ? "start" : "center"}
              textAlign={textAlign}
              weight={weight}
              size={textSize}
              color={color}
              margin={textMargin}
              wordBreak="break-all"
            >
              {contentValue}
            </Text>
          ))}
        </Box>
      }
    >
      {children}
    </Tip>
  );
};

DfTooltip.defaultProps = {
  color: "text",
  textAlign: "center",
  textSize: "medium",
  textMargin: "none",
  pad: "",
  gap: "",
  width: "",
  weight: "normal",
  dropProps: { align: { top: "bottom" } },
};

export { DfTooltip };
