<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { getClient } from "../../services/client/context";
    import { valueIfExists, CommentStatus } from './status';

    import CommentHeader from './CommentHeader.svelte';
    import CommentControls from './CommentControls.svelte';
    import EditForm from './EditForm.svelte';
    import CommentChildren from "../CommentChildren.svelte";
    import { DeleteCommentDocument } from '../../requests';

    export let comment: CommentInfo;

    const client = getClient();

    let status: CommentStatus;
    $: status = comment.deleted
        ? CommentStatus.Deleted
        : CommentStatus.Normal;

    function deleteComment() {
        client
            .mutate({
                mutation: DeleteCommentDocument,
                variables: {
                    id: comment.id
                }
            })
            .then(({ data }) => {
                if (data.deleteComment.success)
                    status = CommentStatus.Deleted;
            });
    }

    function enableEditMode() {
        if (status != CommentStatus.Normal) return;
        status = CommentStatus.EditMode;
    }
    function disableEditMode() {
        status = CommentStatus.Normal;
    }

    let replyFormShown = false;
    function toggleReplyForm() {
        replyFormShown = !replyFormShown;
    }
</script>

<div class="commenti-comment">
    <div class="commenti-comment-main">
        <CommentHeader {comment} {status} />

        {#if status != CommentStatus.EditMode}
            <div class="commenti-comment-content { valueIfExists(status, comment.text) ? '' : 'commenti-comment-content-deleted'}">
                { valueIfExists(status, comment.text) || $_('replacementForDeleted.commentText') }
            </div>
        {:else}
            <EditForm
                initialText={comment.text}
                on:disableEditMode={disableEditMode} />
        {/if}
    </div>

    {#if status == CommentStatus.Normal}
        <CommentControls
            {comment} {status}
            on:reply={toggleReplyForm}
            on:edit={enableEditMode}
            on:delete={deleteComment} />
    {/if}

    {#if comment.children}
        <CommentChildren comment={comment} {replyFormShown} />
    {/if}
</div>
