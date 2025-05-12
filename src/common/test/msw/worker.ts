/**
 * This is the worker instance for MSW\
 * This is used in browser environment tests
 */

import { setupWorker } from "msw/browser";

import { handlers } from "./defaultHandlers";

export const worker = setupWorker(...handlers);
