<template>
    <div class="loading"> 
        <div> 
            <img src="https://d3dg8a58k5opnp.cloudfront.net/logo.png">
        </div>
        <div id="loading-animation"> 
        </div>
        
    </div>
    
</template>

<script>
export default {
    name: "loading", 
}

</script>

<style scoped>
#loading-animation {
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: #e50931;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

h1{
    color:white
}

.loading{
    display: flex;
    flex-direction: column;
    position: fixed;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #141414;
    overflow: hidden;
    z-index: 999;
}
</style>