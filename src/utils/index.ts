export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const formatAmount = (amount: number, shorter = false): string => {
  if (amount == null || amount.toString() === "" || isNaN(Number(amount))) {
    amount = 0;
  }

  return amount.toLocaleString("en-us", {
    minimumFractionDigits: 3,
    maximumFractionDigits: shorter ? 4 : 9,
  });
};
