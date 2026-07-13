export interface Testimony {
  id: string;
  userName: string;
  userImage?: string | null;
  domaine: string;
  content: string;
  courseId?: string | null;
  isApproved: boolean;
  createdAt: string;
}

export interface TestimonyRequest {
  domaine: string;
  content: string;
  courseId?: string | null;
}