import EventEmitter from '../eventEmiter.js';

export default class Pagination extends EventEmitter {
    constructor() {
        super();

        this.pages = this.getPagesFromURL() || new Set([1]);
        this.rootEl = document.querySelector('.pagination');

        this.createElements();
        this.render();
    }

    static parseQueryString() {
        const search = decodeURI(location.search).replace('?', '');
        const paramsPairs = search.split('&');
        const params = paramsPairs.reduce(
            (store, pair) => {
                const [key, value] = pair.split('=');

                store[key] = value;

                return store;
            },
            {}
        );

        return params;
    }

    static stringifyQueryParams(params) {
        const search = Object.entries(params)
            .map(pair => pair.join('='))
            .join('&');

        if (!search) {
            return '';
        }

        return '?' + encodeURI(search);
    }

    getPagesFromURL() {
        const {pages: pagesString } = Pagination.parseQueryString();

        if (pagesString) {
            return new Set(
                pagesString.split(',')
                    .map(str => +str)
                    .sort()
            );
        }
    }

    createElements() {
        const moreBtn = document.createElement('a');
        const prevLink = document.createElement('a');
        const nextLink = document.createElement('a');
        const pageList = document.createElement('ul');

        moreBtn.className = 'pagination__more';
        moreBtn.innerText = 'More';

        prevLink.className = 'pagination__prev';
        prevLink.innerText = 'Previous';

        nextLink.className = 'pagination__nex';
        nextLink.innerText = 'Next';

        pageList.className = 'pagination__list';

        this.rootEl.innerText = '';
        this.rootEl.append(moreBtn, prevLink, pageList, nextLink);

        this.moreBtn = moreBtn;
        this.prevLink = prevLink;
        this.nextLink = nextLink;
        this.pageList = pageList;

        this.rootEl.addEventListener('click', e => {
            e.preventDefault();
            const targetEl = e.target;

            if (targetEl.href) {
                history.pushState({}, '', targetEl.href);
                this.update();
            }
        });
    }

    getMaxPageNumber() {
        return [...this.pages][this.pages.size - 1];
    }

    getMinPageNumber() {
        return [...this.pages][0];
    }

    getPrevPageNum() {
        const minPageNumber = this.getMinPageNumber();

        if (minPageNumber <=1 ) {
            return minPageNumber;
        }

        return minPageNumber - 1;
    }

    getNextPageNum() {
        return this.getMaxPageNumber() + 1;
    }

    update() {
        this.pages = this.getPagesFromURL() || new Set([1]);
        this.render();
        this.dispatch('update');
    }

    render() {
        const currentParams = Pagination.parseQueryString();
        const nextPageNum = this.getNextPageNum();

        this.moreBtn.href = Pagination.stringifyQueryParams({
            ...currentParams,
            pages: [...this.pages, nextPageNum].join(',')
        });

        this.prevLink.href = Pagination.stringifyQueryParams({
            ...currentParams,
            pages: this.getPrevPageNum()
        });

        this.nextLink.href = Pagination.stringifyQueryParams({
            ...currentParams,
            pages: nextPageNum
        });

        this.pageList.innerText = '';

        const pageLinks = [];

        for (let currentPage = 1; currentPage < nextPageNum; currentPage++) {
            const linkEl = document.createElement('a');

            linkEl.className = 'pagination__link';
            linkEl.innerText = currentPage;
            linkEl.href = Pagination.stringifyQueryParams({
                ...currentParams,
                pages: currentPage
            });

            if (this.pages.has(currentPage)) {
                linkEl.classList.add('pagination__link--current');
            }

            pageLinks.push(linkEl);
        }

        this.pageList.append(...pageLinks);
    }
}
