import type { AddFileVariables } from "./add-file";

interface QueryFilesResponse {
  data: {
    queryFiles: AddFileVariables[];
  };
}

export async function fetchQueryFiles(): Promise<Array<AddFileVariables>> {
  const query = `query QueryFiles {
    queryFiles {
      uid
      path
      fileName
      fileExtension
      modifiedAt
      createdAt
      fileContent
      dType
    }
  }`;

  const response = await fetch("http://localhost:8686/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    }),
  });

  const result = await response.json() as QueryFilesResponse;
  return result.data.queryFiles;
}
