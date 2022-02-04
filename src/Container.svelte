<script>
    import { TASK_COLUMN , COMPONENT_COLUMN , getBulletClass} from "./constants";
    import { EVENTS , fireEvent } from "./EventManager";
    import Task from "./Task.svelte";
    import Component from "./Component.svelte";

    import Icon from "./utility/Icon.svelte";
    
    export let selected_list;

    handleListChange

    const handleListChange = (e) => {
        selected_list[e.target.dataset.field] = e.target.value;
    }

    const sendNewTaskEvent = () => {
        fireEvent(EVENTS.OPEN_NEW_TASK_POPUP,{});
    }

    const sendNewComponentEvent = () => {
        fireEvent(EVENTS.OPEN_NEW_COMPONENT_POPUP,{});
    }

    const sendEditListEvent = () => {
        fireEvent(EVENTS.OPEN_EDIT_LIST_POPUP,{});
    }

    const sendDeleteListEvent = () => {
        fireEvent(EVENTS.DELETE_LIST,{});
    }

</script>

<main>
    <div class="detail-container border-box">
        <div class="flex justify-space-between list-header border-box align-center">
            <div class="flex list-dates grow align-center">
                <span class="bullet {getBulletClass(selected_list.list_status)}"></span>
                <span class="column flex justify-start border-box text-bold pointer list_name align-center">
                    <span class="list_name">{selected_list.list_name}</span>
                </span>
            </div>
            <div class="flex">
                <Icon type="warning" OnClick={sendEditListEvent}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-75 feather feather-edit-2">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                    </svg>
                </Icon>
                &nbsp;&nbsp;
                <Icon type="danger" OnClick={sendDeleteListEvent}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-75 feather feather-trash">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </Icon>
            </div>
        </div>
        <div class="task-header flex align-center justify-space-between">
            <div class="flex align-center">
                <svg data-v-1134b199="" xmlns="http://www.w3.org/2000/svg" width="21px" height="21px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                    <polyline data-v-1134b199="" points="9 11 12 14 22 4"></polyline>
                    <path data-v-1134b199="" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                <span class="task-title"> Tasks </span>
            </div>
            <Icon type="primary" OnClick={sendNewTaskEvent}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </Icon>
        </div>

        {#if selected_list.list_tasks && selected_list.list_tasks.length}
            <div class="task-container flex justify-start align-center grow flex-column">
                <li class="columns flex justify-space-between align-center text-white text-bold">
                    {#each TASK_COLUMN as column}
                        {#if column.show_in_list}
                            <span class="column flex justify-center grow border-box text-bold {column.key}">{ column.show_header ? column.label : ''}</span>    
                        {/if}
                    {/each}
                </li>
                {#each selected_list.list_tasks as task}
                    <Task {task} />    
                {/each}
            </div>
            {:else}
            <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-primary" data-v-aa799a9e="">
                <div class="alert-body box-border">
                    <span>No Tasks.</span>
                </div>
            </div>
        {/if}
        <div class="task-header flex align-center justify-space-between">
            <div class="flex align-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
                <span class="task-title"> Components </span>
            </div>
            <Icon type="primary" OnClick={sendNewComponentEvent}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </Icon>
        </div>

        {#if selected_list.list_components && selected_list.list_components.length}
            <div class="task-container flex justify-start align-center grow flex-column">
                <li class="columns flex justify-space-between align-center text-white text-bold">
                    {#each COMPONENT_COLUMN as column}
                        {#if column.show_in_list}
                            <span class="column flex grow justify-center grow border-box text-bold {column.key}">{ column.show_header ? column.label : ''}</span>    
                        {/if}
                    {/each}
                </li>
                {#each selected_list.list_components as component}
                    <Component {component} />    
                {/each}
            </div>
            {:else}
            <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-primary" data-v-aa799a9e="">
                <div class="alert-body box-border">
                    <span>No Components.</span>
                </div>
            </div>
        {/if}
    </div>
</main>

<style>

    .detail-container{
        margin-left: 20vw;
        height: 100vh;
        width: 80vw;
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

    .task_status{
        width: 15%;
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