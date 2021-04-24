import beerAPI from './beerApi.js';
import BeerList from './BeerList/index.js';

const beerList = new BeerList(document.querySelector('.beers'));

beerAPI.get({
    page: 1
}).then(result => {
    beerList.add(result.data);
});
