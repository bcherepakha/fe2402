/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const DB_CLICK_TIME = 500;

class Task extends EventEmiter {
    constructor(taskObj, removeTaskHandler) {
        super();

        if (!taskObj.id) {
            throw new Error(`not valid id: ${taskObj.id}`);
        }

        this.state = taskObj;
        this.editing = false;
        this.hidden = false;

        this._events = {};

        this.outlineClick = this.outlineClick.bind(this);
        this.removeTaskHandler = removeTaskHandler;

        this.createElements();
    }

    createElements() {
        const rootEl = document.createElement('li');
        const viewEl = document.createElement('div');
        const editEl = document.createElement('form');
        const completedEl = document.createElement('input');
        const textEl = document.createElement('span');
        const destroyEl = document.createElement('button');
        const taskEditEl = document.createElement('input');
        const changeSubmit = document.createElement('button');

        rootEl.append(viewEl, editEl);
        viewEl.append(completedEl, textEl, destroyEl);
        editEl.append(taskEditEl, changeSubmit);

        taskEditEl.className = 'edit';
        taskEditEl.value = this.state.text;
        changeSubmit.className = 'visually-hidden';
        changeSubmit.type = 'submit';

        destroyEl.className = 'destroy';
        completedEl.className = 'toggle';
        completedEl.type = 'checkbox';
        viewEl.className = 'view';
        textEl.innerText = this.state.text;

        completedEl.addEventListener('change', this.onChangeCompleted.bind(this));
        textEl.addEventListener('click', this.onDbClickHandler());
        editEl.addEventListener('submit', this.changeTextData.bind(this));
        destroyEl.addEventListener('click', this.destroy.bind(this));

        document.addEventListener('click', this.outlineClick);

        this.changeSubmit = changeSubmit;
        this.textEl = textEl;
        this.taskEditEl = taskEditEl;
        this.completedEl = completedEl;
        this.rootEl = rootEl;
    }

    destroy() {
        this.rootEl.remove();

        document.removeEventListener('click', this.outlineClick);

        this.dispatch('destroy');
    }

    outlineClick(e) {
        const inInput = !this.editing
            || e.target === this.taskEditEl
            || e.target === this.textEl
            || e.target === this.changeSubmit;

        if (inInput) {
            return ;
        }

        this.toggleEditing();
        // this.changeTextData(e);
    }

    changeTextData(e) {
        e.preventDefault();
        const newText = this.taskEditEl.value.trim();

        if (!newText || newText.length < 3) {
            return ;
        }

        this.changeText(newText, false);
        this.toggleEditing();
    }

    changeText(newText, needRender = true) {
        this.state.text = newText;

        if (needRender) {
            this.render();
        }

        this.dispatch('stateChanged');
    }

    onDbClickHandler() {
        let prevClickTime = 0;

        return () => {
            const currentClickTime = Date.now();

            if (currentClickTime - prevClickTime < DB_CLICK_TIME) {
                prevClickTime = 0;
                this.toggleEditing();
            } else {
                prevClickTime = currentClickTime;
            }
        };
    }

    onChangeCompleted() {
        this.state.completed = this.completedEl.checked;
        this.dispatch('stateChanged');
        this.render();
    }

    toggleCompleted() {
        this.state.completed = !this.state.completed;
        this.dispatch('stateChanged');
        this.render();
    }

    toggleEditing() {
        this.editing = !this.editing;
        this.render();
    }

    hide() {
        this.hidden = true;
        this.render();
    }

    show() {
        this.hidden = false;
        this.render();
    }

    render() {
        const { completed, text } = this.state;
        const { editing } = this;

        this.textEl.innerText = text;
        this.taskEditEl.value = text;

        if (completed) {
            this.rootEl.classList.add('completed');
        } else {
            this.rootEl.classList.remove('completed');
        }

        if (editing) {
            this.rootEl.classList.add('editing');
        } else {
            this.rootEl.classList.remove('editing');
        }

        return this.rootEl;
    }
}
