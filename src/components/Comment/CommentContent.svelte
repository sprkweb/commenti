<script lang="ts">
    import { getContext } from 'svelte';
    import { _ } from 'svelte-i18n';
    import { CommentStatus, valueIfExists } from './status';

    export let comment: CommentInfo;
    export let status: CommentStatus;

    const { markdown_renderer } = getContext("commenti-params");
</script>

{#if valueIfExists(status, comment.text)}
    <div class="commenti-comment-content">
        {#if markdown_renderer}
            { @html markdown_renderer.render(comment.text) }
        {:else}
            { comment.text }
        {/if}
    </div>
{:else}
    <div class="commenti-comment-content commenti-comment-content-deleted">
        { $_('replacementForDeleted.commentText') }
    </div>
{/if}
