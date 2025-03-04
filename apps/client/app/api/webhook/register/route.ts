import { Webhook } from "svix";
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"
import prisma  from "db/client"

export const POST = async (req: Request) => {

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook Secret Missing!!!");
  };

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured - No svix headers");
  };

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent;
  } catch (error) {
    console.log(error);
    return new Response("Error Occured", { status: 400});
  }

  const { id } = event.data;
  const eventType = event.type;

  if(eventType === "user.created"){
    try {
      const { email_addresses, primary_email_address_id } = event.data;
      
      const primaryEmail = email_addresses.find(email => email.id === primary_email_address_id);
      
      if(!primaryEmail){
        return new Response("No primary Email found", { status: 400 });
      };

      const newUser = await prisma.users.create({
        data: { email: primaryEmail.email_address }
      });

      return new Response("Webhook recived successfully", { status: 200});
    } catch (error) {
      return new Response("Error creating user in DB", { status: 400 });
    }
  }
};