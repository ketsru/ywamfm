
export type ApiResponse<T> = {
    success: boolean;
    message: string;        
    data: T | null;
    errors: { field?: string; error: string }[] | null; 
    timestamp: string;             
};

export type PageRequest = { page?: number; size?: number };

export type Page<T> = { items: T[]; total: number; page: number; size: number };

export type PageResponseDto<T> = {
    content:       T[];
    page:          number;
    size:          number;
    totalElements: number;
    totalPages:    number;
    hasNext:       boolean;
    hasPrevious:   boolean;
};

export const isApiSuccess = <T>(r: ApiResponse<T>): r is ApiResponse<NonNullable<T>> =>
     r.success === true && r.data !== null;