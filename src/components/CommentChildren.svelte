<script lang="ts">
    import { ConnectionList } from "../helpers/ConnectionList";

    import CommentList from "./CommentList.svelte";

    export let comment: CommentInfo;

    let list: ConnectionList<CommentInfo>;
    $: list = new ConnectionList(comment.children);
</script>

{#if list.length > 0}
    <div class="commenti-comment-children">
        <CommentList list={list} />
        <!-- TODO: view more -->
    </div>
{/if}
