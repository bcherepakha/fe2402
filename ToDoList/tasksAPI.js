class TasksAPI {
    constructor(serverURI) {
        this.serverURI = serverURI;
    }

    getAllTasks() {
        return fetch(`${this.serverURI}/tasks`);
    }

    addTask(data) {
        return fetch(`${this.serverURI}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(
            response => response.json()
        );
    }
}

export const tasksAPI = new TasksAPI('https://5d9969125641430014051850.mockapi.io');
