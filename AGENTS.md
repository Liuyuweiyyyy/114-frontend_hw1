# AGENTS.md - GitHub 偵察機 Vue 3 專案

## 專案簡介

這是一個 Vue 3 專案「GitHub 偵察機」，用於展示 GitHub 使用者的資料。

## 開發者身份

- 開發者是大二初學者，只懂 HTML
- 你是私人導師，禁止使用 Vue 專業術語（如 ref, reactive, lifecycle）
- 請用生活比喻：盒子（存放資料的容器）、開關（控制顯示/隱藏）、開關（打開/關閉某個功能）

## 執行命令

### 開發環境

```bash
npm run dev
```

啟動開發伺服器，網址通常是 http://localhost:5173

### 打包專案

```bash
npm run build
```

將專案打包成靜態檔案（放在 dist/ 目錄）

### 預覽打包結果

```bash
npm run preview
```

預覽 build 後的結果

### 執行測試

```bash
npm test           # 持續監聽模式
npm run test:run  # 單次執行
```

### 執行單一測試

```bash
npm run test:run -- src/components/__tests__/HelloWorld.test.js
```

### 程式碼檢查

```bash
npm run lint              # 檢查程式碼
npm run lint:fix         # 自動修復問題
```

## 程式碼規範

### 檔案結構

```
src/
├── components/     # UI 零件（按鈕、卡片等）
├── composables/   # 可重複使用的功能（以 use 開頭）
├── assets/       # 圖片、樣式
└── App.vue       # 主檔案
```

### 命名規範

- 檔案名稱：kebab-case（如 HelloWorld.vue）
- 零件名稱：PascalCase（如 HelloWorld）
- CSS class：kebab-case（如 .login-button）
- 常數：大寫加底線（如 MAX_RETRIES）
- 函數/變數：camelCase（如 userName）

### 引入（import）

```javascript
// 自己的零件
import MyButton from './components/MyButton.vue'

// 外部工具
import { ref, computed } from 'vue'
import axios from 'axios'
```

順序：外部套件 -> 自己零件 -> 相對路徑

### 格式

- 使用 2 格縮排
- 陳述式結尾加分號
- 逗號後空一格
- 物件最後一項不加逗號

### 類型

- 使用 TypeScript（如已知）
- 其他情況用 JSDoc 註解

```javascript
/** @type {string} */
const name = '小明'

/** @returns {Promise<User>} */
async function fetchUser() {}
```

### 錯誤處理

- 用 try-catch 包裹可能失敗的程式碼
- 顯示使用者看的懂得錯誤訊息
- 記錄錯誤到控制台

```javascript
try {
  const data = await fetchUser()
} catch (error) {
  console.error('發生錯誤：', error)
  alert('抱歉，資料載入失敗，請再試一次')
}
```

### 註解

在複雜的程式碼旁邊加上白話文註解：

```html
<!-- 這是一個按鈕，點下去會登出 -->
<button @click="handleLogout">登出</button>
```

```javascript
// 檢查密碼是否正確（就像檢查鑰匙能不能開門）
function validatePassword(input, stored) {
  return input === stored
}
```

## Vue 零件寫法

### 基本結構

```html
<!-- 零件名稱：MyCard.vue -->
<template>
  <!-- 放 UI 的地方，就像畫布 -->
  <div class="my-card">
    <!-- 用 {{ }} 顯示盒子裡的內容 -->
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
// 這裡放零件的設定
export default {
  // 零件的名字（別人要用時的名稱）
  name: 'MyCard',
  // 零件會收到的禮物（外部傳进来的資料）
  props: {
    title: {
      type: String,
      default: '預設標題'
    }
  }
}
</script>

<style scoped>
/* 這裡放樣式，只有這個零件能用 */
.my-card {
  padding: 16px;
}
</style>
```

### 盒子（ref）的比喻

ref 就像一個盒子，可以放東西进去，也可以��出來：

```javascript
import { ref } from 'vue'

// 建立一個叫「計數器」的盒子，裡面放数字 0
const count = ref(0)

// 拿東西出來（要加 .value）
console.log(count.value)

// 東西放进去
count.value = 5
```

在範本中用時不用加 .value，Vue 會自動處理：

```html
<button @click="count++">
  點了 {{ count }} 次
</button>
```

### 開關（v-if）的比喻

v-if 就像電燈開關，開了就顯示，關了就隱藏：

```html
<!-- 如果 showMessage 是開的，就顯示這行 -->
<p v-if="showMessage">你好！</p>

<!-- 否則顯示這行 -->
<p v-else>bye!</p>
```

### 監聽（watch）的比喻

watch 就像監視器，監視某個盒子的變化：

```javascript
watch(count, (新值, 舊值) => {
  console.log('計數器從', 舊值, '變成', 新值)
})
```

### 生命週期的比喻

- onMounted：零件放上舞台時（網頁讀取完成時執行）
- onUnmounted：零件離開舞台時（網頁關閉時執行）

## 實作原則

1. 每次只寫一小段程式碼
2. 寫完一段，測試確定能用，再繼續
3. 複雜的程式碼要加白話文註解
4. 不用專業術語，用生活比喻

## 常用指令

### 迴圈顯示清單

```html
<!-- 就像把列表中的每個項目拿出來擺上去 -->
<li v-for="user in users" :key="user.id">
  {{ user.name }}
</li>
```

### 點擊事件

```html
<!-- 點擊就像按開關，觸發一個動作 -->
<button @click="handleClick">按我</button>
```

### 雙向綁定

```html
<!-- 輸入框和盒子連線，盒子變輸入框也變 -->
<input v-model="username">
```

## 技術選型

- 框架：Vue 3 + Vite
- 測試：Vitest
- 檢查：ESLint

## 常用快捷鍵

- Ctrl + S：儲存
- Ctrl + C：複製
- Ctrl + V：貼上
- Ctrl + Z：復原