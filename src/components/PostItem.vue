<template lang="">
    <div class="post">
        <div>
            <div><strong>title: </strong>{{ post.title }}</div>
            <div><strong>description:</strong>{{ post.body }}</div>     
        </div>
        <div class="post__btns">
            <MyButton @click="$emit('remove', post)">Remove</MyButton>
        </div>
        
    </div>
</template>
<script>

export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped>
 .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>