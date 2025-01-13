interface AlterSchemaResponse {
  data: {
    alterSchema: string;
  };
}

export async function fetchAlterSchema(): Promise<string> {
  const query = `mutation AlterSchema {
    alterSchema
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

  const result = await response.json() as AlterSchemaResponse;
  return result.data.alterSchema;
}
