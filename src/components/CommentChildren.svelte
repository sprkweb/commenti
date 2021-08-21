<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { getClient } from "../services/client/context";
    import { ConnectionList } from "../helpers/ConnectionList";
    import { LoadMoreChildCommentsDocument } from '../requests';
    import CommentsLevel from "./CommentsLevel/CommentsLevel.svelte";
    import ReplyForm from "./ReplyForm.svelte";

    export let comment: CommentInfo;
    export let replyFormShown = false;

    const client = getClient();

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
</script>


{#if list.length > 0 || list.hasMore || replyFormShown }
    <div class="commenti-comment-children">
        {#if replyFormShown}
            <ReplyForm parent_id={comment.id} />
        {/if}

        <CommentsLevel
            list={list}
            on:loadMore={loadMoreReplies} />
    </div>
{/if}
