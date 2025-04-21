**NEVER WRITE UNWRAPPED CSS CLASSES IN GLOBAL SCSS**  
Any css that is not wrapped by scss is automatically written into every consuming file  
Whereas sass will only write the output of a variable, mixins, function in situe when used

## Global

All code here is in global space. use wisely!  
Everywhere else in the app should use modules to prevent namespace clashes

## theme.ts

theme settings imported via base theme wrapper/provider

## gbl sass

scss variable, mixins, functions etc.

SCSS @use requires urls to locate file, (ugly ../../etc)
Alias @ path work in vite for compilation  
however is not supported by vscode or any extension for code hints  
So (current) best option is to use absolute path in scss i.e. @use "/src/..."  
This gives vscode code completion, we then add an alias in vite  
"/src/" to "./src/"  
This may seem odd but works well because "/" in scss refers to project root,  
where in typescript "/" refers to HD root, so would never be used as alias there anyway.  
(fyi, typescript alias should be setup as @src/...)

possible future fixes?:

- https://github.com/microsoft/vscode/issues/163967\
- https://github.com/wkillerud/vscode-scss/issues/41

```
// scss
@use "/src/style/gbl.scss";
.my-class{
  padding: gbl.$my-padding;
}
```

type-safe classes in .tsx via [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)

```
// tsx
import css from "./carouselButton.module.scss";
className={css.***} // when type dot *** should be autocomplete suggestion
// inserts correct syntax for class names
className={css.someClass} // camelCase
className={css["my-class"]} // kebab-case
```
