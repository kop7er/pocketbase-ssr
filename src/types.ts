import type { BaseAuthStore, SerializeOptions } from "pocketbase";

export type CookieOptions = { name?: string } & SerializeOptions;

export type CookieMethods = {
    get?: (key: string) => Promise<string | null | undefined> | string | null | undefined;
    set?: (key: string, value: string) => Promise<void> | void;
};

export type BaseClientOptions = {
    authStore?: BaseAuthStore | null;
    lang?: string;
    cookieOptions?: CookieOptions;
};

export type ClientOptionsCookie = BaseClientOptions & { cookies: CookieMethods };

export type ClientOptionsReqRes = BaseClientOptions & {
    req: Request;
    res?: Response;
};

export type ClientOptions = (ClientOptionsCookie & { req?: never; res?: never }) | (ClientOptionsReqRes & { cookies?: never });
