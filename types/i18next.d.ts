import "i18next";

import type common from "../public/locales/en/common.json";
import type zod from "../public/locales/en/zod.json";

export interface I18nNamespaces {
  common: typeof common;
  zod: typeof zod;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: I18nNamespaces;
  }
}
