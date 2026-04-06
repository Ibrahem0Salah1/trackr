// app/features/applications/search-params-cache.ts
import { createSearchParamsCache } from "nuqs/server";
import { searchParamsParsers } from "./search-params";

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
