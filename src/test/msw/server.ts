/**
 * This is the server instance for MSW\
 * This is used in node environment tests
 */

import { setupServer } from "msw/node";

import { handlers } from "./handlers/defaults";

export const server = setupServer(...handlers);
