const events = {};

const EVENTS = {
    SHOW_SPINNER : 'SHOW_SPINNER',
    HIDE_SPINNER : 'HIDE_SPINNER',

    SELECT_LIST : "SELECT_LIST",
    OPEN_NEW_LIST_POPUP : "OPEN_NEW_LIST_POPUP",
    OPEN_EDIT_LIST_POPUP : "OPEN_EDIT_LIST_POPUP",
    DELETE_LIST : "DELETE_LIST",

    OPEN_NEW_TASK_POPUP : "OPEN_NEW_TASK_POPUP",
    OPEN_EDIT_TASK_POPUP : "OPEN_EDIT_TASK_POPUP",
    DELETE_TASK : "DELETE_TASK",
    
    OPEN_NEW_COMPONENT_POPUP : "OPEN_NEW_COMPONENT_POPUP",
    OPEN_EDIT_COMPONENT_POPUP : "OPEN_EDIT_COMPONENT_POPUP",
    DELETE_COMPONENET : "DELETE_COMPONENET"
}

Object.freeze(EVENTS);

const registerListener = (eventName, callback) => {  
    if (!events[eventName]) {
        events[eventName] = [];
    }
    const duplicate = events[eventName].find((listener) => {
        return listener.callback === callback;
    });
    if (!duplicate) {
        events[eventName].push({ callback});
    }
};
 
const fireEvent = (eventName, payload) => {
    if (events[eventName]) {
        const listeners = events[eventName];
        listeners.forEach((listener) => {       
            try {
                listener.callback.call(this,payload);
            } catch (error) {
                console.error('@eventName : ',eventName) &&
                console.error('@listener : ',listener) &&
                console.error('@payload : ',payload) &&
                console.error('@error : ',error)
            }
        });
    }
};

export {
    registerListener,
    fireEvent,
    EVENTS
};
 