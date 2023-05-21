import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            
            return [...state.posts].sort((a, b) => {

                return typeof (a[state.selectedSort]) === 'string' ? a[state.selectedSort].localeCompare(b[state.selectedSort]) : a[state.selectedSort] > b[state.selectedSort]
            })
        },
        sortedAndSearchedPosts(state, getters) {
            console.log(getters.sortedPosts)
            return getters.sortedPosts.filter(post =>
                post.title?.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool
        },
        setPage(state, page) {
            state.page = page
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
                commit('setLoading', false);


            } catch (e) {
               console.log(e)
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));

                commit('setPosts', [...state.posts, ...response.data]);

            } catch (e) {
                console.log(e)
            }
        }
    },
    namespaced: true
}