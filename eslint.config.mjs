import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
  },
  {
    ignores: ["dist/**", "build/**",".next/**","public"]
  },
  {languageOptions: { globals: {...globals.browser,...globals.node }}},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings:{
      react:{
        "version":"detect",
      }
    },
    // plugins: [
    //   "import"  // Add 'import' plugin here
    // ],
    
    rules: {
        "react/react-in-jsx-scope": "off", // JSX doesn't require React in scope since React 17
        "semi": ["error", "always"], // Enforce semicolons
        "no-console": ["warn", { allow: ["warn", "error"] }], // Allow console warnings and errors
        "no-debugger": "warn", // Warn when debugger is used
        // "prefer-const": "error", // Enforce the use of `const` for variables that are never reassigned
        "no-var": "error", // Disallow `var` in favor of `let` and `const`
        "eqeqeq": ["error", "always"], // Enforce strict equality
        "curly": "error", // Enforce consistent brace style for control statements
        "consistent-return": "error", // Enforce consistent return statements in functions
        "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx",".js"] }], // Limit JSX to .jsx and .tsx files
        "react/jsx-no-bind": [
          "warn",
          {
            ignoreRefs: true, // Warn about using functions in JSX but allow refs
          },
        ],

        //below things need an plugins
        // "import/no-unresolved": "error", // Ensure imports resolve to actual files
        // "import/named": "error", // Ensure named imports are available in the module
        // "import/default": "error", // Ensure default imports are available in the module
        // "react-hooks/rules-of-hooks": "error", // React hooks rule
        // "react-hooks/exhaustive-deps": "warn", // React hooks exhaustive deps rule
    }, 
  }
];

