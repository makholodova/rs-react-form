export function convertFileToBase64(file?: File): Promise<string> {
  return new Promise((res, rej) => {
    if (!file) return rej(new Error('No file provided'));

    const reader = new FileReader();
    reader.onload = () => res(reader.result as string);
    reader.onerror = () => rej(reader.error);
    reader.readAsDataURL(file);
  });
}
