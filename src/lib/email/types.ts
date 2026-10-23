export type EmailMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
};

/** `accepted` means the provider acknowledged the request. It is NOT a guarantee of final delivery. */
export type SendResult = { ok: true; id?: string } | { ok: false; reason: "rejected" | "network" | "timeout"; status?: number };

export type EmailProvider = { name: string; send(message: EmailMessage): Promise<SendResult> };
