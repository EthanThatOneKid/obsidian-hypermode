interface AddFileResponse {
  data: {
    addFile: Array<{
      key: string;
      value: string;
    }>;
  };
}

export interface AddFileVariables {
  uid: string;
  path: string;
  fileName: string;
  fileExtension: string;
  modifiedAt: string;
  createdAt: string;
  fileContent: string;
  dType: ["File"];
}

export async function fetchAddFile(
  variables: AddFileVariables,
): Promise<AddFileResponse["data"]["addFile"]> {
  const query =
    `mutation AddFile($path: String!, $fileName: String!, $fileExtension: String!, $modifiedAt: String!, $createdAt: String!, $fileContent: String!) {
    addFile(path: $path, fileName: $fileName, fileExtension: $fileExtension, modifiedAt: $modifiedAt, createdAt: $createdAt, fileContent: $fileContent) {
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

  const result = await response.json() as AddFileResponse;
  return result.data.addFile;
}
