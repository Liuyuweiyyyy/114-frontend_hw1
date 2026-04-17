// 這個檔案用來放「假的」貼文資料
// 就像便利貼工廠，先做好幾張假的便利貼給大家看

// 用戶清單（記錄所有用戶的資料）
// 以後要找「誰的檔案」，就從這裡抓
export const users = [
  {
    // 用戶名字
    name: '小明',
    // 頭像網址
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=ming',
    // 自我介紹
    bio: '我是小明，喜歡玩遊戲和看書！',
    // 粉絲數
    followers: 120,
    // 追蹤數
    following: 85
  },
  {
    name: '小華',
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=hua',
    bio: '大家好！我是小華，喜歡畫畫和旅行～',
    followers: 200,
    following: 150
  },
  {
    name: '小美',
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=mei',
    bio: '小美報到！愛看書、愛聽音樂',
    followers: 88,
    following: 92
  },
  {
    name: '阿強',
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=aqiang',
    bio: '阿強來了！喜歡打籃球和吃美食',
    followers: 310,
    following: 180
  },
  {
    name: '小萍',
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=xiaoping',
    bio: '嗨！我是小萍，喜歡烘焙和種花',
    followers: 156,
    following: 200
  }
]

// 便利貼清單（記錄所有便利貼的資訊）
export const posts = [
  {
    // 便利貼編號 1
    id: 1,
    // 誰寫的便利貼
    author: '小明',
    // 便利貼的圖片（Q版卡通風格）
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=ming',
    // 便利貼裡寫什麼
    content: '今天天氣真好！去公園玩囉～',
    // 有幾個人按讚
    likes: 5,
    // 按讚了嗎（是/否）
    liked: false,
    // 什麼時候寫的
    time: '2 小時前'
  },
  {
    // 便利貼編號 2
    id: 2,
    author: '小華',
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=hua',
    content: '吃到好吃的冰淇淋！開心～',
    likes: 12,
    liked: false,
    time: '5 小時前'
  },
  {
    // 便利貼編號 3
    id: 3,
    author: '小美',
    avatar: 'https://api.dicebear.com/9.x/fun-emoji/svg?seed=mei',
    content: '看完一本好書，推薦給大家！',
    likes: 8,
    liked: false,
    time: '昨天'
  }
]