# 🥗 Meals-tracker – Mobile Daily Nutrition Tracker

![React Native](https://img.shields.io/badge/React_Native-0.83-61DAFB?style=flat-square&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-SDK_55-000000?style=flat-square&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A modern, cross-platform mobile application built with **React Native** and **Expo Router** to track daily nutrition, log meals, monitor macronutrients, and customize personal health goals. Designed with an offline-first architecture using local storage and enhanced UI interaction.

---

## 🚀 Key Features

- **Macro Analytics:** Real-time tracking and visual cards for total daily calories, protein, carbohydrates, and fats.
- **Goal Customization:** Set and modify custom daily target goals for all macros dynamically.
- **Meal Management:** Full CRUD operations to log, edit, and delete individual meals.
- **Offline-First Persistence:** Reliable local state management using `@react-native-async-storage/async-storage`.
- **Tactile UX Integration:** Native Haptic feedback for critical user interactions (e.g., adding/deleting meals).
- **System Utilities & Share API:** Integrated native device APIs for sharing daily summaries, copying text to clipboard, and scheduling local notifications.

---

## 🛠 Tech Stack

- **Framework:** [React Native](https://reactnative.dev/) (v0.83) with [Expo](https://expo.dev/) (SDK 55)
- **Routing:** Expo Router (File-based navigation & Tab views)
- **Language:** TypeScript
- **Storage:** Async Storage
- **UI & UX:** Native Reanimated, Expo Haptics, Expo Notifications, Vector Icons

---

## 📁 Project Structure

```text
├── src/
│   ├── app/              # Expo Router pages (Tabs & Navigation stack)
│   ├── components/       # Reusable UI components (MacroCard, MealItem, etc.)
│   ├── storage/          # Data persistence layer & Local Storage handlers
│   ├── styles/           # Global design tokens and color themes
│   └── utils/            # Native utility functions (Notifications)
└── assets/               # Static assets & app icons
```

---

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo Go app on your physical device or Android/iOS emulator

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MucahidTech/meals-tracker.git
   cd meals-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npx expo start
   ```

4. **Run on target platform:**
   - Press `i` for iOS simulator.
   - Press `a` for Android emulator.
   - Scan the QR code with **Expo Go** to run on a physical device.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
