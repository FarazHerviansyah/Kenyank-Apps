import CONFIG from '../global/config';

class RestaurantSource {
  static async listRestaurant() {
    const response = await fetch(`${CONFIG.BASE_URL}list`);
    const responseJson = await response.json();
    return responseJson;
  }

  static async detailRestaurant(id) {
    const response = await fetch(`${CONFIG.BASE_URL}detail/${id}`);
    return response.json();
  }

  static async addReview(a, b, c) {
    const urlReview = `${CONFIG.BASE_URL}review`;
    const data = {
      id: a,
      name: b,
      review: c,
    };
    const response = await fetch(urlReview, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

export default RestaurantSource;
