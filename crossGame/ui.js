/* eslint-disable no-undef */
console.dir( document );

/** @type {HTMLElement} */
const crossEl = document.querySelector('.cross');

console.dir( crossEl );
console.log( 'className: ', crossEl.className );
console.log( 'id: ', crossEl.id );
console.log( 'data-id: ', crossEl.getAttribute('data-id') );
console.log( 'data-*: ', crossEl.dataset );
console.log( 'classList: ', crossEl.classList );

const ui = {
    board: document.querySelector('.cross__board'),
    cells: document.querySelectorAll('.cross__board-item'),
    clearCells() {
        for (let i=0; i< ui.cells.length; i++) {
            ui.cells[i].innerText = '';
        }
    },
    startGame() {
        ui.clearCells();
        ui.subscribe();
        cross.start();
    },
    subscribe() {
        ui.board.addEventListener('click', ui.clickByBoard);
    },
    clickByBoard(e) {
        const cell = e.target.closest('.cross__board-item');
        const cellIndex = +cell.dataset.index;

        ui.step(cellIndex);
    },
    step(place) {
        cross.step(place);
        ui.render();
    },
    createX() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        svg.setAttribute('class', 'x cross__board-item-el');
        svg.setAttribute('viewBox', '0 0 80 80');

        line1.setAttribute('class', 'x__line1');
        line1.setAttribute('x1', '20');
        line1.setAttribute('y1', '10');
        line1.setAttribute('x2', '60');
        line1.setAttribute('y2', '70');

        line2.setAttribute('class', 'x__line2');
        line2.setAttribute('x1', '60');
        line2.setAttribute('y1', '10');
        line2.setAttribute('x2', '20');
        line2.setAttribute('y2', '70');

        svg.append(line1, line2);

        return svg;
    },
    create0() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

        ellipse.setAttribute('cx', '40');
        ellipse.setAttribute('cy', '40');
        ellipse.setAttribute('rx', '20');
        ellipse.setAttribute('ry', '30');

        svg.setAttribute('class', 'o cross__board-item-el');
        svg.setAttribute('viewBox', '0 0 80 80');

        svg.append(ellipse);

        return svg;
    },
    render() {
        const board = cross.board;
        const cells = ui.cells;

        board
            .forEach((cellValue, idx) => {
                const cell = cells[idx];

                //  && (*)
                // true && true === true
                // false && true === false
                // true && false === false
                // false && false === false
                if (cellValue !== EMPTY && cell.children.length === 0) {
                    const el = cellValue === X ? ui.createX() : ui.create0();

                    cell.append(el);

                    console.log({ cellValue, idx, el, cell });
                }
            });
    }
};

// const firstCell = ui.cells[0];

// console.log( 'innerHTML: ', firstCell.innerHTML );
// console.log( 'innerText: ', firstCell.innerText );
// console.log( 'children: ', firstCell.children );

ui.startGame();
