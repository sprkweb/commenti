<script lang="ts">
    import type { ConnectionList } from "../helpers/ConnectionList";

    import CommentList from "./CommentList.svelte";
    import LoadMoreButton from "./LoadMoreButton.svelte";

    export let list: ConnectionList<CommentInfo>;
</script>

<CommentList list={list} />
<LoadMoreButton list={list} on:loadMore />
