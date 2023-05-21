<template>
    <div>

        <h1>Post list</h1>
        <!-- <MyInput v-model="searchQuery" placeholder="Search..." />
        <div class="appButtons">
            <MyButton @click="showDialog">
                Create post</MyButton>
            <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
        </div>

        <MyDialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </MyDialog> -->
       
        <post-list @remove="removePost" :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
        <div v-else> Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <div class="page_wrapper">
            <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
                'current-page': pageNumber === page
            }
            " @click="changePage(pageNumber)">{{ pageNumber }}</div>
        </div>

    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios"
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    components: {
        PostForm,
        PostList,
        MyButton,
        MyInput
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
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
        // changePage(pageNumber) {
        //     this.page = pageNumber;

        //     this.fetchPosts();
        // },


    },
    mounted() {
        // this.fetchPosts();
    },
    computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },
    // watch: {
    //     page() {
    //         this.fetchPosts();
    //     }
    // }

}
</script>

<style>
.appButtons {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
}

.page_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
    margin: 0px 3px;
}

.current-page {
    background: teal;
    color: #fff;
}

.observer {

    background: red;
}
</style>