import { API } from "./constants";

export const getWorkEntry = () => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry,{
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getWorkEntry : ',err);
    });
};

export const getClients = () => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.client,{
        headers: {
            'Content-Type': 'application/json'
          }
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getClients : ',err);
    });
};

export const createClient = (_client) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.client,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(_client)
    })
    .then(res => res.json())
    .catch(err => {
        console.error('createClient : ',err);
    });
};

export const deleteClient = (client_id) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.client,{
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            Id : client_id
        })
    })
    .then(res => res.json())
    .catch(err => {
        console.error('deleteClient : ',err);
    });
};

export const createTimeEntry = (_entry) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(_entry)
    })
    .then(res => res.json())
    .catch(err => {
        console.error('createTimeEntry : ',err);
    });
};

export const deleteTimeEntry = (entry_id) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry,{
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            Id : entry_id
        })
    })
    .then(res => res.json())
    .catch(err => {
        console.error('deleteTimeEntry : ',err);
    });
};

export const updateEntryStatus = (entry) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry,{
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            Id : entry._id,
            Payment_Status : entry.Payment_Status
        })
    })
    .then(res => res.json())
    .catch(err => {
        console.error('updateEntryStatus : ',err);
    });
};

export const updateEntryDuration = (entry) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry,{
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            Id : entry._id,
            Duration : entry.Duration
        })
    })
    .then(res => res.json())
    .catch(err => {
        console.error('updateEntryDuration : ',err);
    });
};





