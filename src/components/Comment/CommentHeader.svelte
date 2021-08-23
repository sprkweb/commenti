<script lang="ts">
    import { _ } from 'svelte-i18n';

    import { CommentStatus, valueIfExists } from './status';

    import FormattedDate from "../../partials/FormattedDate.svelte";

    export let comment: CommentInfo;
    export let status: CommentStatus;

    let date: Date;
    $: date = new Date(comment.dateCreated);
</script>

<div class="commenti-comment-header">
    <span class="commenti-author">
        { valueIfExists(status, comment.author?.username) || $_('replacementForDeleted.username') }
    </span>
    <span class="commenti-date">
        <FormattedDate date={date} />
    </span>
</div>
