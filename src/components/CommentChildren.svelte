<script lang="ts">
    import { getClient } from "svelte-apollo";
    import { ConnectionList } from "../helpers/ConnectionList";
    import { LoadMoreChildComments } from '../requests.gql';
    import CommentList from "./CommentList.svelte";
    import LoadMoreButton from "./LoadMoreButton.svelte";

    export let comment: CommentInfo;

    let list: ConnectionList<CommentInfo>;
    list = new ConnectionList(comment.children);

    const client = getClient();
    async function loadMoreReplies() {
        const { data } = await client.query<{ comment: CommentInfo }>({
            query: LoadMoreChildComments,
            variables: {
                commentID: comment.id,
                after: list.endCursor
            }
        });
        list = list.merge(data.comment.children);
    }
</script>

{#if list.length > 0 || list.hasMore }
    <div class="commenti-comment-children">
        <CommentList list={list} />
        <LoadMoreButton list={list} on:loadMore={loadMoreReplies} />
    </div>
{/if}
