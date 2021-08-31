<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    import authState, { AuthStatus } from '../../services/auth';
    import { stateMatch } from '../../helpers/bitwiseEnum';
    import FormField from "../../partials/FormField.svelte";
    import FormattedError from '../../partials/FormattedError.svelte';

    let username: string;
    let password: string;

	const dispatch = createEventDispatcher();
    function handleSubmit(e) {
        dispatch('submit', { username, password });
    }
</script>

<div class="commenti-form-fields-group">
    <FormField fieldName="username" bind:value={username} required={true} />
    <FormField fieldName="password" type="password" bind:value={password} required={true} />
</div>
{#if stateMatch($authState.status, AuthStatus.AuthError)}
    <FormattedError error={true} message={$_('userAuth.error')} />
{/if}
<button
    class="commenti-button"
    on:click={handleSubmit}
    disabled={stateMatch($authState.status, AuthStatus.LoadingAuthResults)}>
    {$_('userAuth.login')}
</button>
