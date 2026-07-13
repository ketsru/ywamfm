// @/lib/api/core/form-data.util.ts

/**
 * Construit un FormData compatible avec les endpoints Spring qui attendent :
 * - "data"  : JSON du DTO (SANS le champ image)
 * - "image" : fichier (uniquement si c'est un nouveau File — une string
 *             existante signifie "image inchangée", donc on ne l'envoie pas)
 */
export function buildMultipartFormData<T extends { image?: File | string | null }>(
    payload: T
): FormData {
    const { image, ...rest } = payload;

    const formData = new FormData();
    formData.append(
        "data",
        new Blob([JSON.stringify(rest)], { type: "application/json" })
    );

    if (image instanceof File) {
        formData.append("image", image);
    }

    return formData;
}