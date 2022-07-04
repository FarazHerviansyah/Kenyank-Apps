/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
import UrlParser from './routes/url-parser';
import routes from './routes/routes';

class App {
  constructor({
    openBtn,
    closeBtn,
    sideNav,
    mainContent,
  }) {
    this._OpenBtn = openBtn;
    this._CloseBtn = closeBtn;
    this._SideNav = sideNav;
    this._MainContent = mainContent;
    this.onLoad();
  }

  onLoad() {
    this._OpenBtn.addEventListener('click', (event) => {
      this._SideNav.style.width = '250px';
      event.stopPropagation();
    });

    this._CloseBtn.addEventListener('click', (event) => {
      this._SideNav.style.width = '0';
      event.stopPropagation();
    });
  }

  async renderPage() {
    this._SideNav.style.width = '0';
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#maincontent').focus();
    });
    this._MainContent.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
