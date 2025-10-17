<template>
  <div class="h-full flex flex-col bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
    <div class="p-4 bg-gray-50 border-b border-gray-200">
      <h2 class="text-xl font-bold text-cs50-red">
        {{ problemName }}
      </h2>
      <p class="text-sm text-gray-500">Tuần {{ week }} - Nội dung bài tập</p>
    </div>
    <div ref="contentHost" id="cs50-problem-content" class="flex-grow p-6 overflow-y-auto">
      <!-- Original content will be mounted here -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  problemName: String,
  week: Number,
  originalContent: Object,
});

const contentHost = ref(null);

onMounted(() => {
  if (props.originalContent && contentHost.value) {
    // Append the cloned original content to this panel
    contentHost.value.appendChild(props.originalContent);
  }
});
</script>
