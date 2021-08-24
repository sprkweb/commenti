<script lang='ts'>
    export let error;
    export let message: string = null;
</script>

{#if error}
    <p class="commenti-error-message">
        {message || error.toString()}
    </p>
{/if}
