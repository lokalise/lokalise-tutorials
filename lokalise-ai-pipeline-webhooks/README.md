# Lokalise AI tasks: API demo

To test drive this, you'll need a Lokalise project, an API token, and a webhook with "task closed" trigger.

Create an `.env` file in the root:

```
LOKALISE_API_TOKEN=123abc
LOKALISE_PROJECT_ID=678.def
LOKALISE_WEBHOOKS_SECRET=8765
```

Run the server:

```
npm start
```

Make sure it's visible from the Internet (use ngrok or a similar tool).

Upload English translation files to Lokalise:

```
curl -X POST http://localhost:3000/lokalise-upload
```

Wait for the task to complete. French translations should be downloaded automatically.