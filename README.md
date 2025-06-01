# BPAPP — React Native Application

## 📱 Overview

This is a modular and scalable React Native application developed using TypeScript, MobX, and React Navigation. The architecture follows clean separation of concerns: navigation, screens, stores, and services are well-isolated and organized.

---

## 🚀 Features

- **TypeScript** for type safety
- **MobX** for state management (with modular stores)
- **React Navigation** with modular navigators
- **Modular screen architecture** (Post, Explore, Profile, Login, etc.)
- **Theming system** (`primaryTheme`, `text`, `palette`)
- **Localization support** (`localization/en.ts`)
- **Offline-ready storage** using `MMKV`
- **API layer** with typed endpoints (`api/posts`, `api/auth`, etc.)
- **Custom hooks**, utility functions, and `reactotron` integration

---

## 📁 Folder Structure

- `src/screens` — main UI screens of the application
- `src/stores` — MobX stores with helpers and models
- `src/navigation` — navigation setup with modals, stacks, and deep linking
- `src/components` — reusable UI components (`atoms`, `molecules`, `organizm`)
- `src/api` — API request modules with TypeScript types
- `src/styles` — theme, palette, and design tokens
- `src/services` — integrations like Reactotron, Sentry, etc.
- `src/hooks` — shared logic (`useNavigationParam`, `useAppState`, etc.)
- `src/constants` — static config for navigation, linking, and state

---

## 📦 Dependencies

- `react-native`
- `react`
- `mobx`, `mobx-react-lite`
- `@react-navigation/*`
- `react-native-mmkv`
- `axios`
- `react-native-config`
- `react-native-safe-area-context`

Dev tools include: Jest, ESLint, Prettier, Husky, patch-package

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Run app

```bash
yarn ios
# or
yarn android
```

### 3. Useful scripts

- `yarn startc` — start Metro with cache reset
- `yarn lint:fix` — lint and auto-fix code
- `yarn test` — run unit tests

---

## 🧪 Testing

Jest is configured. Test files live under `__tests__/` in relevant modules.

---

### 🧠 Architecture Decisions

- **State Management: MobX**

  - All business logic is isolated within stores.
  - `duckFlow` — a utility for async actions with built-in states (`isLoading`, `error`, `data`). It’s our lightweight equivalent of useMutation/useQuery.
  - `ListStore` — abstraction for managing collections that:
    - stores only arrays of IDs,
    - uses normalized entity storage,
    - supports replace, append, remove, findById operations,
    - supports pagination (via `fetchMore`).
  - Each store can independently declare which fields to persist via `PersistService` — a flexible system backed by MMKV.

- **Normalized Entities**

  - Entities (e.g., `PostModel`) are stored centrally in `EntityStore`, accessed via `getEntityById`.
  - This enables updating data in one place and auto-updating all components that use them.

- **Dependency Injection**

  - All stores are initialized via a central `RootStore`, enabling easy access to dependencies and mocking in tests.

- **useStores Hook**

  - Provides convenient destructuring to access any store inside a component:
    ```tsx
    const { posts, viewer } = useStores();
    ```

- **UI Components are decoupled from stores** — logic is extracted out of UI, making testing, scaling, and reusability easier.
