<script lang="ts">
    import { _ } from 'svelte-i18n';
	import { createEventDispatcher, getContext } from 'svelte';

    import { stateMatch } from '../helpers/bitwiseEnum';
    import authState, { AuthStatus } from '../services/auth';
    import { getClient } from "../services/client/context";
    import Comment from './Comment/Comment.svelte';

    import FormattedError from '../partials/FormattedError.svelte';
    import CommentTextField from '../partials/CommentTextField.svelte';
    import { WriteCommentDocument } from '../requests';

    export let parent_id: string = undefined;

    const client = getClient();
    const { page_id } = getContext("commenti-params");
    const { allowAnonymous } = getContext("commenti-settings");

    let text: string;
    let error;

	const dispatch = createEventDispatcher();
    function handleSubmit(e) {
        try {
            dispatch('submit', { text });
            writeComment(text);
        } catch (err) {
            error = err;
        }
    }

    let newComment: CommentInfo;
    async function writeComment(text) {
        const { data } = await client.mutate({
            mutation: WriteCommentDocument,
            variables: {
                page_id,
                text,
                parent: parent_id
            }
        });
        newComment = data.writeComment.comment;
    }
</script>

{#if stateMatch($authState.status, AuthStatus.LoggedIn) || $allowAnonymous }
    <form class="commenti-reply-form">
        <CommentTextField bind:value={text} />

        <button
            type="button"
            class="commenti-button"
            on:click={handleSubmit}>
            {$_("commentForm.button")}
        </button>

        <FormattedError {error} />
    </form>

    {#if newComment}
        <Comment comment={newComment} />
    {/if}
{/if}
