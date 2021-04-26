import EventEmiter from '../eventEmiter.js';

export default class BeerCard extends EventEmiter {
    constructor(data, renderOptions = {}) {
        super();

        this.data = data;
        this.renderOptions = renderOptions;

        this.createCard();
    }

    get id() {
        return this.data.id;
    }

    get beerInputValue() {
        return parseInt(this.beerCount.value, 10);
    }

    createCard() {
        const {
            rootTagName = 'li',
            titleTagName = 'div',
            rootClassName,
        } = this.renderOptions;
        const {
            image_url,
            name,
            description,
        } = this.data;
        const rootEl = document.createElement(rootTagName);
        const titleEl = document.createElement(titleTagName);
        const imgWrapper = document.createElement('div');
        const imgEl = document.createElement('img');
        const descriptionEl = document.createElement('div');
        const favorBtn = document.createElement('button');
        const basketWrp = document.createElement('form');
        const addToBasket = document.createElement('button');
        const increaseBtn = document.createElement('button');
        const decreaseBtn = document.createElement('button');
        const beerCount = document.createElement('input');

        imgEl.src = image_url;
        titleEl.innerText = name;
        descriptionEl.innerText = description;

        imgWrapper.append(imgEl);
        rootEl.append(imgWrapper, titleEl, descriptionEl, favorBtn, basketWrp);
        basketWrp.append(addToBasket, decreaseBtn, beerCount, increaseBtn);

        rootEl.className = 'beer';
        titleEl.className = 'beer__name';
        imgWrapper.className = 'beer__image-wrapper';
        imgEl.className = 'beer__image';
        descriptionEl.className = 'beer__description';
        favorBtn.className = 'beer__favor';
        basketWrp.className = 'beer__basket-actions';
        beerCount.className = 'beer__basket-counter';
        decreaseBtn.innerText = '-';
        decreaseBtn.className = 'beer__basket-action';
        increaseBtn.className = 'beer__basket-action';
        increaseBtn.innerText = '+';

        if (rootClassName) {
            rootEl.classList.add(rootClassName);
        }

        favorBtn.addEventListener('click', () => {
            this.dispatch('toggleFavor');
        });

        addToBasket.addEventListener('click', () => {
            this.dispatch('toggleBasket');
        });

        decreaseBtn.addEventListener('click', () => {
            this.dispatch('decreaseBasket');
        });

        increaseBtn.addEventListener('click', () => {
            this.dispatch('increaseBasket');
        });

        beerCount.addEventListener('input', () => {
            this.dispatch('inputBasketCount');
        });

        basketWrp.addEventListener('submit', e => e.preventDefault());

        this.decreaseBtn = decreaseBtn;
        this.increaseBtn = increaseBtn;
        this.beerCount = beerCount;
        this.addToBasket = addToBasket;
        this.favorBtn = favorBtn;
        this.rootEl = rootEl;
    }

    render(props = {}) {
        const { basketCount, inFavour } = props;

        if (inFavour) {
            this.favorBtn.classList.add('beer__favor--added');
        } else {
            this.favorBtn.classList.remove('beer__favor--added');
        }

        if (basketCount > 0) {
            this.addToBasket.className = 'beer__basket-remove';
            this.addToBasket.innerText = 'remove';
        } else {
            this.addToBasket.className = 'beer__basket-add';
            this.addToBasket.innerText = 'add to basket';
        }

        this.decreaseBtn.hidden = basketCount === 0;
        this.increaseBtn.hidden = basketCount === 0;
        this.beerCount.hidden = basketCount === 0;
        this.beerCount.value = basketCount;

        return this.rootEl;
    }
}
