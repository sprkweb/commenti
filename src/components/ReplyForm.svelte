<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    let text: string;
    let error;

	const dispatch = createEventDispatcher();
    function handleSubmit(e) {
        try {
            dispatch('submit', { text });
        } catch (err) {
            error = err;
        }
    }
</script>

<form class="commenti-reply-form">
    <textarea
        bind:value={text}
        rows="5"
        class="commenti-reply-form-text"
        ></textarea>

    <button
        type="button"
        on:click={handleSubmit}>
        {$_("commentForm.button")}
    </button>

    {#if error}
        {error.toString()}
    {/if}
</form>
