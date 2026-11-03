const studioApiUrl = process.env.NEXT_PUBLIC_STUDIO_API_URL;

if (!studioApiUrl) {
    throw new Error("NEXT_PUBLIC_STUDIO_API_URL is not configured.");
}

export const STUDIO_API_URL = studioApiUrl.replace(/\/+$/, "");
