import FavRestaurantIdb from '../../data/restaurant-idb';
import CONFIG from '../../global/config';

const Favorite = {
  async render() {
    return `
            <div class="breadcrumb">
                <div>
                    <a class="page-home" href="/#">Daftar Restoran</a> /
                    <a class="page-now" href="javascript:void(0)">Restaurant Favorite</a>
                </div>
            </div>
            <div class="section-title" id="contentbody">
                <div class="favorite-title">
                    <h1 class="fav-h1">Favorite</h1>
                    <div class="fav-div">Restaurant yang kamu Sukai</div>
                </div>
                <div class="wrapper col-4" id="contentList"></div>
            </div>
        `;
  },

  async afterRender() {
    const resto = await FavRestaurantIdb.getAllRestaurants();
    let listFavorite = '';
    let notifError = '';
    if (resto.length === 0) {
      notifError += `
                <div class="error">
                    <img class="img-error" src="./images/nothing.svg" alt="Error" loading="lazy">
                    <h2 class="text-error">Belum ada Restaurant yang kamu sukai</h2>
                </div>
            `;
      document.querySelector('#maincontent').innerHTML = notifError;
    } else {
      resto.forEach((d) => {
        listFavorite += `
                <a href="/#/detail/${d.id}" class="card">
                    <img src="${CONFIG.BASE_IMAGE_URL_SMALL + d.pictureId}" alt="${d.name}" loading="lazy">
                    <div class="card-body">
                        <div class="city">Kota ${d.city}</div>
                        <div class="name">${d.name}</div>
                        <div class="rating">Rating : ⭐ ${d.rating}</div>
                        <div class="desc">${d.description}</div>
                    </div>
                </a>
                `;
      });
      document.querySelector('#contentList').innerHTML = listFavorite;
    }
  },
};

export default Favorite;
