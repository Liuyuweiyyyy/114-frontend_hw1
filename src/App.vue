<script setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'

// 建立一個盒子叫 searchResult，用來存放搜尋結果
const searchResult = ref(null)

// 當收到搜尋帳號時要做的事情
function handleSearch(username) {
  console.log('搜尋帳號：', username)
  // 這裡先顯示輸入的帳號，之後會連線抓資料
  searchResult.value = { login: username, name: '待抓取' }
}
</script>

<template>
  <div class="app">
    <h1>GitHub 偵察機</h1>
    <!-- 放搜尋框，並接收搜尋事件 -->
    <SearchBar @search="handleSearch" />
    <!-- 顯示搜尋結果 -->
    <div v-if="searchResult" class="result">
      <p>搜尋到：{{ searchResult.login }}</p>
    </div>
  </div>
</template>

<style>
.app {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.result {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 20px;
}
</style>