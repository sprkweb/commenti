<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    export let list: { hasMore: boolean };

    let status: string = 'press-me';
    let error: Error;

	const dispatch = createEventDispatcher();
	function forward(event) {
        if (!list.hasMore || status != 'press-me') return;
        status = 'loading';

        try {
            dispatch('loadMore', event.detail);
        } catch (err) {
            status = 'error';
            error = err;
        }
	}
</script>

{#if list.hasMore}
    {#if status == 'loading'}
        {$_('loading')}
    {:else if status == 'press-me'}
        <button on:click={forward}
            class="commenti-inline-button">
            {$_('load-more-replies')}
        </button>
    {:else}
        {error.toString()}
    {/if}
{/if}
