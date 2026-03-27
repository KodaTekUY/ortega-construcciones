// File from Resend docs: https://resend.com/docs/knowledge-base/forward-emails-with-resend-inbound
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ListAttachmentsResponseSuccess, Resend } from 'resend';

const resendFromEmail = process.env.RESEND_FROM_EMAIL!
const contactRecipientEmail = process.env.CONTACT_RECIPIENT_EMAIL!
const resendApiKey = process.env.RESEND_API_KEY

const resend = new Resend(resendApiKey)

export async function POST(req: NextRequest) {
  try {
    // we need raw request text to verify the webhook
    const payload = await req.text();

    const id = req.headers.get('svix-id');
    const timestamp = req.headers.get('svix-timestamp');
    const signature = req.headers.get('svix-signature');

    if (!id || !timestamp || !signature) {
      return new NextResponse('Missing headers', { status: 400 });
    }

    // Throws an error if the webhook is invalid
    // Otherwise, returns the parsed payload object
    const result = resend.webhooks.verify({
      payload,
      headers: {
        id,
        timestamp,
        signature,
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET!,
    });

    if (result.type !== 'email.received') {
      return NextResponse.json({ success: false, message: 'Event type not supported' }, { status: 400 });
    }
    
    const { data: email, error: emailError } = await resend.emails.receiving.get(result.data.email_id);

    if (emailError) {
      throw new Error(`Failed to fetch email: ${emailError.message}`);
    }

    const { data: attachmentsData, error: attachmentsError } =
      await resend.emails.receiving.attachments.list({
        emailId: result.data.email_id,
      });

    if (attachmentsError) {
      throw new Error(
        `Failed to fetch attachments: ${attachmentsError.message}`,
      );
    }

    const attachments =
      attachmentsData?.data as ListAttachmentsResponseSuccess['data'] &
        { content: string }[];

    if (attachments && attachments.length > 0) {
      // download the attachments and encode them in base64
      for (const attachment of attachments) {
        const response = await fetch(attachment.download_url);
        const buffer = Buffer.from(await response.arrayBuffer());
        attachment.content = buffer.toString('base64');
      }
    }

    // 4. Forward the email
    const { error: sendError } = await resend.emails.send({
      from: resendFromEmail,
      replyTo: email.from,
      to: [contactRecipientEmail],
      subject: result.data.subject,
      html: email.html || '',
      text: email.text || '',
      attachments,
    });

    if (sendError) {
      throw new Error(`Failed to forward email: ${sendError.message}`);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return new NextResponse(`Error: ${error}`, { status: 500 });
  }
}