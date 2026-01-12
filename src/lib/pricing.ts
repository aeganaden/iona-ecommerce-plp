export const calculateOriginalPrice = (
  price: number,
  discount: number
): number => {
  if (discount <= 0 || discount >= 100) {
    return price;
  }

  const derivedPrice = price / (1 - discount / 100);
  return Number.isFinite(derivedPrice) ? derivedPrice : price;
};
