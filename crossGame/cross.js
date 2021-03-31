const X = 'x';
const ZERO = '0';
const EMPTY = ' ';
const ROW_LINE = 'row';
const COLUMN_LINE = 'column';
const DIAGONAL_LINE = 'diagonal';
const GAME_ENDED = 'ended';
const GAME_STARTED = 'started';
const GAME_NOT_STARTED = 'not started';

/**
 * @typedef {typeof X | typeof ZERO} TUser
 */

/**
 * @typedef {TUser | typeof EMPTY} TCellValue
 */

/**
 * @typedef {typeof GAME_ENDED | typeof GAME_STARTED | typeof GAME_NOT_STARTED} TGameStatus
 */

/**
 * @typedef {typeof ROW_LINE | typeof COLUMN_LINE | typeof DIAGONAL_LINE} TLineType
 */

/**
 * @typedef {object} TLine
 * @property {TLineType} type
 * @property {number} index
 * @property {(TCellValue)[]} cells
 */

/**
 * @type {object} TCross
 * @property {TCellValue[]} board
 * @property {TUser} currentUser
 * @property {TUser[]} users
 * @property {TGameStatus} status
 * @property {number} stepCount
 */
const cross = {
    board: new Array(9).fill(EMPTY),
    currentUser: X,
    users: [X, ZERO],
    status: GAME_NOT_STARTED,
    stepCount: 0,
    /**
     * @returns undefined
     */
    start() {
        cross.board = new Array(9).fill(EMPTY);
        cross.currentUser = X;
        cross.status = GAME_STARTED;
        cross.stepCount = 0;

        cross.render();
    },
    /**
     * @param {number} place    - cell index in board
     */
    step: function(place) {
        if (cross.status !== GAME_STARTED) {
            throw new Error('Game not started');
        }

        // X, ZERO, EMPTY
        const cellValue = cross.board[place];
        const board = [].concat(cross.board);

        if (cellValue !== EMPTY) {
            throw new Error(`Can't do step in ${place} position, because this cell is not empty`);
        }

        board[place] = cross.currentUser;
        cross.board = board;

        /** @type {typeof X | typeof ZERO} */
        const nextUser = cross.users.find(user => user !== cross.currentUser);
        /**@type {TLine | undefined} */
        const winLine = cross.getWinLine();

        if (winLine) {
            // if winLine is object -> TLine
            cross.status = GAME_ENDED;

            cross.render();
            console.log('Winner: ', cross.currentUser);

            return ;
        }

        // winLine is undefined
        cross.currentUser = nextUser;
        cross.stepCount++;

        cross.render();

        return ;
    },
    /**
     * @returns {TLine | undefined}
     */
    getWinLine: function() {
        const lines = cross.getLines();
        const currentUser = cross.currentUser;
        /** @type {TLine | undefined} */
        const winLine = lines.find(line => cross.isLineWin(line, currentUser));

        return winLine;
    },
    getRow(i) {
        const board = cross.board;

        return {
            cells: [
                board[3*i],
                board[3*i + 1],
                board[3*i + 2]
            ],
            type: ROW_LINE,
            index: i
        };
    },
    /**
     * @returns {TLine[]}
     */
    getLines() {
        const lines = [];
        const board = cross.board;

        for (let i = 0; i < 3; i++) {
            const row = cross.getRow(i);
            const column = {
                cells: [
                    board[i],
                    board[i + 3],
                    board[i + 6]
                ],
                type: COLUMN_LINE,
                index: i
            };

            lines.push(row, column);
        }

        lines.push(
            {
                cells: [
                    board[0],
                    board[4],
                    board[8]
                ],
                type: DIAGONAL_LINE,
                index: 0
            },
            {
                cells: [
                    board[2],
                    board[4],
                    board[6]
                ],
                type: DIAGONAL_LINE,
                index: 1
            }
        );

        return lines;
    },
    /**
     * @param {TLine} line
     * @param {typeof X | typeof ZERO} currentUser
     *
     * @return {boolean}
     */
    isLineWin(line, currentUser = cross.currentUser) {
        return line.cells
            .every(el => el === currentUser);
    },
    render: function() {
        console.log('currentUser: ', cross.currentUser, '; step: ', cross.stepCount + 1);
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            console.log( cross.getRow(rowIndex).cells.join(' | ') );
        }
    }
};

console.log( cross );
