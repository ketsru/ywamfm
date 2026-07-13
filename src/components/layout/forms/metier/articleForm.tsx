// @/components/layout/forms/metier/articleForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUploader } from "@/modules/shared/imageUploader";
import { articleRequestSchema } from "@/lib/types/communications/newsletter/blog.schema";
import { Article, ArticleRequest, ArticleType, ARTICLE_TYPE_LABELS } from "@/lib/types/communications/newsletter/blog.types";

type ArticleFormValues = z.input<typeof articleRequestSchema>;

type ArticleFormProps = {
  defaultValues?: Article;
  onChange: (data: ArticleRequest, isValid: boolean) => void;
  error?: string;
};

export function ArticleForm({ defaultValues, onChange, error }: ArticleFormProps) {

  const {
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleRequestSchema),
    mode: "onChange", // nécessaire pour que isValid reflète l'état en temps réel, sans passer par handleSubmit
    defaultValues: {
      type:        defaultValues?.type        ?? undefined,
      title:       defaultValues?.title       ?? "",
      excerpt:     defaultValues?.excerpt     ?? "",
      imageAlt:    defaultValues?.imageAlt    ?? "",
      actionLabel: defaultValues?.actionLabel ?? "",
      slug:        defaultValues?.slug        ?? "",
      isPublish:   defaultValues?.isPublish   ?? false,
      episode:     defaultValues?.episode     ?? "",
      // Article.imageUrl est une string, ArticleRequest.image est typé
      // File | null — pas de string possible ici tel quel. Je passe null
      // par défaut ; voir remarque plus bas pour l'édition avec image existante.
      image:       null,
    },
  });

  // Remonte chaque changement de champ au parent (pas de bouton submit interne :
  // c'est CrudDialog qui déclenche la création/mise à jour via handleConfirm).
  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as ArticleRequest, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const type        = watch("type");
  const isPublish    = watch("isPublish");
  const imageValue   = watch("image");

  const currentFile = imageValue instanceof File ? imageValue : undefined;
  // ⚠️ imageValue ne peut jamais être une string vu le typage ArticleRequest.image
  // (File | null). On retombe donc sur l'URL existante de l'article en édition,
  // tant que l'utilisateur n'a pas choisi un nouveau fichier.
  const existingUrl = !currentFile ? defaultValues?.imageUrl ?? undefined : undefined;

  const isPodcast = type === ArticleType.PODCAST;

  return (
    <div className="space-y-5">

      {/* Erreur globale remontée par le dialog (ex: échec API) */}
      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Type */}
      <Field>
        <FieldLabel htmlFor="article-type">
          Type <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={type}
          onValueChange={(val) => setValue("type", val as ArticleType, { shouldValidate: true })}
        >
          <SelectTrigger id="article-type">
            <SelectValue placeholder="Choisir un type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(ArticleType).map((t) => (
              <SelectItem key={t} value={t}>
                {ARTICLE_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-sm text-destructive" role="alert">{errors.type.message}</p>
        )}
      </Field>

      {/* Titre */}
      <Field>
        <FieldLabel htmlFor="article-title">
          Titre <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="article-title"
          placeholder="Ex : Comment j'ai découvert ma vocation"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-destructive" role="alert">{errors.title.message}</p>
        )}
      </Field>

      {/* Extrait */}
      <Field>
        <FieldLabel htmlFor="article-excerpt">
          Extrait <span className="text-destructive">*</span>
        </FieldLabel>
        <Textarea
          id="article-excerpt"
          placeholder="Un court résumé qui donne envie de lire…"
          rows={3}
          {...register("excerpt")}
        />
        {errors.excerpt && (
          <p className="text-sm text-destructive" role="alert">{errors.excerpt.message}</p>
        )}
      </Field>

      {/* Slug */}
      <Field>
        <FieldLabel htmlFor="article-slug">
          Slug <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="article-slug"
          placeholder="Ex : comment-jai-decouvert-ma-vocation"
          {...register("slug")}
        />
        <FieldDescription>Utilisé dans l'URL — minuscules, chiffres et tirets uniquement.</FieldDescription>
        {errors.slug && (
          <p className="text-sm text-destructive" role="alert">{errors.slug.message}</p>
        )}
      </Field>

      {/* Libellé d'action */}
      <Field>
        <FieldLabel htmlFor="article-actionLabel">
          Libellé d'action <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="article-actionLabel"
          placeholder="Ex : Lire l'article, Écouter l'épisode…"
          {...register("actionLabel")}
        />
        {errors.actionLabel && (
          <p className="text-sm text-destructive" role="alert">{errors.actionLabel.message}</p>
        )}
      </Field>

      {/* Épisode — pertinent uniquement pour un podcast */}
      {isPodcast && (
        <Field>
          <FieldLabel htmlFor="article-episode">Épisode</FieldLabel>
          <Input
            id="article-episode"
            placeholder="Ex : Épisode 12"
            {...register("episode")}
          />
          {errors.episode && (
            <p className="text-sm text-destructive" role="alert">{errors.episode.message}</p>
          )}
        </Field>
      )}

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="article-image">Image</FieldLabel>
        <ImageUploader
          value={currentFile}
          existingUrls={existingUrl}
          onChange={(file) => setValue("image", (file as File) ?? null, { shouldValidate: true })}
          multiple={false}
        />
        <FieldDescription>Format JPG, PNG ou WEBP · Max 5 Mo</FieldDescription>
        {errors.image && (
          <p className="text-sm text-destructive" role="alert">{errors.image.message as string}</p>
        )}
      </Field>

      {/* Texte alternatif de l'image */}
      <Field>
        <FieldLabel htmlFor="article-imageAlt">Texte alternatif de l'image</FieldLabel>
        <Input
          id="article-imageAlt"
          placeholder="Décrivez l'image pour l'accessibilité"
          {...register("imageAlt")}
        />
        {errors.imageAlt && (
          <p className="text-sm text-destructive" role="alert">{errors.imageAlt.message}</p>
        )}
      </Field>

      {/* Publié */}
      <Field>
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
          <div className="space-y-0.5">
            <FieldLabel htmlFor="article-isPublish">Publié</FieldLabel>
            <FieldDescription>L'article sera visible sur le site public.</FieldDescription>
          </div>
          <Switch
            id="article-isPublish"
            checked={isPublish}
            onCheckedChange={(val) => setValue("isPublish", val, { shouldValidate: true })}
          />
        </div>
      </Field>

    </div>
  );
}