import beerAPI from './beerApi.js';
import BeerList from './BeerList/index.js';
import Basket from './Basket/index.js';
import Favor from './Basket/server.js';
import Pagination from './Pagination/index.js';

const basket = new Basket({
    localStorageKey: 'basket',
    onReadLocalData,
});
const favor = new Favor();
const beerList = new BeerList({
    favor,
    rootEl: document.querySelector('.beers'),
    basket,
});
const pagination = new Pagination();

pagination.addEventListener('update', updateDataForPages);

void favor
    .getDataFromServer()
    .then(() => onReadLocalData());

updateDataForPages();

function onReadLocalData() {
    beerList.render();
}

function updateDataForPages() {
    const promises = [];
    const renderPages = [...pagination.pages];

    renderPages.forEach(pageNum => {
        if (!beerList.hasPage(pageNum)) {
            const getPageDataPromise = beerAPI.get({
                page: pageNum,
                per_page: 20,
            }).then(result => {
                beerList.addPage(pageNum, result.data);
            });

            promises.push(getPageDataPromise);
        }
    });

    Promise.all(promises)
        .then(() => beerList.renderPages(renderPages));
}
