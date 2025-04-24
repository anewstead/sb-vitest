# @types Directory

Global TypeScript type declarations.
Generally not own application code.

3rd party type integrations that TypeScript needs to know about
these types are needed for typescript when either:
- you dont want/cant explicitly add the type in every file when used
- you need to define type for a package/script that does not have types itself

NB. own application types are not global and never have .d.ts extension,
they belong alongside their implementation in src, not here,
and would be imported explicitly in use.

## Adding here

1. For external packages with types:
   ```
   /// <reference types="package-name" />
   ```
2. For custom types:
   ```
   declare module "module-name" {
     // types here
   }
   ```