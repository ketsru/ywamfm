// @/lib/config/upload.config.ts

export const IMAGE_MAX_SIZE =
    Number(process.env.NEXT_PUBLIC_IMAGE_MAX_SIZE_MB ?? 5) * 1024 * 1024

export const VIDEO_MAX_SIZE =
    Number(process.env.NEXT_PUBLIC_VIDEO_MAX_SIZE_MB ?? 50) * 1024 * 1024

// ─── Accepted file types ──────────────────────────────────────
export const IMAGE_ACCEPTED_TYPES: string[] =
    (process.env.NEXT_PUBLIC_IMAGE_ACCEPTED_TYPES ?? "image/jpeg,image/png,image/webp")
        .split(",")
        .map((t) => t.trim())

export const VIDEO_ACCEPTED_TYPES: string[] =
    (process.env.NEXT_PUBLIC_VIDEO_ACCEPTED_TYPES ?? "video/mp4,video/webm,video/quicktime")
        .split(",")
        .map((t) => t.trim())

// ─── Validation métier ───────────────────────────────────────
export const DISCOUNT_MAX =
    Number(process.env.NEXT_PUBLIC_DISCOUNT_MAX ?? 100)

export const PRODUCT_RATING_MAX =
    Number(process.env.NEXT_PUBLIC_PRODUCT_RATING_MAX ?? 5)

