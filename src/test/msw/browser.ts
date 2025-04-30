import { setupWorker } from "msw/browser";

import { handlers } from "./handlers/defaults";

export const worker = setupWorker(...handlers);
