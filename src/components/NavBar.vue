<script setup>
// 這是「接收的禮物」- 從外面傳進來的資料
// 現在在哪個頁面（是/否）
const props = defineProps({
  currentPage: {
    type: String,
    default: 'home'
  }
})

// 這是「發送訊號」- 告訴外面我要切換頁面了
const emit = defineEmits(['change-page'])
</script>

<template>
  <!-- 畫面：導航列（最上面的選單） -->
  <nav class="navbar">
    <!-- 網站名稱 -->
    <div class="logo">📘 社交平台</div>
    
    <!-- 選單按鈕區塊 -->
    <div class="menu">
      <!-- 首頁按鈕 -->
      <!-- 如果現在在首頁，就套用 active 樣式 -->
      <button 
        class="menu-btn" 
        :class="{ active: currentPage === 'home' }"
        @click="emit('change-page', 'home')"
      >
        🏠 首頁
      </button>
      
      <!-- 個人檔案按鈕 -->
      <button 
        class="menu-btn" 
        :class="{ active: currentPage === 'profile' }"
        @click="emit('change-page', 'profile')"
      >
        👤 個人檔案
      </button>

      <!-- 搜尋結果按鈕 -->
      <button 
        class="menu-btn" 
        :class="{ active: currentPage === 'search-result' }"
        @click="emit('change-page', 'search-result')"
      >
        🔍 搜尋結果
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* 導航列樣式 */
.navbar {
  /* 白色背景 */
  background: white;
  /* 下面有一條線 */
  border-bottom: 1px solid #ddd;
  /* 裡面的空間 */
  padding: 12px 24px;
  /* 橫向排列 */
  display: flex;
  /* 兩端对齐（Logo在左，選單在右） */
  justify-content: space-between;
  /* 垂直居中 */
  align-items: center;
  /* 固定在最上面 */
  position: sticky;
  top: 0;
  /* 讓導航列在最前面 */
  z-index: 100;
}

/* Logo 樣式 */
.logo {
  /* 大大的、粗粗的字 */
  font-size: 20px;
  font-weight: bold;
  /* 顏色 */
  color: #333;
}

/* 選單區塊 */
.menu {
  /* 橫向排列 */
  display: flex;
  /* 按鈕之間的間隔 */
  gap: 12px;
}

/* 選單按鈕樣式 */
.menu-btn {
  /* 沒有邊框 */
  border: none;
  /* 背景透明 */
  background: transparent;
  /* 字的大小 */
  font-size: 16px;
  /* 內邊距 */
  padding: 8px 16px;
  /* 圓角 */
  border-radius: 8px;
  /* 游標變成手指 */
  cursor: pointer;
  /* 動畫效果 */
  transition: all 0.2s;
}

/* 滑鼠移到按鈕上 */
.menu-btn:hover {
  /* 淡淡的灰色背景 */
  background: #f0f0f0;
}

/* 啟動中的按鈕（active 樣式） */
.menu-btn.active {
  /* 藍色背景 */
  background: #e3f2fd;
  /* 藍色字 */
  color: #1976d2;
  /* 粗粗的字 */
  font-weight: bold;
}
</style>