import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './app';
import swRegister from './utils/sw-register';

const app = new App({
  openBtn: document.querySelector('#openNav'),
  closeBtn: document.querySelector('#closeNav'),
  sideNav: document.querySelector('.sidenav'),
  mainContent: document.querySelector('#maincontent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
