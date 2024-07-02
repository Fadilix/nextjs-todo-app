# NextJS TodoApp
Todo app in nextjs
#
![image](https://github.com/Fadilix/nextjs-todo-app/assets/121851593/52569bd1-16ee-41ea-8731-0999fb81d930)
#


## Technologies Used
- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with GitHub provider
- **Database**: PostgreSQL with Prisma as the ORM
- **UI Components**: SchadcnUI

## Features
- **Authentication with GitHub**: Users can sign in using their GitHub accounts.
- **API Routes**: Custom API endpoints for handling various backend functionalities.
- **NextAuth Server Session**: Managing user sessions and authentication flows.
- **Database Integration**: Using Prisma with PostgreSQL for data storage and retrieval.

## Get started
    ```bash
    git clone https://github.com/Fadilix/nextjs-todo-app.git
    cd nextjs-todo-app
    npm install
    ```

- For the GitHub authentication you will need some environement variables like `GITHUB_ID` and `GITHUB_SECRET`
-   You can get them at https://github.com/settings/developers
- Fill in the fields like this
- **For the name of the application you can choose whatever you want as well as the domain (it depends on whether you are working in local or not)**

#
![image](https://github.com/Fadilix/nextjs-todo-app/assets/121851593/7522905e-2ca3-4d31-ba59-bacad22c28f0)
#

-   Then execute the command
    ```bash
    cp .env.example .env.local
    ```
- Replace the database url in the env file by your own database url path
- Start a migration to add the models to the database
    
    ```bash
    npx prisma migrate dev
    ```

### There you go
