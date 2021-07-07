<script lang="ts">
    import FormattedDate from "./FormattedDate.svelte";
    import CommentChildren from "./CommentChildren.svelte";

    export let comment: CommentInfo;

    let date: Date;
    $: date = new Date(comment.dateCreated);
</script>

<div class="commenti-comment">
    <div class="commenti-comment-main">
        <div class="commenti-comment-header">
            <span class="commenti-author">
                { comment.author.username }
            </span>
            <span class="commenti-date">
                <FormattedDate date={date} />
            </span>
        </div>
        <div class="commenti-comment-content">
            { comment.text }
        </div>
    </div>

    <CommentChildren comment={comment} />
</div>
