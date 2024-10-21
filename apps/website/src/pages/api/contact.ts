export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  // Validate data
  const data = await request.formData();
  const name = data.get("form-full-name");
  const email = data.get("form-email");
  const message = data.get("form-message");
  // Do something with data
  return new Response(
    JSON.stringify({
      message: "Success!",
      data: {
        name,
        email,
        message,
      },
    }),
    { status: 200 },
  );
};
