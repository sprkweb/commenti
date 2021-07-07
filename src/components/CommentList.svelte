<script lang="ts">
    import Comment from './Comment.svelte';

    export let list: ArrayLike<CommentInfo>;
</script>

{#each list as comment}
    <Comment comment={comment} />
{/each}
