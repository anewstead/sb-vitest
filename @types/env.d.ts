/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

/**
 * Extra types added to import.meta.env\
 *
 * TYPE ONLY, ABSOLUTELY NO VALUES\
 *
 * This file is added to git repo.\
 * Values go in .env file(s) in the root of the project\
 *
 * ImportMeta/ImportMetaEnv are "interface",\
 * As such we can add to their type definitions\
 * Not possible if they were "type"
 */

// add env types here
interface ImportMetaEnv {
  readonly MY_SECRET_KEY: string;
}

// this adds the types from ImportMetaEnv to ImportMeta
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
