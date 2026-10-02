import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

type UploadAuth = {
  signature: string;
  expire: number;
  token: string;
  publicKey: string;
};

const authenticator = async (): Promise<UploadAuth> => {
  const response = await fetch("/api/uploads");

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`Authentication failed (${response.status}): ${errorText}`);
  }

  return response.json();
};

export async function handleImageUpload(files: File[]): Promise<string[]> {
  if (!files.length) {
    return [];
  }

  const { signature, expire, token, publicKey } = await authenticator();

  const abortController = new AbortController();

  try {
    const responses = await Promise.all(
      files.map((file) =>
        upload({
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name,
          folder: "Outsyde-docs",
          abortSignal: abortController.signal,
        }),
      ),
    );

    return responses
      .map((response) => response.url)
      .filter((url): url is string => Boolean(url));
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      console.error("Upload aborted:", error.reason);
    } else if (error instanceof ImageKitInvalidRequestError) {
      console.error("Invalid request:", error.message);
    } else if (error instanceof ImageKitUploadNetworkError) {
      console.error("Network error:", error.message);
    } else if (error instanceof ImageKitServerError) {
      console.error("Server error:", error.message);
    } else {
      console.error("Upload error:", error);
    }

    throw error;
  }
}
