<template>
    <div class="h-full flex flex-col bg-white dark:bg-black text-gray-800 dark:text-gray-200">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h2 class="text-xl font-bold text-gray-700 dark:text-gray-200">Hành trình Học tập</h2>
      </div>
      <div class="flex-grow p-6 overflow-auto space-y-8">
        <div v-for="week in courseData" :key="week.week">
          <h3 class="text-lg font-bold text-cs50-red mb-4">Tuần {{ week.week }}: {{ week.title }}</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div v-for="problem in week.problems" :key="problem.id" class="flex flex-col items-center text-center p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
              <ProblemBadge :progress="progress[`week${week.week}_${problem.id}`]" :name="problem.name" />
              <span class="text-xs mt-2 font-medium text-gray-600 dark:text-gray-400">{{ problem.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineComponent, computed, inject } from 'vue';
  import courseData from '../../data/courseStructure.js';
  
  const progress = inject('progressData');
  
  const ProblemBadge = defineComponent({
    props: {
      progress: Object,
      name: String,
    },
    setup(props) {
      const badgeStyle = computed(() => {
        if (!props.progress || !props.progress.completed) {
          return { class: 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300', text: 'Chưa hoàn thành' };
        }
        const hints = props.progress.hintsUsed;
        if (hints === 0) {
          return { class: 'bg-yellow-400 text-yellow-900', text: 'Huy hiệu Vàng (không dùng gợi ý)' }; // Gold
        }
        if (hints === 1) {
          return { class: 'bg-slate-400 text-slate-900', text: 'Huy hiệu Bạc (dùng 1 gợi ý)' }; // Silver
        }
        return { class: 'bg-amber-600 text-amber-100', text: `Huy hiệu Đồng (dùng ${hints} gợi ý)` }; // Bronze
      });
  
      const initial = computed(() => props.name.charAt(0).toUpperCase());
  
      return { badgeStyle, initial };
    },
    template: `
      <div class="w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl shadow-md transition-transform transform hover:scale-110" :class="badgeStyle.class" :title="badgeStyle.text">
        {{ initial }}
      </div>
    `
  });
  </script>