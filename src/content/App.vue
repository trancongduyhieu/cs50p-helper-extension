<template>
  <!-- Main app for problem pages -->
  <div v-if="currentProblem" id="cs50p-helper-container" class="fixed inset-0 z-[9999] h-screen w-screen font-sans">
    <ResizableLayout>
      <template #left>
        <ProblemPanel :originalContent="originalContent" :problemName="problemData?.hint?.name" :week="currentProblem?.week" />
      </template>
      <template #middle>
        <DocumentationPanel :docData="problemData?.doc" />
      </template>
      <template #right>
        <HintsPanel :hintData="problemData?.hint" />
      </template>
    </ResizableLayout>
  </div>
  
  <!-- Informational notice for non-problem pages -->
  <div v-else id="cs50p-helper-notice" class="fixed bottom-5 right-5 z-[9999] font-sans">
    <div class="bg-white p-4 rounded-lg shadow-2xl border border-gray-200 max-w-sm">
      <p class="text-sm text-gray-700">
        <span class="font-bold text-cs50-red">CS50P Helper:</span> Mở một bài tập cụ thể (ví dụ: Indoor Voice) để kích hoạt các tính năng.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ResizableLayout from './components/ResizableLayout.vue';
import ProblemPanel from './components/ProblemPanel.vue';
import DocumentationPanel from './components/DocumentationPanel.vue';
import HintsPanel from './components/HintsPanel.vue';
import { detectProblem } from './utils/urlDetector.js';
import { getProblemData } from './utils/problemMapper.js';

const originalContent = ref(null);
const currentProblem = ref(null);
const problemData = ref(null);

onMounted(() => {
  currentProblem.value = detectProblem();

  if (currentProblem.value) {
    problemData.value = getProblemData(currentProblem.value.week, currentProblem.value.problemId);
    
    // Select a more stable content anchor, typically the <main> tag
    const mainContent = document.querySelector('main');
    if (mainContent) {
      originalContent.value = mainContent.cloneNode(true);
      // This class triggers the CSS rule to hide original content
      document.body.classList.add('cs50p-helper-active');
    }
  }
});
</script>

<style>
/* Define CS50 red color for Tailwind */
:root {
  --cs50-red: #A51C30;
}
.text-cs50-red {
  color: var(--cs50-red);
}
.border-cs50-red {
  border-color: var(--cs50-red);
}
.bg-cs50-red {
  background-color: var(--cs50-red);
}
</style>
