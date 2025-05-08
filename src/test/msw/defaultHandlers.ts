/**
 * IMPORTANT - The default handlers array: \
 *
 * This is not all handlers.\
 * I.e. there can only be 1 handler per resource URL at a time\
 * If same url is referenced twice then last overwrites previous\
 * Be sure to only add default use-case handler for each resource URL here\
 *
 * Alternative scenarios are then loaded as overrides on a per test basis
 *
 * E.G.\
 * Default case (returns 200 OK):
 *
 * Added here:\
 * Handlers = [myDefaultRequestHandler, other, etc]
 *
 * Then to override for a specific test:\
 * E.g. test load error (returns 400 bad):
 *
 * MyUtil.test.ts\
 *
 *     import { server } from "@src/test/msw/server";
 *     server.use(myRequestHandlerReject);
 *
 * And then in the storybook addon:
 *
 * MyComponent.stories.tsx
 *
 *     parameters: {
 *       msw: {
 *         handlers: [myRequestHandlerReject],
 *       },
 *     },
 */

import { contentSuccess } from "./handlers/i18nContentHandlers";
import { i18nSuccess } from "./handlers/i18nJsonHandlers";
import { sampleDefault } from "./handlers/sampleHandlers";

export const handlers = [sampleDefault, i18nSuccess, contentSuccess];
