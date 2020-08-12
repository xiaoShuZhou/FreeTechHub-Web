<template>
  <div class="ProfileReply">
    <div class="replylist">
      <ul>
        <li>
          <p>用户1回复了你的评论</p>
          <small>时间：昨天</small>
          <p>内容</p>
        </li>
        <li>
          <p>用户2回复了你的评论</p>
          <small>时间：昨天</small>
          <p>内容</p>
        </li>
        <li>
          <p>用户3回复了你的评论</p>
          <small>时间：昨天</small>
          <p>内容</p>
        </li>
        <li>
          <p>用户4回复了你的评论</p>
          <small>时间：昨天</small>
          <p>内容</p>
        </li>
        <li>
          <p>用户5回复了你的评论</p>
          <small>时间：昨天</small>
          <p>内容</p>
        </li>
        <li>
          <p>用户6回复了你的评论</p>
          <small>时间：昨天</small>
          <p>内容</p>
        </li>
        <li>
          <p>用户7回复了你的评论</p>
          <small>时间：昨天</small>
          <p>内容</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileReply",
};
</script>

<style scoped>
.ProfileReply {
  width: 100%;
  height: 100vh;
  font-size: 24px;
}
ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.replylist {
  overflow: scroll;
  height: 100vh;
}
.replylist::-webkit-scrollbar {
  display: none;
}
li {
  width: 80%;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background: #eeba10;
  border-radius: 20px;
  padding: 5px 0 5px 20px;
  transition: all 0.3s ease;
}
</style>
