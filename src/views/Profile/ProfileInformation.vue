<template>
  <div class="ProfileInformation">
    <AddFriend
      v-if="status && !_is_owner"
      :status="this.status"
      @closealert="closealert"
      :_user=_user
      :_visitor=_visitor />
    <div class="box1">
      <div id="image">
        <img :src="profile_owner.avatar" />
      </div>
        <p id='username'>{{profile_owner.username}}</p>
        <el-button v-if="profile_owner && _is_owner" @click="editProfile" icon="el-icon-edit" circle></el-button>
      <div>
        <p id='info' style="color:#8188d5;">major:</p><p id='info' style="color:#878fef;">{{profile_owner.major}}</p>
        <p id='info' style="color:#8188d5;">Balance:</p><p id='info' style="color:#878fef;">{{profile_owner.blance}}</p>
        <p id='info' style="color:#8188d5;">grade:</p><p id='info' style="color:#878fef;">{{profile_owner.grade}}</p>
        <p id='info' style="color:#8188d5;">bio:</p><p id='info' style="color:#878fef;">{{profile_owner.bio}}</p>
        <FollowButton
         :_content_owner=_user
         :_visitor=_visitor />
        <button
          @click="showalert"
          id="addfriend-btn"
          v-if="!_is_owner">Add Friend</button>
      </div>
    </div>
    <div class="box2">
      <div>
        <img src="@/assets/img/浏览量.svg" alt="">
         <p id='total'>Total views:{{profile_owner.totalviews}}</p>
        <img src="@/assets/img/粉丝趴.svg" alt="">
        <p id='total'>Follows: {{totalfollowing}}</p>
        <br>
        <img src="@/assets/img/点赞.svg" alt="">
        <p id='total'>Total likes:{{profile_owner.totallikes}}</p>
        <img src="@/assets/img/概率.svg" alt="">
        <p id='total'>Accept rate: {{acceptance_rate}}</p>
      </div>
      <div>
        <div id="chart_example">
        </div>
      </div>
    </div>
    <div class="box3">
      <img src="@/assets/img/github活动表.jpg" />
    </div>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'
import echarts from 'echarts'
import FollowButton from '@/components/FollowButton'
import AddFriend from '@/components/AddFriend.vue'
export default {
  props: ['_user', '_visitor', '_is_owner'],
  data() {
    return {
      profile_owner: this._user,
      visitor: this._visitor,
      status: false,
      totalfollowing: '',
      acceptance_rate:''
    }
  },
  components: {
    FollowButton,
    AddFriend
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: 'EditProfile',
        params: {
          id: this.profile_owner.pk
        }
      })
    },
    showalert(){
      this.status = ! this.status
    },
    closealert(val){
      this.status = val
    },
  },
  created() {
    this.profile_owner.getFollowershipList()
    .then(res => {
      this.totalfollowing = res.followings.length
      User.gettags(this.$route.params.id).then(res => {
        this.acceptance_rate = res.acceptance_rate
      })
    })
  },
  mounted() {
    var colorList = ['#9370DB', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976',
    '#6173d6','#914ce5', '#42b1cc', '#ff55ac', '#0090ff']
    let myChart = echarts.init(document.getElementById('chart_example'));
    User.gettags(this.$route.params.id).then(res => {
      this.data1 = res.Bdata
      this.data2 = res.Qdata
      let option = {
        title: {
          text: "Blog type                                     Answer type",

          textStyle: {
            fontSize: 18,
            fontFamily: "Trebuchet MS",
            fontWeight: "bold",
            color: "#9999FF"
          },
          bottom: "0%"
        },

        series: [{
            name: 'Blog type',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['25%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            labelLine: {
              normal: {
                length: 22,
                length2: 22,
                lineStyle: {
                  color: '#2478EC'
                }
              }
            },
            label: {
              normal: {
                formatter: function(params) {
                  return ('{b|' + params.value + "}\n{a|" + params.name + '}')
                },
                show: true,
                padding: [-30, -30, 0, -30],
                rich: {
                  b: {
                    fontSize: 10,
                    color: '#2AD0FF',
                    textAlign: 'center'
                  },
                  a: {
                    fontSize: 10,
                    color: '#CFDCFF',
                    height: 10,
                    textAlign: 'center'
                  }
                }
              },
            },
            data: this.data1
          },
          {
            name: 'Answer type',
            type: 'pie',
            radius: ['40%', '55%'],
            center: ['75%', '50%'],
            avoidLabelOverlap: true,
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex]
                }
              }
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 20,
                lineStyle: {
                  color: '#2478EC'
                }
              }
            },
            label: {
              normal: {
                formatter: function(params) {
                  return ('{b|' + params.value + "}\n{a|" + params.name + '}')
                },
                show: true,
                padding: [-30, -30, 0, -30],
                rich: {
                  b: {
                    fontSize: 10,
                    color: '#CFDCFF',
                    textAlign: 'center'
                  },
                  a: {
                    fontSize: 10,
                    color: '#2AD0FF',
                    height: 10,
                    textAlign: 'center'
                  }
                }
              },
            },
            data: this.data2
          }
        ]
      };
      myChart.setOption(option);
      window.addEventListener('resize', function() {
        myChart.resize()
      });
    });

  },
  computed: {
    profile_owner_id() {
      return this.$route.params.id
    }
  },
  watch: {
    _user(val) {
      this.profile_owner = val
    },
    _visitor(val) {
      this.visitor = val
    }
  }
}
</script>

<style scoped>
#username{
  font-weight:900;
  font-size: 550%;
  color:#8188d5;
  font-family:Cursive;
}
#total{
  font-weight:400;
  font-size: 250%;
  color:#8188d5;
  font-family:Cursive;
}
#info{
  font-weight:400;
  font-size: 150%;
  font-family:Cursive;
}
#chart_example{
  width: 400px;
  height: 190px;
}
.ProfileInformation {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex;
}
div {
  background: #f9f6ff;
  padding: 10px;
  margin: 10px;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}
.box1 {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  flex-grow: unset;
}
.box1 div p {
  display: inline;
  padding-left: 30px;
}
.box1 div:nth-child(2) {
  bottom: 100px;
}
.box2 {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.box2 div p {
  display: inline;
  padding-right: 30px;
}
.box2 div img {
  display: inline-block;
  width: 60px;
  height: 60px;
  top: 28px;
  right: 5px;
  bottom: 20px;
}
.box3 img {
  border: none;
  border-radius: 0;
  width: 100%;
  height: 100%;
}
</style>
