<script lang="ts">
    import { _ } from 'svelte-i18n';

    import authState, { AuthStatus } from '../services/auth';
    import { stateMatch } from '../helpers/bitwiseEnum';

    import FormattedDate from "../partials/FormattedDate.svelte";
    import CommentChildren from "./CommentChildren.svelte";

    export let comment: CommentInfo;

    let date: Date;
    $: date = new Date(comment.dateCreated);

    let replyFormShown = false;
    function toggleReplyForm() {
        replyFormShown = !replyFormShown;
    }
</script>

<div class="commenti-comment">
    <div class="commenti-comment-main">
        <div class="commenti-comment-header">
            <span class="commenti-author">
                { comment.author?.username || $_('replacementForDeleted.username') }
            </span>
            <span class="commenti-date">
                <FormattedDate date={date} />
            </span>
        </div>
        <div class="commenti-comment-content { comment.text ? '' : 'commenti-comment-content-deleted'}">
            { comment.text || $_('replacementForDeleted.commentText') }
        </div>
    </div>

    <div class="commenti-comment-controls">
        {#if stateMatch($authState.status, AuthStatus.LoggedIn) }
            <button
                on:click={toggleReplyForm}
                class="commenti-inline-button">
                {$_("reply")}
            </button>
        {/if}
    </div>

    {#if comment.children}
        <CommentChildren comment={comment} {replyFormShown} />
    {/if}
</div>
