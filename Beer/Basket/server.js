import Basket from './index.js';

export default class Favor extends Basket {
    constructor(props = {}) {
        super(props);

        this.serverBase = 'https://5d9969125641430014051850.mockapi.io';
    }

    getDataFromServer() {
        return fetch(`${this.serverBase}/favoriteBeer`)
            .then(response => response.json())
            .then(data => {
                const newStore = data.reduce(
                    (store, {id, beerId}) => {
                        store[beerId] = parseInt(id, 10);

                        return store;
                    },
                    {}
                );

                this.store = newStore;
            });
    }

    toggle(beerId) {
        const exist = this.getCount(beerId);

        if (!exist) {
            return fetch(`${this.serverBase}/favoriteBeer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ beerId })
            })
                .then(response => response.json())
                .then(({id}) => {
                    this.store[beerId] = parseInt(id, 10);

                    return true;
                })
                .catch(error => {
                    console.log( error );

                    return false;
                });
        }

        return fetch(`${this.serverBase}/favoriteBeer/${exist}`, {
            method: 'DELETE'
        }).then(() => {
            delete this.store[beerId];

            return true;
        }).catch(() => false);
    }
}
