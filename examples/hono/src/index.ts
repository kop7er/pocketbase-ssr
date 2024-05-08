import { Hono } from "hono";
import { createServerClient } from "pocketbase-ssr";

type Bindings = {
    POCKETBASE_URL: string;
}

const app = new Hono<{ Bindings: Bindings }>();

function getPocketBaseClient(c: any) {

    return createServerClient(c.env.POCKETBASE_URL, { req: c.req.raw, res: c.res });

}

app.get("/", async (c) => {

    const pb = await getPocketBaseClient(c);

    if (!pb.authStore.model) {

        return c.text("Unauthorized", 401);

    }

    return c.json(pb.authStore.model);

});

app.post("/login", async (c) => {

    const body = await c.req.json();

    const pb = await getPocketBaseClient(c);

    await pb.collection("users").authWithPassword(body.email, body.password);

    if (!pb.authStore.model) {

        return c.text("Unauthorized", 401);

    }

    return c.json(pb.authStore.model);

});

export default app;
