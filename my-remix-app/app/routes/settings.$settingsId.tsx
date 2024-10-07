import { useLoaderData } from "@remix-run/react";
import type { ClientLoaderFunctionArgs } from "@remix-run/react";
import { Form } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getSettings } from '../api/dataSettings'


export const clientLoader = async ({
  params,
}: ClientLoaderFunctionArgs) => {
  invariant(params.settingsId, "Missing contactId param");
  const setting = await getSettings(params.settingsId);
  if (!setting) {
    throw new Response("Not Found", { status: 404 });
  }
  return setting;
};


  export default function Settings() {
    const setting = useLoaderData<typeof clientLoader>();
    return (
      <Form key={setting.id} id="setting-form" method="post">
        <p>
          <span>Id</span>
          <input
            aria-label="First name"
            defaultValue={setting.id}
            name="first"
            placeholder="First"
            type="text"
          />
          
        </p>
        <label>
          <span>Guid</span>
          <input
            defaultValue={setting.guid}
            name="twitter"
            placeholder="@jack"
            type="text"
          />
        </label>
        
        <p>
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </p>
      </Form>
    );
  }
  