

import { color } from "../constants";

import React from "react";

function ImgContainer(props) {
  const { myWidth, myHeight, myBorderRadius, children } = props;
  return (
    <div
      style={{
        padding: "10px",
        width: {mWidth},
        height: {myHeight},
        borderRadius: {myBorderRadius},
        backgroundColor: color.YELLLOW_COLOR

      }}
    >
      {children}
    </div>
  );
}

export default ImgContainer;
