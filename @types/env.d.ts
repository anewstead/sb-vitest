/* eslint-disable @typescript-eslint/consistent-type-definitions */

/*
extra types added to import.meta.env

TYPE ONLY, ABSOLUTELY NO VALUES

this file is added to git repo.
values go in .env file(s) in the root of the project

ImportMeta/ImportMetaEnv are "interface",
as such we can add to their type definitions
not possible if they were "type"
*/

// add env types here
interface ImportMetaEnv {
  readonly MY_SECRET_KEY: string;
}

// this adds the types from ImportMetaEnv to ImportMeta
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
