import "./global.css";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { ClientProvider } from "~/client/trpcClient";
import { rsc } from "../server-rsc/trpc";

export default function RootLayout(props: PropsWithChildren) {
  const user = rsc.whoami.use();
  return (
    <ClientProvider>
      <html lang="en">
        <head>
          <title>Next.js hello</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </head>
        <body>
          <nav className="p-4">
            <ul className="flex flex-col items-center justify-center space-y-2 space-x-2 sm:flex-row sm:space-y-0">
              <li>
                <Link href="/" className="text-indigo-500 underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/secret" className="text-indigo-500 underline">
                  Secret page
                </Link>
              </li>
              <li>
                {user ? (
                  <>
                    Hi <em>{user.name}</em>.{" "}
                    <Link href="/api/auth/signout" className="underline">
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/api/auth/signin" className="button">
                      Login
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </nav>

          <main>{props.children}</main>
        </body>
      </html>
    </ClientProvider>
  );
}
