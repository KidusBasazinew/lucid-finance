export type PaginationQuery = {
   page?: string | number;
   limit?: string | number;
   sort?: string;
   order?: 'asc' | 'desc' | string;
};

export type PaginationParams = {
   page: number;
   limit: number;
   skip: number;
   sort: string;
   order: 'asc' | 'desc';
};

export function getPagination(query: PaginationQuery): PaginationParams {
   const page = Math.max(parseInt(String(query.page ?? '1'), 10) || 1, 1);
   const limit = Math.min(
      Math.max(parseInt(String(query.limit ?? '10'), 10) || 10, 1),
      100
   );
   const skip = (page - 1) * limit;
   const sort = (query.sort ?? 'createdAt') as string;
   const order = (
      String(query.order ?? 'desc').toLowerCase() === 'asc' ? 'asc' : 'desc'
   ) as 'asc' | 'desc';
   return { page, limit, skip, sort, order };
}

export type PaginatedResult<T> = {
   data: T[];
   page: number;
   limit: number;
   total: number;
   totalPages: number;
};

export function buildPaginated<T>(
   data: T[],
   total: number,
   params: PaginationParams
): PaginatedResult<T> {
   const totalPages = Math.max(Math.ceil(total / params.limit), 1);
   return { data, page: params.page, limit: params.limit, total, totalPages };
}
