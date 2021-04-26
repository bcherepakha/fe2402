import BeerCard from '../BeerCard/index.js';

export default class BeerList {
    constructor(props) {
        this.props = props;
        this.items = [];
    }

    get rootEl() {
        return this.props.rootEl;
    }

    createItem(data) {
        const beerItem = new BeerCard(data, {
            rootClassName: 'beers__item'
        });

        beerItem.addEventListener('toggleFavor', this.toggleFavor(beerItem));
        beerItem.addEventListener('toggleBasket', this.toggleBasket(beerItem));
        beerItem.addEventListener('decreaseBasket', this.changeBasketCount.bind(this, beerItem, -1));
        beerItem.addEventListener('increaseBasket', this.changeBasketCount.bind(this, beerItem, 1));
        beerItem.addEventListener('inputBasketCount', this.inputBasketCount.bind(this, beerItem));

        return beerItem;
    }

    inputBasketCount(beerItem) {
        this.props.basket.setBeerCount(beerItem.id, beerItem.beerInputValue);
        this.renderBeer(beerItem);
    }

    changeBasketCount(beerItem, addCounter) {
        this.props.basket.addBeer(beerItem.id, addCounter);
        this.renderBeer(beerItem);
    }

    toggleBasket(beerItem) {
        return () => {
            const {id} = beerItem;

            this.props.basket.toggle(id);
            this.renderBeer(beerItem);
        };
    }

    toggleFavor(beerItem) {
        return () => {
            const {id} = beerItem;

            this.props.favor.toggle(id);
            this.renderBeer(beerItem);
        };
    }

    addItem(data) {
        this.items.push(this.createItem(data));
    }

    addItems(items) {
        this.items.push(...items.map(this.createItem, this));
    }

    add(items) {
        if (Array.isArray(items)) {
            this.addItems(items);
        } else {
            this.addItem(items);
        }

        this.render();
    }

    clear() {
        this.rootEl.innerText = '';
    }

    renderBeer(beerItem) {
        const {basket, favor} = this.props;
        const { id } = beerItem;

        return beerItem.render({
            basketCount: basket.getCount(id),
            inFavour: favor.getCount(id) > 0,
        });
    }

    render() {
        this.rootEl.append( ...this.items.map(this.renderBeer, this) );
    }
}
