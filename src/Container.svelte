<script>
    import { ENTRY_COLUMN } from "./constants";
    import { EVENTS , fireEvent } from "./EventManager";
    import Component from "./Component.svelte";
    
    import Icon from "./utility/Icon.svelte";
    
    export let work_entries = [];
    export let selected_client;

    const sendNewEntryEvent = () => {
        fireEvent(EVENTS.OPEN_NEW_ENTRY_POPUP,{});
    }

    const sendDeleteClientEVent = () => {
        fireEvent(EVENTS.DELETE_CLIENT,selected_client._id);
    }

</script>

<main>
    <div class="detail-container border-box">
        <div class="flex justify-space-between list-header border-box align-center">
            
            <div class="flex list-dates grow align-center">
                <span class="column flex justify-start border-box text-bold pointer list_name align-center">
                    <span class="list_name">{selected_client.Name}</span>
                </span>
            </div>

            <div class="flex">
                
                <Icon type="danger" OnClick={sendDeleteClientEVent}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-75 feather feather-trash">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </Icon>
            </div>

        </div>
        
        <div class="task-header flex align-center justify-space-between">
            <div class="flex align-center">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg> -->
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
                            <span class="column flex grow border-box text-bold entry_column {index == 0 ? 'justify-center' : 'justify-center'}">{ column.show_header ? column.label : ''}</span>    
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
        margin-left: calc(15vw + 5.25rem);
        height: 100vh;
        width: calc(100vw - (20vw + 5.25rem));
        padding: 1rem;
    }

    .list-header{
        padding: 0.5rem 0;
    }

    .task-header{
        border-bottom: 1px solid var(--border-tertiary-color);
        padding: 8px;
        background-color: #22232B;
        color : white;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    .list_name{
        font-size: 1.5rem;
        color: #181c32;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .task-title{
        font-size: 1.25rem;
        color: white;
    }

    .columns{
        width: 100%;
        list-style: none;
    }

    .column{
        padding: 0.5rem 1.5rem;
        width: 95%;
        color: #b5b5c3;
    }

    .column:first-of-type{
        border-left: 0;
    }

    .column:last-of-type{
        border-right: 0;
    }

    .task-container{
        width: 100%;
        background: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow : 0px 0px 20px 0px rgb(76 87 125 / 2%);
    }

    .alert{
        background-color: #F1416C;
        border: none;
        padding: 0;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        color : #181c32;
    }

    .alert-body{
        padding: .71rem 1rem;
    }

    .list-dates{
        width: 90%;
    }

</style>