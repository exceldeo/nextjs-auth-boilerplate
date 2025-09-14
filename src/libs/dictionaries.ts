enum AvailableLabel {
  login,
  register,
  or,
  forgotPassword,
  clickHere,
  dontHaveAnAccount,
  alreadyHaveAnAccount,
}

export enum AvailableLocale {
  "en" = "English",
  "id" = "Bahasa Indonesia",
}

type DictionaryValue<T extends string | symbol | number, U> = {
  [K in T]: U;
};

type Dictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

export const dictionaries: Dictionary<
  keyof typeof AvailableLabel,
  DictionaryValue<keyof typeof AvailableLocale, string>
> = {
  login: {
    en: "Login",
    id: "Masuk",
  },
  register: {
    en: "Register",
    id: "Registrasi",
  },
  or: {
    en: "or",
    id: "atau",
  },
  forgotPassword: {
    en: "Forgot password",
    id: "Lupa password",
  },
  clickHere: {
    en: "Click here",
    id: "Klik disini",
  },
  dontHaveAnAccount: {
    en: "Don't have an account?",
    id: "Belum punya akun?",
  },
  alreadyHaveAnAccount: {
    en: "Already have an account?",
    id: "Sudah punya akun?",
  },
};

export const getDictValue = (
  locale: string | undefined,
  label: keyof typeof AvailableLabel
) => {
  return dictionaries[label][locale as keyof typeof AvailableLocale];
};
