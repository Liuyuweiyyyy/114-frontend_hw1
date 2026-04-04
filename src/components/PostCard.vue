<script setup>
// 這是「接收的禮物」- 從外面傳進來的便利貼資料
// 便利貼上寫什麼、誰寫的、幾個讚...都是從這裡收到的
const props = defineProps({
  // 便利貼的完整資料
  post: {
    type: Object,
    required: true
  }
})

// 這是「發送訊號」- 告訴外面有人按讚了
const emit = defineEmits(['toggle-like'])

// 按讚的功能
// 當愛心被按下時，會觸發這個功能
function handleLike() {
  // 發送訊號出去，告訴外面：「有人按讚了！）
  emit('toggle-like', props.post.id)
}
</script>

<template>
  <!-- 畫面：便利貼卡片 -->
  <div class="post-card">
    <!-- 便利貼的作者資訊（左上角） -->
    <div class="post-header">
      <!-- 作者的頭像圖片 -->
      <img :src="post.avatar" alt="頭像" class="avatar" />
      <!-- 作者名字和發文時間 -->
      <div class="post-info">
        <span class="author-name">{{ post.author }}</span>
        <span class="post-time">{{ post.time }}</span>
      </div>
    </div>

    <!-- 便利貼的圖片（如果有圖片就顯示） -->
    <!-- v-if="post.image" 檢查有沒有圖片 -->
    <div v-if="post.image" class="post-image">
      <img :src="post.image" alt="貼文圖片" />
    </div>

    <!-- 便利貼的內容（中間） -->
    <div class="post-content">
      {{ post.content }}
    </div>

    <!-- 便利貼的按讚資訊（下方） -->
    <div class="post-footer">
      <!-- 愛心按鈕 -->
      <!-- 如果有按讚（post.liked 是 true），顯示紅色愛心 -->
      <!-- 如果沒按讚（post.liked 是 false），顯示灰色愛心 -->
      <!-- @click="handleLike" 按下時觸發按讚功能 -->
      <button 
        class="like-button"
        :class="{ liked: post.liked }"
        @click="handleLike"
      >
        <!-- 如果有按讚，顯示紅色愛心 ❤️ -->
        <!-- 如果沒按讚，顯示灰色愛心 🤍 -->
        <span class="heart">{{ post.liked ? '❤️' : '🤍' }}</span>
        <!-- 顯示按讚數 -->
        <span class="like-count">{{ post.likes }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 便利貼卡片樣式 */
.post-card {
  /* 白色背景像真的便利貼 */
  background: white;
  /* 四周有圓圓的角落 */
  border-radius: 12px;
  /* 輕輕的陰影，讓它浮起來 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 裡面的空間 padding */
  padding: 16px;
  /* 下面的間隔 */
  margin-bottom: 16px;
}

/* 作者資訊區塊 */
.post-header {
  /* 橫向排列（頭像 + 名字） */
  display: flex;
  align-items: center;
  /* 下面的間隔 */
  margin-bottom: 12px;
}

/* 頭像樣式 */
.avatar {
  /* 圓圓的頭像 */
  border-radius: 50%;
  /* 大小 */
  width: 40px;
  height: 40px;
  /* 右边稍微间隔 */
  margin-right: 12px;
}

/* 作者資訊區塊 */
.post-info {
  /* 垂直排列（名字在上面，時間在下面） */
  display: flex;
  flex-direction: column;
}

/* 作者名字 */
.author-name {
  /* 粗粗的字 */
  font-weight: bold;
  /* 字的大小 */
  font-size: 16px;
  /* 顏色 */
  color: #333;
}

/* 發文時間 */
.post-time {
  /* 淡淡的灰色 */
  color: #888;
  /* 小小的字 */
  font-size: 12px;
}

/* 便利貼內容 */
.post-content {
  /* 内容稍微粗 */
  font-size: 15px;
  /* 行高（行與行之間的距离） */
  line-height: 1.5;
  /* 顏色 */
  color: #333;
  /* 下面的間隔 */
  margin-bottom: 12px;
}

/* 便利貼的圖片 */
.post-image {
  /* 下面的間隔 */
  margin-bottom: 12px;
}

/* 便利貼的圖片樣式 */
.post-image img {
  /* 寬度 100% */
  width: 100%;
  /* 最大的高度 */
  max-height: 300px;
  /* 物品填充 */
  object-fit: cover;
  /* 圓角 */
  border-radius: 8px;
}

/* 底部（按讚資訊） */
.post-footer {
  /* 上面有一條線 */
  border-top: 1px solid #eee;
  /* 上面空間 */
  padding-top: 12px;
  /* 淡淡的灰色 */
  color: #666;
}

/* 按讚按鈕 */
.like-button {
  /* 沒有邊框 */
  border: none;
  /* 背景透明 */
  background: transparent;
  /* 游標變手指 */
  cursor: pointer;
  /* 橫向排列 */
  display: flex;
  /* 垂直居中 */
  align-items: center;
  /* 間隔 */
  gap: 6px;
  /* 內邊距 */
  padding: 8px 12px;
  /* 圓角 */
  border-radius: 20px;
  /* 動畫效果 */
  transition: background 0.2s;
}

/* 滑鼠移到按鈕上 */
.like-button:hover {
  /* 淡淡的灰色背景 */
  background: #f5f5f5;
}

/* 愛心圖案 */
.heart {
  /* 字體大小 */
  font-size: 18px;
}

/* 按讚數 */
.like-count {
  /* 字的大小 */
  font-size: 14px;
  /* 顏色 */
  color: #666;
}

/* 已按讚時的樣式 */
.like-button.liked .like-count {
  /* 紅色字 */
  color: #e53935;
}
</style>