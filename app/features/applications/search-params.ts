// app/features/applications/search-params.ts
import { parseAsInteger, parseAsString } from "nuqs/server";

export const searchParamsParsers = {
  q: parseAsString.withDefault("").withOptions({
    clearOnDefault: true,
    scroll: false,
  }),

  page: parseAsInteger
    .withDefault(1)
    .withOptions({ clearOnDefault: true, scroll: true }),
};
