<template>
    <div class="page_border">
        <!-- 静态图片的写法请参照以下方式 -->
        <img class="right_icon" :src="'./static/assets/title.jpg'">
        <h1 class="index">
            首页
        </h1>
        <com-test></com-test>
    </div>
</template>
<style>
.index{
    background:#ffffff;
}
.right_icon{
    float: right;
    height: 50px;
    padding-right: 8px;
}
.page_border{
    padding: 4px;
}
</style>
<script type="text/javascript">
    import comTest from '../../components/comTest.vue'
    export default {
        data(){
            return {
                page: 'about'
            }
        },
        components: {
            comTest
        },
        ready(){
            global.SDK.setTitleText("首页")
        }
    }
</script>
