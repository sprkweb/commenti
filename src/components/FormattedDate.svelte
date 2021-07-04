<script lang="ts">
    import { PrettyDateFormat } from '../helpers/PrettyDateFormat';

    export let date: Date;
    export let locale: string = undefined;

    const dateFormat = new PrettyDateFormat(locale);
</script>

<span title={dateFormat.detailedFormat(date)}>
    {dateFormat.format(date)}
</span>
