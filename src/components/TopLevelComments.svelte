<script lang="ts">
    import { getClient } from 'svelte-apollo';

    import { ConnectionList } from "../helpers/ConnectionList";
    import CommentsLevel from './CommentsLevel/CommentsLevel.svelte';
    import { GetComments } from '../requests.gql';

    export let page_id: string;

    const client = getClient();
    let loading = true;
    let error;
    let list: ConnectionList<CommentInfo>;

    client
        .query<{ comments: GQLConnection<CommentInfo> }>({
            query: GetComments,
            variables: {
                page_id
            }
        })
        .then(({ data }) => list = new ConnectionList(data.comments))
        .catch((err) => error = err)
        .finally(() => loading = false);

    async function loadMoreReplies() {
        const { data } = await client.query<{ comments: GQLConnection<CommentInfo> }>({
            query: GetComments,
            variables: {
                page_id,
                after: list.endCursor
            }
        });
        list = list.merge(data.comments);
    }
</script>

{#if loading}
    Loading...
{:else if error}
    {error.toString()}
{:else}
    <CommentsLevel
        list={list}
        on:loadMore={loadMoreReplies}
        />
{/if}
