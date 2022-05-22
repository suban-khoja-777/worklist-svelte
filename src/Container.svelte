<script>
    import { ENTRY_COLUMN } from "./constants";
    import { EVENTS , fireEvent } from "./EventManager";
    import { AUTH } from "./firebase";
    import Component from "./Component.svelte";
    import { exportListComponentsCallout } from "./api";
    import Icon from "./utility/Icon.svelte";
    
    export let work_entries = [];
    export let selected_client = "";

    const sendNewEntryEvent = () => {
        console.log('sendNewEntryEvent Fired');
        fireEvent(EVENTS.OPEN_NEW_ENTRY_POPUP,{});
    }

    const exportTimeEntries = () => {
        const data = JSON.stringify(work_entries);
        const file_name = ' Time Entry Export '+new Date().toISOString();
        fireEvent(EVENTS.SHOW_SPINNER,{});
    }

</script>

<main>
    <div class="detail-container border-box">
        <div class="flex justify-space-between list-header border-box align-center">
            
            <div class="flex list-dates grow align-center">
                <span class="column flex justify-start border-box text-bold pointer list_name align-center">
                    <span class="list_name">{selected_client}</span>
                </span>
            </div>

        </div>
        
        <div class="task-header flex align-center justify-space-between">
            <div class="flex align-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span class="task-title"> Time Entries </span>
            </div>
            <div class="flex align-center">
                <Icon type="primary" OnClick={sendNewEntryEvent}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </Icon>
            </div>
            
        </div>

        {#if work_entries && work_entries.length}
            <div class="task-container flex justify-start align-center grow flex-column">
                <li class="columns flex justify-space-between align-center text-white text-bold">
                    {#each ENTRY_COLUMN as column,index}
                        {#if column.show_in_list}
                            <span class="column flex grow border-box text-bold entry_column {index == 0 ? 'justify-start' : 'justify-center'}">{ column.show_header ? column.label : ''}</span>    
                        {/if}
                    {/each}
                </li>
                {#each work_entries as entry}
                    <Component {entry} actions={['DELETE']}/>    
                {/each}
            </div>
            {:else}
            <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-primary" data-v-aa799a9e="">
                <div class="alert-body box-border">
                    <span>No Entry.</span>
                </div>
            </div>
        {/if}
    </div>
</main>

<style>

    .detail-container{
        margin-left: calc(20vw + 5.25rem);
        height: 100vh;
        width: calc(100vw - (20vw + 5.25rem));
        padding: 1rem;
    }

    .list-header{
        padding: 0.5rem 0;
        box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
    }

    .task-header{
        border-bottom: 1px solid var(--border-tertiary-color);
        margin-bottom: 4px;
        padding: 8px 0;
    }

    .list_name{
        font-size: 2rem;
        color: white;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .task-title{
        font-size: 1.5rem;
        color: var(--primary-color);
    }

    .list-status{
       height: 40px;
       padding: 0.25rem 1.25rem;
    }

    .columns{
        width: 100%;
        list-style: none;
        padding-left: 1rem;
    }

    .column{
        padding: 0.5rem;
        width: 95%;
    }

    .task_name{
        width: 55%;
    }

    .task_start_date,.task_end_date{
        width: 15%;
    }

    .task_status,.aggregator-container{
        width: 15%;
    }

    .aggregator-container{
        height: 40px;
    }

    .column:first-of-type{
        border-left: 0;
    }

    .column:last-of-type{
        border-right: 0;
    }

    .action-container{
        width: 10%;
    }

    .task-container{
        width: 100%;
    }
    
    .task-note{
        width: 100%;
    }

    .list-start-date{
        margin-right: 5px;
    }

    .list-end-date{
        margin-left: 5px;
    }

    .icon{
        color: var(--primary-color);
        font-weight: 400;
    }

    .task-header .icon{
        margin-right : 5px;
    }

    .alert{
        background-color: rgba(115,103,240,.12);
        border: none;
        padding: 0;
        border-radius: 0.3rem;
        color : var(--primary-color);;
    }

    .alert-body{
        padding: .71rem 1rem;
    }

    .bullet{
        width: .714rem;
        height: .714rem;
        border-radius: 50%;
    }

    .list-dates{
        width: 90%;
    }

</style>