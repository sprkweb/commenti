<script lang="ts">
    import { query } from 'svelte-apollo';

    import { ConnectionList } from "../helpers/ConnectionList";
    import CommentsLevel from './CommentsLevel.svelte';
    import { GetComments } from '../requests.gql';

    export let page_id: string;

    const comments = query<{ comments: GQLConnection<CommentInfo> }>(
        GetComments, {
            variables: {
                page_id
            }
        });

    async function loadMoreReplies() {
        // TODO
    }
</script>

{#if $comments.loading}
    Loading...
{:else if $comments.error}
    {$comments.error.toString()}
{:else}
    <CommentsLevel
        list={new ConnectionList($comments.data.comments)}
        on:loadMore={loadMoreReplies}
        />
{/if}
