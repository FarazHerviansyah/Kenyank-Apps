import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavRestaurantIdb from "../src/scripts/data/restaurant-idb";

describe('Like a Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
    });

    // seharusnya tombol like tampil
    it('Should show the like button when the Restaurant has not been liked before', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Klik kalau suka"]')).toBeTruthy();
    });

    // seharusnya tombol dont like tidak tampil
    it('Should not show the unlike button when the Restaurant has not been liked before', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Klik kalau gak jadi suka"]')).toBeFalsy();
    });

    // seharusnya berhasil like restaurant
    it('Should be able to like a Restaurant', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });

        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        const resto = await FavRestaurantIdb.getRestaurant(1);

        expect(resto).toEqual({ id: 1 });

        FavRestaurantIdb.deleteFavorite(1);
    });

    // seharusnya restaurant yg sudah ada di db tidak diinsert kembali
    it('Should not add a Restaurant again when its already liked', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        await FavRestaurantIdb.putFavorite({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
        FavRestaurantIdb.deleteFavorite(1);
    });
});
