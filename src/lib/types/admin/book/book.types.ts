
export interface BookApiDto {
  id: string;
  title: string;
  author: string;
  summary: string | null;
  language: string;
  image?: File | string | null;
  content: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string; 
  title: string;
  author: string;
  summary?: string | null;
  language: string;
  imageUrl: string; 
  content?: string | null;
  isActive: boolean;
  createdAt: string; 
  updatedAt: string; 
}

export interface BookRequest {
  title: string;
  author: string;
  summary?: string | null;
  language: string;
  image?: File | string | null;
  content?: string | null;
  isActive?: boolean;
}

export interface BookFilters {
  activeOnly?: boolean;
  title?: string;
  author?: string;
  language?: string;
}

export interface BookState {
  books: Book[];
  selectedBook: Book | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
}