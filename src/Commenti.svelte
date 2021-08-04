<script lang="ts">
    import { setContext } from 'svelte';

    import './services/i18n';
    import createClient from './services/client';
    import authState from './services/auth';

    import { setClient } from "./services/client/context";
    import { isLoading } from 'svelte-i18n'

    import UserAuthBlock from "./components/UserAuth/UserAuthBlock.svelte";
    import TopLevelComments from "./components/TopLevelComments.svelte";

    export let server_uri: string;
    export let page_id: string;

    const client = createClient(server_uri)
    setClient(client);

    setContext("commenti-params", {
        page_id
    });

    authState.checkCurrentUser(client);
</script>

<main class="commenti-section">
    {#if $isLoading}
        Loading...
    {:else}
        <UserAuthBlock />
        <TopLevelComments />
    {/if}
</main>
