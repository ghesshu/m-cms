export default ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT', 587),
        secure: false, // false for port 587 (STARTTLS), true only for port 465
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false, // Optional: helps with some SMTP providers
        },
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM'),
        defaultFromName: env('EMAIL_DEFAULT_FROM_NAME'), // Nodemailer supports this
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO'),
      },
    },
  },
});