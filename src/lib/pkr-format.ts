export const amountToPKRFormat = (amount: number) => {
  const formattedAmount = amount.toLocaleString("en-PK");
  return `Rs: ${formattedAmount} /-`;
};
