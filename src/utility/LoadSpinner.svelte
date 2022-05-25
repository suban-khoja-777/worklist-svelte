<script>
    export let show;
</script>

{#if show}
    <div class="main-container flex align-center flex-column justify-center bg-transparent">
        <div class="flex align-center text-primary text-large text-boldest">
            worklist
        </div>
    </div>
{/if}


<style>

    .main-container{
        margin:0;
        padding: 0;
        height: 100vh;
    }

</style>