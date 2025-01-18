# ThunderBolt

**ThunderBolt** is an AI-powered application that converts prompts into fully functional websites with ease and speed. Leveraging the Google Gemini API, ThunderBolt streamlines web development by offering live previews and code snippets using CodeSandbox. The app also features a PayPal payment gateway for subscription management and a sidebar for workspace history.

## Features
- Generate websites from simple prompts using the Google Gemini API.
- Preview live code and design via CodeSandbox integration.
- Subscription plans with PayPal integration.
- Workspace history for quick navigation to older chats.
- Pricing page to view current subscriptions and remaining tokens.
- Deploy using Sandbox URL and share among friends your new creation.

## Live Demo
[ThunderBolt Live Demo](https://thunder-bolt-new.vercel.app/)

## Screenshots
![image](https://github.com/user-attachments/assets/948522a0-49ea-4006-a1b4-319e06b63287)

![image](https://github.com/user-attachments/assets/b9de38bb-7727-4b92-a1dc-de1070eab60e)

### LeetCode Clone created by ThunderBolt!
![image](https://github.com/user-attachments/assets/85a59f4a-5aa6-47f1-9457-488770dd3600)

![image](https://github.com/user-attachments/assets/0a1d2a81-9814-4ac1-924f-bb94e270fd47)

### Full control over the source code, edit, run and test at the same time in the same browser tab!
![image](https://github.com/user-attachments/assets/c1cf5e82-474f-4de7-ad57-9775f36759c1)

### Jump to previous thunderbolts from the Sidebar
![image](https://github.com/user-attachments/assets/032a1528-cd98-4dc0-a5d3-6a867388bf1f)

### Access remaining tokens and buy more tokens very easily with PayPal!
![image](https://github.com/user-attachments/assets/385d8fe3-8e97-4d05-96f2-fcb4a8cc5c67)

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js) or yarn
- A [Convex project](https://convex.dev/) and its API key
- Google Gemini API Key
- PayPal Client ID

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/chiragsingh1/ThunderBolt.New.git
cd ThunderBolt.New
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
CONVEX_DEPLOYMENT=your-convex-deployment
NEXT_PUBLIC_CONVEX_URL=your-convex-url
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
```

### 4. Connect to Convex
Ensure you have a Convex project set up. Run the following command in the terminal to connect your project:
```bash
npx convex dev
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application in development mode.

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Runs the application in production mode.
- `npm run lint`: Lints the codebase.

## Technologies Used
- **Next.js**: Framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Google Gemini API**: For AI-powered website generation.
- **CodeSandbox**: For live code previews.
- **Convex**: Backend-as-a-service for state management.
- **PayPal SDK**: For payment gateway integration.

## License

---
Feel free to contribute to ThunderBolt by submitting issues or pull requests on the GitHub repository. Happy coding!

