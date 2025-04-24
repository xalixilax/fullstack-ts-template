import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type InferRequestType, type InferResponseType, hc } from "hono/client";
import { useState } from "react";
import { Button } from "ui/src/components/ui/button";
import type { AppType } from "../../../servers/template/src";

/**
 * Hono RPC initialisation for the client
 * @see https://hono.dev/docs/guides/rpc
 */
const client = hc<AppType>("http://localhost:3000/");

export function App() {
  const queryClient = useQueryClient();
  const [state, setState] = useState<null | string>(null);

  /**
   * Sample react-query mutation
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/mutations
   */
  const mutation = useMutation<
    InferResponseType<typeof client.posts.$post>,
    Error,
    InferRequestType<typeof client.posts.$post>["form"]
  >({
    mutationFn: async (todo) => {
      const res = await client.posts.$post({
        form: { ...todo },
      });
      return await res.json();
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setState(res.message);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <div>
      <Button
        onClick={() => {
          mutation.mutate({
            title: "Hello",
            body: "Hono is a cool project",
          });
        }}
      >
        Add Todo
      </Button>

      <div>{state}</div>
    </div>
  );
}
