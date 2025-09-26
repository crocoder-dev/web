//import { ContactTemplate } from "@/email-templates/contact";
//import { sendEmail } from "@/helpers/email";
import { createContact } from "@/helpers/notion";
import { notifyContactCreated } from "@/helpers/slack";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import z from "zod";

const bodyValidationSchema = z.object({
  name: z.string(),
  email: z
    .email({ message: "Invalid email adress" })
    .min(1, { message: "Required field" }),
  message: z.string().min(1, { message: "Required field" }),
  hasConsent: z.boolean().optional(),
});

type RequestBody = z.infer<typeof bodyValidationSchema>;

const { NOTION_DATABASE_ID, VERCEL_ENV } = process.env;

const allowOrigin = !VERCEL_ENV
  ? "http://localhost:4321"
  : "https://crocoder.dev";

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "OPTIONS, POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "false",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  if (request.headers.get("Content-Type") === "application/json") {
    try {
      const body = (await request.json()) as RequestBody;
      const bodyValidationResult = bodyValidationSchema.safeParse(body);

      if (!body || bodyValidationResult.error) {
        return new Response(
          JSON.stringify({
            message: bodyValidationResult.error?.message || "No body was found",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
            },
          },
        );
      }

      const { name, email, message, hasConsent } = body;

      if (!hasConsent) {
        return new Response(JSON.stringify({ message: "No consent by user" }), {
          status: 403,
          headers: {
            ...corsHeaders,
          },
        });
      }

      const referer = request.headers.get("referer");
      const origin = request.headers.get("origin");
      let source = "Unknown";

      if (referer && origin && referer.startsWith(origin)) {
        source = referer.slice(origin.length);
      }

      const { id: notionPageId, url } = await createContact(
        `Message from ${name} (${nanoid()})`,
        email,
        name,
        message,
        NOTION_DATABASE_ID || "",
        source,
      );

      if (notionPageId && url) {
        await notifyContactCreated(name, email, "url");
      }

      /* await sendEmail({
        template: <ContactTemplate />,
        options: { to: email, subject: "Thank you for contacting us!" },
      }); */

      return new Response(
        JSON.stringify({
          message: "Success",
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
          },
        },
      );
    } catch (error) {
      console.error("Error - api/contacts", error);

      const statusCode = (error as any).statusCode || 501;
      const message =
        (error as any)?.body?.message || "Issue while processing request";

      return new Response(JSON.stringify({ message }), {
        status: statusCode,
        headers: {
          ...corsHeaders,
        },
      });
    }
  }

  return new Response(null, { status: 415, headers: corsHeaders });
}
