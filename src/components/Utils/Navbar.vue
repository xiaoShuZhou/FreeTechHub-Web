<template>
    <nav>
        <div><a href="">FreeTechHub</a></div>
        <div>
            <ul>
                <li><a href="">About</a></li>
                <li><a href="">Blog Series</a></li>
                <li><a href="">Questions</a></li>
                <li><a href="">Login</a></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",

}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: Tahoma,Arial,"Hiragino Sans GB",simsun,sans-serif;
        font-size: 20px;
    }

    nav{
        background: #C99774;
        display: flex;
        justify-content: space-between;
        padding: 0 3em 1em 3em;
    }
    nav ul{
        list-style-type: none;
        display: flex;
    }
    nav a{
        text-decoration: none;
        display: block;
        color: aliceblue;
        padding:10px;
    }
    nav a:hover{
        background: cadetblue;
    }

</style>