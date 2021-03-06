/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/');
});

Scenario('Like a restaurant', ({ I }) => {
  // Saya melihat text "Temukan Restaurant Favoritmu" di tag "h2"
  I.see('Temukan Restaurant Favoritmu', 'h2');

  // Saya melihat list restoran dan mengklik restoran urutan pertama
  I.seeElement('#contentList a');
  I.click(locate('#contentList a').first());

  // Pada restoran yang saya klik, saya melihat tombol like dan mengklik tombol tersebut
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Lalu saya pergi ke halaman Favorite
  I.amOnPage('/#/favorite');

  // Saya memastikan terdapat restoran yang saya sukai sebelumnya
  I.seeElement('#contentList a');
  I.click(locate('#contentList a').first());
});

Scenario('Unlike a restaurant', ({ I }) => {
  // Saya menyukai satu restoran terlebih dahulu
  I.amOnPage('/#/');
  I.see('Temukan Restaurant Favoritmu', 'h2');
  I.seeElement('#contentList a');
  I.click(locate('#contentList a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Saya pergi ke halaman Favorite
  I.amOnPage('/#/favorite');

  // Saya melihat restoran yang disukai dan mengklik restoran tersebut
  I.seeElement('#contentList a');
  I.click(locate('#contentList a').first());

  // Kemudian saya melihat tombol Unlike dan mengklik tombol tersebut
  I.seeElement('#likedButton');
  I.click('#likedButton');

  // Kemudian saya pergi ke halaman Favorite lagi dan memastikan tidak ada restoran yg disukai
  I.amOnPage('/#/favorite');
  I.see('Belum ada Restaurant yang kamu sukai', 'h2');
});
