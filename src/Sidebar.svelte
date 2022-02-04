<script>
    import {signoutUser} from "./firebase";
    import { EVENTS , fireEvent } from "./EventManager";

    import Icon from "./utility/Icon.svelte";

    export let lists = [];
    export let selected_list_id;

    const sendSelectListEvent = (evt) => {
        fireEvent(EVENTS.SELECT_LIST,evt.currentTarget.dataset.id);
    } 

    const sendNewListEvent = (evt) => {
        fireEvent(EVENTS.OPEN_NEW_LIST_POPUP,evt.currentTarget.dataset.id);
    }

</script>

<main>
    <div class="sidebar fixed">
        <div class="header">
            <div class="flex align-center justify-space-between logo-container text-center">
                <img class="logo" src="./logo.svg" alt="onelist"/>
                <div class="action-container text-center">
                    <Icon type="danger" OnClick={signoutUser}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-log-out">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </Icon>
                    
                </div>
            </div>
        </div>
        <div class="content">
            <ul class="list-container">
                <li class="flex align-center justify-end list-actions border-box relative">
                    <Icon type="primary" OnClick={sendNewListEvent}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                            <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </Icon>
                </li>
                {#if lists && lists.length}
                    {#each lists as list}
                        <li class="flex align-center pointer justify-start list-item border-box relative" data-id={list.list_id} on:click={sendSelectListEvent}>
                            <span class="item-content flex align-center border-box { selected_list_id == list.list_id ? 'active' : ''}"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="list-logo align-center feather feather-file-text">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                                <span class="align-center item-name"> {list.list_name} </span>
                            </span>
                        </li>
                    {/each}
                {/if}
                
            </ul>
        </div>
    </div>
</main>

<style>

    .sidebar{
        width: 20vw;
        background-color: var(--secondary-color);
        height: 100%;
        z-index: 1;
        left: 0;
        box-shadow: 0 0 15px 0 rgb(34 41 47 / 5%);
    }

    .sidebar .header{
        padding: 1rem 0.3rem 0.3rem 1.64rem;
        height: 2.5rem;
    }

    .list-actions{
        padding: .3rem;
    }

    .action-container{
        color: var(--text-secondary-color);
    }

    .sidebar .content{
        height: calc(100% - 2.45rem);
    }

    .sidebar .list-container{
       padding: 0;
       list-style: none;
    }

    .list-item{
        white-space : nowrap;
        color: var(--text-secondary-color);
        line-height: 1.45;
        padding: 0.25rem 0;
    }

    .list-item .item-content{
        padding: 10px 15px 10px 15px;
        margin: 0 15px;
        width: 100%;
        border-radius: 5px;
        overflow: hidden;
    }

    .item-name{
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90%;
    }

    .list-logo{
        margin-right: 8px;
    }

    .logo {
        width: 7em;
    }

    .item-content:hover{
        background-color: var(--quaternary-color);
    }

    .item-content.active{
        background : var(--primary-color);
    }

    ul{
        margin: 0;
    }


</style>