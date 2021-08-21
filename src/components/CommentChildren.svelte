<script lang="ts">
    import { getContext } from 'svelte';
    import { _ } from 'svelte-i18n';
    import { getClient } from "../services/client/context";
    import authState, { AuthStatus } from '../services/auth';
    import { stateMatch } from '../helpers/bitwiseEnum';
    import { ConnectionList } from "../helpers/ConnectionList";
    import { LoadMoreChildCommentsDocument, WriteCommentDocument } from '../requests';
    import CommentsLevel from "./CommentsLevel/CommentsLevel.svelte";
    import ReplyForm from "./ReplyForm.svelte";
    import Comment from './Comment.svelte';

    export let comment: CommentInfo;

    const client = getClient();
    const { page_id } = getContext("commenti-params");

    let list: ConnectionList<CommentInfo>;
    list = new ConnectionList(comment.children);

    async function loadMoreReplies() {
        const { data } = await client.query({
            query: LoadMoreChildCommentsDocument,
            variables: {
                commentID: comment.id,
                after: list.endCursor
            }
        });
        list = list.merge(data.comment.children);
    }

    let replyFormShown = false;
    function toggleReplyForm() {
        replyFormShown = !replyFormShown;
    }

    let newComment: CommentInfo;
    async function writeComment(event) {
        let { text } = event.detail;
        const { data } = await client.mutate({
            mutation: WriteCommentDocument,
            variables: {
                page_id,
                text,
                parent: comment.id
            }
        });
        newComment = data.writeComment.comment;
    }
</script>

<div class="commenti-comment-controls">
    {#if stateMatch($authState.status, AuthStatus.LoggedIn) }
        <button
            on:click={toggleReplyForm}
            class="commenti-inline-button">
            {$_("reply")}
        </button>
    {/if}
</div>

{#if list.length > 0 || list.hasMore || replyFormShown }
    <div class="commenti-comment-children">
        {#if replyFormShown}
            <ReplyForm on:submit={writeComment} />
            {#if newComment}
                <Comment comment={newComment} />
            {/if}
        {/if}

        <CommentsLevel
            list={list}
            on:loadMore={loadMoreReplies} />
    </div>
{/if}
