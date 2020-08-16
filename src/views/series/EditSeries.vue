<template>
  <div class="EditSeries">
    <Navbar/>
    <h4>Name:</h4>
    <input type="text" v-model="name">
    <h4>Description:</h4>
    <mavon-editor v-model="description"/>
    <h2>Choose the blogs and series to be include in this series</h2>
    <h4>All your series:</h4>
    <ul>
      <li v-for="item in choice_list.series" :key="item.series.pk">
        <input type="checkbox" v-model="item.choice">
        <router-link :to="{name: 'ShowOneSeries', params: {id: item.series.pk}}" >
          {{ item.series.name }}
        </router-link>
      </li>
    </ul>
    <h4>All your Blogs:</h4>
    <ul>
      <li v-for="item in choice_list.blog" :key="item.blog.pk">
        <input type="checkbox" v-model="item.choice">
        <router-link :to="{name: 'ShowBlog', params: {id: item.blog.pk}}" >
          {{ item.blog.title }}
        </router-link>
      </li>
    </ul>
    <button @click="save">submit</button>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { login_required } from '@/assets/utils/auth'
import Series from '@/assets/utils/models/Series'

export default {
  name: "EditSeries",
  components: {
    Navbar,
  },
  props: {
    id: {
      type: [String, Number],
      required: false
    }
  },
  data() {
    return {
      series_id: this.id,
      series: '',
      choice_list: '',
      name: '',
      description: '',
      selected_items: ''
    }
  },
  methods: {
    // build the list data structure
    make_choice_list(related_content) {
      let list = {}
      // related_content contains two types of lists: blog and series
      for (let type in related_content) {
        list[type] = []
        // item is related blog or series
        for (let item of related_content[type]) {
          let list_el = {choice: false}
          list_el[type] = item
          list[type].push(list_el)
        }
      }
      this.choice_list = list
    },

    // get the selected items' ids
    get_selected_items() {
      let selected_items = {}
      // related_content contains two types of lists: blog and series
      for (let type in this.choice_list) {
        selected_items[type] = []
        // item example: {blog: {xxx}, choice: false}
        for (let item of this.choice_list[type]) {
          if (item.choice == true) {
            selected_items[type].push(item[type].pk)
          }
        }
      }
      return selected_items
    },

    // asign this.series the latest series object
    getSeries(user) {
      if (this.series == '') {
        this.series =  new Series({
          name: this.name,
          description: this.description,
          owner: user.pk,
        })
      } else {
        this.series.name = this.name
        this.series.name = this.description
      }
    },

    newSeries() {
      this.series.save().then(() => {
        Series.update_selected_items({
          series: this.series.pk,
          selected_items: this.get_selected_items()
        }).then(() => {
          // only after the backend respond can the route change
          this.$router.push({name: "ShowSeries"})
        })
      })
    },

    editSeries() {
      this.series.update().then(() => {
        Series.update_selected_items({
          series: this.series.pk,
          selected_items: this.get_selected_items()
        }).then(() => {
          // only after the backend respond can the route change
          this.$router.push({name: "ShowOneSeries", params: {id: this.series.pk}})
        })
      })
    },

    save() {
      login_required(this, user => {
        // gather the series' data
        this.getSeries(user)
        this.get_selected_items()

        if (this.$route.name == "NewSeries") {
          this.newSeries(user)
        } else {
          this.editSeries()
        }
      })
    },

  },
  created() {
    login_required(this, () => {
      Series.get_related_content().then(related_content => {
        this.make_choice_list(related_content)

        // if the page is edit old series, preload data
        if (this.$route.name == "EditSeries") {
          Series.get(this.series_id)
          .then(series => {

            // preload data
            this.series = series
            this.name = series.name
            this.description = series.description

            // check the blog and series of the series
            for (let type in this.choice_list) {
              // item example: {blog: {xxx}, choice: false}
              for (let item of this.choice_list[type]) {
                switch(type) {
                  case "blog":
                    item.choice = item.blog.series == this.series.pk ?
                     true : false
                    break
                  case "series":
                    item.choice = item.series.sub_series_of == this.series.pk ?
                     true : false
                    break
                }
              }
            }
          })
        }
      })
    })
  }
}
</script>

<style>

.EditSeries {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
}

ul {
  list-style: none;
}

</style>
