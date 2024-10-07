import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";

// export async function loader() {
//     const res = await fetch("https://api.github.com/gists");
//     return json(await res.json());
//   }


export async function clientLoader({
  request,
}: ClientLoaderFunctionArgs) {
  const data = await fetch("https://localhost:7092/api/Settings/Data");// (2)
  return await data.json();
}
  
  export default function Settings() {
    const gists = useLoaderData<typeof clientLoader>();
    return (
      <ul>
        {gists.map((gist) => (
          <li key={gist.id}>
            <a href={gist.guid}>{gist.id}</a>
          </li>
        ))}
      </ul>
    );
  }