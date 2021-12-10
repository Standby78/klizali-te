# Klizalište Pula 2021 website

## general info

based on https://github.com/ivandotv/nextjs-client-signin-logic for the administration, with adjustment for this use case

/admin - protected route for handling number of current users

## .env.local file structure:

NEXT_PUBLIC_WEBSOCKET_URL=
NEXT_PUBLIC_FREESLOTS_API_URL=
NEXT_PUBLIC_PASSWORD=

## DynamoDB structure:

websocket table: 

ID - string

slots_used table

ID - Date.now()
location - string
slotsUsed - string

