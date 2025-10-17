
<template>
  <div class="flex h-full w-full bg-slate-200" ref="container" @mousemove="handleMouseMove" @mouseup="stopDragging" @mouseleave="stopDragging">
    <div class="panel" :style="{ width: `${panelWidths[0]}%` }">
      <slot name="left"></slot>
    </div>
    <div class="divider" @mousedown="startDragging(0, $event)"></div>
    <div class="panel" :style="{ width: `${panelWidths[1]}%` }">
      <slot name="middle"></slot>
    </div>
    <div class="divider" @mousedown="startDragging(1, $event)"></div>
    <div class="panel" :style="{ width: `${panelWidths[2]}%` }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const container = ref(null);
const panelWidths = ref([40, 30, 30]);
const draggingDividerIndex = ref(null);
const startX = ref(0);
const startWidths = ref([]);

const STORAGE_KEY = 'cs50p-helper-panel-widths';

onMounted(() => {
  // Load saved widths from chrome storage
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    if (result[STORAGE_KEY] && result[STORAGE_KEY].length === 3) {
      panelWidths.value = result[STORAGE_KEY];
    }
  });
});

function startDragging(index, event) {
  event.preventDefault();
  draggingDividerIndex.value = index;
  startX.value = event.clientX;
  startWidths.value = [...panelWidths.value];
}

function stopDragging() {
  if(draggingDividerIndex.value !== null) {
      draggingDividerIndex.value = null;
      // Save to chrome storage
      chrome.storage.local.set({ [STORAGE_KEY]: panelWidths.value });
  }
}

function handleMouseMove(event) {
  if (draggingDividerIndex.value === null) return;
  
  event.preventDefault();

  const dx = event.clientX - startX.value;
  const totalWidth = container.value.getBoundingClientRect().width;
  const dxPercent = (dx / totalWidth) * 100;

  const minWidthPercent = 10;

  if (draggingDividerIndex.value === 0) {
    let newLeftWidth = startWidths.value[0] + dxPercent;
    let newMiddleWidth = startWidths.value[1] - dxPercent;

    if (newLeftWidth < minWidthPercent || newMiddleWidth < minWidthPercent) return;
    
    panelWidths.value[0] = newLeftWidth;
    panelWidths.value[1] = newMiddleWidth;
  
  } else if (draggingDividerIndex.value === 1) {
    let newMiddleWidth = startWidths.value[1] + dxPercent;
    let newRightWidth = startWidths.value[2] - dxPercent;

    if (newMiddleWidth < minWidthPercent || newRightWidth < minWidthPercent) return;
    
    panelWidths.value[1] = newMiddleWidth;
    panelWidths.value[2] = newRightWidth;
  }
}
</script>

<style scoped>
.panel {
  min-width: 50px; /* Minimum pixel width */
  height: 100%;
  overflow: hidden;
  padding: 8px;
  box-sizing: border-box;
}
.divider {
  width: 8px;
  background-color: #cbd5e1; /* slate-300 */
  cursor: col-resize;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
.divider:hover, .divider:active {
    background-color: #a51c30; /* cs50-red */
}
</style>
