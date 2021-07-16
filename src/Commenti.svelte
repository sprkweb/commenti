<script lang="ts">
    import { ApolloClient, InMemoryCache } from "@apollo/client";
    import { setClient } from "svelte-apollo";

    import './i18n.ts';

    import TopLevelComments from "./components/TopLevelComments.svelte";

    export let server_uri: string;
    export let page_id: string;

    const client = new ApolloClient({
        uri: server_uri,
        cache: new InMemoryCache()
    });
    setClient(client);
</script>

<main class="commenti-section">
    <TopLevelComments page_id={page_id} />
</main>
