<template>
  <div class="container" id="series">
    <div class="search">
      <h1>SEARCH</h1>
      <div class="search-box">
        <input class="search-text" type="text" placeholder="Search what you want">
        <a class="search-btn" href=""><i class="fas fa-search"></i></a>
      </div>
      <h1>WHAT'S IN YOUR MIND</h1>
      <button>START A SERIES</button>
    </div>
    <div class="series">
      <div><h1>TOP TRENDING SERIES</h1></div>
      <div class="picture">
        <div>
          <div class="shadow"><p>View</p></div>
          <v-icon iconClass="undraw_ideation_2a64" class="icon"></v-icon></div>
        <div>
          <div class="shadow"><p>View</p></div>
          <v-icon iconClass="undraw_good_team_m7uu" class="icon"></v-icon></div>
        <div>
          <div class="shadow"><p>View</p></div>
          <v-icon iconClass="undraw_experience_design_eq3j" class="icon"></v-icon></div>
        <div>
          <div class="shadow"><p>View</p></div>
          <v-icon iconClass="undraw_master_plan_95wa" class="icon"></v-icon></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Series"
  }
</script>

<style scoped>
  .container {
    display: flex;
    background: #FFF4E8;
    padding: 0 50px 100px 50px;;
  }

  .container h1 {
    color: #585858;
    font-size: 2em;
  }

  .search {
    flex: 1;
    padding: 100px 50px 0 0;
  }

  .series {
    flex: 2;
  }

  .series > div:nth-child(1) {
    text-align: center;
  }

  .picture {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 20px;
    justify-items: center;
    align-items: center;
  }

  .picture > div {
    width: 100%;
    height: 100%;
    position: relative;
    background: white;
    transition: 0.4s;
    text-align: center;
  }

  .icon {
    width: 100%;
    height: 100%;
  }

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    width: 100%;
    height: 100%;
    filter: opacity(0);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .shadow p {
    color: white;
    font-size: 20px;
  }

  .picture > div:hover {
    width: 80%;
    height: 80%;
  }

  .shadow:hover {
    filter: opacity(40%);
  }


  button {
    background: #D6C4BE;
    border-radius: 12px;
    font-size: 1em;
    font-weight: bold;
    padding: 20px 20px;
    border: none;
    outline: none;
  }

  .search-box {
    background: #2f3640;
    height: 40px;
    width: 40px;
    border-radius: 40px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-btn {
    color: #C56B47;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2f3640;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-text {
    padding: 0;
    background: none;
    outline: none;
    border: none;
    color: white;
    transition: 0.4s;
    font-size: 16px;
    width: 0;
    border-bottom: #C56B47 2px solid;
    line-height: 40px;
  }

  .search-box:hover {
    width: 240px;
  }

  .search-box:hover > .search-text {
    width: 170px;
    padding: 0 6px;
  }

  .search-box:hover > .search-btn {
    background: white;
  }

</style>
