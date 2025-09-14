export const formatMoney = (value: number): string => {
  if (value === null || value === undefined) {
    return "";
  }
  return value.toLocaleString("id-ID");
};

export const formatMoneyK = (value: number): string => {
  const inThousand = (value / 1000).toFixed(2);
  return Number(inThousand).toLocaleString("id-ID");
};

export const formatCurrency = (value: number, currencySymbol?: string) => {
  if (!currencySymbol) {
    currencySymbol = "";
  } else {
    currencySymbol = currencySymbol + " ";
  }
  return currencySymbol + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
