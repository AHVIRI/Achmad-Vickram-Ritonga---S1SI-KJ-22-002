import { defineStore } from "pinia"

export const useTodos = defineStore('useTodos', {
    state: () => ({
        nextId: 0,
        todos: [],
    }),

    getters: {
        pendingTodos(state) {
            return state.todos.filter(t => !t.isCompleted)
        },
        completedTodos(state) {
            return state.todos.filter(t => t.isCompleted)
        }
    },

    actions: {
        storeTodo(payload) {
            this.todos.push({
                id: this.nextId++,
                text: payload.text,
                deadline: payload.deadline,
                createdAt: new Date().toISOString(),
                isCompleted: false
            })
        },

        markAsDone(id) {
            const todo = this.todos.find(t => t.id === id)
            if (todo) todo.isCompleted = true
        },

        destroyTodo(id) {
            this.todos = this.todos.filter(t => t.id !== id)
        }
    },
})
