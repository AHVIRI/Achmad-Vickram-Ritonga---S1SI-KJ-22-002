<template>
  <div>
    <h3>To-Do ⏳</h3>

    <!-- Form Tambah -->
    <form @submit.prevent="addTodo">
      <input v-model="text" type="text" placeholder="Task name..." />

      <input v-model="deadline" type="date" />

      <button :disabled="!text || !deadline">Add</button>
    </form>

    <!-- Sort -->
    <div style="margin-top: 12px;">
      Sort:
      <select v-model="sortBy">
        <option value="created">Created</option>
        <option value="deadline">Deadline</option>
      </select>
    </div>

    <hr />

    <!-- List -->
    <ul>
      <li v-for="todo in sortedTodos" :key="todo.id" class="todo-card">

        <div class="todo-left">
          <input 
            type="checkbox" 
            class="todo-checkbox"
            :checked="todo.isCompleted"
            @change="markAsDone(todo.id)"
          />

          <div>
            <div class="todo-text">{{ todo.text }}</div>
            <div class="todo-deadline">Deadline: {{ formatDate(todo.deadline) }}</div>
          </div>
        </div>

        <button class="todo-remove" @click="destroyTodo(todo.id)">
          Remove
        </button>

      </li>
    </ul>

    <p v-if="pendingTodos.length === 0">No pending tasks.</p>
  </div>
</template>

<script>
import { useTodos } from "@/stores/todos";
import { mapState, mapActions } from "pinia";
import { formatDate } from "@/utils/formatDate"

export default {
  data: () => ({
    text: "",
    deadline: "",
    sortBy: "created"
  }),

  computed: {
    ...mapState(useTodos, ["pendingTodos"]),

    sortedTodos() {
      let list = [...this.pendingTodos]

      if (this.sortBy === "deadline") {
        return list.sort((a, b) => a.deadline.localeCompare(b.deadline))
      }

      // Default: by created
      return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
  },

  methods: {
    ...mapActions(useTodos, ["storeTodo", "markAsDone", "destroyTodo"]),

    addTodo() {
      this.storeTodo({
        text: this.text,
        deadline: this.deadline,
      })
      this.text = ""
      this.deadline = ""
    },

    formatDate,
  }
}
</script>
