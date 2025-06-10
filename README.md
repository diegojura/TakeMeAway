# TakeMeAway
WAWAWA

## Setup Tips

Copy `tfg/.env.example` to `tfg/.env`.
The example is configured with `MAIL_MAILER=log` so emails are written to the log during local development.
To send real emails set `MAIL_MAILER=smtp` and update the `MAIL_*` values with your Gmail credentials (an app password may be required).