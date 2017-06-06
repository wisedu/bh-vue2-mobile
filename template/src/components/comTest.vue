<template>
    <div>
        <div>这里是组件</div>
        <div class="comWithBorder">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in imgs">
                    <div class="center">
                        <img :src="item">
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>
<style>
.comWithBorder{
    height: 200px;
    background-color: #eee;
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
<script>
    import { Swipe, SwipeItem } from 'bh-mint-ui2';

    export default {
        data () {
            return {
                imgs:[
                    "./static/assets/wisedu_logo.png",
                    "./static/assets/logo.png",
                    "./static/assets/es6.png"
                ]
            }
        },
        components:{
            Swipe, SwipeItem
        }
    }
</script>