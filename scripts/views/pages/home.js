import RestaurantSource from '../../data/restaurant-source';
import CONFIG from '../../global/config';

const Home = {
  async render() {
    return `
            <div class="jumbrotons">
                <img sizes="(min-width: 400px) 80vw, 100vw"
                    srcset="./images/heros/hero-image-small.jpg 400w, ./images/heros/hero-image-large.jpg 1500w"
                    alt="Hero Element">
                <div class="blur">
                    <h1>Welcome To Kenyank Apps</h1>
                    <a href="#contentbody">Jelajahi</a>
                </div>
            </div>
            <div id="loading"><img src="./images/loading.svg" alt="Loading" loading="lazy"></div>
            <div class="section-title" id="contentbody">
                <h2>Temukan Restaurant Favoritmu</h2>
                <p>Berikut aneka restaurant dengan suguhan yang lezat</p>
            </div>
            <div class="wrapper col-4" id="contentList"></div>
        `;
  },

  async afterRender() {
    let dataList = '';
    let notifError = '';
    notifError += `
            <div class="error">
                <img class="img-error" src="./images/error.svg" alt="Error" loading="lazy">
                <h2 class="text-error">Maaf terjadi error</h2>
            </div>
        `;

    const resto = await RestaurantSource.listRestaurant();
    if (resto.error !== true) {
      resto.restaurants.forEach((d) => {
        dataList += `
                <a href="/#/detail/${d.id}" class="card">
                    <img loading="lazy" src="${CONFIG.BASE_IMAGE_URL_SMALL + d.pictureId}" alt="${d.name}">
                    <div class="card-body">
                        <div class="city">Kota ${d.city}</div>
                        <div class="name">${d.name}</div>
                        <div class="rating">Rating : ⭐ ${d.rating}</div>
                        <div class="desc">${d.description}</div>
                    </div>
                </a>
                `;
      });
      document.querySelector('#contentList').innerHTML = dataList;
    } else {
      document.querySelector('#maincontent').innerHTML = notifError;
    }
    document.querySelector('#loading').innerHTML = '';
  },
};

export default Home;
