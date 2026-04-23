<template>
  <!-- 搜尋區域：放輸入框和按鈕的地方 -->
  <div class="search-box">
    <!-- 這是輸入框，裡面可以打要搜尋的 GitHub 名字 -->
    <input
      v-model="username"
      class="search-input"
      placeholder="輸入 GitHub 帳號..."
      @keyup.enter="handleSearch"
    >
    <!-- 這是搜尋按鈕，點下去會觸發搜尋 -->
    <button class="search-button" @click="handleSearch">
      搜尋
    </button>
  </div>
</template>

<script>
// 這裡放搜尋框的設定
export default {
  name: 'SearchBar',
  // 建立一個盒子叫 username，用來存放輸入的帳號
  data() {
    return {
      username: ''
    }
  },
  methods: {
    // 當按下搜尋按鈕時要做的事情
    handleSearch() {
      // 如果沒有輸入帳號，就不要做什麼
      if (!this.username.trim()) {
        return
      }
      // 把帳號傳給爸爸（App.vue）去處理
      this.$emit('search', this.username.trim())
    }
  }
}
</script>

<style scoped>
/* 搜尋框的樣式 */
.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* 輸入框的樣式 */
.search-input {
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  width: 250px;
}

.search-input:focus {
  outline: none;
  border-color: #42b883;
}

/* 按鈕的樣式 */
.search-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #33a06f;
}
</style>