"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

// ----------------- Validation Schema -----------------
const formSchema = z.object({
  titre: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères.")
    .max(50, "Le titre doit contenir au maximum 50 caractères."),
  auteur: z
    .string()
    .min(3, "L'auteur doit contenir au moins 3 caractères.")
    .max(50, "L'auteur doit contenir au maximum 50 caractères."),
  resume: z
    .string()
    .min(10, "Le résumé doit contenir au moins 10 caractères.")
    .max(200, "Le résumé doit contenir au maximum 200 caractères.")
    .optional(),
  langue: z
    .string()
    .min(2, "La langue doit contenir au moins 2 caractères.")
    .max(20, "La langue doit contenir au maximum 20 caractères."),
  image: z
    .string()
    .url("Veuillez saisir une URL valide pour l'image.")
    .optional()
    .or(z.literal("")), // autoriser champ vide
})

export function LivreForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      auteur: "",
      resume: "",
      langue: "",
      image: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Livre soumis :", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius) + 4px)",
      } as React.CSSProperties,
    })
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Ajouter un Livre</CardTitle>
        <CardDescription>
          Remplissez les informations du livre.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="livre-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Titre */}
            <Controller
              name="titre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="livre-titre">Titre</FieldLabel>
                  <Input
                    {...field}
                    id="livre-titre"
                    placeholder="Ex: Les bases de React"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Auteur */}
            <Controller
              name="auteur"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="livre-auteur">Auteur</FieldLabel>
                  <Input
                    {...field}
                    id="livre-auteur"
                    placeholder="Ex: Jean Dupont"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Résumé */}
            <Controller
              name="resume"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="livre-resume">Résumé</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="livre-resume"
                      placeholder="Résumé du livre..."
                      rows={4}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupText className="tabular-nums">
                        {(field.value ?? "").length}/200 caractères
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Langue */}
            <Controller
              name="langue"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="livre-langue">Langue</FieldLabel>
                  <Input
                    {...field}
                    id="livre-langue"
                    placeholder="Ex: Français"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Image */}
            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="livre-image">Image URL</FieldLabel>
                  <Input
                    {...field}
                    id="livre-image"
                    placeholder="https://exemple.com/image.jpg"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    {"Laisser vide si aucune image n'est disponible."}
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="livre-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
