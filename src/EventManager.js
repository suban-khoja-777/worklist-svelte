const events = {};

const EVENTS = {
    SHOW_SPINNER : 'SHOW_SPINNER',
    HIDE_SPINNER : 'HIDE_SPINNER',
    

    SELECT_CLIENT : "SELECT_CLIENT",
    OPEN_NEW_CLIENT_POPUP : "OPEN_NEW_CLIENT_POPUP",
    DELETE_CLIENT : "DELETE_CLIENT",
    SEND_NEW_CLIENT : "SEND_NEW_CLIENT",
    SEND_REMOVE_CLIENT : "SEND_REMOVE_CLIENT",

    OPEN_NEW_ENTRY_POPUP : "OPEN_NEW_ENTRY_POPUP",
    OPEN_VIEW_ENTRY_POPUP : "OPEN_VIEW_ENTRY_POPUP",
    OPEN_EDIT_ENTRY_POPUP : "OPEN_EDIT_ENTRY_POPUP",
    UPDATE_ENTRY_STATUS : "UPDATE_ENTRY_STATUS",
    DELETE_ENTRY : "DELETE_ENTRY",

    CLOSE_POPUP : "CLOSE_POPUP"
}

Object.freeze(EVENTS);

const registerListener = (eventName, callback) => {
    if(!eventName || !callback) return;
    try {
        if (!events[eventName]) {
            events[eventName] = [];
        }
        
        const duplicate = events[eventName].find((listener) => {
            return listener.callback == callback;
        });

        if (!duplicate) {
            events[eventName].push({ callback});
        }
    } catch (error) {
        console.error('@error : ',error)
    }

};

const unregisterListener = (eventName, callback) => {
    try {
        if (events[eventName]) {
            events[eventName] = events[eventName].filter(cb => cb.callback != callback);
        }
    } catch (error) {
        console.error('@error : ',error)
    }
  };
 
const fireEvent = (eventName, payload) => {
    if (events[eventName]) {
        const listeners = events[eventName];
        listeners.forEach((listener) => {       
            try {
                listener.callback.call(this,payload);
            } catch (error) {
                console.error('@eventName : ',eventName);
                console.error('@listener : ',listener);
                console.error('@payload : ',payload);       
                console.error('@error : ',error)
            }
        });
    }
};

export {
    registerListener,
    unregisterListener,
    fireEvent,
    EVENTS
};
 