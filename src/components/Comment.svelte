<script lang="ts">
    export let comment: CommentInfo;

    let date: string;
    $: date = new Date(comment.dateCreated)
        .toLocaleString();
</script>

<div class="commenti-comment">
    <div class="commenti-comment-main">
        <div class="commenti-comment-header">
            <span class="commenti-author">
                { comment.author.username }
            </span>
            <span class="commenti-date">
                { date }
            </span>
        </div>
        <div class="commenti-comment-content">
            { comment.text }
        </div>
    </div>
</div>
