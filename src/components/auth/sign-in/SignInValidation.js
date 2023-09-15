import React from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const SignUpValidation = () => {
  const { t } = useTranslation();
  return Yup.object({
    phone: Yup.string()
      .required(t("Please give a phone number"))
      .min(10, "number must be 10 digits"),
    password: Yup.string()
      .min(6, t("Password is too short - should be 6 chars minimum."))
      .required(t("Password is required")),
    // tandc: Yup.boolean().oneOf([true], 'Message'),
    // termsOfService:Yup.boolean()
    //     .oneOf([true], "You must accept the terms and conditions").required(t("Password is required"))
  });
};

export default SignUpValidation;
