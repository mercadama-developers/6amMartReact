import React from "react";

import ReactPlayer from "react-player";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";

const InstructionVideo = () => {
  return (
    <CustomStackFullWidth>
      <CustomStackFullWidth
        mt={{ xs: ".5rem", sm: "1.5rem", md: "2rem" }}
        p=".5rem"
        sx={{ maxWidth: "615px", maxHeight: "351px", height: "100%" }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=-gSOyS4ynQo&t=6s"
          height="100%"
          width="100%"
          controls={false}
        />
      </CustomStackFullWidth>
    </CustomStackFullWidth>
  );
};

export default InstructionVideo;
