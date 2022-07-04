import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavRestaurantIdb from "../src/scripts/data/restaurant-idb";

describe('Unlike a Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonContainer();
        FavRestaurantIdb.putFavorite({ id: 1 });
    });

    // seharusnya tombol unlike tampil
    it('harusnya menampilkan tombol batal suka', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="Klik kalau gak jadi suka"]')).toBeTruthy();
    });

    it('harusnya berhasil menekan tombol batal suka', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            data: {
                id: 1,
            },
        });
        document.querySelector('#likedButton').dispatchEvent(new Event('click'));
        expect(await FavRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
});
