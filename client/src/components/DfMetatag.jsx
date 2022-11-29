import React from "react";
import Meta from "react-helmet";

const DfMetatag = (props) => {
  const { title, description, href } = props;

  return (
    <Meta
      title={title}
      link={[{ rel: "canonical", href }]}
      meta={[
        { charSet: "utf-8" },
        { name: "description", content: description },
      ]}
    />
  );
};

DfMetatag.defaultProps = {
  href: window.location.href,
};

export { DfMetatag };
