# Fullstack application Concord Team Chat: Next.js 13, Socket.io, Prisma, Tailwind, MySQL

![Copyright 2023 Concord Team Chat Application]()

## Features

- [x] Real-time messaging using Socket.io
- [x] Send attachments as messages using UploadThing
- [x] Delete & Edit messages in real time for all users
- [x] Create Text, Audio and Video call Channels
- [x] 1:1 conversation between members
- [x] 1:1 video calls between members
- [x] Member management (Kick, Role change Guest / Moderator)
- [x] Unique invite link generation & full working invite system
- [x] Infinite loading for messages in batches of 10 (tanstack/query)
- [x] Server creation and customization
- [x] Beautiful UI using TailwindCSS and ShadcnUI
- [x] Full responsivity and mobile UI
- [x] Light / Dark mode
- [x] Websocket fallback: Polling with alerts
- [x] ORM using Prisma
- [x] MySQL database using Planetscale
- [x] Authentication with Clerk

## Contributing

You can contribute to this project by creating a PR on the [GitHub repository](https://github.com/aleksanderpalamar/team-chat-application).

### Prerequisites

**Node version v18.x.x**

### Cloning the repository

```shell
git clone git@github.com:aleksanderpalamar/team-chat-application.git
```

### Install packages

```shell
cd team-chat-application
npm i
```

### Setup .env file

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

NEXT_PUBLIC_SITE_URL=

DATABASE_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

### Setup Prisma

Add MySQL Database I used PlanetScale

```shell
npx prisma generate
npx prisma db push
```

### Start the application

```shell
npm run dev
```

## Available Commands

Running commands with `npm run [command]`

| Command | Description |
| --- | --- |
| `dev` | Start a development instance of the application |
