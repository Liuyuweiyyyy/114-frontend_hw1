<script setup>
// 引入「盒子」功能
import { ref } from 'vue'

// 這是「發送訊號」- 告訴外面有人發佈新貼文了
const emit = defineEmits(['add-post', 'close'])

// 這個「盒子」用來存放輸入框裡的文字
// 就像一張「記錄紙」，你打什麼字，它就記什麼
const newPostContent = ref('')

// 這個「盒子」用來存放圖片網址
// 可以放兩種：一種是從電腦選的，一種是輸入網址
const imageUrl = ref('')

// 當按「選擇檔案」按鈕時，會觸發這個功能
// 用來讀取電腦裡的圖片檔案
function handleFileSelect(event) {
  // 從「檔案盒」拿出第一個檔案
  const file = event.target.files[0]
  
  // 如果有選檔案
  if (file) {
    // 用 FileReader 讀取檔案
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// 發佈新貼文的功能
function handlePublish() {
  // 如果輸入框是空的，就不要發佈
  if (newPostContent.value.trim() === '') {
    return
  }

  // 建立新的便利貼資料
  const newPost = {
    // 產生一個新的編號（隨機數字）
    id: Date.now(),
    // 誰寫的（現在是測試，用小明）
    author: '小明',
    // 頭像
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=ming',
    // 便利貼內容（輸入框裡的文字）
    content: newPostContent.value,
    // 便利貼的圖片（如果有選就傳）
    image: imageUrl.value || null,
    // 讚數（剛發佈是 0）
    likes: 0,
    // 有沒有按讚（沒有）
    liked: false,
    // 什麼時候（現在）
    time: '剛剛'
  }

  // 發送訊號出去，告訴外面有新貼文
  emit('add-post', newPost)
  
  // 關閉彈窗
  emit('close')

  // 清空輸入框（把盒子裡的值改成空）
  newPostContent.value = ''
  
  // 清空圖片（把盒子裡的值改成空）
  imageUrl.value = ''
}
</script>

<template>
  <!-- 畫面：發佈新貼文區塊 -->
  <div class="create-post">
    <!-- 標題 -->
    <h3>✏️ 發佈新貼文</h3>
    
    <!-- 輸入框區塊 -->
    <div class="input-area">
      <!-- 文字輸入框 -->
      <!-- v-model="newPostContent" 把輸入框和盒子連在一起 -->
      <!-- 盒子裡的字會跟著輸入框改變 -->
      <textarea
        v-model="newPostContent"
        placeholder="今天想分享什麼？"
        class="post-input"
        rows="3"
      ></textarea>
      
      <!-- 圖片區塊 -->
      <div class="image-area">
        <!-- 圖片網址輸入框 -->
        <!-- v-model="imageUrl" 把輸入框和圖片盒子連在一起 -->
        <input
          v-model="imageUrl"
          type="text"
          placeholder="或輸入圖片網址..."
          class="image-url-input"
        />
        
        <!-- 選擇檔案按鈕 -->
        <!-- @change="handleFileSelect" 選好檔案後觸發這個功能 -->
        <label class="file-select-btn">
          📷 選擇圖片
          <input
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            style="display: none;"
          />
        </label>
      </div>
      
      <!-- 預覽圖片（如果有選圖片） -->
      <div v-if="imageUrl" class="image-preview">
        <img :src="imageUrl" alt="預覽" />
      </div>
    </div>
    
    <!-- 按鈕區塊 -->
    <div class="button-area">
      <!-- 發佈按鈕 -->
      <!-- @click="handlePublish" 按下時觸發發佈功能 -->
      <button 
        class="publish-btn"
        @click="handlePublish"
      >
        🚀 發佈
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 發佈區塊樣式 */
.create-post {
  /* 白色背景 */
  background: white;
  /* 圓角 */
  border-radius: 12px;
  /* 陰影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  /* 內邊距 */
  padding: 16px;
  /* 下面的間隔 */
  margin-bottom: 20px;
  /* 最大的寬度，和貼文卡片一樣 */
  max-width: 100%;
  /* 取消居中，因為外層已經居中了 */
  margin-left: 0;
  margin-right: 0;
  /* 盒子-sizing */
  box-sizing: border-box;
}

/* 標題 */
.create-post h3 {
  /* 大小 */
  font-size: 18px;
  /* 粗粗的 */
  font-weight: bold;
  /* 顏色 */
  color: #333;
  /* 下面的間隔 */
  margin: 0 0 12px;
}

/* 輸入區塊 */
.input-area {
  /* 下面的間隔 */
  margin-bottom: 12px;
}

/* 圖片區塊 */
.image-area {
  /* 橫向排列 */
  display: flex;
  /* 垂直居中 */
  align-items: center;
  /* 中間有間隔 */
  gap: 10px;
  /* 下面的間隔 */
  margin-top: 10px;
}

/* 圖片網址輸入框 */
.image-url-input {
  /* 寬度 100% */
  flex: 1;
  /* 沒有邊框 */
  border: 1px solid #ddd;
  /* 圓角 */
  border-radius: 8px;
  /* 內邊距 */
  padding: 8px 12px;
  /* 字體大小 */
  font-size: 14px;
  /* 盒子-sizing */
  box-sizing: border-box;
}

/* 選擇檔案按鈕 */
.file-select-btn {
  /* 灰色背景 */
  background: #f5f5f5;
  /* 沒有邊框 */
  border: 1px solid #ddd;
  /* 圓角 */
  border-radius: 8px;
  /* 內邊距 */
  padding: 8px 12px;
  /* 字體大小 */
  font-size: 14px;
  /* 游標變手指 */
  cursor: pointer;
  /* 不要讓別人選取文字 */
  user-select: none;
}

/* 預覽圖片 */
.image-preview {
  /* 上面的間隔 */
  margin-top: 10px;
}

/* 預覽圖片樣式 */
.image-preview img {
  /* 最大的寬度 */
  max-width: 100%;
  /* 最大的高度 */
  max-height: 200px;
  /* 圓角 */
  border-radius: 8px;
}

/* 文字輸入框 */
.post-input {
  /* 寬度 100% */
  width: 100%;
  /* 沒有邊框 */
  border: 1px solid #ddd;
  /* 圓角 */
  border-radius: 8px;
  /* 內邊距 */
  padding: 12px;
  /* 字體大小 */
  font-size: 15px;
  /* 調整大小功能（可以拉大拉小） */
  resize: vertical;
  /* 盒子-sizing */
  box-sizing: border-box;
}

/* 輸入框 focus 時的樣式 */
.post-input:focus {
  /* 藍色邊框 */
  border-color: #1976d2;
  /* 陰影 */
  outline: none;
  /* 陰影效果 */
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

/* 按鈕區塊 */
.button-area {
  /* 靠右對齊 */
  text-align: right;
}

/* 發佈按鈕 */
.publish-btn {
  /* 藍色背景 */
  background: #1976d2;
  /* 白色字 */
  color: white;
  /* 沒有邊框 */
  border: none;
  /* 圓角 */
  border-radius: 8px;
  /* 內邊距 */
  padding: 10px 20px;
  /* 字體大小 */
  font-size: 15px;
  /* 游標變手指 */
  cursor: pointer;
  /* 動畫效果 */
  transition: background 0.2s;
}

/* 滑鼠移到按鈕上 */
.publish-btn:hover {
  /* 稍微深一點的藍色 */
  background: #1565c0;
}
</style>