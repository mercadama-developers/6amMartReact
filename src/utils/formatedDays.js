import moment from "moment";

export const currentDate = moment().format("YYYY/MM/DD HH:mm");
console.log("moment 0051", currentDate);
export const nextday = moment(currentDate).add(1, "days").format("YYYY/MM/DD");

export const today = moment(currentDate).format("dddd");
console.log("moment 0052", nextday);
export const tomorrow = moment(nextday).format("dddd");

export const CurrentDatee = moment().format();

console.log("moment 0053", CurrentDatee);
export const todayTime = moment(CurrentDatee).format("HH:mm");
