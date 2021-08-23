<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { getClient } from "../../services/client/context";
    import authState, { AuthStatus } from '../../services/auth';
    import { stateMatch } from '../../helpers/bitwiseEnum';

    import FormattedDate from "../../partials/FormattedDate.svelte";
    import EditForm from './EditForm.svelte';
    import CommentChildren from "../CommentChildren.svelte";
    import { DeleteCommentDocument } from '../../requests';

    export let comment: CommentInfo;

    const client = getClient();

    let date: Date;
    $: date = new Date(comment.dateCreated);

    enum CommentStatus {
        Normal,
        Deleted,
        EditMode
    }
    let status: CommentStatus;
    $: status = comment.deleted
        ? CommentStatus.Deleted
        : CommentStatus.Normal;

    function valueIfExists<T>(status: CommentStatus, value: T): T | false {
        return (status != CommentStatus.Deleted) && value;
    }

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
        <div class="commenti-comment-header">
            <span class="commenti-author">
                { valueIfExists(status, comment.author?.username) || $_('replacementForDeleted.username') }
            </span>
            <span class="commenti-date">
                <FormattedDate date={date} />
            </span>
        </div>

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
        <div class="commenti-comment-controls">
            {#if stateMatch($authState.status, AuthStatus.LoggedIn) }
                <button
                    on:click={toggleReplyForm}
                    class="commenti-inline-button">
                    {$_("commentControls.reply")}
                </button>

                {#if $authState.user.username == valueIfExists(status, comment.author?.username)}
                    <button
                        on:click={deleteComment}
                        class="commenti-inline-button">
                        {$_("commentControls.delete")}
                    </button>

                    <button
                        on:click={enableEditMode}
                        class="commenti-inline-button">
                        {$_("commentControls.edit")}
                    </button>
                {/if}
            {/if}
        </div>
    {/if}

    {#if comment.children}
        <CommentChildren comment={comment} {replyFormShown} />
    {/if}
</div>
