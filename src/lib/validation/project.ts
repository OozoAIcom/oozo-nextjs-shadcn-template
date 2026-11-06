import type { ProjectValidation } from "@/types/project";
const controls = /[\u0000-\u001f\u007f]/;
export function validateProject(input: unknown): ProjectValidation {
  const value =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};
  const name = typeof value.name === "string" ? value.name.trim() : "";
  const description =
    typeof value.description === "string" ? value.description.trim() : "";
  const errors: { name?: string; description?: string } = {};
  if (name.length < 2 || name.length > 80 || controls.test(name))
    errors.name = "Use 2–80 characters without control characters.";
  if (
    typeof value.description !== "string" ||
    description.length > 240 ||
    controls.test(description)
  )
    errors.description = "Use up to 240 characters without control characters.";
  return Object.keys(errors).length
    ? { success: false, errors }
    : { success: true, data: { name, description } };
}
export function validateEmail(value: unknown): boolean {
  return (
    typeof value === "string" &&
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) &&
    !controls.test(value)
  );
}
