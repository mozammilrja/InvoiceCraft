interface iAppProps {
  amount: number;
  currency: "USD" | "EUR" | "INR";
}

export function formatCurrency({ amount, currency }: iAppProps) {
  const localeMap: Record<string, string> = {
    USD: "en-US",
    EUR: "en-IE",
    INR: "en-IN",
  };

  return new Intl.NumberFormat(localeMap[currency], {
    style: "currency",
    currency,
  }).format(amount);
}
