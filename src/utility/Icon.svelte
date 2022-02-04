<script>
    export let type;
    export let OnClick
</script>

<span class="icon flex justify-center align-center pointer {type}" on:click={OnClick}>
    <slot />
</span>

<style>

    .icon{
        padding: .3rem;
        color: white;
        border-radius: 4px;
    }

    .primary{
        background-color: var(--btn-primary-color);
    }

    .danger{
        background-color: var(--danger-color);
    }
    
    .warning{
        background-color: var(--warning-color);
    }

</style>

