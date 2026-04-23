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
    <div v-if="error" class="error-card">
      <span class="error-icon">😢</span>
      <p class="error-title">找不到這個人</p>
      <p class="error-message">這個帳號可能不存在，請再檢查一次拼寫是否正確</p>
      <p class="error-hint">例如：試試輸入「octocat」或「torvalds」</p>
    </div>
    
    <!-- 成功拿到資料時顯示這個 -->
    <div v-if="searchResult" class="user-card">
      <img :src="searchResult.avatar_url" :alt="searchResult.login" class="avatar">
      <h2>{{ searchResult.login }}</h2>
      <p v-if="searchResult.name" class="user-name">{{ searchResult.name }}</p>
      <p v-if="searchResult.bio" class="user-bio">{{ searchResult.bio }}</p>
      
      <!-- 使用者統計資料 -->
      <div class="user-stats">
        <span>📂 {{ searchResult.public_repos }} 專案</span>
        <span>👥 {{ searchResult.followers }} 追蹤者</span>
        <span>✋ {{ searchResult.following }} 追蹤中</span>
      </div>
      
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
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
}

h1 {
  color: #24292e;
  margin-bottom: 30px;
  font-size: 32px;
}

.loading {
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.error {
  padding: 20px;
  background-color: #ffe6e6;
  color: #d00;
  border-radius: 8px;
  margin-top: 20px;
}

/* 錯誤卡片 */
.error-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.error-icon {
  font-size: 48px;
}

.error-title {
  font-size: 24px;
  color: #24292e;
  margin: 15px 0;
}

.error-message {
  color: #586069;
  margin-bottom: 10px;
}

.error-hint {
  color: #0366d6;
  font-size: 14px;
}

/* 使用者卡片 */
.user-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.user-card h2 {
  margin: 15px 0 5px;
  color: #24292e;
}

.user-name {
  color: #586069;
  font-size: 18px;
  margin: 0 0 10px;
}

.user-bio {
  color: #24292e;
  margin: 10px 0;
}

/* 統計資料 */
.user-stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  padding: 15px 0;
  border-top: 1px solid #e1e4e8;
  border-bottom: 1px solid #e1e4e8;
}

.user-stats span {
  font-size: 16px;
  color: #586069;
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