import { setupWorker } from "msw/browser";

import { handlers } from "./handlers/all";

export const worker = setupWorker(...handlers);
