<script lang='ts'>
    import { getClient } from "../../services/client/context";
    import { _ } from 'svelte-i18n';

    import { stateMatch } from '../../helpers/bitwiseEnum';
    import authState, { AuthStatus } from '../../services/auth';
    import LoginForm from './LoginForm.svelte';

    const client = getClient();

    function login(event) {
        const { username, password } = event.detail;
        authState.login(client, username, password);
    }

    function logout() {
        authState.logout(client);
    }
</script>

<div class="commenti-auth-block">
    {#if stateMatch($authState.status, AuthStatus.LoggedIn) }
        {$_('userAuth.greetings', { values: { name: $authState.user.username } })}
        <button on:click={logout}
            class="commenti-inline-button">
            {$_('userAuth.logout')}
        </button>
    {:else if stateMatch($authState.status, AuthStatus.LoadingUserInfo)}
        {$_('loading')}
    {:else}
        <button
            on:click={() => authState.setStatus(AuthStatus.LoggingIn)}
            disabled={stateMatch($authState.status, AuthStatus.LoggingIn)}
            class="commenti-inline-button">
            {$_('userAuth.login')}
        </button>
        {#if stateMatch($authState.status, AuthStatus.LoggingIn)}
            <LoginForm on:submit={login} />
        {/if}
    {/if}
</div>
