# 💼 WalletWise – Personal Finance Tracker

**WalletWise** is a modern web application that helps users manage their personal finances by tracking income, expenses, and budget goals with a beautiful, user-friendly interface. It's designed for individuals who want to take control of their financial health and build better money habits.

---

## 📌 Problem Statement

Managing personal finances is often complicated and intimidating. Many people don't have a simple way to:

- Track how much they earn and spend
- Categorize their expenses (food, rent, travel, etc.)
- Monitor budget goals and savings
- Visualize financial trends and behavior over time

Traditional spreadsheets are hard to maintain and lack real-time interactivity.

---

## ✅ Solution

**WalletWise** solves this problem by offering:

- A clean, intuitive dashboard
- Real-time data visualization of income and expenses
- Budget goal setting and tracking
- Responsive design for desktop and mobile
- Easy integration with Supabase for data storage and authentication

---

## ✨ Features

- 📊 **Dashboard**: Overview of income, expenses, and savings
- 🧾 **Expense Tracking**: Add/edit/delete expenses with categories and notes
- 💰 **Income Logging**: Log multiple income sources and view summaries
- 🎯 **Budget Goals**: Set financial goals and see progress visually
- 📈 **Charts**: Interactive pie and bar charts to analyze financial behavior
- 👨‍💻 **Authentication**: Sign-up and login (powered by Supabase)
- 🌙 **Dark Mode** (optional)

---

## 🚀 Live Demo

🔗 [Live Project Link](https://your-deployment-link.vercel.app)

_(Replace with your actual Vercel or Netlify URL)_

---

## 🧰 Tech Stack

### 👨‍💻 Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Recharts

### ☁️ Backend / Services

- Supabase (Authentication + Database)

### 🛠 Developer Tools

- Git & GitHub
- ESLint + Prettier
- VS Code

---

## 📁 Folder Structure

walletwise/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ ├── services/
│ ├── assets/
│ └── App.tsx
├── tailwind.config.js
├── vite.config.ts
└── README.md

yaml
Copy
Edit

---

## 🛠️ Getting Started Locally

Make sure Node.js and npm are installed on your machine.

````bash
# Clone the repo
git clone https://github.com/your-username/walletwise.git
cd walletwise

# Install dependencies
npm install

# Run the development server
npm run dev
Open http://localhost:5173 in your browser to see the app.

🧾 Environment Variables
Create a .env file in the root folder with the following:

<pre><code> ```env VITE_SUPABASE_URL=your_supabase_url VITE_SUPABASE_ANON_KEY=your_supabase_anon_key ``` </code></pre>
You can find these values in your Supabase project → Settings → API.

🚀 Deployment Instructions
✅ Deploy on Vercel
Go to https://vercel.com

Click "New Project"

Import your GitHub repo

Add environment variables (.env)

Click Deploy

✅ Deploy on Netlify
Go to https://netlify.com

Connect your GitHub repo

Set build command: npm run build

Set publish directory: dist

Add your environment variables

Click Deploy Site

🧪 Testing
Testing is not added yet but can be included using:

React Testing Library

Vitest or Jest

Cypress (for end-to-end)

🧠 Future Enhancements
Export/Import data to Excel/CSV

Monthly PDF reports

Google OAuth integration

Expense alerts (SMS/email)

PWA support for offline access

🤝 Contributing
Pull requests are welcome!

bash
Copy
Edit
# Fork the repository
# Create a new branch
git checkout -b feature-name

# Commit your changes
git commit -m "Add feature"

# Push the branch
git push origin feature-name

# Open a Pull Request on GitHub
📃 License
This project is licensed under the MIT License.

🙋‍♂️ Author
Pratik Dubey
GitHub: @pratik-dubey
Email: pratikdubey091@gmail.com
LinkedIn: linkedin.com/in/pratik-dubey-02888429b
````
