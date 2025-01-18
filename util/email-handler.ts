import { ImapFlow } from 'imapflow';
import { simpleParser, ParsedMail } from 'mailparser';

async function getLatest2FAEmail(): Promise<void> {
    const client = new ImapFlow({
        host: 'imap.gmail.com',
        port: 993,
        secure: true, // Use TLS
        auth: {
            user: process.env.EMAIL_USER, // Replace with your Gmail address
            pass: process.env.EMAIL_KEY, // Replace with your access token or app-specific password
        },
    });

    try {
        // Connect to the IMAP server
        await client.connect();
        console.log('Connected to IMAP server.');

        // Open the INBOX
        const lock = await client.getMailboxLock('INBOX');
        try {
            // Search for unread emails
            const messages = await client.search({
                seen: false,
                subject: 'Your 2FA Code', // Adjust the subject as needed
            });

            if (messages.length === 0) {
                console.log('No 2FA emails found.');
                return;
            }

            // Fetch the latest email
            const latestEmailId = messages[messages.length - 1];
            const { content } = await client.download(latestEmailId);

            // Parse the email content
            const parsed: ParsedMail = await simpleParser(content);
            console.log('2FA Email Content:', parsed.text);
        } finally {
            lock.release();
        }
    } catch (error) {
        console.error('Error fetching 2FA email:', (error as Error).message);
    } finally {
        await client.logout();
    }
}

getLatest2FAEmail();
