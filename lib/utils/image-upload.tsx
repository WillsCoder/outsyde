export async function imageUpload(files: File[]): Promise<string[]> {
  if (!files.length) return [];

  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload images");
  }

  const data: {
    images: {
      url: string;
    }[];
  } = await response.json();

  return data.images.map((image) => image.url);
}
