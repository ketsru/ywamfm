// @/modules/books/components/BookForm.tsx
"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
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
import { bookRequestSchema } from "@/modules/books/book.schema";
import { Book } from "@/lib/types/admin/book/book.types";
import { ImageUploader } from "@/modules/shared/imageUploader";

type BookFormValues = z.output<typeof bookRequestSchema>;

type BookFormProps = {
  defaultValues?: Book;
  onChange: (data: BookFormValues, isValid: boolean) => void;
  error?: string;
};

// Liste des langues proposées — à ajuster selon les besoins réels de la plateforme.
const LANGUAGES = [
  { value: "fr", label: "Français" },
  { value: "en", label: "Anglais" },
  { value: "es", label: "Espagnol" },
  { value: "de", label: "Allemand" },
  { value: "pt", label: "Portugais" },
] as const;

export function BookForm({ defaultValues, onChange, error }: BookFormProps) {

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookRequestSchema),
    mode: "onChange", // nécessaire pour que isValid reflète l'état en temps réel, sans passer par handleSubmit
    defaultValues: {
      title:    defaultValues?.title    ?? "",
      author:   defaultValues?.author   ?? "",
      language: defaultValues?.language ?? "",
      summary:  defaultValues?.summary  ?? "",
      content:  defaultValues?.content  ?? "",
      image:    defaultValues?.image    ?? null, // File (nouveau) | string base64 (existant, édition) | null
      isActive: defaultValues?.isActive ?? true,
    },
  });

  // Remonte chaque changement de champ au parent (pas de bouton submit interne :
  // c'est CrudDialog qui déclenche la création/mise à jour via handleConfirm).
  React.useEffect(() => {
    const subscription = watch((values) => {
      onChange(values as BookFormValues, isValid);
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, isValid]);

  const isActive   = watch("isActive");
  const imageValue = watch("image");

  const currentFile = imageValue instanceof File ? imageValue : undefined;
  const existingUrl = typeof imageValue === "string" && imageValue
    ? `data:image/jpeg;base64,${imageValue}`
    : undefined;

  return (
    <div className="space-y-5">

      {/* Erreur globale remontée par le dialog (ex: échec API) */}
      {error && (
        <p className="text-sm text-destructive rounded-md bg-destructive/10 px-3 py-2" role="alert">
          {error}
        </p>
      )}

      {/* Titre */}
      <Field>
        <FieldLabel htmlFor="book-title">
          Titre <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="book-title"
          placeholder="Ex : Introduction à la théologie"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-destructive" role="alert">{errors.title.message}</p>
        )}
      </Field>

      {/* Auteur */}
      <Field>
        <FieldLabel htmlFor="book-author">
          Auteur <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          id="book-author"
          placeholder="Ex : Jean Dupont"
          {...register("author")}
        />
        {errors.author && (
          <p className="text-sm text-destructive" role="alert">{errors.author.message}</p>
        )}
      </Field>

      {/* Langue */}
      <Field>
        <FieldLabel htmlFor="book-language">
          Langue <span className="text-destructive">*</span>
        </FieldLabel>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="book-language" className="w-full">
                <SelectValue placeholder="Sélectionner une langue" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.language && (
          <p className="text-sm text-destructive" role="alert">{errors.language.message}</p>
        )}
      </Field>

      {/* Résumé */}
      <Field>
        <FieldLabel htmlFor="book-summary">Résumé</FieldLabel>
        <Textarea
          id="book-summary"
          placeholder="Brève description du livre…"
          rows={3}
          {...register("summary")}
        />
        {errors.summary && (
          <p className="text-sm text-destructive" role="alert">{errors.summary.message}</p>
        )}
      </Field>

      {/* Contenu */}
      <Field>
        <FieldLabel htmlFor="book-content">Contenu</FieldLabel>
        <Textarea
          id="book-content"
          placeholder="Contenu ou extrait du livre…"
          rows={5}
          {...register("content")}
        />
        {errors.content && (
          <p className="text-sm text-destructive" role="alert">{errors.content.message}</p>
        )}
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="book-image">
          Couverture <span className="text-destructive">*</span>
        </FieldLabel>
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

      {/* Actif */}
      <Field>
        <div className="flex items-center justify-between rounded-lg border px-4 py-3">
          <div className="space-y-0.5">
            <FieldLabel htmlFor="book-active">Actif</FieldLabel>
            <FieldDescription>Le livre sera visible sur la plateforme.</FieldDescription>
          </div>
          <Switch
            id="book-active"
            checked={isActive}
            onCheckedChange={(val) => setValue("isActive", val, { shouldValidate: true })}
          />
        </div>
      </Field>

    </div>
  );
}