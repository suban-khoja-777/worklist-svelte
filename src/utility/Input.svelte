<script>

    export let hasLabel = false;
    export let type;
    export let name;
    export let label;
    export let placeholder;
    export let onChange;
    export let onKeyUp;
    export let value = "";
    export let width_class;
    export let label_class = 'light';
    export let classes;
    export let data_field;
    export let options;
    export let data_type
    export let readOnly;
    export let Required;
</script>

{#if hasLabel}
    <label class="{label_class}" for={name}>{label}{Required ? ' *' : ''}</label>  
{/if}

{#if type === 'select'}
    <select class="column flex grow border-bottom-primary text-primary {classes} {width_class} border-box text-center pointer border-box justify-center status-column {data_field}" {value} {name} on:change={onChange} data-type={data_type} data-field={data_field} disabled={readOnly}>
        {#each options as status}
            <option value={status} class="option bg-white text-primary">{status}</option>
        {/each}
    </select>
    {:else if type === "text-long"}
        <textarea class="border-primary text-primary border-box bg-white {width_class}" rows="10" on:change={onChange} data-type={data_type} data-field={data_field} {value} readonly={readOnly}></textarea>
    {:else}
        <input class="{classes} border-box {width_class}" {type} {name} on:change={onChange} on:keyup={onKeyUp} {value} {placeholder} data-type={data_type} data-field={data_field} readonly={readOnly}/>
{/if}


<style>

    input{
        padding: 0.825rem 1.5rem;
        font-size: 1rem;
        border-radius: 0.625rem;
        outline: none;
        border : none;
        text-align: center;
    }

    label {
        margin-bottom: 0.25rem;
        color: #d0d2d6;
        font-size: 1.075rem;
        font-weight: 600;
    }

    .width-half{
        width: 50%;
    }

    .width-full{
        width: 100%;
    }

    .height-100{
        height: 100%;
    }

    label.dark{
        color: #181C32;
    }
    
    label.light{
        color: var(--text-secondary-color);
    }

    input[type="text"]{
        border: none;
        outline: none;
        color : #5E6278;
    }

    input[type="date"] , input[type="time"]{
        border: none;
        outline: none;
        flex-shrink: 0.75;
        color : #5E6278;
    }

    /* ::-webkit-calendar-picker-indicator {
        filter: invert(1);
    }

    ::-webkit-calendar-picker-indicator {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="#009EF7" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    } */

    select{
        border: none;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
    }

    input[data-type="field"][type="text"]{
        border: 1px solid #F5F8FA;
        background-color: #F5F8FA;
        color : #5E6278;
        border-radius: .357rem;
    }

    input[data-type="field"][type="email"]{
        border: 1px solid #F5F8FA;
        background-color:#F5F8FA;
        color : #5E6278;
        border-radius: .357rem;
    }

    input[data-type="field"][type="password"]{
        border: 1px solid #F5F8FA;
        background-color: #F5F8FA;
        color : #5E6278;
        border-radius: .357rem;
    }

    select.bg-grey{
        border: 1px solid #F5F8FA;
        background-color: #F5F8FA;
        color: #5E6278;
        border-radius: 0.357rem;
    }

    input[data-type="field"][type="date"] , input[data-type="field"][type="time"]{
        border: 1px solid #F5F8FA;
        background-color: #F5F8FA;
        color : #5E6278;
        border-radius: .357rem;
    }

    textarea[data-type="field"]{
        border: 1px solid #F5F8FA;
        background-color: #F5F8FA;
        color : #5E6278;
        border-radius: .357rem;
    }

    select[data-type="field"]{
        border-radius: .357rem;
    }

    select:disabled {
        opacity: 1;
    }

    input:-internal-autofill-selected {
        border: 1px solid var(--border-primary-color) !important;
        background-color: var(--secondary-color) !important;
        color : var(--text-tertiary-color) !important;
        border-radius: .357rem !important;
    }

    label.has-error{
        color: #ea5455 !important;
    }

    input.has-error{
        background-color: #ea545520 !important;
        border-color: #ea5455 !important;
    }

</style>