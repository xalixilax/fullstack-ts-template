import { hc, type InferRequestType, type InferResponseType } from "hono/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AppType } from "../../../servers/template/src";
import {Button} from "ui/src/components/ui/button"

const client = hc<AppType>("http://localhost:3000/");

function App() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await client.posts.$post({
        form: {
          title: "test",
          body: "true",
        },
      });
      return await res.json();
    },
  });

  const $post = client.posts.$post;

  const mutation = useMutation<
    InferResponseType<typeof $post>,
    Error,
    InferRequestType<typeof $post>["form"]
  >({
    mutationFn: async (todo) => {
      const res = await client.posts.$post({
        form: { ...todo },
      });
      return await res.json();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
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

      <div>
        {query.data?.message}
      </div>
    </div>
  );
}

export default App;
