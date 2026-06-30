// @/modules/books/components/BookForm.tsx
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { bookRequestSchema, imageFileSchema } from "@/modules/books/book.schema";
import { Book } from "@/lib/types/admin/book/book.types";

type BookFormValues = z.output<typeof bookRequestSchema>;

type BookFormProps = {
  formId: string;
  defaultValues?: Book;
  onSubmit: (data: BookFormValues) => void;
};

export function BookForm({ formId, defaultValues, onSubmit }: BookFormProps) {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookRequestSchema),
    defaultValues: {
      title:    defaultValues?.title    ?? "",
      author:   defaultValues?.author   ?? "",
      language: defaultValues?.language ?? "",
      summary:  defaultValues?.summary  ?? "",
      content:  defaultValues?.content  ?? "",
      image:    defaultValues?.image    ?? "",
      isActive: defaultValues?.isActive ?? true,
    },
  });

  const isActive   = watch("isActive");
  const imageValue = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = imageFileSchema.safeParse(file);
    if (!result.success) {
      setValue("image", "", { shouldValidate: true });
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      // Retire le préfixe data-URI pour n'envoyer que le base64 brut
      const base64 = (reader.result as string).split(",")[1];
      setValue("image", base64, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

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
        <Input
          id="book-language"
          placeholder="Ex : Français"
          {...register("language")}
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
        <FieldLabel htmlFor="book-image">Couverture</FieldLabel>
        {imageValue && (
          <img
            src={`data:image/jpeg;base64,${imageValue}`}
            alt="Couverture"
            className="mb-2 h-24 w-16 rounded-lg object-cover border"
          />
        )}
        <Input
          id="book-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        <FieldDescription>Format JPG, PNG ou WEBP · Max 5 Mo</FieldDescription>
        {errors.image && (
          <p className="text-sm text-destructive" role="alert">{errors.image.message}</p>
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

    </form>
  );
}