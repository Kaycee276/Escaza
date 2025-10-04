# Escaza

**Escaza** is a web-based application built to digitize the logbook experience for IT (Industrial Training) students. It helps students avoid errors while filling their physical logbooks and provides smart features like grammar checking, reminders, and even AI-generated entries based on existing writing. Inspired by **Escanor** (7DS) and **Akaza** (KNY), Escaza blends strength and style to deliver a smart productivity companion.

---

## 🚀 Features

- ✍️ **Digital Logbook Interface**

  - Students can fill in daily or weekly logs via an intuitive web interface.
  - Supports text editing, formatting, and backdated entries.

- 🤖 **AI-Powered Auto-Fill**

  - After filling at least 3 months, AI will auto-generate remaining entries.
  - Matches the user's tone, writing style, and structure.
  - Analyzes beginning and end patterns to build a realistic middle section.

- 📤 **Export to PDF**

  - One-click download to a properly formatted `.pdf` file for printing or submission.

- 🔒 **Account Management**

  - Secure login/signup system (powered by Firebase or Supabase).
  - User data is encrypted and persists across sessions.

- 📅 **Reminders**

  - Get email or in-app reminders to fill your logbook regularly.

- ✅ **Grammar and Spell Checking**
  - Inline grammar and spelling suggestions to improve clarity and correctness.

---

## 🧑‍🎓 Target Users

- Nigerian university and polytechnic students undergoing 5–6 months of SIWES (Student Industrial Work Experience Scheme).
- Other students on internships or industry placements requiring logbooks.

---

## 🛠️ Tech Stack

| Layer            | Tech                       |
| ---------------- | -------------------------- |
| Frontend         | React + Tailwind CSS       |
| Backend / Auth   | Firebase / Supabase        |
| AI Integration   | OpenAI API                 |
| PDF Generation   | html2pdf.js / react-pdf    |
| State Management | Zustand / Redux (optional) |
| Notifications    | EmailJS / OneSignal        |

---

## 🧭 User Flow

1. **Sign Up / Login**

   - New users create an account or log in.

2. **Logbook Dashboard**

   - View and edit past log entries.
   - Add new daily/weekly activities.

3. **AI Completion**

   - After 5 months, click _Auto-Complete Logbook_.
   - AI analyzes tone and style, then fills the rest.

4. **Export**
   - Click _Download PDF_ to export your logbook.

---

## 🔐 Security & Privacy

- Uses Firebase/Supabase Auth for secure login.
- Log entries stored securely in Firestore/PostgreSQL.
- Only users can access and export their logs.

---

## 🧪 Future Features

- 🌐 Offline support (PWA)
- 📲 Mobile app version (React Native)
- 🪄 Custom themes / dark mode
- 🔎 Plagiarism check or uniqueness scoring

## 🧠 Naming Inspiration

Escanor — Symbol of unmatched pride and strength (The Lion's Sin of Pride, 7DS)
Akaza — Fast, calculated, and unrelenting (Upper Moon 3, Demon Slayer)
Together, Escaza stands for powerful discipline and relentless precision — the ideal traits of a standout intern.

## 🧑‍💻 Maintainer

Made with ❤️ by Izuaba Kenneth Kelechukwu
License: MIT
