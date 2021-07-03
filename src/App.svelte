<script lang="ts">
    import {
            ApolloClient,
            InMemoryCache
        } from "@apollo/client";
    import { setClient, query } from "svelte-apollo";

    import Comment from './components/Comment.svelte';
    import { GetComments } from './requests.graphql';

    export let uri: string;

    const client = new ApolloClient({
        uri,
        cache: new InMemoryCache()
    });
    setClient(client);

    const comments = query<{ allComments: CommentInfo[] }>(GetComments);
</script>

<main class="commenti-section">
    {#if $comments.loading}
        Loading...
    {:else if $comments.error}
        {$comments.error.toString()}
    {:else}
        {#each $comments.data.allComments as comment}
	        <Comment comment={comment} />
        {/each}
    {/if}
</main>
