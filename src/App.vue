<script setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'

// 建立盒子放搜尋結果
const searchResult = ref(null)
// 建立盒子放公開專案
const repos = ref(null)
// 建立盒子放是否正在「打電話」
const isLoading = ref(false)
// 建立盒子放錯誤訊息
const error = ref(null)

// 當收到搜尋帳號時要做的事情
async function handleSearch(username) {
  // 先把之前的数据清空
  searchResult.value = null
  repos.value = null
  error.value = null
  isLoading.value = true

  try {
    // 去 GitHub 的圖書館打電話問資料
    const response = await fetch(`https://api.github.com/users/${username}`)
    
    // 如果找不到這個人
    if (!response.ok) {
      throw new Error('找不到這個帳號')
    }
    
    // 把拿到的資料放進盒子
    const data = await response.json()
    searchResult.value = data

    // 再打一通電話問專案
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`)
    const reposData = await reposResponse.json()
    repos.value = reposData
  } catch (e) {
    // 如果發生錯誤，把錯誤訊息放進盒子
    error.value = e.message
  } finally {
    // 打完電話了
    isLoading.value = false
  }
}
</script>

<template>
  <div class="app">
    <h1>GitHub 偵察機</h1>
    <!-- 放搜尋框，並接收搜尋事件 -->
    <SearchBar @search="handleSearch" />
    
    <!-- 正在打電話時顯示這個 -->
    <div v-if="isLoading" class="loading">
      正在搜尋中...
    </div>
    
    <!-- 發生錯誤時顯示這個 -->
    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <!-- 成功拿到資料時顯示這個 -->
    <div v-if="searchResult" class="result">
      <img :src="searchResult.avatar_url" :alt="searchResult.login" class="avatar">
      <h2>{{ searchResult.login }}</h2>
      <p v-if="searchResult.name">{{ searchResult.name }}</p>
      <p v-if="searchResult.bio">{{ searchResult.bio }}</p>
      
      <!-- 顯示公開專案 -->
      <div v-if="repos" class="repos">
        <h3>公開專案 ({{ repos.length }})</h3>
        <div v-for="repo in repos" :key="repo.id" class="repo-card">
          <a :href="repo.html_url" target="_blank" class="repo-name">{{ repo.name }}</a>
          <p v-if="repo.description" class="repo-desc">{{ repo.description }}</p>
          <span v-if="repo.stargazers_count" class="repo-stars">⭐ {{ repo.stargazers_count }}</span>
        </div>
      </div>
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

.loading {
  padding: 20px;
  color: #666;
}

.error {
  padding: 20px;
  background-color: #ffe6e6;
  color: #d00;
  border-radius: 8px;
  margin-top: 20px;
}

.result {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.repos {
  margin-top: 30px;
  text-align: left;
}

.repos h3 {
  margin-bottom: 15px;
}

.repo-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.repo-name {
  font-size: 18px;
  color: #0366d6;
  text-decoration: none;
  font-weight: bold;
}

.repo-name:hover {
  text-decoration: underline;
}

.repo-desc {
  color: #586069;
  margin: 5px 0;
}

.repo-stars {
  display: inline-block;
  background: #f1f8ff;
  padding: 3px 8px;
  border-radius: 3px;
  font-size: 12px;
  color: #0366d6;
}
</style>