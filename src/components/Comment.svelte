<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { getClient } from "../services/client/context";
    import authState, { AuthStatus } from '../services/auth';
    import { stateMatch } from '../helpers/bitwiseEnum';

    import FormattedDate from "../partials/FormattedDate.svelte";
    import CommentChildren from "./CommentChildren.svelte";
    import { DeleteCommentDocument } from '../requests';

    export let comment: CommentInfo;

    const client = getClient();

    let date: Date;
    $: date = new Date(comment.dateCreated);

    let replyFormShown = false;
    function toggleReplyForm() {
        replyFormShown = !replyFormShown;
    }

    let isDeleted: boolean;
    $: isDeleted = comment.deleted;
    function deleteComment() {
        client
            .mutate({
                mutation: DeleteCommentDocument,
                variables: {
                    id: comment.id
                }
            })
            .then(({ data }) => {
                isDeleted = data.deleteComment.success;
            });
    }
</script>

<div class="commenti-comment">
    <div class="commenti-comment-main">
        <div class="commenti-comment-header">
            <span class="commenti-author">
                { !isDeleted && comment.author?.username || $_('replacementForDeleted.username') }
            </span>
            <span class="commenti-date">
                <FormattedDate date={date} />
            </span>
        </div>
        <div class="commenti-comment-content { !isDeleted && comment.text ? '' : 'commenti-comment-content-deleted'}">
            { !isDeleted && comment.text || $_('replacementForDeleted.commentText') }
        </div>
    </div>

    <div class="commenti-comment-controls">
        {#if stateMatch($authState.status, AuthStatus.LoggedIn) }
            <button
                on:click={toggleReplyForm}
                class="commenti-inline-button">
                {$_("commentControls.reply")}
            </button>

            {#if $authState.user.username == comment.author?.username}
                <button
                    on:click={deleteComment}
                    class="commenti-inline-button">
                    {$_("commentControls.delete")}
                </button>
            {/if}
        {/if}
    </div>

    {#if comment.children}
        <CommentChildren comment={comment} {replyFormShown} />
    {/if}
</div>
