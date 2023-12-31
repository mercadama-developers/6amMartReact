import usFlag from "../../../../public/landingpage/us.svg";
import arabicFlag from "../../../../public/landingpage/arabic-flag-svg.svg";
import vietnamflag from "../../../../assets/country-flag/vn.svg";
import brazil from "../../../../assets/country-flag/br.svg";

export const languageLists = [
  {
    languageName: "English",
    languageCode: "en",
    countryCode: "US",
    countryFlag: usFlag.src,
  },
  {
    languageName: "Arabic",
    languageCode: "ar",
    countryCode: "SA",
    countryFlag: arabicFlag.src,
  },
  {
    languageName: "Vietnamse",
    languageCode: "vi",
    countryCode: "VN",
    countryFlag: vietnamflag.src,
  },
  {
    languageName: "Brazil",
    languageCode: "br",
    countryCode: "BR",
    countryFlag: brazil.src,
  },
];
