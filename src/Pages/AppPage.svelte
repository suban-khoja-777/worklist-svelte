<script>
    import { onMount , onDestroy} from "svelte";
    import {getAllWorkEntry , createTimeEntry , deleteTimeEntry, updateEntryStatus,updateEntryDuration ,createClient,deleteClient} from '../api';
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
        Name : "",
        Rate : ""
    };

    let client_fields = {
        Name : true,
        Rate : true
    }

    const handleNewClientChange = (e) => {
        if(e.target.dataset.field === 'Rate'){
            new_client[e.target.dataset.field] = Number(e.target.value);
        }else
            new_client[e.target.dataset.field] = e.target.value;
    }

    const processOpenNewClientPopup = () => {
        client_fields = {
            Name : true,
            Rate : true
        }
        POPUP.NEW_CLIENT = true;
    }

    const processSelectClientEvent = (client) => {
        selected_client = client;
        work_entries = store.filter(entry => entry.Client[0]._id === client._id);
    }

    const saveNewClient = () => {
        if(!new_client.Name){
            client_fields.Name = false;
            return;
        }else{
            client_fields.Name = true;
        }
        if(!new_client.Rate){
            client_fields.Rate = false;
            return;
        }else{
            client_fields.Rate = true;
        }
        fireEvent(EVENTS.SHOW_SPINNER,{});
        createClient(new_client)
        .then(res => {
            fireEvent(EVENTS.SEND_NEW_CLIENT,{
                _id : res._id,
                Name : res.Name,
                Rate : res.Rate
            });
        })
        .catch(err => {

        });

        new_client = {
            Name : "",
            Rate : "",
        };
        
        fireEvent(EVENTS.CLOSE_POPUP,'NEW_CLIENT');
    }

    let new_entry = {
        Client : "",
        Start_Date : "",
        Start_Time : "",
        Payment_Status : DEFAULTS.PAYMENT_STATUS,
        Duration : DEFAULTS.DURATION
    };

    let entry_fields = {
        Start_Date : true,
        Start_Time : true
    }

    const handleNewEntryChange = (e) => {
        if(e.target.dataset.field == "Dration"){
            new_entry[e.target.dataset.field] = Number(e.target.value);
        }else{
            new_entry[e.target.dataset.field] = e.target.value;
        }
    }

    const processOpenEntryPopup = () => {
        entry_fields = {
            Start_Date : true,
            Start_Time : true
        };
        new_entry.Client = selected_client;
        new_entry.Start_Date = convertDateToString(new Date());
        new_entry.Start_Time = convertDateToTimeString(new Date());
        POPUP.NEW_ENTRY = true;
    }
    

    const processUpdateEntryStatus = (entry) => {
        fireEvent(EVENTS.SHOW_SPINNER,{});
        updateEntryStatus(entry)
        .then(res => {
            for(let i=0;i<work_entries.length;i++){
                if(work_entries[i]._id === entry._id){
                    work_entries[i].Payment_Status = entry.Payment_Status;
                }
            }
            for(let i=0;i<store.length;i++){
                if(store[i]._id === entry._id){
                    store[i].Payment_Status = entry.Payment_Status;
                }
            }
            work_entries = work_entries;
            store = store;
            fireEvent(EVENTS.HIDE_SPINNER,{});
            fireEvent(EVENTS.CLOSE_POPUP,'NEW_ENTRY');
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    }

    const processUpdateEntryDuration = (entry) => {
        fireEvent(EVENTS.SHOW_SPINNER,{});
        updateEntryDuration(entry)
        .then(res => {
            for(let i=0;i<work_entries.length;i++){
                if(work_entries[i]._id === entry._id){
                    work_entries[i].Duration = entry.Duration;
                    work_entries[i].Amount = res.Amount;
                }
            }
            for(let i=0;i<store.length;i++){
                if(store[i]._id === entry._id){
                    store[i].Duration = entry.Duration;
                    store[i].Amount = res.Amount;
                }
            }
            work_entries = work_entries;
            store = store;
            fireEvent(EVENTS.HIDE_SPINNER,{});
            fireEvent(EVENTS.CLOSE_POPUP,'NEW_ENTRY');
        })
        .catch(err => {
            fireEvent(EVENTS.HIDE_SPINNER,{});
        });
    }

    const saveNewEntry = () => {
        
        if(!new_entry.Start_Date){
            entry_fields.Start_Date = false;
            return;
        }else{
            entry_fields.Start_Date = true;
        }

        if(!new_entry.Start_Time){
            entry_fields.Start_Time = false;
            return;
        }else{
            entry_fields.Start_Time = true;
        }

        fireEvent(EVENTS.SHOW_SPINNER,{});
        createTimeEntry(new_entry)
        .then(res => {
            work_entries.push({
                _id:res._id,
                Client : res.Client,
                Start_Date : new_entry.Start_Date,
                Start_Time : new_entry.Start_Time,
                Payment_Status : new_entry.Payment_Status,
                Duration : new_entry.Duration,
                Amount : res.Amount
            });

            store.push({
                _id:res._id,
                Client : res.Client,
                Start_Date : new_entry.Start_Date,
                Start_Time : new_entry.Start_Time,
                Payment_Status : new_entry.Payment_Status,
                Duration : new_entry.Duration,
                Amount : res.Amount
            });

            new_entry = {
                Client : "",
                Start_Date : "",
                Start_Time : "",
                Payment_Status : DEFAULTS.PAYMENT_STATUS,
                Duration : DEFAULTS.DURATION
            };

            work_entries = work_entries;
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
            for(let i=0;i<store.length;i++){
                if(store[i]._id === entry_id){
                    store.splice(i,1);
                    break;
                }
            }
            work_entries = work_entries;
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
        registerListener(EVENTS.UPDATE_ENTRY_STATUS,processUpdateEntryStatus);
        registerListener(EVENTS.UPDATE_ENTRY_DURATION,processUpdateEntryDuration);
        registerListener(EVENTS.DELETE_ENTRY,processDeleteEntry);

        registerListener(EVENTS.CLOSE_POPUP,processClosePopup);
        
        fireEvent(EVENTS.SHOW_SPINNER,{});

        getAllWorkEntry()
        .then(res => {
            if(res && res && res.length){
                console.log('Store ',res);
                store = res;
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
        unregisterListener(EVENTS.UPDATE_ENTRY_STATUS,processUpdateEntryStatus);
        unregisterListener(EVENTS.UPDATE_ENTRY_STATUS,processUpdateEntryDuration);
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
                    <Input label_class="dark {client_fields.Name ? '' : 'has-error'}" data_type="field" label="Name" hasLabel width_class="width-full" type="text" classes="bg-transparent {client_fields.Name ? '' : 'has-error'}" value={new_client.Name} onChange={handleNewClientChange} data_field="Name" Required/>
                </div>
                <div class="flex flex-column form-column grow">
                    <Input label_class="dark {client_fields.Rate ? '' : 'has-error'}" data_type="field" label="Rate (Per Hour)" hasLabel width_class="width-full" type="text" classes="bg-transparent {client_fields.Rate ? '' : 'has-error'}" value={new_client.Rate} onChange={handleNewClientChange} data_field="Rate" Required/>
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
                    <Input label_class="dark {entry_fields.Start_Date ? '' : 'has-error'}" data_type="field" label="Date" hasLabel width_class="width-full" type="date" classes="bg-transparent {entry_fields.Start_Date ? '' : 'has-error'}" value={new_entry.Start_Date} onChange={handleNewEntryChange} data_field="Start_Date" Required/>
                </div>
                
                <div class="flex flex-column form-column grow">
                    <Input label_class="dark" data_type="field" label="Payment Status" hasLabel width_class="width-full" type="select" classes="bg-transparent {getEntryPaymentStatusClass(new_entry.Payment_Status)}" value={new_entry.Payment_Status} onChange={handleNewEntryChange} data_field="Payment_Status" options={PAYMENT_STATUS} Required/>
                </div>
            </div>
            <div class="flex form-row">
                <div class="flex flex-column form-column grow">
                    <Input label_class="dark {entry_fields.Start_Time ? '' : 'has-error'}" data_type="field" label="Start Time" hasLabel width_class="width-full" type="time" classes="bg-transparent {entry_fields.Start_Time ? '' : 'has-error'}" value={new_entry.Start_Time} onChange={handleNewEntryChange} data_field="Start_Time" Required/>
                </div>

                <div class="flex flex-column form-column grow">
                    <Input label_class="dark" data_type="field" label="Duration" hasLabel width_class="width-full" type="select" classes="bg-transparent" bind:value={new_entry.Duration} onChange={handleNewEntryChange} data_field="Duration" options={ENTRY_DURATIONS} Required />
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