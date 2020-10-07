<template>
  <div class="ProfileInformation">
    <AddFriend
      v-if="status && !_is_owner"
      :status="this.status"
      @closealert="closealert"
      :_user=_user
      :_visitor=_visitor />
    <div class="profile">
      <div class="head">
        <img id="image" :src="profile_owner.avatar" />
        <span id='username'>{{profile_owner.username}}</span>
      </div>
      <el-button v-if="profile_owner && _is_owner" @click="editProfile" icon="el-icon-edit" circle></el-button>
      <div class="info">
        <div>
          <div class="data">
            <span class="data-name">major: </span>
            <span class="data-value">{{profile_owner.major}}</span>
          </div>
          <div class="data">
            <span class="data-name">Balance: </span>
            <span class="data-value">{{profile_owner.blance}}</span>
          </div>
          <div class="data">
            <span class="data-name">grade: </span>
            <span class="data-value">{{profile_owner.grade}}</span>
          </div>
        </div>
        <p class="data">bio: {{profile_owner.bio}}</p>
        <div class="buttons">
          <FollowButton
          :_content_owner=_user
          :_visitor=_visitor />
          <button
            @click="showalert"
            id="addfriend-btn"
            v-show="!_is_owner">Add Friend
          </button>
        </div>
      </div>
    </div>
    <div class="stats">
      <div class="totals">
        <p class='total'><i class="el-icon-view"></i>Total views:{{profile_owner.totalviews}}</p>
        <p class='total'><i class="el-icon-star-on"></i>Follows: {{totalfollowing}}</p>
        <br>
        <p class='total'><i class="el-icon-thumb"></i>Total likes:{{profile_owner.totallikes}}</p>
        <p class='total'><i class="el-icon-finished"></i>Accept rate: {{acceptance_rate}}</p>
      </div>
      <div>
        <div id="chart_example">
        </div>
      </div>
    </div>
    <div class="activity">
      <p>Your activity in this year:</p>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import User from '@/assets/utils/models/User'
import Activity from '@/assets/utils/models/Activity'
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
      acceptance_rate: '',
      activity: '',
      table: ''
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
    User.get(this.$route.params.id).then(user => {
      this.profile_owner = user
      Promise.all([
        this.profile_owner.getFollowershipList(),
        User.gettags(this.$route.params.id),
        Activity.getActivity(this.profile_owner.pk)
      ]).then(values => {
        this.totalfollowing = values[0].followings.length
        this.acceptance_rate = values[1].acceptance_rate
        this.table = values[2]
        this.activity = new Activity("canvas", this.table)
        this.activity.draw()
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
            radius: ['40%', '75%'],
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
            radius: ['40%', '75%'],
            center: ['70%', '50%'],
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
      })
    })
    window.addEventListener('resize', () => {
      for (let square of this.table) {
        square.resize()
      }
      this.activity.resize()
    })
  },
  computed: {
    profile_owner_id() {
      return this.$route.params.idt
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
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");



#chart_example{
  width: 30vw;
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
}
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}
.profile {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-grow: unset;
}

.head {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 5%;
}

.info{
  font-weight: 400;
  font-size: 250%;
  color: #8188d5;
  font-family: Cursive;
  padding: 0;
  justify-items: center;
}
.info div {
  display: flex;
}
.data {
  width: 25%;
  align-items: center;
  margin: 0 5%;
}
.data-name {
  font-size: 100%;
  padding: 0%;
}

.data-value {
  font-size: 70%;
  margin: 2%;
}

.buttons {
  height: 6vh;
}

.buttons button {
  margin: 1vh 3vw;
}


#username{
  font-weight:900;
  font-size: 300%;
  color:#8188d5;
  font-family:STFQLBYTJW;
}
.profile div p {
  display: inline;
  padding-left: 30px;
}
.profile div:nth-child(2) {
  bottom: 100px;
}
.stats {
  display: flex;
  flex-direction: row;
}

.total{
  font-weight:500;
  font-size: 250%;
  color: #8188d5;
  font-family:Cursive;
  margin: 0%;
}

.totals {
  margin-left: 5vw;
}

.stats div p {
  display: inline;
  padding-right: 30px;
}
.stats div img {
  display: inline-block;
  width: 60px;
  height: 60px;
  top: 28px;
  right: 5px;
  bottom: 20px;
}

.activity {
  margin-bottom: 5%;
}

.activity p {
  font-weight:900;
  font-size: 200%;
  color:#8188d5;
  margin: 0%;
  margin-left: 7%;
  margin-bottom: 1%;
}

#canvas {
  border: none;
  border-radius: 0;
  width: 87%;
  height: 90%;
  margin-left: 7%;
}
</style>
