# TakeMeAway
WAWAWA

## Setup Tips

To send real emails set `MAIL_MAILER=smtp` and update the `MAIL_*` values with your Gmail credentials (an app password may be required).

Set your Revolut payment link in `VistasTFG/.env` using the `VITE_REVOLUT_LINK` variable so all trips send payment to your account.

Example `.env`:

```
VITE_API_URL=http://127.0.0.1:8000/api
VITE_REVOLUT_LINK=https://revolut.me/your_account
```

Ensure there are no spaces around the equals sign and restart the dev server after making changes.