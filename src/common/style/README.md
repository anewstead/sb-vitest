**NEVER WRITE UNWRAPPED CSS CLASSES IN GLOBAL SCSS**  
Any css that is not wrapped by scss is automatically written into every consuming file  
Whereas sass will only write the output of a variable, mixins, function in situ when used

## Global

All code here is in global space. use wisely!  
Everywhere else in the app should use modules to prevent namespace clashes

## theme.ts

theme settings imported via base theme wrapper/provider

## tailwind

Root tailwind setup
