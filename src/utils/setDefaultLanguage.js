export const setDefaultLanguage = () => {
  const lan = "br";
  const country = "BR";
  localStorage.setItem("language-setting", JSON.stringify(lan));
  localStorage.setItem("country", JSON.stringify(country));
};
