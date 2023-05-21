<template>
    <div>
        <h1>Post list</h1>
        <MyInput v-model="searchQuery" placeholder="Search..." />
        <div class="appButtons">
            <MyButton @click="showDialog">
                Create post</MyButton>
            <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
        </div>

        <MyDialog v-model:show="dialogVisible">
            <post-form @create="createPost" />
        </MyDialog>

        <post-list @remove="removePost" :posts="sortedAndSearchedPosts" v-if="!isPostsLoading" />
        <div v-else> Loading...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page_wrapper">
            <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
                'current-page': pageNumber === page
            }
            "
            @click="changePage(pageNumber)">{{ pageNumber }}</div>
        </div> -->

    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import axios from "axios"
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput.vue";

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
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: 'title', name: 'Title' },
                { value: 'body', name: 'Body' },
                { value: 'id', name: 'Id' },
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
        // changePage(pageNumber) {
        //     this.page = pageNumber;

        //     this.fetchPosts();
        // },
        async fetchPosts() {
            try {
                console.log('fetch')
                this.isPostsLoading = true;

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);

                this.posts = response.data;
                this.isPostsLoading = false;


            } catch (e) {
                alert('Error')
            }
        },
        async loadMorePosts() {
            try {
                console.log('load')
                this.page += 1;

                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);

                this.posts = [...this.posts, ...response.data];

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
            console.log(this.posts)
            return [...this.posts].sort((a, b) => {

                let value = typeof (a[this.selectedSort]) === 'string' ? a[this.selectedSort].localeCompare(b[this.selectedSort]) : a[this.selectedSort] > b[this.selectedSort]

                return value;
            })
        },
        sortedAndSearchedPosts() {

            return this.sortedPosts.filter(post =>
                post.title?.toLowerCase().includes(this.searchQuery.toLowerCase())
            )
        }
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