<template>
  <div class="home">
    <Navbar/>
    <Landing/>
    <Discription/>
    <Philosophy/>
    <About/>
    <Series/>
    <Discussion/>
    <Contact/>
    <Footer/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Utils/Navbar";
import Landing from "@/components/HomePage/Landing";

import Discription from "@/components/HomePage/Discription";
import Philosophy from "@/components/HomePage/Philosophy";
import About from "@/components/HomePage/About";
import Series from "@/components/HomePage/Series";
import Discussion from "@/components/HomePage/Discussion";
import Contact from "@/components/HomePage/Contact";
import Footer from "@/components/Utils/Footer";
export default {
  name: 'Home',
  components: {
    Navbar,
    Landing,
    Discription,
    Philosophy,
    About,
    Series,
    Discussion,
    Contact,
    Footer,
  }
}
</script>

<style scoped>
*{
  scroll-behavior: smooth;
	text-decoration: none;
}
.home{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>
