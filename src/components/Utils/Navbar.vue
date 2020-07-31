<template>
  <nav>
    <div>
      <router-link to="/">FreeTechHub</router-link>
      <ul>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#series">Blog Series</a>
        </li>
        <li>
          <a href="#discussion">Questions</a>
        </li>
        <li>
          <a href>Login</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    responsiveNav() {
      const divs = document.querySelectorAll("div")
      const navlinks = document.querySelectorAll("nav div ul li a")
      console.log(navlinks)
      divs.forEach((section) => {
        section.addEventListener("mouseenter", function () {
          const id = this.getAttribute("id");
          const navActive = document.querySelector(`a[href='#${id}']`)
          navlinks[0].classList.remove("active")
          navActive.classList.add("active")
        })
      })
    }
  },
  mounted(){
    this.responsiveNav()
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: Tahoma, Arial, "Hiragino Sans GB", simsun, sans-serif;
  font-size: 20px;
  scroll-behavior: smooth;
  box-sizing: border-box;
}

nav {
  background: #c99774;
  display: block;
  justify-content: space-between;
  padding: 0 3em 1em 3em;
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 10;
}
nav ul {
  list-style-type: none;
  float: right;
}
nav ul li {
  display: inline-block;
  box-sizing: border-box;
  border-bottom: 0.25rem solid transparent;
}
nav a {
  text-decoration: none;
  display: inline-block;
  color: aliceblue;
  padding: 10px;
}
nav  div ul li a:hover {
  background: cadetblue;
}
nav div ul li a.active:hover,
a.active:visited {
  font-size: 27px;
  transition: 0.75s ease;
  border-bottom: 0.25rem solid blue;
}
.active {
  transition: 0.75s ease;
  border-bottom: 0.25rem solid blue;
}
</style>