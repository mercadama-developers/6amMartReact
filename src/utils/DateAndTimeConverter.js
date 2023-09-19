import moment from "moment";
export const dateAndTimeConverter = {
  dateWithTime: function (value, time) {
    console.log("moment 0050", value);
    const formatted12Time = moment(value, ["HH:mm"]).format("hh:mm a");
    const formatted24Time = moment(value, ["h:mm A"]).format("HH:mm");
    return time === "12" ? formatted12Time : formatted24Time;
  },
};
