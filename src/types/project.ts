export type ProjectSettings = { name: string; description: string };
export type ProjectErrors = Partial<Record<keyof ProjectSettings, string>>;
export type ProjectValidation =
  | { success: true; data: ProjectSettings }
  | { success: false; errors: ProjectErrors };
