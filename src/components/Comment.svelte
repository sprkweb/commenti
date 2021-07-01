<script lang="ts">
    export let comment: CommentInfo;

    let date: string;
    $: date = new Date(comment.dateCreated)
        .toLocaleString();
</script>

<p>
    { comment.author.username }, { date }: { comment.text }
</p>
