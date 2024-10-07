import type { LinksFunction } from "@remix-run/node";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import {
  Form,
  Link,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet
} from "@remix-run/react";

import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

import { getAllSettings } from './api/dataSettings'

export async function clientLoader({
  request,
}: ClientLoaderFunctionArgs) {
  const data = await getAllSettings();

  return await data;
}

export default function App() {
  const settings = useLoaderData<typeof clientLoader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <ul>
              {settings.map((setting) => (
                <li key={setting.id} >
                  <Link to={`/settings/${setting.guid}`}>{setting.guid}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
