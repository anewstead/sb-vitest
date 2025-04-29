import { markdownDefault } from "./markdownHandlers";
import { sampleDefault } from "./sampleHandlers";

/**
 * IMPORTANT - The default handlers array: \
 *
 * Technically this is not all handlers, just the typical cases.\
 * I.e. there cam only be 1 handler per resource URL at a time\
 * If same resource url is referenced twice then last overwrites previous\
 * Be sure to only add default use-case handler for each resource URL here\
 *
 * Alternative scenarios are then used as overrides on a per test basis
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

export const handlers = [sampleDefault, markdownDefault];
