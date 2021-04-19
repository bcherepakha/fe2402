import { AddTaskForm } from './addTaskForm.js';
import { List } from './list.js';
import TaskStorage from './taskStorage.js';
import Counter from './counter.js';
import Task from './task.js';
import Filter from './filter.js';
import { tasksAPI } from './tasksAPI.js';

const loader = document.querySelector('.loader');

hideLoader();

const addForm = new AddTaskForm(addTaskHandler, onCompleteHandler);
const filter = new Filter();
const taskStorage = new TaskStorage();
const listComponent = new List();
const counter = new Counter('.todo-count');

taskStorage.addEventListener('read', onReadData);
filter.addEventListener('change', onChangeFilter);

listComponent.clear();
counter.setCount(0);
taskStorage.readServer()
    .then(() => console.log('data received'));

function isTaskHidden(task) {
    const showCompleted = filter.value === '#/completed';
    const showAll = filter.value === '#/all';
    const showActive = filter.value === '#/active';

    return !showAll && (
        showCompleted && !task.completed
        || showActive  && task.completed
    );
}

function onReadData() {
    const renderedItems = taskStorage.items.map(task => {
        task.addEventListener('destroy', removeTaskHandler);
        task.addEventListener('stateChanged', onStateChanged);

        if (isTaskHidden(task)) {
            task.hide();
        }

        return task.render();
    });

    listComponent.addItems(renderedItems);
    counter.setCount( taskStorage.getLength() );
}

function addTaskHandler(taskObj) {
    addForm.disabled();
    showLoader();

    tasksAPI.addTask(taskObj)
        .then(taskData => {
            const task = new Task(taskData);

            if (isTaskHidden(task)) {
                task.hide();
            }

            taskStorage.addItem(task);
            task.addEventListener('destroy', removeTaskHandler);
            task.addEventListener('stateChanged', onStateChanged);

            listComponent.addItem( task.render() );
            counter.setCount( taskStorage.getLength() );

            addForm.enabled();
            addForm.clear();
            hideLoader();
        })
        .catch(() => {
            const answer = confirm('Мы не смогли добавить задачу. Повторить?');

            if (answer) {
                addTaskHandler(taskObj);
            } else {
                addForm.enabled();
                hideLoader();
            }
        });
}

function removeTaskHandler({ target: task }) {
    taskStorage.removeItem( task );
    counter.setCount( taskStorage.getLength() );
}

function onStateChanged({ target: task }) {
    const hidden = isTaskHidden(task);

    if (hidden && !task.hidden) {
        task.hide();
    } else if (!hidden && task.hidden) {
        task.show();
    }

    taskStorage.write();
    counter.setCount( taskStorage.getLength() );
}

function onChangeFilter() {
    taskStorage.items.forEach(task => {
        const hidden = isTaskHidden(task);

        if (hidden && !task.hidden) {
            task.hide();
        } else if (!hidden && task.hidden) {
            task.show();
        }
    });

    counter.setCount( taskStorage.getLength() );
}

function onCompleteHandler(checked) {
    if (checked) {
        taskStorage.items.forEach(task => {
            if (task.completed !== checked) {
                task.toggleCompleted();
            }
        });
    }
}

function hideLoader() {
    loader.hidden = true;
}

function showLoader() {
    loader.hidden = false;
}
