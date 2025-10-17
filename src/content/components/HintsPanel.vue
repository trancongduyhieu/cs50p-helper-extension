<template>
  <div class="h-full flex flex-col bg-slate-50 rounded-lg shadow-lg overflow-hidden">
    <div class="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-slate-800">Gợi ý & Hướng dẫn</h2>
        <p class="text-sm text-slate-500">Mở khóa từng bước để giải bài</p>
      </div>
    </div>
    <div class="flex-grow p-6 overflow-y-auto space-y-4">
      <div v-if="!hintData">
        <p class="text-slate-500">Không có gợi ý cho bài tập này.</p>
      </div>
      <div v-else>
        <!-- Level 1 -->
        <div class="border border-green-300 bg-white rounded-lg transition-shadow hover:shadow-md">
          <button @click="toggleLevel(1)" class="w-full text-left p-3 font-bold text-green-700 flex justify-between items-center">
            {{ hintData.hints.level1.title }}
            <svg :class="{'rotate-180': unlockedLevels.includes(1)}" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div v-if="unlockedLevels.includes(1)" class="p-4 border-t border-green-200 text-slate-700">
            <ul class="list-disc list-inside space-y-2">
              <li v-for="(item, index) in hintData.hints.level1.content" :key="index">{{ item }}</li>
            </ul>
          </div>
        </div>

        <!-- Level 2 -->
        <div v-if="unlockedLevels.includes(1)" class="border border-yellow-400 bg-white rounded-lg transition-shadow hover:shadow-md">
          <button @click="toggleLevel(2)" class="w-full text-left p-3 font-bold text-yellow-700 flex justify-between items-center">
            {{ hintData.hints.level2.title }}
             <svg :class="{'rotate-180': unlockedLevels.includes(2)}" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div v-if="unlockedLevels.includes(2)" class="p-4 border-t border-yellow-300 text-slate-700">
            <ol class="list-decimal list-inside space-y-2">
              <li v-for="(item, index) in hintData.hints.level2.content" :key="index">{{ item }}</li>
            </ol>
          </div>
        </div>

        <!-- Level 3 -->
        <div v-if="unlockedLevels.includes(2)" class="border border-red-400 bg-white rounded-lg transition-shadow hover:shadow-md">
          <button @click="toggleLevel(3)" class="w-full text-left p-3 font-bold text-red-700 flex justify-between items-center">
            {{ hintData.hints.level3.title }}
            <svg :class="{'rotate-180': unlockedLevels.includes(3)}" class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <div v-if="unlockedLevels.includes(3)" class="p-4 border-t border-red-300">
            <pre class="bg-slate-100 p-3 rounded-md text-sm whitespace-pre-wrap font-mono text-slate-800"><code>{{ hintData.hints.level3.content }}</code></pre>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  hintData: Object
});

const unlockedLevels = ref([]);

function toggleLevel(level) {
  const index = unlockedLevels.value.indexOf(level);
  if (index > -1) {
    // If clicking an open level, close it and all subsequent levels
    unlockedLevels.value = unlockedLevels.value.slice(0, index);
  } else {
    // If clicking a locked level, open it
    unlockedLevels.value.push(level);
  }
}

// Reset hints when the problem changes
watch(() => props.hintData, () => {
  unlockedLevels.value = [];
});
</script>
