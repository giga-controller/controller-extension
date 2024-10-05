import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitaliseFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowercaseFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

// AARON export function projectNameConstructor(url: string) {

export function constructClassQuery(classQuery: string) {
  // replace all empty spaces with a . and add a . at the beginning
  return "." + classQuery.replaceAll(" ", ".");
}

export function getProjectId(projectName: string): string {
  const generateUuid = (): string => {
    let uuid = uuidv4().replace(/-/g, "");
    console.log("uuid", uuid);
    // Ensure the first character is a lowercase letter
    if (!/[a-z]/.test(uuid[0])) {
      uuid =
        String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
        uuid.slice(1);
    }
    // Ensure the last character is a lowercase letter or digit
    if (!/[a-z0-9]/.test(uuid.slice(-1))) {
      uuid =
        uuid.slice(0, -1) +
        (Math.random() < 0.5
          ? String.fromCharCode(97 + Math.floor(Math.random() * 26))
          : Math.floor(Math.random() * 10).toString());
    }
    return uuid;
  };

  const projectNameLower = projectName.toLowerCase();
  const uuid = generateUuid();
  const maxLength = 30;
  const separator = "-";

  if (projectNameLower.length + separator.length >= maxLength) {
    return projectNameLower.slice(0, maxLength);
  }

  const uuidLength = maxLength - projectNameLower.length - separator.length;
  return `${projectNameLower}${separator}${uuid.slice(0, uuidLength)}`;
}

export const updateButtonText = (text: string) => {
  const button = document.getElementById("auth-maven-button");
  if (button) {
    button.textContent = text;
  }
};
