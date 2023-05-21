<template lang="">
    <div class="post">
        <div>
            <div>
                {{ post.id }}
            </div>
            <div><strong>title: </strong>{{ post.title }}</div>
            <div><strong>description:</strong>{{ post.body }}</div>     
        </div>
        <div class="post_btns">
            <MyButton @click="$emit('remove', post)">Remove</MyButton>
            <MyButton @click="$router.push('/posts/' + post.id)">Open</MyButton>
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

.post_btns {
    display: flex;
}
</style>