"use client";

import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { X, Video, Youtube, UploadCloud, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { VIDEO_MAX_SIZE, VIDEO_ACCEPTED_TYPES } from "@/lib/config/upload.config";

// ── Types ─────────────────────────────────────────────────────────────────────

export type VideoValue = File | string | undefined; // string = URL (YouTube ou hébergée)

export interface VideoUploaderProps {
  /** Valeur courante : File (nouvel upload) | string (lien YouTube ou URL hébergée) */
  value?: VideoValue;

  /** Callback déclenché à chaque changement */
  onChange: (value: VideoValue) => void;

  /** Taille max en octets (défaut: VIDEO_MAX_SIZE depuis .env) */
  maxSize?: number;

  /** Types MIME acceptés (défaut: VIDEO_ACCEPTED_TYPES depuis .env) */
  acceptedTypes?: string[];

  /** Désactive le composant */
  disabled?: boolean;

  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const YOUTUBE_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/;

function extractYoutubeId(url: string): string | null {
  const match = url.match(YOUTUBE_REGEX);
  return match ? match[1] : null;
}

function isYoutubeUrl(url: string): boolean {
  return YOUTUBE_REGEX.test(url);
}

function formatSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type Mode = "file" | "youtube";

// ── Sub-component: video preview ─────────────────────────────────────────────

function VideoPreview({
  file,
  url,
  onRemove,
  disabled,
}: {
  file?: File;
  url?: string;
  onRemove: () => void;
  disabled?: boolean;
}) {
  const youtubeId = url ? extractYoutubeId(url) : null;
  const objectUrl = useMemo(() => (file ? URL.createObjectURL(file) : undefined), [file]);

  return (
    <div className="relative group rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 aspect-video">
      {file && objectUrl && (
        <video src={objectUrl} controls className="w-full h-full object-cover" />
      )}

      {!file && youtubeId && (
        <img
          src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
          alt="Miniature YouTube"
          className="w-full h-full object-cover"
        />
      )}

      {!file && url && !youtubeId && (
        <video src={url} controls className="w-full h-full object-cover" />
      )}

      {/* Badge type */}
      <div className="absolute top-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px]">
        {youtubeId ? <Youtube className="w-3 h-3" /> : <Video className="w-3 h-3" />}
        {youtubeId ? "YouTube" : file ? formatSize(file.size) : "Vidéo"}
      </div>

      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200 hover:text-red-500 dark:hover:bg-red-950"
          aria-label="Supprimer la vidéo"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function VideoUploader({
  value,
  onChange,
  maxSize = VIDEO_MAX_SIZE,
  acceptedTypes = VIDEO_ACCEPTED_TYPES,
  disabled = false,
  className,
}: VideoUploaderProps) {
  const isFile = value instanceof File;
  const isUrl = typeof value === "string" && value.length > 0;

  const [mode, setMode] = useState<Mode>(isUrl && isYoutubeUrl(value) ? "youtube" : "file");
  const [errors, setErrors] = useState<string[]>([]);
  const [youtubeInput, setYoutubeInput] = useState(isUrl ? value : "");

  const accept = Object.fromEntries(acceptedTypes.map((mime) => [mime, []]));
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
      onChange(accepted[0]);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    maxSize,
    maxFiles: 1,
    disabled: disabled || isFile || isUrl,
  });

  const handleYoutubeSubmit = () => {
    setErrors([]);
    if (!youtubeInput.trim()) return;
    if (!isYoutubeUrl(youtubeInput.trim())) {
      setErrors(["Lien YouTube invalide"]);
      return;
    }
    onChange(youtubeInput.trim());
  };

  const handleRemove = () => {
    onChange(undefined);
    setYoutubeInput("");
    setErrors([]);
  };

  const hasContent = isFile || isUrl;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Tabs mode selector — masqués si contenu déjà présent */}
      {!hasContent && (
        <div className="inline-flex rounded-lg border border-neutral-200 dark:border-neutral-700 p-0.5 bg-neutral-50 dark:bg-neutral-800">
          <button
            type="button"
            onClick={() => setMode("file")}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
              mode === "file"
                ? "bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            )}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            Importer un fichier
          </button>
          <button
            type="button"
            onClick={() => setMode("youtube")}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
              mode === "youtube"
                ? "bg-white dark:bg-neutral-900 shadow-sm text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            )}
          >
            <Youtube className="w-3.5 h-3.5" />
            Lien YouTube
          </button>
        </div>
      )}

      {/* Mode: fichier */}
      {!hasContent && mode === "file" && (
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
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
              isDragActive
                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40"
                : "bg-neutral-100 dark:bg-neutral-700 text-neutral-400"
            )}
          >
            {isDragActive ? <UploadCloud className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              {isDragActive ? (
                "Déposez ici…"
              ) : (
                <>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Choisir une vidéo
                  </span>{" "}
                  ou glisser-déposer
                </>
              )}
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              {acceptedExtensions} — max {maxSizeMb} Mo
            </p>
          </div>
        </div>
      )}

      {/* Mode: YouTube */}
      {!hasContent && mode === "youtube" && (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="url"
              value={youtubeInput}
              onChange={(e) => setYoutubeInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleYoutubeSubmit())}
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={disabled}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <button
            type="button"
            onClick={handleYoutubeSubmit}
            disabled={disabled || !youtubeInput.trim()}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Valider
          </button>
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

      {/* Preview */}
      {hasContent && (
        <div className="max-w-xs">
          <VideoPreview
            file={isFile ? (value as File) : undefined}
            url={isUrl ? (value as string) : undefined}
            onRemove={handleRemove}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}