<template>
  <div class="h-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-6 px-6" aria-label="Tabs">
        <button v-for="tab in tabs" :key="tab.name" @click="activeTab = tab.name"
          :class="[activeTab === tab.name ? 'border-cs50-red text-cs50-red' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm']">
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Content -->
    <div class="flex-grow overflow-y-auto">
      <!-- Python Docs -->
      <div v-show="activeTab === 'Tài liệu Python'" class="h-full">
        <iframe v-if="docData && docData.docs && docData.docs.length > 0" :src="docData.docs[0]" class="w-full h-full border-0"></iframe>
        <div v-else class="p-6 text-gray-500">Không có tài liệu Python cụ thể cho bài tập này.</div>
      </div>

      <!-- CS50 Manual -->
      <div v-show="activeTab === 'CS50 Manual'" class="p-6">
        <h3 class="font-bold text-lg mb-2">Tài liệu CS50</h3>
        <p class="text-gray-600 mb-4">
          Tham khảo tài liệu chính thức của CS50 để biết thêm chi tiết về các hàm và thư viện được cung cấp trong khóa học.
        </p>
        <a href="https://manual.cs50.io/" target="_blank"
          class="inline-block bg-cs50-red text-white font-bold py-2 px-4 rounded hover:bg-red-800 transition-colors">
          Mở CS50 Manual
        </a>
      </div>

      <!-- AI Example -->
      <div v-show="activeTab === 'Ví dụ'" class="p-6">
        <h3 class="font-bold text-lg mb-2">Ví dụ Code AI</h3>
        <p class="text-gray-600 mb-4">
          Nhấn nút bên dưới để tạo một ví dụ code đơn giản minh họa các khái niệm chính cho bài tập này, được cung cấp bởi Gemini.
        </p>
        <button @click="generateExample" :disabled="isLoading"
          class="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
          <span v-if="!isLoading">Tạo ví dụ</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang tạo...
          </span>
        </button>

        <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p><span class="font-bold">Lỗi:</span> {{ error }}</p>
        </div>

        <div v-if="exampleCode" class="mt-4">
            <pre class="bg-slate-100 p-3 rounded-md text-sm whitespace-pre-wrap font-mono text-slate-800"><code>{{ exampleCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  docData: Object
});

const activeTab = ref('Tài liệu Python');
const isLoading = ref(false);
const exampleCode = ref('');
const error = ref('');

const tabs = computed(() => {
    const availableTabs = [
        { name: 'Tài liệu Python', show: props.docData && props.docData.docs && props.docData.docs.length > 0 },
        { name: 'CS50 Manual', show: true },
        { name: 'Ví dụ', show: true }
    ];
    return availableTabs.filter(tab => tab.show);
});


// When problem changes, reset to the most relevant tab
watch(() => props.docData, (newDocData) => {
    if (newDocData && newDocData.docs && newDocData.docs.length > 0) {
        activeTab.value = 'Tài liệu Python';
    } else {
        activeTab.value = 'CS50 Manual';
    }
    // Also reset the example state
    exampleCode.value = '';
    error.value = '';
}, { immediate: true });


async function generateExample() {
    if (!props.docData || !props.docData.topics) {
        error.value = "Không có đủ thông tin về bài tập để tạo ví dụ.";
        return;
    }

    isLoading.value = true;
    exampleCode.value = '';
    error.value = '';

    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
            throw new Error("API key cho Gemini chưa được cấu hình. Vui lòng thêm VITE_GEMINI_API_KEY vào file .env.local của bạn.");
        }

        // Access the SDK from the window object, loaded from CDN
        const { GoogleGenerativeAI } = window;
        const ai = new GoogleGenerativeAI({ apiKey });

        const topics = props.docData.topics.join(', ');
        const prompt = `Create a very simple and clear Python code example for a beginner that demonstrates the following concepts: ${topics}. The code should be self-contained, easy to understand, and include comments explaining each part. Don't explain the concepts outside the code comments. Just provide the Python code block.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        // Clean up the response to get just the code block
        let generatedText = response.text.trim();
        if (generatedText.startsWith('```python')) {
            generatedText = generatedText.substring(9);
        }
        if (generatedText.startsWith('```')) {
            generatedText = generatedText.substring(3);
        }
        if (generatedText.endsWith('```')) {
            generatedText = generatedText.slice(0, -3);
        }
        
        exampleCode.value = generatedText.trim();

    } catch (e) {
        console.error("Gemini API error:", e);
        error.value = "Không thể tạo ví dụ. Vui lòng thử lại. Lỗi: " + e.message;
    } finally {
        isLoading.value = false;
    }
}
</script>