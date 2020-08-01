<template>
    <div class="ProfileFriends">
      <div class="friendlist">
          <input type="text" value="" placeholder="Search" οnfοcus="this.placeholder=''"/>
        <div class="list">
          <ul>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div>
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a>
            </li>
            <li><a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a> </li>
            <li><a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a> </li>
            <li><a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a> </li>
            <li><a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a> </li>
            <li><a href="">
                <div class="flex">
                  <img src="@/assets/img/landing.jpg" class="avatar">
                  <div id="">
                    <p>用户名</p>
                    <p>信息</p>
                  </div>
                </div>
              </a> </li>
          </ul>
        </div>
        <button class="add">Add Friend</button>
      </div>
      <div class="chat">
        <div class="message">
          <img src="@/assets/img/landing.jpg">
        </div>
        <div class="edit">
          <div class="icon">
            <img src="@/assets/img/代码.svg" alt="">
            <img src="@/assets/img/img.svg" alt="">
            <a class="history-message" href="">消息记录</a>
          </div>
          <textarea></textarea>
          <button type="button" class="send">发送</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  background-color: #f5d772;
}
.ProfileFriends{
  display: grid;
  grid-template-areas: 'list message' 
                       'list edit';
  grid-template-columns: 25% 75%;
  grid-template-rows: 100%;
}
.friendlist{
  height: 100vh;
  width: 100%;
  overflow: scroll;
  border: 2px solid black;
}
.friendlist::-webkit-scrollbar {display:none}
.friendlist button{
  width: 150px;
  height: 40px;
  border: 2px solid black;
  border-radius: 20px;
}
.list{
  list-style: none;
  grid-area: list;
  padding: 20px 10px 20px 10px;
}
li{
  text-align: center;
}
li:nth-last-child(1){
  border-bottom: 2px solid #c3c3c3;
  padding-bottom: 30px;
}
li:nth-child(1){
  border-top: 2px solid #c3c3c3;
  padding-top: 30px;
}
.message{
  grid-area: message;
}
.edit{
  border: 2px solid black;
  grid-area: edit;
  height: 100%;
}
.chat{
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: stretch;
  border: 2px solid black;
}
input{
  border-radius: 20px;
  border: 2px solid black;
  width: 150px;
  height: 40px;
  background: url(~@/assets/img/放大镜.svg);
  background-size: 20%;
  background-position: right;
  background-repeat: no-repeat;
  line-height: normal;
  text-align:center;
  vertical-align:middle;
  font-size: 30px
}

::-webkit-input-placeholder{
  color: #000000;
  font-size: 20px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
input::-moz-placeholder{
  color: #000000;
  font-size: 30px;
  text-align: center;
}
textarea{
  width: 100%;
  height: 100%;
}
img{
  width: 100%;
  height: 100%;
}
.avatar{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.flex{
  display: flex;
  flex-direction: row;
  justify-items: baseline;
  justify-content: center;
  align-items: center;
}
li a div div{
  margin-left: 30px;
}
.history-message{
  float: right;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px;
  background: url(~@/assets/img/向下.svg);
  background-size: 20%;
  background-position: right;
  background-repeat: no-repeat;
}
.send{
  border: 2px solid #ff7f27;
  width: 80px;
  height: 40px;
  text-align: start;
  font-size: 20px;
  border-radius: 10px;
  background: url(~@/assets/img/发送.svg);
  background-size: 40%;
  background-position: right;
  background-repeat: no-repeat;
  float: right;
}
.add{
  background: url(~@/assets/img/添加好友.svg);
  background-size: 20%;
  background-position: right;
  background-repeat: no-repeat;
  font-size: 18px;
}
.icon img{
  width: 30px;
  height: 30px;
}
</style>
