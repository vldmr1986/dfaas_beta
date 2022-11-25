import React, { useContext } from "react";
import { Box, Button, Heading, Layer, ResponsiveContext, Text } from "grommet";
import { FormClose } from "grommet-icons";
import { isSmallSize, uniqueKey } from "../utils";
import { DfTooltip } from "./DfTooltip";
import { DfButtonSet } from "./DfButtonSet";

const DfModal = (props) => {
  const {
    id,
    headerLogo,
    title,
    subTitle,
    actionButtons,
    children,
    open,
    hideClose,
    onClose,
    width,
    position,
    setOpen,
    closeOnClickOutside,
    footerlogo,
  } = props;

  const size = useContext(ResponsiveContext);

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  return (
    <>
      {open && (
        <Layer
          id={id}
          position={position}
          onClickOutside={closeOnClickOutside ? handleClose : undefined}
          onEsc={handleClose}
        >
          <Box pad="medium" width={!isSmallSize(size) ? width : undefined}>
            <Box
              flex={false}
              direction="row"
              justify="between"
              align="start"
              margin={{ bottom: "small" }}
            >
              <Box>
                {headerLogo && (
                  <Box align="start" margin={{ bottom: "small" }}>
                    {headerLogo}
                  </Box>
                )}
                {title && (
                  <Heading level={2} size="small" margin="none">
                    {title}
                  </Heading>
                )}
                {subTitle && <Text color="text-strong">{subTitle}</Text>}
              </Box>
              {!hideClose && (
                <Box justify="center">
                  <DfTooltip content="Close">
                    <Button
                      a11yTitle="Close"
                      icon={<FormClose />}
                      onClick={handleClose}
                    />
                  </DfTooltip>
                </Box>
              )}
            </Box>
            <Box overflow="auto" flex>
              {children}
            </Box>
            <Box
              flex={false}
              direction={!isSmallSize(size) ? "row" : "column"}
              justify={footerlogo ? "between" : "end"}
            >
              <Box width="fit-content" gap="small">
                {footerlogo}
              </Box>
              {actionButtons && (
                <DfButtonSet justify="end" stack>
                  {actionButtons.map((button, index) => (
                    <Button key={uniqueKey(index)} {...button} />
                  ))}
                </DfButtonSet>
              )}
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

DfModal.defaultProps = {
  id: "",
  subTitle: "",
  headerLogo: null,
  actionButtons: undefined,
  open: false,
  hideClose: false,
  onClose: () => {},
  position: "center",
  width: "medium",
  closeOnClickOutside: true,
  footerlogo: null,
};

export { DfModal };
