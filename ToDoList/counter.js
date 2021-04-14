/* eslint-disable no-unused-vars */
class Counter {
    constructor(selector) {
        this.rootEl = document.querySelector(selector);
        this.digitEl = this.rootEl.querySelector('strong');
    }

    setCount(newCount) {
        this.digitEl.innerText = newCount;
    }

    getCount() {
        return +this.digitEl.innerText;
    }
}
