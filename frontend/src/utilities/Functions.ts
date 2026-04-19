interface InputData {
  category? : string,
  text?: string,
  file?: File,
}

export function inputDataToFormData(data: InputData): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // value must be string or Blob (File extends Blob)
      formData.append(key, value as string | Blob);
    }
  });

  return formData;
}
