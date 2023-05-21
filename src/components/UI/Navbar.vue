<template>
    <div class="navbar">
        <div @click="$router.push('/')">Vue 3</div>
        <div class="navbar_btns">
            <MyButton @click="$router.push('/posts')">Posts</MyButton>
            <MyButton @click="$router.push('/about')" style="margin-left: 20px;">About</MyButton>
            <MyButton @click="$router.push('/store')" style="margin-left: 20px;">Store</MyButton>
            <MyButton @click="$router.push('/api')" style="margin-left: 20px;">Api</MyButton>
        </div>
    </div>
</template>
<script>

import MyButton from '@/components/UI/MyButton.vue';
export default {
    components: {
        MyButton
    }
}
</script>
<style >
.navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0px 15px;
}
.navbar_btns {
    margin-left: auto;
}
</style>