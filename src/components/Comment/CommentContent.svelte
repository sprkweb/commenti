<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { CommentStatus, valueIfExists } from './status';

    export let comment: CommentInfo;
    export let status: CommentStatus;
</script>

<div class="commenti-comment-content { valueIfExists(status, comment.text) ? '' : 'commenti-comment-content-deleted'}">
    { valueIfExists(status, comment.text) || $_('replacementForDeleted.commentText') }
</div>
