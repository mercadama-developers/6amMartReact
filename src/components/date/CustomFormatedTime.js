import { useSelector } from "react-redux";
import moment from "moment";

const CustomFormatedTime = ({ date }) => {
  const { configData } = useSelector((state) => state.configData);
  let timeFormat = configData?.timeformat;
  if (timeFormat === "12") {
    console.log("moment 0016", date);
    return moment(date).format("hh:mm a");
  } else {
    console.log("moment 0017", date);
    return moment(date).format("HH:mm");
  }
};

export default CustomFormatedTime;
