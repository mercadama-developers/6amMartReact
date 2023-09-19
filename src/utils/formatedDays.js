// import moment from "moment";

// export const currentDate = moment().format("YYYY/MM/DD HH:mm");
// export const nextday = moment(currentDate).add(1, "days").format("YYYY/MM/DD");
// export const today = moment(currentDate).format("dddd");
// export const tomorrow = moment(nextday).format("dddd");
// export const CurrentDatee = moment().format();
// export const todayTime = moment(CurrentDatee).format("HH:mm");

import moment from "moment";
moment.locale("en"); // en
export const currentDate = new Date().toISOString();
export const nextday = moment(currentDate, "YYYY/MM/DD HH:mm")
  .add(1, "days")
  .format("YYYY/MM/DD");

export const today = moment(currentDate, "YYYY/MM/DD HH:mm").format("dddd");
export const tomorrow = moment(nextday, "YYYY/MM/DD").format("dddd");
export const CurrentDatee = moment(new Date()).format();
export const todayTime = moment(CurrentDatee).format("HH:mm");
 
