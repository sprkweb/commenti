<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    import CommentTextField from '../../partials/CommentTextField.svelte';

	const dispatch = createEventDispatcher();

    export let initialText: string;

    let text: string = initialText;

    function editComment() {
        // TODO
        dispatch('disableEditMode');
    }

    function cancelEditComment() {
        dispatch('disableEditMode');
    }
</script>

<form class="commenti-edit-form">
    <CommentTextField bind:value={text} />

    <button
        type="button"
        on:click={editComment}>
        {$_("commentEditForm.submit")}
    </button>

    <button
        type="button"
        on:click={cancelEditComment}>
        {$_("commentEditForm.cancel")}
    </button>
</form>
