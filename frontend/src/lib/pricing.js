// Local quote calculation mirroring backend logic (for instant UI feedback).
export const WEEKDAY_RATE = 499;
export const WEEKEND_PACKAGE = 3000;
export const DEPOSIT = 1000;

export function calculateQuote(pickupDate, returnDate) {
  if (!pickupDate || !returnDate) return null;
  const p = new Date(pickupDate);
  const r = new Date(returnDate);
  if (isNaN(p) || isNaN(r)) return null;

  const ms = r.getTime() - p.getTime();
  if (ms <= 0) return null;

  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  // JS: Sunday=0 ... Friday=5 ... Saturday=6
  const isFridayStart = p.getDay() === 5;
  const isWeekendPackage = isFridayStart && days <= 3;

  const rental = isWeekendPackage ? WEEKEND_PACKAGE : WEEKDAY_RATE * days;
  const total = rental + DEPOSIT;

  return {
    days,
    rental_cost: rental,
    deposit: DEPOSIT,
    total_upfront: total,
    is_weekend_package: isWeekendPackage,
    breakdown: isWeekendPackage
      ? "Weekend package (Fri – Mon 10am)"
      : `${days} day${days > 1 ? "s" : ""} × R${WEEKDAY_RATE}/day`,
  };
}

export function formatZAR(n) {
  return `R${n.toLocaleString("en-ZA")}`;
}
