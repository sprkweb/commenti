<script lang="ts">
    import { getContext } from 'svelte';
    import { getClient } from "../services/client/context";
    import authState, { AuthStatus } from '../services/auth';
    import { _ } from 'svelte-i18n';

    import { ConnectionList } from "../helpers/ConnectionList";
    import { stateMatch } from '../helpers/bitwiseEnum';
    import CommentsLevel from './CommentsLevel/CommentsLevel.svelte';
    import ReplyForm from "../partials/ReplyForm.svelte";
    import Comment from './Comment.svelte';
    import { GetCommentsDocument, WriteCommentDocument } from '../requests';

    const { page_id } = getContext("commenti-params");

    const client = getClient();
    let loading = true;
    let error;
    let list: ConnectionList<CommentInfo>;

    client
        .query({
            query: GetCommentsDocument,
            variables: {
                page_id
            }
        })
        .then(({ data }) => list = new ConnectionList<CommentInfo>(data.comments))
        .catch((err) => error = err)
        .finally(() => loading = false);

    async function loadMoreReplies() {
        const { data } = await client.query({
            query: GetCommentsDocument,
            variables: {
                page_id,
                after: list.endCursor
            }
        });
        list = list.merge(data.comments);
    }

    let newComment: CommentInfo;
    async function writeComment(event) {
        let { text } = event.detail;
        const { data } = await client.mutate({
            mutation: WriteCommentDocument,
            variables: {
                page_id,
                text
            }
        });
        newComment = data.writeComment.comment;
    }
</script>

{#if loading}
    {$_('loading')}
{:else if error}
    {error.toString()}
{:else}
    {#if stateMatch($authState.status, AuthStatus.LoggedIn) }
        <ReplyForm on:submit={writeComment} />
        {#if newComment}
            <Comment comment={newComment} />
        {/if}
    {/if}

    <CommentsLevel
        list={list}
        on:loadMore={loadMoreReplies}
        />
{/if}
