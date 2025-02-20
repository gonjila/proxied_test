import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://" + process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  documents: ["./src/**/*.{ts,tsx,gql,graphql}"],
  generates: {
    "src/gql/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
