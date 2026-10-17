/** The enquiry demo's rules engine, ported exactly from the V4 reference.
 * Plain pattern matching, no AI: it detects the type of message and its
 * urgency, picks out a few details and drafts a reply for a made-up plumber.
 * Used at build time for the first example and in the browser for the rest. */

export interface Analysis {
  type: string;
  urg: string;
  hot: boolean;
  facts: string[];
  reply: string;
}

const PHONE = /(?:\+44\s?7|07)\d{3}\s?\d{6}/;

export function analyse(t: string): Analysis {
  const l = t.toLowerCase();
  let type = "General question";
  let hot = false;
  let urg = "Normal";
  if (/not happy|complain|unhappy|disappointed|refund|started again|still broken|again/.test(l))
    type = "Complaint";
  else if (/how much|price|cost|quote|estimate/.test(l)) type = "Price question";
  else if (/book|appointment|come out|available|slot|service|visit/.test(l))
    type = "Booking request";
  if (/urgent|asap|emergency|no heating|no hot water|leak|flood|wet|today|right away/.test(l)) {
    urg = "Urgent";
    hot = true;
  } else if (/tomorrow|this week/.test(l)) urg = "This week";
  else if (/next week/.test(l)) urg = "Next week";
  if (type === "Complaint") hot = true;

  const facts: string[] = [];
  let m: RegExpMatchArray | null;
  const svc = l.match(
    /boiler|bathroom|kitchen|leak|heating|radiator|shower|toilet|website|roof|rewire|tap/,
  );
  if (svc) facts.push(`Service: ${svc[0]}`);
  const when = l.match(
    /tomorrow morning|tomorrow afternoon|tomorrow|today|next week|this week|monday|tuesday|wednesday|thursday|friday|saturday|sunday/,
  );
  if (when) facts.push(`When: ${when[0]}`);
  if ((m = t.match(PHONE))) facts.push(`Phone: ${m[0]}`);
  if ((m = t.match(/[\w.+-]+@[\w-]+\.[\w.]+/))) facts.push(`Email: ${m[0].replace(/[).,]+$/, "")}`);
  let name: string | null = null;
  if ((m = t.match(/(?:my name is|i'm|i am)\s+([A-Z][a-z]+)/))) name = m[1] ?? null;
  else if ((m = t.match(/(?:thanks|thank you|cheers|regards|kind regards|best)[,!.]?\s+([A-Z][a-z]+)/i)))
    name = m[1] ?? null;
  else if ((m = t.match(/[.!?]\s*([A-Z][a-z]+)\s*\.?\s*$/))) name = m[1] ?? null;
  if (name) facts.push(`Name: ${name}`);

  const hi = `Hi${name ? ` ${name}` : ""},`;
  const phone = t.match(PHONE)?.[0];
  let reply: string;
  if (type === "Complaint")
    reply = `${hi} I'm really sorry about this. I've flagged it as a priority and someone will call you${phone ? ` on ${phone}` : ""} within the hour to put it right.\n\nThanks, Example Plumbing`;
  else if (type === "Price question")
    reply = `${hi} thanks for getting in touch. Most ${svc ? `${svc[0]} jobs` : "jobs like this"} fall within a set price range, and we'll give you a fixed quote after a quick look. When suits you for a free visit?\n\nThanks, Example Plumbing`;
  else if (type === "Booking request")
    reply = `${hi}${urg === "Urgent" ? " sorry to hear about that." : " thanks for getting in touch."} We can ${when ? `get someone to you ${when[0]}` : "book you in"} and we'll confirm a time${phone ? ` by text to ${phone}` : ""}.\n\nThanks, Example Plumbing`;
  else reply = `${hi} thanks for your message. We'll get back to you shortly with an answer.\n\nThanks, Example Plumbing`;
  return { type, urg, hot, facts, reply };
}

export const SAMPLE_MESSAGE =
  "Hi, my boiler has stopped working and we've got no heating. Can someone come out tomorrow morning? My number is 07700 900123. Thanks, Sarah";
