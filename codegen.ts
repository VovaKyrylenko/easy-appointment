import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "app/graphql/**/*.ts", // Перевірте правильність цього шляху
  generates: {
    "app/graphql/generated/": {
      // Вихідний каталог для згенерованих типів
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
