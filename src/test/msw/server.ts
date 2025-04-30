import { setupServer } from "msw/node";

import { handlers } from "./handlers/defaults";

export const server = setupServer(...handlers);
