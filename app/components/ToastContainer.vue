<template>
    <div class="toast-container">
        <TransitionGroup name="toast">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                :class="['toast', `toast-${toast.type}`]"
                @click="remove(toast.id)"
            >
                {{ toast.message }}
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast';
const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    min-width: 250px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.toast-success { background: #10b981; }
.toast-error { background: #ef4444; }
.toast-info { background: #3b82f6; }
.toast-warning { background: #f59e0b; }

.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(100%);
}
</style>