<template>
  <div class="completed-wrapper">
    <h3 class="completed-title">
      Completed
      <span class="done-icon">✔</span>
    </h3>

    <ul class="completed-list">
      <li
        v-for="todo in completedTodos"
        :key="todo.id"
        class="completed-card"
      >
        <div class="left">
          <span class="check-icon">✔</span>

          <div class="text-group">
            <div class="task-name">{{ todo.text }}</div>
            <div class="deadline">Deadline: {{ formatDate(todo.deadline) }}</div>
          </div>
        </div>
      </li>
    </ul>

    <p v-if="completedTodos.length === 0" class="empty-msg">
      No completed tasks yet.
    </p>
  </div>
</template>

<script>
import { useTodos } from "@/stores/todos";
import { mapState } from "pinia";
import { formatDate } from "@/utils/formatDate"

export default {
  computed: {
    ...mapState(useTodos, ["completedTodos"])
  },

  methods: {
    formatDate,
  }
}
</script>
