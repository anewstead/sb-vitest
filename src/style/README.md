## CAUTION NEVER WRITE UNWRAPPED CSS CLASSES IN GLOBAL SCSS

Any css that is not wrapped by scss is automatically written into every consuming file,  
Whereas sass only writes the output of a variable, mixins, function in situ when its used

## Style specificity

1. MUI styles are created as CSS-in-JS but configured to be injected into the HTML first.  
   This mean we can naturally cascade and override them.  
   As a side note, MUI exposes theme items as css variables.

2. Most style can be handled in markup via utility classes which should naturally override MUI.

   **BEWARE** Inline classes have no specificity within themselves!  
   I.E. they are in the same css space and generally sort alphabetically not by className position!

```tsx
// here we set 2 css background-color via utility classes
// bg-primary wins the override because it is alphabetically last
// which is generally how the classes are compiled into the css
// the string position here cannot be relied on as has no baring
<div className="bg-primary bg-info" />
// SO AVOID DOING THIS!
<div className=`bg-primary ${extraClasses}` />
```

3. Adding a module.scss to a component should override both MUI and inline utility classes

4. **IF** using Tailwind, _css layers_ will also have be setup alongside above and add additional targeting.  
   Note that onward targetting by layers brings more complexity and should ideally be avoided if possible.

## utility.scss

**This is loosely based on and is alternative to Tailwind**  
Added to root HTML, provides some utility classes for use in markup.

**If decision is made not to use Tailwind then this is the preferred use before creating a module.scss**  
I.E. common styles can be handled with these so only complex scenarios need custom module.scss

## glb.scss

Access to all code in global sass space.  
I.E. all sass intended for use in module.scss is exported through this.  
If writing anything in global sass be mindful of variable names between files,  
as everything should be written to exist in the same global namespace.

```scss
@use "/src/style/glb";
.example {
  color: blue;
  @include glb.sm-up {
    color: red;
  }
}
```

## theme.ts

Mui theme settings imported via base theme wrapper/provider
