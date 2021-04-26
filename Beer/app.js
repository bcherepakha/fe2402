import beerAPI from './beerApi.js';
import BeerList from './BeerList/index.js';
import Basket from './Basket/index.js';

const basket = new Basket({
    localStorageKey: 'basket',
    onReadLocalData,
});
const favor = new Basket();
const beerList = new BeerList({
    favor,
    rootEl: document.querySelector('.beers'),
    basket,
});

beerAPI.get({
    page: 1,
    per_page: 20,
}).then(result => {
    beerList.add(result.data);
});

function onReadLocalData() {
    beerList.render();
}
