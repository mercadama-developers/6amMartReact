export const getModuleId = () => {
  return JSON.parse(window.localStorage.getItem("module"))?.id;
};
