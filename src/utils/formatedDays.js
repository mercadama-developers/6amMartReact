import moment from "moment";
moment.locale("en"); 
export const currentDate = new Date().toISOString();
export const nextday = moment(currentDate, "YYYY/MM/DD HH:mm").add(1, "days").format("YYYY/MM/DD");
export const today = moment(currentDate, "YYYY/MM/DD HH:mm").format("dddd");
export const tomorrow = moment(nextday, "YYYY/MM/DD").format("dddd");
export const todayTime = moment(currentDate).format("HH:mm");
 
