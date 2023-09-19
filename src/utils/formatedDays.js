import moment from "moment";


import moment from "moment";

export const currentDate = moment().format("YYYY/MM/DD HH:mm");
export const nextday = moment(currentDate, "YYYY/MM/DD HH:mm").add(1, "days").format("YYYY/MM/DD");
export const today = moment(currentDate, "YYYY/MM/DD HH:mm").format("dddd");
export const tomorrow = moment(nextday, "YYYY/MM/DD").format("dddd");
export const CurrentDatee = moment().format();
export const todayTime = moment(CurrentDatee).format("HH:mm");



console.log("moment 0051", currentDate);
console.log("moment 0052", nextday);
console.log("moment 0053", CurrentDatee);