export const DEFAULT_PAGE_SIZE = 10;

export type Pagination = {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  skip: number;
  take: number;
  hasPrev: boolean;
  hasNext: boolean;
};

export function resolvePagination(
  pageParam: string | undefined,
  totalCount: number,
  pageSize = DEFAULT_PAGE_SIZE,
): Pagination {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const requestedPage = Math.max(
    1,
    Number.parseInt(pageParam ?? "1", 10) || 1,
  );
  const page = Math.min(requestedPage, totalPages);
  const skip = totalCount === 0 ? 0 : (page - 1) * pageSize;

  return {
    page,
    pageSize,
    totalCount,
    totalPages,
    skip,
    take: pageSize,
    hasPrev: page > 1,
    hasNext: page < totalPages && totalCount > 0,
  };
}
