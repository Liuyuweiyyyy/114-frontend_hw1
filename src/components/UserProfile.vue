<script setup>
// 這是「接收的禮物」- 從外面傳進來的資料
// 使用者的頭像、名字、自我介紹
const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  // 這個使用者的所有貼文
  userPosts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <!-- 畫面：個人檔案頁面 -->
  <div class="profile-page">
    <!-- 個人資料卡片 -->
    <div class="profile-card">
      <!-- 使用者頭像 -->
      <img :src="user.avatar" alt="頭像" class="profile-avatar" />
      
      <!-- 使用者名字 -->
      <h2 class="profile-name">{{ user.name }}</h2>
      
      <!-- 自我介紹 -->
      <p class="profile-bio">{{ user.bio }}</p>
      
      <!-- 統計資訊 -->
      <div class="profile-stats">
        <div class="stat">
          <span class="stat-number">{{ userPosts.length }}</span>
          <span class="stat-label">貼文</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ user.followers }}</span>
          <span class="stat-label">粉絲</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ user.following }}</span>
          <span class="stat-label">追蹤中</span>
        </div>
      </div>
    </div>

    <!-- 個人貼文列表 -->
    <div class="profile-posts">
      <h3>我的貼文</h3>
      <!-- 如果沒有貼文 -->
      <p v-if="userPosts.length === 0" class="no-posts">
        還沒有發佈任何貼文 😢
      </p>
      <!-- 有貼文的話顯示 -->
      <div v-else class="posts-grid">
        <div v-for="post in userPosts" :key="post.id" class="post-item">
          <p class="post-content">{{ post.content }}</p>
          <span class="post-time">{{ post.time }}</span>
          <span class="post-likes">❤️ {{ post.likes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 個人檔案頁面樣式 */
.profile-page {
  /* 最大的寬度 */
  max-width: 600px;
  /* 居中 */
  margin: 0 auto;
  /* 上下空間 */
  padding: 20px;
}

/* 個人資料卡片 */
.profile-card {
  /* 白色背景 */
  background: white;
  /* 圓角 */
  border-radius: 16px;
  /* 陰影 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  /* 內邊距 */
  padding: 24px;
  /* 文字居中 */
  text-align: center;
  /* 下面的間隔 */
  margin-bottom: 24px;
}

/* 頭像 */
.profile-avatar {
  /* 圓形 */
  border-radius: 50%;
  /* 大小 */
  width: 100px;
  height: 100px;
  /* 邊框 */
  border: 3px solid #fff;
  /* 陰影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 下面的間隔 */
  margin-bottom: 16px;
}

/* 名字 */
.profile-name {
  /* 大小 */
  font-size: 24px;
  /* 粗粗的 */
  font-weight: bold;
  /* 顏色 */
  color: #333;
  /* 拿掉預設距離 */
  margin: 0 0 8px;
}

/* 自我介紹 */
.profile-bio {
  /* 顏色 */
  color: #666;
  /* 下面的間隔 */
  margin-bottom: 16px;
}

/* 統計資訊區塊 */
.profile-stats {
  /* 橫向排列 */
  display: flex;
  /* 平均分佈 */
  justify-content: space-around;
  /* 上面有一條線 */
  border-top: 1px solid #eee;
  /* 上面空間 */
  padding-top: 16px;
}

/* 統計項目 */
.stat {
  /* 垂直排列 */
  display: flex;
  flex-direction: column;
  /* 文字居中 */
  text-align: center;
}

/* 數字 */
.stat-number {
  /* 大大粗粗 */
  font-size: 20px;
  font-weight: bold;
  /* 顏色 */
  color: #333;
}

/* 標籤 */
.stat-label {
  /* 小小的 */
  font-size: 12px;
  /* 灰色 */
  color: #888;
}

/* 貼文區塊 */
.profile-posts {
  /* 白色背景 */
  background: white;
  /* 圓角 */
  border-radius: 16px;
  /* 陰影 */
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  /* 內邊距 */
  padding: 24px;
}

.profile-posts h3 {
  /* 標題 */
  font-size: 18px;
  /* 粗粗的 */
  font-weight: bold;
  /* 顏色 */
  color: #333;
  /* 下面的間隔 */
  margin: 0 0 16px;
  /* 上面有一條線 */
  border-bottom: 1px solid #eee;
  /* 下面空間 */
  padding-bottom: 12px;
}

/* 沒有貼文時 */
.no-posts {
  /* 灰色文字 */
  color: #888;
  /* 文字居中 */
  text-align: center;
  /* 空間 */
  padding: 20px;
}

/* 貼文網格 */
.posts-grid {
  /* 垂直排列 */
  display: flex;
  flex-direction: column;
  /* 間隔 */
  gap: 12px;
}

/* 貼文項目 */
.post-item {
  /* 淡淡的背景 */
  background: #f9f9f9;
  /* 圓角 */
  border-radius: 8px;
  /* 內邊距 */
  padding: 12px;
}

/* 貼文內容 */
.post-content {
  /* 顏色 */
  color: #333;
  /* 下面的間隔 */
  margin: 0 0 8px;
}

/* 貼文時間和按讚 */
.post-time,
.post-likes {
  /* 小小的 */
  font-size: 12px;
  /* 灰色 */
  color: #888;
  /* 右邊間隔 */
  margin-right: 12px;
}
</style>