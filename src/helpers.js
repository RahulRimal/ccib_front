export const humanizeString = (str, { capitalizeOnlyOne = true } = {}) => {
  if (!str) return "";
  // Replace all underscores with spaces and split the string into an array of words
  let words = str.replace(/_/g, " ").split(" ");

  if (capitalizeOnlyOne) {
    // Capitalize the first letter of the first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  } else {
    // Capitalize the first letter of each word
    words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  }

  // Join the words back into a single string
  return words.join(" ");
};

export function flattenNestedObject(obj) {
  const flattened = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        flattened[nestedKey] = nestedValue;
      }
    } else {
      flattened[key] = value;
    }
  }

  return flattened;
}

export function flattenObject(obj, parentKey = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
}

export const usernameConcatenator = (obj) => {
  return Object.values(obj)
    .map((value) => value || "")
    .join(" ");
};

export const hexWithOpacity = (hex, opacity) => {
  if (
    typeof hex !== "string" ||
    !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
  ) {
    throw new Error("Invalid hex color");
  }

  if (hex.length === 4) {
    hex = "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  if (typeof opacity !== "number" || opacity < 0 || opacity > 100) {
    throw new Error("Opacity must be a number between 0 and 100");
  }
  const alpha = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();

  return hex + alpha;
};
