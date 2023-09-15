export const getLanguage = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(window.localStorage.getItem("settings"))?.direction;
  }
};
