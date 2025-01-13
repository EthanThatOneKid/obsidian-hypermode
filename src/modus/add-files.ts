import type { AddFileVariables } from "./add-file";

interface AddFilesResponse {
  data: {
    addFiles: Array<{
      key: string;
      value: string;
    }>;
  };
}

interface AddFilesVariables {
  files: Array<AddFileVariables>;
}

export async function fetchAddFiles(
  variables: AddFilesVariables,
): Promise<AddFilesResponse["data"]["addFiles"]> {
  const query = `mutation AddFiles($files: [FileInput!]!) {
    addFiles(files: $files) {
      key
      value
    }
  }`;

  const response = await fetch("http://localhost:8686/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json() as AddFilesResponse;
  console.log({ result });
  return result.data.addFiles;
}
