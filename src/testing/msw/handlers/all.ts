import { sampleDefault } from "./sampleHandlers";

/*
IMPORTANT - The default handlers array:

there cam only be 1 handler per resource URL at a time
if the same resource url is referenced twice then the last overwrites previous
so be sure to only add the default use-case handler for each resource URL here

alternative scenarios are then used as overrides on a per test basis

E.G.
default case (returns 200 OK):

added here:
handlers = [myDefaultRequestHandler, other, etc] 

then to override for a specific test:
e.g. test load error (returns 400 bad): 

myUtil.test.ts
import { server } from "@src/testing/msw/server";
server.use(myRequestHandlerReject);

and then in the storybook addon:

MyComponent.stories.tsx
parameters: {
  msw: {
    handlers: [myRequestHandlerReject],
  },
},
*/

export const handlers = [sampleDefault];
