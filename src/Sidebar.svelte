<script>
    import { onMount , onDestroy} from "svelte";
    import { EVENTS , fireEvent,registerListener,unregisterListener } from "./EventManager";
    import { getClients } from "./api";
    import {signoutUser} from './firebase'
    let clients = [];
    let selected_client_id;

    const sendSelectClientEvent = (evt) => {
        try{
            selected_client_id = evt.currentTarget.dataset.id;
            fireEvent(EVENTS.SELECT_CLIENT,clients.filter(client => client._id == selected_client_id)[0]);
        
        }catch(exp){
            console.log(exp);
        }
        
    } 

    const sendNewClientEvent = (evt) => {
        fireEvent(EVENTS.OPEN_NEW_CLIENT_POPUP,null);
    }

    const processNewClientEvent = (_client) => {
        clients.push(_client);
        clients = clients;
        fireEvent(EVENTS.HIDE_SPINNER,{});
    }

    const processRemoveClientEvent = (client_id) => {
        clients = clients.filter(client => client._id != client_id);
        selected_client_id = null;
    }

    onMount( () => {
        
        registerListener(EVENTS.SEND_NEW_CLIENT,processNewClientEvent);
        registerListener(EVENTS.SEND_REMOVE_CLIENT,processRemoveClientEvent);
        
        getClients()
        .then(res => {
            if(res && res && res.length){
                clients = res;
                console.log(clients);
                fireEvent(EVENTS.HIDE_SPINNER,{});
            }else{
                fireEvent(EVENTS.HIDE_SPINNER,{});
            }
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
    });

    onDestroy(() => {
        unregisterListener(EVENTS.SEND_NEW_CLIENT,processNewClientEvent);
        unregisterListener(EVENTS.SEND_REMOVE_CLIENT,processRemoveClientEvent);
    })

</script>

<main>
    <div class="sidebar fixed">
        <div class="content flex flex-column">
            <ul class="list-container grow">
                <li class="flex align-center justify-end list-actions border-box relative">
                    <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-success pointer" data-v-aa799a9e="" on:click={sendNewClientEvent}>
                        <div class="flex align-center justify-center alert-body box-border">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus">
                                <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            <span>New Client</span>
                        </div>
                    </div>
                </li>
                <br/>
                {#if clients && clients.length}
                    {#each clients as client}
                        <li class="flex align-center pointer justify-start list-item border-box relative" data-id={client._id} on:click={sendSelectClientEvent}>
                            <span class="item-content flex align-center border-box { selected_client_id == client._id ? 'active' : ''}"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="list-logo align-center feather feather-file-text">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span class="align-center item-name"> {client.Name} </span>
                            </span>
                        </li>
                    {/each}
                {/if}
            </ul>
            <ul class="list-container">
                <li class="flex align-center justify-end list-actions border-box relative">
                    <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-error pointer" data-v-aa799a9e="" on:click={signoutUser}>
                        <div class="flex align-center justify-center alert-body box-border">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-50 feather feather-log-out">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            &nbsp;
                            <span>Logout</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</main>

<style>

    .sidebar{
        width: 17vw;
        background-color: #EFE9E1;
        height: 100%;
        z-index: 1;
        left: 0;
        box-shadow: 0 0 15px 0 rgb(34 41 47 / 5%);
        padding: 1rem;
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
        color: #181C32;
        line-height: 1.45;
        padding: 0.25rem 0;
    }

    .list-item .item-content{
        padding: 10px 15px 10px 15px;
        /* margin: 5px 15px; */
        width: 100%;
        /* border-radius: 5px; */
        overflow: hidden;
        border: 1px solid transparent;
        font-weight: 300;
    }

    .item-name{
        overflow: hidden;
        text-overflow: ellipsis;
        width: 90%;
    }

    .list-logo{
        margin-right: 8px;
    }

    .item-content:hover{
        text-decoration: underline;
    }

    .item-content.active{       
        color: #28c76f;
    }

    ul{
        margin: 0;
    }

    .alert{
        border: none;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    .alert-success{
        background-color: #28c76f20;
        color : #28c76f;
    }

    .alert-error{
        background-color: #ea545520;
        color: #ea5455;
    }

    .alert-body{
        padding: .71rem 1rem;
    }


</style>