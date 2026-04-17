<script setup>
// 引入便利貼列表小幫手
import PostList from './components/PostList.vue'
// 引入導航列小幫手
import NavBar from './components/NavBar.vue'
// 引入個人檔案小幫手
import UserProfile from './components/UserProfile.vue'
// 引入發布小幫手
import CreatePost from './components/CreatePost.vue'
// 引入搜尋小幫手
import SearchBar from './components/SearchBar.vue'
// 引入假資料小幫手
import { posts as initialPosts, users } from './data/mock.js'
// 引入「盒子」功能
import { ref, computed } from 'vue'

// 這個「盒子」用來存放所有便利貼
// 用 initialPosts 來初始化（假資料）
const posts = ref(initialPosts)

// 這個「盒子」用來記錄目前登入的使用者資料
const currentUser = {
  name: '小明',
  avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=ming',
  bio: '我是小明，喜歡玩遊戲和看書！',
  followers: 120,
  following: 85
}

// 這個「盒子」用來記錄小明發過的貼文
// 用「篩選」把是小明的貼文找出來
const myPosts = ref([])
function updateMyPosts() {
  myPosts.value = posts.value.filter(post => post.author === '小明')
}
updateMyPosts()

// 建立一個「盒子」來存放目前在哪個頁面
// 一開始在「首頁」（home）
const page = ref('home')

// 建立切換頁面的功能
// 當導航列按下的時候，會更新這個盒子的值
function changePage(newPage) {
  // 把 page 盒子裡的值更新
  page.value = newPage
}

// 建立處理新貼文的功能
// 當發布小幫手說有新貼文時，會執行這個功能
function handleAddPost(newPost) {
  // 把新便利貼「放進」便利貼盒子的最前面
  posts.value.unshift(newPost)
  
  // 更新我的貼文列表
  updateMyPosts()
}

// 建立處理按讚的功能
// 當便利貼卡片說有人按讚時，會執行這個功能
function handleToggleLike(postId) {
  // 找出是哪個便利貼被按讚
  const post = posts.value.find(p => p.id === postId)
  
  // 如果找到了
  if (post) {
    // 如果已經按過讚（liked 是 true），就取消讚
    if (post.liked) {
      // 讚數 -1
      post.likes--
      // 改成沒按讚
      post.liked = false
    } 
    // 如果沒按過讚（liked 是 false），就按讚
    else {
      // 讚數 +1
      post.likes++
      // 改成有按讚
      post.liked = true
    }
  }
}

// 這個「盒子」用來記錄「目前看誰的檔案」
// 一開始看「小明」的檔案
const viewingUser = ref({ ...currentUser })

// 這個「盒子」用來記錄「有沒有人被搜尋過」
// 一開始是「沒有人被搜尋」
const hasSearched = ref(false)

// 這個「盒子」用來記錄「發布彈窗有沒有打開」
const showCreateModal = ref(false)

// 打開發布彈窗
function openCreateModal() {
  showCreateModal.value = true
}

// 關閉發布彈窗
function closeCreateModal() {
  showCreateModal.value = false
}

// 這個「計算盒」會自動篩選「目前看的那個用戶」的貼文
// 當 viewingUser 改變時，會自動更新
const viewingUserPosts = computed(() => {
  return posts.value.filter(post => post.author === viewingUser.value.name)
})

// 建立處理「選了某個用戶」的功能
// 當搜尋小幫手說有人被選時，會執行這個功能
function handleSelectUser(user) {
  // 更新「目前看誰」的盒子
  viewingUser.value = user
  
  // 標記「有人被搜尋了」
  hasSearched.value = true
  
  // 切換到「搜尋結果」頁面
  page.value = 'search-result'
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
      <div v-if="page === 'home'" class="home-content">
        <!-- 搜尋小幫手（在最上面） -->
        <!-- :users="users" 把用戶清單傳給搜尋小幫手 -->
        <!-- @select-user="handleSelectUser" 當有人被選時，觸發這個功能 -->
        <SearchBar :users="users" @select-user="handleSelectUser" />
        
        <!-- 便利貼列表 -->
        <!-- 把便利貼盒子傳給列表小幫手 -->
        <!-- @toggle-like="handleToggleLike" 當有人按按讚時，觸發這個功能 -->
        <PostList :posts="posts" @toggle-like="handleToggleLike" />
      </div>

      <!-- 發布按鈕（右下角浮動） -->
      <button v-if="page === 'home'" class="fab" @click="openCreateModal">
        +
      </button>

      <!-- 發布彈窗 -->
      <div v-if="showCreateModal" class="modal-overlay" @click.self="closeCreateModal">
        <div class="modal-content">
          <button class="modal-close" @click="closeCreateModal">✕</button>
          <CreatePost @add-post="handleAddPost" @close="closeCreateModal" />
        </div>
      </div>
      
      <!-- 如果現在在個人檔案，就顯示個人檔案頁面 -->
      <!-- 把「目前看誰」的資料和貼文傳給個人檔案小幫手 -->
      <UserProfile 
        v-else-if="page === 'profile'" 
        :user="currentUser"
        :user-posts="myPosts"
      />

      <!-- 如果現在在搜尋結果，就顯示搜尋結果頁面 -->
      <!-- 把「目前看誰」的資料和貼文傳給個人檔案小幫手 -->
      <!-- 只有搜尋過（hasSearched = true）才顯示個人檔案 -->
      <UserProfile 
        v-else-if="page === 'search-result' && hasSearched" 
        :user="viewingUser"
        :user-posts="viewingUserPosts"
        title="搜尋結果"
      />

      <!-- 如果現在在搜尋結果，但還沒搜尋（暫無查詢） -->
      <div v-else-if="page === 'search-result'" class="no-result">
        暫無查詢
      </div>
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

/* 首頁內容區塊 */
.home-content {
  /* 最大的寬度 */
  max-width: 600px;
  /* 居中 */
  margin: 0 auto;
  /* 上下空間 */
  padding: 20px;
}

/* 暫無查詢的樣式 */
.no-result {
  /* 白色背景 */
  background: white;
  /* 圓角 */
  border-radius: 12px;
  /* 陰影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 內邊距 */
  padding: 40px;
  /* 文字居中 */
  text-align: center;
  /* 字的大小 */
  font-size: 18px;
  /* 灰色 */
  color: #888;
}

/* 發布按鈕（右下角浮動） */
.fab {
  /* 固定位置 */
  position: fixed;
  /* 右下角 */
  right: 24px;
  bottom: 24px;
  /* 大小 */
  width: 56px;
  height: 56px;
  /* 圓形 */
  border-radius: 50%;
  /* 藍色背景 */
  background: #1976d2;
  /* 白色字 */
  color: white;
  /* 沒有邊框 */
  border: none;
  /* 字體大小 */
  font-size: 32px;
  /* 陰影 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  /* 游標變手指 */
  cursor: pointer;
  /* 動畫 */
  transition: transform 0.2s, background 0.2s;
  /* 上面留空間 */
  z-index: 50;
}

/* 鼠標移到按鈕上 */
.fab:hover {
  /* 稍微變大 */
  transform: scale(1.1);
  /* 深藍色 */
  background: #1565c0;
}

/* 彈窗遮罩 */
.modal-overlay {
  /* 固定位置 */
  position: fixed;
  /* 充滿螢幕 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* 半透明黑色背景 */
  background: rgba(0, 0, 0, 0.5);
  /* 居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  /* 上面留空間 */
  z-index: 100;
}

/* 彈窗內容 */
.modal-content {
  /* 白色背景 */
  background: white;
  /* 圓角 */
  border-radius: 16px;
  /* 寬度 */
  width: 90%;
  max-width: 500px;
  /* 陰影 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  /* 內邊距 */
  padding: 24px;
  /* 相對位置 */
  position: relative;
}

/* 關閉按鈕 */
.modal-close {
  /* 絕對位置 */
  position: absolute;
  /* 右上角 */
  top: 12px;
  right: 12px;
  /* 背景透明 */
  background: transparent;
  /* 沒有邊框 */
  border: none;
  /* 字體大小 */
  font-size: 24px;
  /* 灰色 */
  color: #888;
  /* 游標變手指 */
  cursor: pointer;
  /* 寬高 */
  width: 32px;
  height: 32px;
}
</style>