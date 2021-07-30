<script lang="ts">
    import { getClient } from "../services/client/context";
    import { _ } from 'svelte-i18n';

    import { ConnectionList } from "../helpers/ConnectionList";
    import CommentsLevel from './CommentsLevel/CommentsLevel.svelte';
    import { GetCommentsDocument } from '../requests';

    export let page_id: string;

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
</script>

{#if loading}
    {$_('loading')}
{:else if error}
    {error.toString()}
{:else}
    <CommentsLevel
        list={list}
        on:loadMore={loadMoreReplies}
        />
{/if}
