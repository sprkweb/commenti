<script lang="ts">
    import { ApolloClient, InMemoryCache } from "@apollo/client";
    import { setClient, query } from "svelte-apollo";

    import { ConnectionList } from "./helpers/ConnectionList";
    import CommentList from './components/CommentList.svelte';
    import { GetComments } from './requests.gql';
    import './i18n.ts';

    export let server_uri: string;
    export let page_id: string;

    const client = new ApolloClient({
        uri: server_uri,
        cache: new InMemoryCache()
    });
    setClient(client);

    const comments = query<{ comments: GQLConnection<CommentInfo> }>(
        GetComments, {
            variables: {
                page_id
            }
        });
</script>

<main class="commenti-section">
    {#if $comments.loading}
        Loading...
    {:else if $comments.error}
        {$comments.error.toString()}
    {:else}
        <CommentList list={new ConnectionList($comments.data.comments)} />
    {/if}
</main>
