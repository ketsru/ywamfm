import { Testimony } from "./testimony.types";

export const formatTestimonyDate = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString("fr-FR", {
    day:   "2-digit",
    month: "long",
    year:  "numeric",
  });

export const toTestimonySummary = (testimony: Testimony) => ({
  id:        testimony.id,
  userName:  testimony.userName,
  userImage: testimony.userImage ?? null,
  domaine:   testimony.domaine,
  content:   testimony.content,
  courseId:  testimony.courseId ?? null,
  isApproved: testimony.isApproved,
  createdAt: formatTestimonyDate(testimony.createdAt),
});

export type TestimonySummary = ReturnType<typeof toTestimonySummary>;