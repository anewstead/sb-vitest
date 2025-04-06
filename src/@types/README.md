# @types Directory

Global TypeScript type declarations.

3rd party type integrations that TypeScript needs to know about
so you don't need to explicitly add in every file.
Generally these are for project level setup (build tools, testing frameworks, etc.)
and relate to types for code found in node_modules.

Own application types are not global in the same sense
they belong alongside their implementation, not be added here
they will be imported explicitly in each app/test file when required

## Usage

1. For external packages:
   ```
   /// <reference types="package-name" />
   ```
2. For custom types:
   ```
   declare module "module-name" {
     // types here
   }
   ```

## Examples

✅ Belongs in @types:

- Build tool configurations
- Testing framework types
- Development tooling types
- Missing type declarations for JavaScript modules

❌ Does NOT belong in @types:

- Application business logic types
- UI component types
- Data model types
