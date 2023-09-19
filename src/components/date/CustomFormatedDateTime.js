import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";

const CustomFormatedDateTime = ({ date }) => {
  const { configData } = useSelector((state) => state.configData);
  let timeFormat = configData?.timeformat;

  if (timeFormat === "12") {
    console.log("moment 0014", date);
    return moment(date).format("ll hh:mm a");
  } else {
    console.log("moment 0015", date);
    return moment(date).format("ll HH:mm");
  }
};

export default CustomFormatedDateTime;
