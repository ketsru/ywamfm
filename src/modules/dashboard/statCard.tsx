"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, type Icon  } from "lucide-react";

type Tone = "neutral" | "destructive" | "success";

const toneStyles: Record<Tone, string> = {
  neutral: "bg-secondary text-primary",
  destructive: "bg-destructive/10 text-destructive",
  success: "bg-success/10 text-success",
};

export type StatCardProps = {
  icon: Icon;
  title: string;
  description: string;
  value: number;
  suffix?: string;
  href: string;
  linkLabel: string;
  tone?: Tone;
  className?: string;
};

export function StatCard({
  icon: IconComponent,
  title,
  description,
  value,
  suffix,
  href,
  linkLabel,
  tone = "neutral",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-md",
              toneStyles[tone]
            )}
          >
            <IconComponent className="size-4" weight="duotone" />
          </span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex items-baseline gap-1.5 text-3xl font-bold tabular-nums text-foreground">
          {value.toLocaleString("fr-FR")}
          {suffix && (
            <span className="text-base font-medium text-muted-foreground">
              {suffix}
            </span>
          )}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={href}
          className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          {linkLabel}
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}