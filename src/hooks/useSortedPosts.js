import { computed, ref } from "vue"

export function useSortedPosts(posts) {
    const selectedSort = ref('');
    const sortedPosts = computed();

    return [...posts].sort((a, b) => {

        let value = typeof (a[selectedSort.value]) === 'string' ? a[selectedSort.value].localeCompare(b[selectedSort.value]) : a[selectedSort.value] > b[selectedSort.value]

        return value;
    })
}