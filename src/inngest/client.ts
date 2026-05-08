import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "tokentalks",
  eventKey: process.env.INNGEST_EVENT_KEY ?? "",
});
