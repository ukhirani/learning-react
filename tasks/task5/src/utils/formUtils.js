export const sanitizeAlpha = (
  value = "", // alpha here means sanitize alphabets
) => value.replace(/[^A-Za-z\s.'-]/g, "");

export const sanitizeDigits = (value = "", maxLength) => {
  const digitsOnly = value.replace(/\D/g, ""); // removes all non digit characters
  return typeof maxLength === "number"
    ? digitsOnly.slice(0, maxLength) // if maxLength exists, then return the sliced digits
    : digitsOnly; // else return the digits as it is
};

export const sanitizeDecimal = (value = "") => {
  const cleaned = value.replace(/[^0-9.]/g, ""); // contains only digits (0-9) and (.)
  const [intPart, ...rest] = cleaned.split("."); // split based on the . that comes in between
  if (rest.length === 0) return intPart;
  return `${intPart}.${rest.join("")}`;
};

export const isValidEmail = (value = "") =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // email regex testing

export const isValidName = (value = "") =>
  /^[A-Za-z][A-Za-z\s.'-]*$/.test(value); // name regex testing -> name cannot have anything except alphabets

export const isValidMobile = (value = "") => /^[0-9]{10}$/.test(value);

export const isValidPinCode = (value = "") => /^\d{6}$/.test(value); // should be 6 digit pin code

export const isValidYear = (value = "") => {
  if (!/^\d{4}$/.test(value)) return false;
  const year = parseInt(value, 10);
  const currentYear = new Date().getFullYear();
  return year <= currentYear; // graduation year shouldn't be in the future
};

export const isValidGpa = (value = "") => {
  const gpa = parseFloat(value);
  return !isNaN(gpa) && gpa >= 0 && gpa <= 10;
};
