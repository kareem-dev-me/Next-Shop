import { DEFAULT_PAGE_SIZE, resolvePagination, type Pagination } from "./pagination";

/** Minimal Prisma model delegate shape used by the CRUD helpers. */
// Prisma delegates are highly generic; keep this structural and permissive.
export type CrudDelegate = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findMany: (args?: any) => Promise<any[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findUnique: (args: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findFirst: (args?: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (args: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: (args: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: (args: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  count: (args?: any) => Promise<number>;
};

export type PaginatedResult<T> = {
  items: T[];
  pagination: Pagination;
};

export type FindPageOptions = {
  pageParam?: string;
  pageSize?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  where?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderBy?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  include?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select?: any;
};

/**
 * Generic Prisma CRUD helpers for any model delegate
 * (`prisma.product`, `prisma.category`, …).
 *
 * @example
 * const products = createPrismaCrud(prisma.product);
 * await products.findById(id);
 * await products.findPage({ pageParam: "1", orderBy: { createdAt: "desc" } });
 */
export function createPrismaCrud(delegate: CrudDelegate) {
  return {
    findMany<T = unknown>(args?: Parameters<CrudDelegate["findMany"]>[0]) {
      return delegate.findMany(args) as Promise<T[]>;
    },

    findUnique<T = unknown>(args: Parameters<CrudDelegate["findUnique"]>[0]) {
      return delegate.findUnique(args) as Promise<T | null>;
    },

    findById<T = unknown>(
      id: string,
      args?: Omit<Parameters<CrudDelegate["findUnique"]>[0], "where">,
    ) {
      return delegate.findUnique({
        ...args,
        where: { id },
      }) as Promise<T | null>;
    },

    findFirst<T = unknown>(args?: Parameters<CrudDelegate["findFirst"]>[0]) {
      return delegate.findFirst(args) as Promise<T | null>;
    },

    create<T = unknown>(
      data: unknown,
      args?: Omit<Parameters<CrudDelegate["create"]>[0], "data">,
    ) {
      return delegate.create({
        ...args,
        data,
      }) as Promise<T>;
    },

    update<T = unknown>(
      id: string,
      data: unknown,
      args?: Omit<Parameters<CrudDelegate["update"]>[0], "where" | "data">,
    ) {
      return delegate.update({
        ...args,
        where: { id },
        data,
      }) as Promise<T>;
    },

    delete<T = unknown>(
      id: string,
      args?: Omit<Parameters<CrudDelegate["delete"]>[0], "where">,
    ) {
      return delegate.delete({
        ...args,
        where: { id },
      }) as Promise<T>;
    },

    count(args?: Parameters<CrudDelegate["count"]>[0]) {
      return delegate.count(args);
    },

    async findPage<T = unknown>(
      options: FindPageOptions = {},
    ): Promise<PaginatedResult<T>> {
      const {
        pageParam,
        pageSize = DEFAULT_PAGE_SIZE,
        where,
        orderBy,
        include,
        select,
      } = options;

      const totalCount = await delegate.count(where ? { where } : undefined);
      const pagination = resolvePagination(pageParam, totalCount, pageSize);

      const items = (await delegate.findMany({
        where,
        orderBy,
        include,
        select,
        skip: pagination.skip,
        take: pagination.take,
      })) as T[];

      return { items, pagination };
    },
  };
}

export type PrismaCrud = ReturnType<typeof createPrismaCrud>;
