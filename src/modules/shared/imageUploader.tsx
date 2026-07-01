"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { X, ImagePlus, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMAGE_MAX_SIZE, IMAGE_ACCEPTED_TYPES } from "@/lib/config/upload.config";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ImageUploaderProps {
  /** Valeur courante (File(s) ou URL(s) existantes) */
  value?: File | File[] | string | string[];

  /** Callback déclenché à chaque changement */
  onChange: (value: File | File[] | undefined) => void;

  /** Accepte plusieurs images (défaut: false) */
  multiple?: boolean;

  /** Nombre max de fichiers (multiple seulement, défaut: 5) */
  maxFiles?: number;

  /** Taille max par fichier en octets (défaut: IMAGE_MAX_SIZE depuis .env) */
  maxSize?: number;

  /** Types MIME acceptés (défaut: IMAGE_ACCEPTED_TYPES depuis .env) */
  acceptedTypes?: string[];

  /** URLs existantes à afficher en mode édition */
  existingUrls?: string | string[];

  /** Label affiché dans la zone de drop */
  label?: string;

  /** Désactive le composant */
  disabled?: boolean;

  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toArray<T>(val: T | T[] | undefined): T[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ── Sub-component: image preview card ────────────────────────────────────────

function PreviewCard({
  src,
  name,
  size,
  onRemove,
  disabled,
}: {
  src: string;
  name?: string;
  size?: number;
  onRemove: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 aspect-square">
      <img
        src={src}
        alt={name ?? "Aperçu"}
        className="w-full h-full object-cover"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
        {name && (
          <p className="text-white text-[10px] font-medium px-2 text-center truncate w-full">
            {name}
          </p>
        )}
        {size !== undefined && (
          <p className="text-white/70 text-[10px]">{formatSize(size)}</p>
        )}
      </div>

      {/* Remove button */}
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200 hover:text-red-500 dark:hover:bg-red-950"
          aria-label="Supprimer l'image"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  maxSize = IMAGE_MAX_SIZE,
  acceptedTypes = IMAGE_ACCEPTED_TYPES,
  existingUrls,
  label,
  disabled = false,
  className,
}: ImageUploaderProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const files = toArray(value as File | File[]);
  const existing = toArray(existingUrls).filter((u) => typeof u === "string");
  const canAddMore = multiple ? files.length < maxFiles : files.length === 0;

  // Construit l'objet accept pour react-dropzone depuis les MIME types
  const accept = Object.fromEntries(acceptedTypes.map((mime) => [mime, []]));

  // Libellés lisibles pour l'UI
  const maxSizeMb = (maxSize / (1024 * 1024)).toFixed(0);
  const acceptedExtensions = acceptedTypes
    .map((t) => t.split("/")[1].toUpperCase())
    .join(", ");

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      setErrors([]);

      if (rejected.length > 0) {
        const msgs = rejected.flatMap((r) => r.errors.map((e) => e.message));
        setErrors([...new Set(msgs)]);
        return;
      }

      if (!multiple) {
        onChange(accepted[0]);
      } else {
        const merged = [...files, ...accepted].slice(0, maxFiles);
        onChange(merged);
      }
    },
    [files, multiple, maxFiles, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxSize,
    maxFiles: multiple ? maxFiles - files.length : 1,
    disabled: disabled || !canAddMore,
  });

  const removeFile = (index: number) => {
    if (!multiple) {
      onChange(undefined);
    } else {
      const next = files.filter((_, i) => i !== index);
      onChange(next.length > 0 ? next : undefined);
    }
  };

  const hasContent = files.length > 0 || existing.length > 0;

  return (
    <div className={cn("space-y-3", className)}>

      {/* Drop zone — hidden when single mode and a file is already selected */}
      {canAddMore && (
        <div
          {...getRootProps()}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3",
            "border border-dashed rounded-xl px-6 py-8 cursor-pointer transition-colors",
            isDragActive
              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
              : "border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30 hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
            disabled && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />

          {/* Icon */}
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              isDragActive
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40"
                : "bg-neutral-100 dark:bg-neutral-700 text-neutral-400"
            )}
          >
            {isDragActive ? (
              <UploadCloud className="w-5 h-5" />
            ) : (
              <ImagePlus className="w-5 h-5" />
            )}
          </div>

          {/* Text */}
          <div className="text-center">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {isDragActive ? (
                "Déposez ici…"
              ) : (
                <>
                  {label ?? (
                    <>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        Choisir {multiple ? "des images" : "une image"}
                      </span>{" "}
                      ou glisser-déposer
                    </>
                  )}
                </>
              )}
            </p>
            {/* Hint généré dynamiquement depuis la config .env */}
            <p className="text-xs text-neutral-400 mt-1">
              {acceptedExtensions} — max {maxSizeMb} Mo
              {multiple && ` · ${files.length}/${maxFiles} fichier${maxFiles > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <ul className="space-y-1">
          {errors.map((err, i) => (
            <li key={i} className="text-xs text-red-500 flex items-start gap-1.5">
              <X className="w-3 h-3 mt-0.5 flex-shrink-0" />
              {err}
            </li>
          ))}
        </ul>
      )}

      {/* Previews grid */}
      {hasContent && (
        <div
          className={cn(
            "grid gap-2",
            multiple
              ? "grid-cols-3 sm:grid-cols-4"
              : "grid-cols-1 max-w-[140px]"
          )}
        >
          {/* New files */}
          {files.map((file, i) => (
            <PreviewCard
              key={`file-${i}`}
              src={URL.createObjectURL(file)}
              name={file.name}
              size={file.size}
              onRemove={() => removeFile(i)}
              disabled={disabled}
            />
          ))}

          {/* Existing URLs (mode édition, pas encore remplacées) */}
          {files.length === 0 &&
            existing.map((url, i) => (
              <PreviewCard
                key={`existing-${i}`}
                src={url}
                name="Image actuelle"
                onRemove={() => onChange(undefined)}
                disabled={disabled}
              />
            ))}
        </div>
      )}
    </div>
  );
}