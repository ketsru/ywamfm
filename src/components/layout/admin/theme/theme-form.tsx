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
  nom: z
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères.")
    .max(50, "Le nom doit contenir au maximum 50 caractères."),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères.")
    .max(200, "La description doit contenir au maximum 200 caractères.")
    .optional(),
})

export function ThemeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Theme soumis :", {
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
        <CardTitle>Créer un Theme</CardTitle>
        <CardDescription>
          Remplissez les informations du thème.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="theme-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Nom */}
            <Controller
              name="nom"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="theme-nom">Nom</FieldLabel>
                  <Input
                    {...field}
                    id="theme-nom"
                    placeholder="Ex: Informatique"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="theme-description">Description</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="theme-description"
                      placeholder="Description du thème..."
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
                  <FieldDescription>
                    Décrivez le thème en quelques phrases.
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
          <Button type="submit" form="theme-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
