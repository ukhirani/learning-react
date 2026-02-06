export const sanitizeAlpha = (value = "") =>
  value.replace(/[^A-Za-z\s.'-]/g, "");

export const sanitizeDigits = (value = "", maxLength) => {
  const digitsOnly = value.replace(/\D/g, "");
  return typeof maxLength === "number"
    ? digitsOnly.slice(0, maxLength)
    : digitsOnly;
};

export const sanitizeDecimal = (value = "") => {
  const cleaned = value.replace(/[^0-9.]/g, "");
  const [intPart, ...rest] = cleaned.split(".");
  if (rest.length === 0) return intPart;
  return `${intPart}.${rest.join("")}`;
};

export const isValidEmail = (value = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isValidName = (value = "") =>
  /^[A-Za-z][A-Za-z\s.'-]*$/.test(value);

export const isValidIndianMobile = (value = "") => /^[6-9]\d{9}$/.test(value);

export const isValidPinCode = (value = "") => /^\d{6}$/.test(value);

export const isValidYear = (value = "", minYear = 1900) => {
  if (!/^\d{4}$/.test(value)) return false;
  const year = parseInt(value, 10);
  const currentYear = new Date().getFullYear();
  return year >= minYear && year <= currentYear;
};

export const isValidGpa = (value = "") => {
  const gpa = parseFloat(value);
  return !isNaN(gpa) && gpa >= 0 && gpa <= 10;
};
