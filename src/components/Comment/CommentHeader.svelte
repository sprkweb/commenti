<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { CommentStatus, valueIfExists } from './status';

    import FormattedDate from "../../partials/FormattedDate.svelte";

    export let comment: CommentInfo;
    export let status: CommentStatus;

    let dateCreated: Date;
    $: dateCreated = new Date(comment.dateCreated);

    let dateEdited: Date;
    $: dateEdited = new Date(comment.dateEdited);

    let dateDiff;
    $: dateDiff = dateEdited.valueOf() - dateCreated.valueOf(); // milliseconds
</script>

<div class="commenti-comment-header">
    <span class="commenti-author">
        { valueIfExists(status, comment.author?.username) || $_('replacementForDeleted.username') }
    </span>
    <span class="commenti-date">
        <FormattedDate date={dateCreated} /><!--
    -->{#if dateDiff > 1000}
            {$_('commentWasEdited')}
            <FormattedDate date={dateEdited} />
        {/if}
    </span>
</div>
