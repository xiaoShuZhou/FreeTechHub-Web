<template>
  <div class="RequestFriend">
    <div>
      <ul>
        <li>
          <a href="#" class="avatar">
            <img src="@/assets/img/头像 女孩.svg" alt />
            <div>
              <p>时间：昨天</p>
              <p>用户名</p>
            </div>
            <button class="btn" href="#">已同意</button>
          </a>
        </li>
        <li>
          <a href="#" class="avatar">
            <img src="@/assets/img/头像 女孩.svg" alt />
            <div>
              <p>时间：昨天</p>
              <p>用户名</p>
            </div>
            <button class="btn" href="#">已同意</button>
          </a>
        </li>
        <li>
          <a href="#" class="avatar">
            <img src="@/assets/img/头像 女孩.svg" alt />
            <div>
              <p>时间：昨天</p>
              <p>用户名</p>
            </div>
            <button class="btn" href="#">未同意</button>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.RequestFriend {
  width: 100%;
  height: 90vh;
}
ul{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
li a {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-decoration: none;
  align-items: center;
}
li {
  list-style: none;
  margin: 20px 0 20px 0;
  width: 80%;
  height: 100%;
  font-size: 24px;
  background: #eeba10;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 10px;
  transition: all 0.3s ease;
}
.btn {
  border: none;
  color: white;
  width: 100px;
  height: 40px;
  vertical-align: middle;
  display: inline-block;
  color: white;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 22px;
  letter-spacing: 2px;
  border-radius: 20px;
  background-image: repeating-linear-gradient(90deg, #755bea,#ff72c0);
}
img{
  width: 10%;
}
</style>
