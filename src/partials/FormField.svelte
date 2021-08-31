<script lang="ts">
    import { _ } from 'svelte-i18n';

    export let fieldName: string;
    export let type: string = "text";
    export let value: string = "";
    export let required: boolean = false;

    const name = `commenti_field_${fieldName}`;

    function handleInput(e) {
        value = e.target.value;
    }
</script>

<div class="commenti-form-field">
    <label for={name}>{$_(`formField.${fieldName}`)}</label>
    <span>
        <input
            {type} {required} {name}
            class="commenti-text-field"
            on:input={handleInput}>
    </span>
</div>
