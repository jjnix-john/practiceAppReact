# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Running the app (client + server)

This project includes a small local proxy server that forwards requests to the OpenRouter API (so you don't have to expose your API key in the browser).

1) Copy `server/.env.example` to `server/.env` and set your OpenRouter API key:

```sh
cd server
cp .env.example .env
# Edit .env and add your key
```

2) Start the server in one terminal:

```sh
npm run server
```

3) Start the Vite dev server in another terminal:

```sh
npm run dev
```

Then open the app at http://localhost:5173 and select **AI Chatbot** from the dashboard.

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
