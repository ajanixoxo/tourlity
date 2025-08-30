export interface ParsedFormData {
  data: Record<string, string | string[]>;
  files: Record<string, File>;
}

export function parseMultipartFormData(formData: FormData): ParsedFormData {
  const data: Record<string, string | string[]> = {};
  const files: Record<string, File> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File && value.size > 0) {
      files[key] = value;
    } else if (typeof value === 'string') {
      // Handle array fields
      if (key.includes('typesOfExperiences') || key.includes('otherLanguages')) {
        if (!data[key]) {
          data[key] = [];
        }
        (data[key] as string[]).push(value);
      } else {
        data[key] = value;
      }
    }
  }

  return { data, files };
}