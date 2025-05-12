# Common folder

- Assets: used direct via import and left to vite to compile.  
  For example svg get compiled into code bundle, images are copied to dist/assets during compilation  
  Use 'public' folder if you want to properly manage external media/asset files from domain root

- Global configs & setup

  - i18n internationalisation content setup
  - test setup and mocks (not actual tests)

- utils
  shared utilities used in app
  (note. test also has own separate utils)
