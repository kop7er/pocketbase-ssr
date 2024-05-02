import PocketBase from "pocketbase";
import { DEFAULT_COOKIE_NAME } from "./constants";
import type { ClientOptions } from "./types";

export async function createServerClient(pocketBaseUrl: string = "/", options: ClientOptions): Promise<PocketBase> {

    const pbCookieName = options.cookieOptions?.name || DEFAULT_COOKIE_NAME;

    const pb = new PocketBase(pocketBaseUrl, options.authStore, options.lang);

    let cookies: string | undefined | null;

    if (options.cookies?.get && typeof options.cookies.get === "function") {

        const authToken = await options.cookies.get(pbCookieName);;

        cookies = authToken ? `${pbCookieName}=${authToken}` : undefined;

    } else if (options.req) {

        cookies = decodeURIComponent(options.req.headers.get("cookie") || "");

    }

    pb.authStore.loadFromCookie(cookies || "", pbCookieName);

    try {

        pb.authStore.isValid && await pb.collection("users").authRefresh();

    } catch (_) {

        pb.authStore.clear();

    }

    pb.authStore.onChange(() => {

        const newCookie = pb.authStore.exportToCookie(options.cookieOptions, pbCookieName);

        if (options.cookies?.set && typeof options.cookies.set === "function") {

            const cookieValue = newCookie.split(`${pbCookieName}=`)[1];

            options.cookies.set(pbCookieName, cookieValue);

        } else if (options.res) {

            options.res.headers.append("Set-Cookie", newCookie);

        }

    });

    return pb;

}
