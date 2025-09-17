//import { ContactTemplate } from "@/email-templates/contact";
//import { sendEmail } from "@/helpers/email";
import { processContact } from "@/helpers/notion";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import z from "zod";

const bodyValidationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .email({ message: "Invalid email adress" })
    .min(1, { message: "Required field" }),
  message: z.string().min(1, { message: "Required field" }),
  hasConsent: z.boolean().optional(),
});

type RequestBody = z.infer<typeof bodyValidationSchema>;

const { NOTION_DATABASE_ID } = process.env;

const allowRequest = async (request: Request & { ip?: string }) => {
  return { success: true, limit: 1, reset: Date.now() + 30000, remaining: 1 };
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request: NextRequest) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

      const { success, limit, reset, remaining } = await allowRequest(request);

      if (!success) {
        return new Response(
          JSON.stringify({
            message: "Too many requests. Please try again in a minute",
          }),
          {
            status: 429,
            headers: {
              ...corsHeaders,
            },
          },
        );
      }

      await processContact({
        id: nanoid(),
        email,
        name,
        message,
        databaseID: NOTION_DATABASE_ID || "",
        source: request.nextUrl.searchParams.get("source") || "Unknown",
      });

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
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
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

  return new Response(null, { status: 400, headers: corsHeaders });
}
