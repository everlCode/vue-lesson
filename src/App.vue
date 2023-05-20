<template>
    <div class="app">
        <h1>Post list</h1>
        <MyInput v-model="searchQuery" placeholder="Search..." />
        <div class="appButtons">
            <MyButton @click="showDialog">
            Create post</MyButton>
            <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
        </div>
        
        <MyDialog v-model:show="dialogVisible">
            <post-form @create="createPost"/>
        </MyDialog>
        
        <post-list @remove="removePost" :posts="sortedAndSearchedPosts" v-if="!isPostsLoading"/>
        <div v-else> Loading...</div>
        
    </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import axios from "axios"
import MyButton from "./components/UI/MyButton.vue";
import MyInput from "./components/UI/MyInput.vue";

export default {
    components: {
    PostForm,
    PostList,
    MyButton,
    MyInput
},
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            sortOptions: [
                {value: 'title', name: 'Title'},
                {value: 'body', name: 'Body'},
                {value: 'id', name: 'Id'},
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                setTimeout( async() => {
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')  
                this.posts = response.data;
                this.isPostsLoading = false;
                }, 1000)
                
            } catch (e) {
                alert('Error')
            }
        }
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((a, b) => {
                return a[this.selectedSort]?.localeCompare(b[this.selectedSort])
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    // watch: {
    //     selectedSort(newValue) {
    //         this.posts.sort((a, b) => {
    //             return a[newValue]?.localeCompare(b[newValue])
    //         })
    //     }
    // }
    
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


.app {
    padding: 20px;
}

.appButtons {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}


</style>