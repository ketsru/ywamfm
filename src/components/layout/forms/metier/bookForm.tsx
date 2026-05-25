// @/modules/books/components/BookForm.tsx
"use client";

import * as React from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Book, BookRequest } from "@/types/admin/book/book.types";

type BookFormProps = {
  defaultValues?: Book;
  onChange: (data: BookRequest) => void;
  error?: string;
};

export function BookForm({ defaultValues, onChange, error }: BookFormProps) {
  const [title,    setTitle]    = React.useState(defaultValues?.title    ?? "");
  const [author,   setAuthor]   = React.useState(defaultValues?.author   ?? "");
  const [language, setLanguage] = React.useState(defaultValues?.language ?? "");
  const [summary,  setSummary]  = React.useState(defaultValues?.summary  ?? "");
  const [content,  setContent]  = React.useState(defaultValues?.content  ?? "");
  const [image,    setImage]    = React.useState(defaultValues?.image     ?? "");
  const [isActive, setIsActive] = React.useState(defaultValues?.isActive ?? true);

  React.useEffect(() => {
    onChange({ title, author, language, summary: summary || null, content: content || null, image, isActive });
  }, [title, author, language, summary, content, image, isActive]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      // Retire le préfixe data-URI pour n'envoyer que le base64 brut
      const result = (reader.result as string).split(",")[1];
      setImage(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">

      {/* Titre */}
      <Field>
        <FieldLabel htmlFor="book-title">Titre <span className="text-destructive">*</span></FieldLabel>
        <Input
          id="book-title"
          placeholder="Ex : Introduction à la théologie"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>

      {/* Auteur */}
      <Field>
        <FieldLabel htmlFor="book-author">Auteur <span className="text-destructive">*</span></FieldLabel>
        <Input
          id="book-author"
          placeholder="Ex : Jean Dupont"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </Field>

      {/* Langue */}
      <Field>
        <FieldLabel htmlFor="book-language">Langue <span className="text-destructive">*</span></FieldLabel>
        <Input
          id="book-language"
          placeholder="Ex : Français"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </Field>

      {/* Résumé */}
      <Field>
        <FieldLabel htmlFor="book-summary">Résumé</FieldLabel>
        <Textarea
          id="book-summary"
          placeholder="Brève description du livre…"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
        />
      </Field>

      {/* Contenu */}
      <Field>
        <FieldLabel htmlFor="book-content">Contenu</FieldLabel>
        <Textarea
          id="book-content"
          placeholder="Contenu ou extrait du livre…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
        />
      </Field>

      {/* Image */}
      <Field>
        <FieldLabel htmlFor="book-image">Couverture</FieldLabel>
        {image && (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt="Couverture"
            className="mb-2 h-24 w-16 rounded-lg object-cover border"
          />
        )}
        <Input
          id="book-image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="cursor-pointer"
        />
        <FieldDescription>Format JPG, PNG ou WEBP.</FieldDescription>
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
            onCheckedChange={setIsActive}
          />
        </div>
      </Field>

      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
    </div>
  );
}