/**
 * Vite path aliases\
 * Use in vite.config.resolve.alias\
 *
 * Absolute paths begin "/" (root)\
 * Relative paths being "./" (current) or "../" (parent)\
 *
 * SCRIPTS (js/ts(x)):\
 * In scripts Absolute paths refer to computer root,\
 * This is never used as would tie scripts to a particular machine\
 * Tools such as eslint and TypeScript will\
 * Report errors if script imports begin "/"\
 * Therefore the default is to use relative imports,\
 * This quickly becomes a "../../" nightmare!
 *
 * Instead we create @ alias\
 * This maps import paths as if absolute to project root.\
 * In most cases the only alias you need for scripts is:
 *
 * ViteAlias("@src/", "./src/")
 *
 * If using TypeScript\
 * Ensure tsconfig has equivalent matching alias resolution\
 * `compilerOptions.paths: { "@src/*": ["./src/*"] }`
 *
 * Avoid aliasing many paths for sake of shorter import paths\
 * The fewer alias you have the easier it is, too many only adds confusion\
 * Again `@src` is most likely the only alias you should need
 *
 * Why not just ViteAlias("@/", "./")?\
 * This would give you everything in project root\
 * Including node_modules, build files etc,\
 * Do you really want or need that\
 * If nothing else it would slow down your IDE.
 *
 * SASS/SCSS:\
 * Even though the above alias should work for Vite/SASS compilation too.\
 * There is a slight problem... IDE/VSCode intellisense and extensions\
 * Don't recognise alias paths within SCSS (yet) and fail to give code hints\
 * Thankfully imports starting "/" are okay in SCSS\
 * And unlike scripts, read as absolute from project root.\
 * E.g in SCSS import "/src/etc/my.scss"\
 * Great, compilation and code hints work.\
 *
 * Note, just in case!\
 * If for some reason your vite setup reads "/" paths in SCSS as HD root\
 * You could add another alias:
 *
 * ViteAlias("/src/", "./src/");
 *
 * This is fine, it should only ever apply in SCSS\
 * As mentioned above, script imports will never start with "/"\
 * Even if by mistake have a "/" path import in a script\
 * The alias map still points to same alias location!
 */
import { fileURLToPath, URL } from "url";

/**
 * @example
 *   viteAlias("@src/", "./src/");
 *
 * @param findGlob - Used in imports statements
 * @param localPath - Replaced path relative to project root
 */
export const viteAlias = (findGlob: string, localPath: string) => {
  return {
    find: findGlob,
    replacement: fileURLToPath(new URL(localPath, import.meta.url)),
  };
};
