import React from "react";
import moment from "moment";

export const CustomDateFormat = (date) => {
  console.log("moment 0018", date);
  return moment(date).format("ll");
};
