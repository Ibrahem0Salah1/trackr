"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _config = await jitiImport("prisma/config");var _default = exports.default =

(0, _config.defineConfig)({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations"
  }
}); /* v9-e87ed13832a0e899 */
