import { API } from "./constants";

export const getAllWorkEntry = () => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry,{
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
          }
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};

export const getClients = () => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.client,{
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
          }
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};

export const createClient = (_client) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.client,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
        },
        body : JSON.stringify(_client)
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};

export const deleteClient = (client_id) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.client+'/'+client_id,{
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};

export const createTimeEntry = (_entry) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
        },
        body : JSON.stringify(_entry)
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};

export const deleteTimeEntry = (entry_id) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry+'/'+entry_id,{
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};

export const updateEntryStatus = (entry) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry+'/'+entry._id,{
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
        },
        body : JSON.stringify({
            payment_status : entry.payment_status
        })
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};

export const updateEntryDuration = (entry) => {
    return fetch(API.BASE_ENDPOINT+API.ENDPOINTS.work_entry+'/'+entry._id,{
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '6289328e4cca5010d1293f02',
        },
        body : JSON.stringify({
            duration : entry.duration
        })
    })
    .then(res => res.json())
    .catch(err => {
        console.error('getUserDataCallout : ',err);
    });
};





