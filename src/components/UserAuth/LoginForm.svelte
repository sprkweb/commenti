<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    import authState, { AuthStatus } from '../../services/auth';
    import { stateMatch } from '../../helpers/bitwiseEnum';
    import FormField from "../../partials/FormField.svelte";

    let username: string;
    let password: string;

	const dispatch = createEventDispatcher();
    function handleSubmit(e) {
        dispatch('submit', { username, password });
    }
</script>

<div class="commenti-form-fields-group">
    <FormField fieldName="username" bind:value={username} />
    <FormField fieldName="password" type="password" bind:value={password} />
</div>
{#if stateMatch($authState.status, AuthStatus.AuthError)}
    <p class="commenti-error-message">
        {$_('userAuth.error')}
    </p>
{/if}
<button
    on:click={handleSubmit}
    disabled={stateMatch($authState.status, AuthStatus.LoadingAuthResults)}>
    {$_('userAuth.login')}
</button>
