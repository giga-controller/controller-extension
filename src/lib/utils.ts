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
  let uuid = uuidv4().replace(/-/g, "");
  /**
   * Project id must start with a lowercase letter and ends with a letter or number, and be between 6 and 30 characters long.
   * Project ID can have lowercase letters, digits or
   **/
  const generateUuid = (): string => {
    let uuid = uuidv4().replace(/-/g, "");
    // Ensure the first character is a lowercase letter
    uuid = "a" + uuid.slice(1);
    // Ensure the last character is a lowercase letter or digit
    uuid = uuid.slice(0, -1) + "z";
    // Ensure the length is between 6 and 30 characters
    return uuid
  };

  return `${projectName.toLowerCase()}-${generateUuid()}`.substring(0, 30);}
