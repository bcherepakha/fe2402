export default class Basket {
    constructor(props = {}) {
        this.store = {};
        this.props = props;

        if (this.props.localStorageKey) {
            this.readFromLocalStorage();
        }
    }

    setBeerCount(beerId, count) {
        this.store[beerId] = count;

        if (this.store[beerId] <= 0) {
            delete this.store[beerId];
        }

        if (this.props.localStorageKey) {
            this.saveToLocalStorage();
        }
    }

    addBeer(beerId, count) {
        if (this.store[beerId]) {
            this.setBeerCount(beerId, this.store[beerId] + count);
        } else if (count > 0) {
            this.setBeerCount(beerId, count);
        }
    }

    removeBeer(beerId, count) {
        this.addBeer(beerId, -count);
    }

    toggle(beerId) {
        this.setBeerCount(beerId, +!this.store[beerId]);
    }

    getCount(beerId) {
        return this.store[beerId] || 0;
    }

    saveToLocalStorage() {
        localStorage[this.props.localStorageKey] = JSON.stringify(this.store);
    }

    readFromLocalStorage() {
        const storedString = localStorage[this.props.localStorageKey];

        if (!storedString) {
            return ;
        }

        try {
            const store = JSON.parse(storedString);

            this.store = store;
        } catch(ex) {
            console.log('Read local data error', ex);

            return ;
        }
    }
}
