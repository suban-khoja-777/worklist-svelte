<script>
    import { onMount , onDestroy} from "svelte";
    import {getAllWorkEntry , createTimeEntry , deleteTimeEntry, updateEntryStatus ,createClient,deleteClient} from '../api';
    import { AUTH } from "../firebase";
    import Input from "../utility/Input.svelte";
    import Popup from "../utility/Popup.svelte";
    import {registerListener , unregisterListener, EVENTS, fireEvent} from '../EventManager';
    import Sidebar from "../Sidebar.svelte";
    import Container from "../Container.svelte";
    import {getEntryPaymentStatusClass , DEFAULTS , PAYMENT_STATUS , ENTRY_DURATIONS , convertDateToString , convertDateToTimeString} from "../constants";

    let store = [];
    let work_entries = [];

    const POPUP = {
        NEW_CLIENT : false,
        NEW_ENTRY : false,
        EDIT_ENTRY : false
    }

    const processClosePopup = (_popup) => {
        POPUP[_popup] = false; 
    }
    
    let selected_client;

    let new_client = {
        Name : ""
    };

    let client_fields = {
        name : true,
    }

    const handleNewClientChange = (e) => {
        new_client[e.target.dataset.field] = e.target.value;
    }

    const processOpenNewClientPopup = () => {
        client_fields = {
            name : true
        }
        POPUP.NEW_CLIENT = true;
    }

    const processSelectClientEvent = (client) => {
        selected_client = client
        work_entries = store.filter(entry => entry.client[0]._id === client._id);
    }

    const saveNewClient = () => {
        if(!new_client.Name){
            client_fields.name = false;
            return;
        }else{
            client_fields.name = true;
        }
        fireEvent(EVENTS.SHOW_SPINNER,{});
        createClient(new_client)
        .then(res => {
            fireEvent(EVENTS.SEND_NEW_CLIENT,{
                _id : res._id,
                Name : res.Name
            });
        })
        .catch(err => {

        });

        new_client = {
            Name : ""
        };
        
        fireEvent(EVENTS.CLOSE_POPUP,'NEW_CLIENT');
    }

    let selected_entry;
    let backup_selected_entry;

    let new_entry = {
        client : "",
        start_date : "",
        start_time : "",
        payment_status : DEFAULTS.PAYMENT_STATUS,
        duration : DEFAULTS.DURATION
    };

    let entry_fields = {
        start_date : true,
        start_time : true
    }

    const handleNewEntryChange = (e) => {
        new_entry[e.target.dataset.field] = e.target.value;
    }

    const processOpenEntryPopup = () => {
        
        console.log('processOpenEntryPopup Recieved');
        entry_fields = {
            start_date : true,
            start_time : true
        };
        new_entry.client = selected_client;
        new_entry.start_date = convertDateToString(new Date());
        new_entry.start_time = convertDateToTimeString(new Date());
        POPUP.NEW_ENTRY = true;
    }
    
    const processEditEntryPopup = (entry_id) => {
        for(let i=0;i<work_entries.length;i++){
            if(work_entries[i]._id === entry_id){
                selected_entry = JSON.parse(JSON.stringify(work_entries[i]));
                backup_selected_entry = JSON.parse(JSON.stringify(work_entries[i]));
            }
        }
        component_fields = {
            component_name : true,
            component_date : true,
            component_version : true
        }
        POPUP.EDIT_COMPONENT = true;
    }

    const processUpdateEntryStatus = (entry) => {
        fireEvent(EVENTS.SHOW_SPINNER,{});
        updateEntryStatus(entry)
        .then(res => {
            for(let i=0;i<work_entries.length;i++){
                if(work_entries[i]._id === entry._id){
                    work_entries[i].payment_status = entry.payment_status;
                }
            }
            work_entries = work_entries;
            store = work_entries;
            store = store;
            fireEvent(EVENTS.HIDE_SPINNER,{});
            fireEvent(EVENTS.CLOSE_POPUP,'NEW_ENTRY');
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    }

    const saveNewEntry = () => {
        
        if(!new_entry.start_date){
            entry_fields.start_date = false;
            return;
        }else{
            entry_fields.start_date = true;
        }


        if(!new_entry.start_time){
            entry_fields.start_time = false;
            return;
        }else{
            entry_fields.start_time = true;
        }

        console.log('new entry',new_entry);
        

        fireEvent(EVENTS.SHOW_SPINNER,{});
        createTimeEntry(new_entry)
        .then(res => {
            work_entries.push({
                _id:res._id,
                client : new_entry.client,
                start_date : new_entry.start_date,
                start_time : new_entry.start_time,
                payment_status : new_entry.payment_status,
                duration : new_entry.duration,
            });
            
            new_entry = {
                client : "",
                start_date : "",
                start_time : "",
                payment_status : DEFAULTS.PAYMENT_STATUS,
                duration : DEFAULTS.DURATION
            };

            work_entries = work_entries;
            store = work_entries;
            store = store;
            fireEvent(EVENTS.HIDE_SPINNER,{});
            fireEvent(EVENTS.CLOSE_POPUP,'NEW_ENTRY');
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    }

    const processDeleteEntry = (entry_id) => {
        let sure = window.confirm(`Are you sure you want to delete the entry?`) ;
        if(!sure) return;
        fireEvent(EVENTS.SHOW_SPINNER,{});
        deleteTimeEntry(entry_id)
        .then(res => {
            for(let i=0;i<work_entries.length;i++){
                if(work_entries[i]._id === entry_id){
                    work_entries.splice(i,1);
                    break;
                }
            }
            work_entries = work_entries;
            store = work_entries;
            store = store;
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    }

    const processDeleteClient = (client_id) => {
        let sure = window.confirm(`Are you sure you want to delete the client?`) ;
        if(!sure) return;
        fireEvent(EVENTS.SHOW_SPINNER,{});
        deleteClient(client_id)
        .then(res => {
            selected_client = null;
            fireEvent(EVENTS.SEND_REMOVE_CLIENT,client_id);
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    }

    onMount( () => {
        
        registerListener(EVENTS.SELECT_CLIENT,processSelectClientEvent);
        registerListener(EVENTS.OPEN_NEW_CLIENT_POPUP,processOpenNewClientPopup);
        registerListener(EVENTS.DELETE_CLIENT,processDeleteClient);

        registerListener(EVENTS.OPEN_NEW_ENTRY_POPUP,processOpenEntryPopup);
        registerListener(EVENTS.OPEN_EDIT_ENTRY_POPUP,processEditEntryPopup);
        registerListener(EVENTS.UPDATE_ENTRY_STATUS,processUpdateEntryStatus);
        registerListener(EVENTS.DELETE_ENTRY,processDeleteEntry);

        registerListener(EVENTS.CLOSE_POPUP,processClosePopup);
        
        fireEvent(EVENTS.SHOW_SPINNER,{});

        getAllWorkEntry()
        .then(res => {
            if(res && res && res.length){
                store = res;
                console.log(store);
                store = store;
                fireEvent(EVENTS.HIDE_SPINNER,{});
            }else{
                fireEvent(EVENTS.HIDE_SPINNER,{});
            }
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        })
    });

    onDestroy( () => {
        unregisterListener(EVENTS.SELECT_CLIENT,processSelectClientEvent);
        unregisterListener(EVENTS.OPEN_NEW_CLIENT_POPUP,processOpenNewClientPopup);
        unregisterListener(EVENTS.DELETE_CLIENT,processDeleteClient);
        unregisterListener(EVENTS.OPEN_NEW_ENTRY_POPUP,processOpenEntryPopup);
        unregisterListener(EVENTS.OPEN_EDIT_ENTRY_POPUP,processEditEntryPopup);
        unregisterListener(EVENTS.UPDATE_ENTRY_STATUS,processUpdateEntryStatus);
        unregisterListener(EVENTS.DELETE_ENTRY,processDeleteEntry);

        unregisterListener(EVENTS.CLOSE_POPUP,processClosePopup);
    })
</script>

<div class="app-container flex align-center flex-column">
    <Sidebar/>
    {#if selected_client}
        <Container {selected_client} {work_entries}/>
    {/if}
</div>

{#if POPUP.NEW_CLIENT}
    <Popup header="New Client" _popup_name="NEW_CLIENT" OnSave={saveNewClient}>
        <div class="flex flex-column justify-center">
            <div class="flex form-row">
                <div class="flex flex-column form-column grow">
                    <Input label_class={client_fields.name ? '' : 'has-error'} data_type="field" label="Name" hasLabel width_class="width-full" type="text" classes="bg-transparent {client_fields.name ? '' : 'has-error'}" value={new_client.Name} onChange={handleNewClientChange} data_field="Name" Required/>
                </div>
            </div>
        </div>
    </Popup>
{/if}


{#if POPUP.NEW_ENTRY}
    <Popup header="New Time Entry" _popup_name="NEW_ENTRY" OnSave={saveNewEntry}>
        <div class="flex flex-column justify-center">
            <div class="flex form-row">
                <div class="flex flex-column form-column grow">
                    <Input label_class={entry_fields.start_date ? '' : 'has-error'} data_type="field" label="Date" hasLabel width_class="width-full" type="date" classes="bg-transparent {entry_fields.start_date ? '' : 'has-error'}" value={new_entry.start_date} onChange={handleNewEntryChange} data_field="start_date" Required/>
                </div>
                
                <div class="flex flex-column form-column grow">
                    <Input data_type="field" label="Payment Status" hasLabel width_class="width-full" type="select" classes="bg-transparent {getEntryPaymentStatusClass(new_entry.payment_status)}" value={new_entry.payment_status} onChange={handleNewEntryChange} data_field="payment_status" options={PAYMENT_STATUS} Required/>
                </div>
            </div>
            <div class="flex form-row">
                <div class="flex flex-column form-column grow">
                    <Input label_class={entry_fields.start_time ? '' : 'has-error'} data_type="field" label="Start Time" hasLabel width_class="width-full" type="time" classes="bg-transparent {entry_fields.start_time ? '' : 'has-error'}" value={new_entry.start_time} onChange={handleNewEntryChange} data_field="start_time" Required/>
                </div>

                <div class="flex flex-column form-column grow">
                    <Input data_type="field" label="Duration" hasLabel width_class="width-full" type="select" classes="bg-transparent" value={new_entry.duration} onChange={handleNewEntryChange} data_field="duration" options={ENTRY_DURATIONS} Required />
                </div>
            </div>
        </div>
    </Popup>
{/if}

{#if POPUP.EDIT_COMPONENT}
    <Popup header="Edit Component" _popup_name="EDIT_COMPONENT" OnSave={updateComponent}>
        <div class="flex flex-column justify-center">

            <div class="flex form-row">
                <div class="flex flex-column form-column grow">
                    <Input label_class={component_fields.component_name ? '' : 'has-error'} data_type="field" label="Name" hasLabel width_class="width-full" type="text" classes="bg-transparent {component_fields.component_name ? '' : 'has-error'}" value={selected_component.component_name} onChange={handleExistingComponentChange} data_field="component_name" Required/>
                </div>
                <div class="flex flex-column form-column grow">
                    <Input data_type="field" label="Type" hasLabel width_class="width-full" type="select" classes="bg-transparent {getEntryPaymentStatusClass(selected_component.component_type)}" value={selected_component.component_type} onChange={handleExistingComponentChange} data_field="component_type" options={COMPONENT_TYPE_LIST} Required/>
                </div>
                
            </div>
            <div class="flex form-row">

                <div class="flex flex-column form-column grow">
                    <Input label_class={component_fields.component_date ? '' : 'has-error'} data_type="field" label="Date" hasLabel width_class="width-full" type="date" classes="bg-transparent {component_fields.component_date ? '' : 'has-error'}" value={selected_component.component_date} onChange={handleExistingComponentChange} data_field="component_date" Required/>
                </div>
                <div class="flex flex-column form-column grow">
                    <Input label_class={component_fields.component_version ? '' : 'has-error'} data_type="field" label="Version" hasLabel width_class="width-full" type="text" classes="bg-transparent {component_fields.component_version ? '' : 'has-error'}" value={selected_component.component_version} onChange={handleExistingComponentChange} data_field="component_version" Required={selected_component.component_type === "Omniscript" || selected_component.component_type === "Integration Procedure" || selected_component.component_type === "Flow"}/>
                </div>
                
            </div>
            <div class="flex form-row">
                <div class="flex flex-column form-column grow">
                    <Input data_type="field" label="Parent Component (if any)" hasLabel width_class="width-full" type="text" classes="bg-transparent" value={selected_component.component_parent_name} onChange={handleExistingComponentChange} data_field="component_parent_name" />
                </div>
            </div>
            
        </div>
    </Popup>
{/if}


<style>

    .app-container{
        margin:0;
        padding: 0;
        height: 100vh;
    }

    .form-row{
        padding: 1rem 0;
    }

    .form-column{
        padding: 0 1rem;
        width: 50%;
    }

</style>