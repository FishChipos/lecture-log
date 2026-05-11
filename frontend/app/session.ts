import { createCookieSessionStorage } from "react-router";

type SessionData = {
    userId: string | null;
};

type SessionFlashData = {
    error: string;
};

export const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>({
        cookie: {
            name: "__session",
            maxAge: 3600,
        },
    });
