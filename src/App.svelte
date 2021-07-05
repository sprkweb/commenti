<script lang="ts">
    import {
            ApolloClient,
            InMemoryCache
        } from "@apollo/client";
    import { setClient, query } from "svelte-apollo";

    import Comment from './components/Comment.svelte';
    import { GetComments } from './requests.graphql';

    export let server_uri: string;
    export let page_id: string;

    const client = new ApolloClient({
        uri: server_uri,
        cache: new InMemoryCache()
    });
    setClient(client);

    const comments = query<{ comments: CommentInfo[] }>(
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
        {#each $comments.data.comments as comment}
	        <Comment comment={comment} />
        {/each}
    {/if}
</main>
