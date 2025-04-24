import { setupServer } from "msw/node";

import { handlers } from "./handlers/all";

export const server = setupServer(...handlers);
