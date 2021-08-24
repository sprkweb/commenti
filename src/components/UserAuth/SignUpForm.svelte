<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    import authState, { AuthStatus } from '../../services/auth';
    import { stateMatch } from '../../helpers/bitwiseEnum';
    import FormField from "../../partials/FormField.svelte";
    import FormattedError from '../../partials/FormattedError.svelte';

    let email: string;
    let username: string;
    let password: string;

	const dispatch = createEventDispatcher();
    function handleSubmit(e) {
        dispatch('submit', { username, email, password });
    }
</script>

<div class="commenti-form-fields-group">
    <FormField fieldName="email" type="email" bind:value={email} required={true} />
    <FormField fieldName="username" bind:value={username} required={true} />
    <FormField fieldName="password" type="password" bind:value={password} required={true} />
</div>
{#if stateMatch($authState.status, AuthStatus.RegistrationError)}
    <FormattedError error={true} message={$_('userAuth.signupError')} />
{/if}
<button
    on:click={handleSubmit}
    disabled={stateMatch($authState.status, AuthStatus.LoadingRegistrationResults)}>
    {$_('userAuth.signup')}
</button>
