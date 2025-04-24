import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

const app = new Hono();

app.use("/*", cors());
const route = app.post(
  "/posts",
  zValidator(
    "form",
    z.object({
      title: z.string(),
      body: z.string(),
    }),
  ),
  (c) => {
    // ...
    return c.json(
      {
        ok: true,
        message: "Created!",
      },
      201,
    );
  },
);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  },
);

export type AppType = typeof route;
