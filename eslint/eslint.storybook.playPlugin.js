/**
 * ESLint plugin for Storybook play test rules
 */

export const storybookPlayPlugin = {
  rules: {
    "require-play-test": {
      meta: {
        type: "problem",
        docs: {
          description:
            "Enforce that .stories.tsx files contain at least one play test",
          category: "Storybook",
          recommended: true,
        },
        schema: [],
        messages: {
          missingPlayTest: "Story file must contain at least one play test.",
        },
      },

      create(context) {
        const filename = context.getFilename();

        // Only check .stories.tsx files
        if (!filename.endsWith(".stories.tsx")) {
          return {};
        }

        let hasPlayTest = false;

        return {
          // Look for play functions in story exports
          ExportNamedDeclaration(node) {
            if (
              node.declaration &&
              node.declaration.type === "VariableDeclaration"
            ) {
              const declaration = node.declaration;
              declaration.declarations.forEach((decl) => {
                if (decl.init && decl.init.type === "ObjectExpression") {
                  const properties = decl.init.properties;
                  properties.forEach((prop) => {
                    if (prop.key && prop.key.name === "play") {
                      hasPlayTest = true;
                    }
                  });
                }
              });
            }
          },

          // Check at the end of the file if we found any play tests
          "Program:exit"() {
            if (!hasPlayTest) {
              context.report({
                node: context.getSourceCode().ast,
                messageId: "missingPlayTest",
              });
            }
          },
        };
      },
    },
  },
};
