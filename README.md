# PocketBase SSR

A small helper package for using PocketBase in server-side rendering (SSR) environments

- [GitHub](https://github.com/kop7er/pocketbase-ssr/)
- [Examples](https://github.com/kop7er/pocketbase-ssr/tree/master/examples)

> [!WARNING]
> This package is still in development and can be unstable, but it should work without any issues.

## Installation

```bash
npm install pocketbase pocketbase-ssr
yarn add pocketbase pocketbase-ssr
pnpm add pocketbase pocketbase-ssr
bun add pocketbase pocketbase-ssr
```

## Example Usage

### With Request and Response

```ts
import { createServerClient } from "pocketbase-ssr";

async function handler({ req, res }: { req: Request; res?: Response }) {

    const pb = await createServerClient(process.env.POCKETBASE_URL!, { req, res });

    // Do something with the client

}
```

### With Cookies

```ts
import { createServerClient } from "pocketbase-ssr";

async function handler() {

    const pb = await createServerClient(process.env.POCKETBASE_URL!, {

        cookies: {

            get(name: string) {

                // Return the cookie value

            },

            set(name: string, value: string) {

                // Set the cookie value

            }

        }

    });

    // Do something with the client

}
```

## License

[MIT](/LICENSE)
