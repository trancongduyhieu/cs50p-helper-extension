import { createApp } from 'vue';
import App from './App.vue';
import '../styles/main.css';

// Check if our app container already exists to avoid re-injecting
if (!document.getElementById('cs50p-helper-app-root')) {
  // 1. Create a root element to mount our Vue app
  const root = document.createElement('div');
  root.id = 'cs50p-helper-app-root';
  document.body.appendChild(root);

  // 2. Create and mount the Vue app
  const app = createApp(App);
  app.mount('#cs50p-helper-app-root');
}
