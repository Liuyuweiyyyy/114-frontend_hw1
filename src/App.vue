<script setup>
// 引入便利貼列表小幫手
import PostList from './components/PostList.vue'
// 引入導航列小幫手
import NavBar from './components/NavBar.vue'
// 引入個人檔案小幫手
import UserProfile from './components/UserProfile.vue'
// 引入假資料小幫手
import { posts } from './data/mock.js'
// 引入「盒子」功能
import { ref } from 'vue'

// 這個「盒子」用來記錄目前登入的使用者資料
const currentUser = {
  name: '小明',
  avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=ming',
  bio: '我是小明，喜歡玩遊戲和看書！',
  followers: 120,
  following: 85
}

// 這個「盒子」用來記錄小明發過的貼文
// 用「篩選」把是小明的貼文找出來
const myPosts = ref(posts.filter(post => post.author === '小明'))

// 建立一個「盒子」來存放目前在哪個頁面
// 一開始在「首頁」（home）
const page = ref('home')

// 建立切換頁面的功能
// 當導航列按下的時候，會更新這個盒子的值
function changePage(newPage) {
  // 把 page 盒子裡的值更新
  page.value = newPage
}
</script>

<template>
  <!-- 畫面：社交平台 -->
  <div class="app">
    <!-- 導航列（一直固定在最上面） -->
    <!-- :current-page="page" 把現在的頁面傳給導航列 -->
    <!-- @change-page="changePage" 當按鈕被按下時，會觸發這個功能 -->
    <NavBar 
      :current-page="page" 
      @change-page="changePage" 
    />
    
    <!-- 主要內容區塊 -->
    <main>
      <!-- 如果現在在首頁，就顯示便利貼列表 -->
      <PostList v-if="page === 'home'" />
      
      <!-- 如果現在在個人檔案，就顯示個人檔案頁面 -->
      <!-- 把使用者資料和貼文傳給個人檔案小幫手 -->
      <UserProfile 
        v-else-if="page === 'profile'" 
        :user="currentUser"
        :user-posts="myPosts"
      />
    </main>
  </div>
</template>

<style scoped>
/* 整個應用程式的樣式 */
.app {
  /* 最小高度（占滿螢幕） */
  min-height: 100vh;
  /* 淺淺的灰色背景 */
  background: #f5f5f5;
}

/* 主要內容區塊 */
main {
  /* 最大的寬度 */
  max-width: 800px;
  /* 居中 */
  margin: 0 auto;
}
</style>