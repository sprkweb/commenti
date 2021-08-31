<script lang="ts">
    import { getContext } from 'svelte';
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    import { CommentStatus, valueIfExists } from './status';
    import authState, { AuthStatus } from '../../services/auth';
    import { stateMatch } from '../../helpers/bitwiseEnum';

    export let comment: CommentInfo;
    export let status: CommentStatus;

	const dispatch = createEventDispatcher();

    const { allowEdit, allowDelete, allowAnonymous } = getContext("commenti-settings");
</script>


<div class="commenti-comment-controls">
    {#if stateMatch($authState.status, AuthStatus.LoggedIn) || $allowAnonymous }
        <button
            on:click={() => dispatch('reply')}
            class="commenti-inline-button">
            {$_("commentControls.reply")}
        </button>
    {/if}
    {#if stateMatch($authState.status, AuthStatus.LoggedIn) }
        {#if $authState.user.username == valueIfExists(status, comment.author?.username)}
            {#if $allowDelete}
                <button
                    on:click={() => dispatch('delete')}
                    class="commenti-inline-button">
                    {$_("commentControls.delete")}
                </button>
            {/if}

            {#if $allowEdit}
                <button
                    on:click={() => dispatch('edit')}
                    class="commenti-inline-button">
                    {$_("commentControls.edit")}
                </button>
            {/if}
        {/if}
    {/if}
</div>
