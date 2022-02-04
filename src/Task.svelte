<script>

    import { fireEvent, EVENTS } from "./EventManager";
    import { TASK_STATUS ,getStatusClass } from "./constants";
    import Input from "./utility/Input.svelte";
    import Icon from "./utility/Icon.svelte";
    export let task;

    const sendOpenTaskDetailEvent = () => {
        fireEvent(EVENTS.OPEN_EDIT_TASK_POPUP,task.task_id);
    }

    const sendDeleteTaskDetailEvent = () => {
        fireEvent(EVENTS.DELETE_TASK,task.task_id);
    }
    
</script>

<li class="columns flex justify-space-between align-center border-box">
    
    <span class="column flex justify-center border-box text-bold pointer task_name justify-start align-center">
        <Input label="Name" width_class="width-full" type="text" classes="bg-transparent" value={task.task_name} data_field="task_name" readOnly/>
        
        <span class="row-actions">
            <Icon type="warning" OnClick={sendOpenTaskDetailEvent}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-75 feather feather-edit-2">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
            </Icon>
            &nbsp;&nbsp;
            <Icon type="danger" OnClick={sendDeleteTaskDetailEvent}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-75 feather feather-trash">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </Icon>
        </span>
    </span>
    <span class="column flex justify-center border-box text-bold pointer task_start_date justify-center align-center">
        <Input  label="Start Date" width_class="width-full" type="text" classes="bg-transparent text-center" value={task.task_start_date} data_field="task_start_date" readOnly/>
    </span>
    <span class="column flex justify-center border-box text-bold pointer task_end_date justify-center align-center">
        <Input  label="End Date" width_class="width-full" type="text" classes="bg-transparent text-center" value={task.task_end_date} data_field="task_end_date" readOnly/>
    </span>
    <span class="column flex justify-center border-box text-bold pointer task_status justify-center align-stretch">
        <Input  label="Status" width_class="width-full" type="select" classes={getStatusClass(task.task_status)} value={task.task_status} data_field="task_status" options={TASK_STATUS} readOnly/>
    </span>
            
</li>

<style>

    .columns{
        width: 100%;
        list-style: none;
        background-color: var(--secondary-color);
        margin-bottom: 4px;
        color: var(--secondary-color);
        padding-left: 1rem;
        box-shadow: 0 4px 24px 0 rgb(34 41 47 / 24%);
        border-radius: 4px;
    }

    .column{
        height: 40px;
    }

    .row-actions{
        padding: 0 1rem;
        display: none;
    }

    li.columns:hover .row-actions{
        display: inherit;
    }

</style>