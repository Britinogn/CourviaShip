<template>
  <div class="toast-container">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
        role="alert"
      >
        <div class="toast-icon">
          <span v-if="toast.type === 'success'">✓</span>
          <span v-if="toast.type === 'error'">!</span>
          <span v-if="toast.type === 'info'">i</span>
          <span v-if="toast.type === 'warning'">⚠</span>
        </div>

        <div class="toast-content">
          <p class="toast-message">{{ toast.message }}</p>
          <small v-if="toast.duration" class="toast-timer">{{ formatTime(toast.duration) }}</small>
        </div>

        <button class="toast-close" @click="remove(toast.id)" aria-label="Close">
          ×
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()

// Optional: format remaining time (if you track duration)
const formatTime = (ms: number) => {
  const seconds = Math.ceil(ms / 1000)
  return seconds > 1 ? `${seconds}s` : 'now'
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  pointer-events: none; /* allows clicks to pass through container */
}

.toast {
  pointer-events: auto; /* only the toast itself is clickable */
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  color: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(8px);
  background: rgba(30, 30, 30, 0.92); /* dark glass effect */
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 280px;
}

.toast-success { border-left: 4px solid #10b981; }
.toast-error   { border-left: 4px solid #ef4444; }
.toast-info    { border-left: 4px solid #3b82f6; }
.toast-warning { border-left: 4px solid #f59e0b; }

.toast-icon {
  font-size: 24px;
  font-weight: bold;
  min-width: 28px;
  text-align: center;
}

.toast-content {
  flex: 1;
}

.toast-message {
  margin: 0;
  font-size: 15px;
  line-height: 1.4;
}

.toast-timer {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 4px;
  display: block;
}

.toast-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 22px;
  cursor: pointer;
  padding: 0 8px;
  line-height: 1;
  transition: color 0.2s;
}

.toast-close:hover {
  color: white;
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(120%) scale(0.95);
}
</style>