<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher } from 'svelte';

    import { getClient } from "../../services/client/context";

    import CommentTextField from '../../partials/CommentTextField.svelte';
    import FormattedError from '../../partials/FormattedError.svelte';
    import { EditCommentDocument } from '../../requests';

    const client = getClient();
	const dispatch = createEventDispatcher();

    export let initialText: string;
    export let comment: CommentInfo;

    let text: string = initialText;
    let error;

    function editComment() {
        const editedText = text;
        client
            .mutate({
                mutation: EditCommentDocument,
                variables: {
                    id: comment.id,
                    text: editedText
                }
            })
            .then(({ data }) => {
                if (data.editComment.success) {
                    comment.text = editedText;
                    dispatch('disableEditMode');
                }
                else {
                    error = 'Error';
                }
            })
            .catch((e) => error = e);
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

    <FormattedError {error} />
</form>
