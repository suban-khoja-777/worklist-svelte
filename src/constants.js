
export const APP_NAME = 'onelist';

const API = {
    BASE_ENDPOINT : 'https://worklist1-935b.restdb.io/rest/',
    ENDPOINTS : {
        "work_entry" : 'work-entry',
        "client" : 'client'
    }
};

const MONTH = {
    "01" : "January",
    "02" : "February",
    "03" : "March",
    "04" : "April",
    "05" : "May",
    "06" : "June",
    "07" : "July",
    "08" : "August",
    "09" : "September",
    "10" : "October",
    "11" : "November",
    "12" : "December"

}

const DEFAULTS = {
    PAYMENT_STATUS : "Pending",
    DURATION : 60
}

const PAYMENT_STATUS = [
    "Pending",
    "Paid"
];

const ENTRY_DURATIONS = [30,60,90,120,150];

const ENTRY_COLUMN = [
    {
        label : "Date",
        key : "start_date",
        show_in_list : true,
        show_in_detail : true,
        show_header : true,
        allow_inline_edit : false,
        field_type : "date"
    },
    {
        label : "Start Time",
        key : "start_time",
        show_in_list : true,
        show_in_detail : false,
        show_header : true,
        allow_inline_edit : true,
        field_type : "time"
    },
    {
        label : "Duration",
        key : "duration",
        show_in_list : true,
        show_in_detail : false,
        show_header : true,
        allow_inline_edit : true,
        field_type : "select"
    },
    {
        label : "Payment Status",
        key : "payment_status",
        show_in_list : true,
        show_in_detail : true,
        show_header : true,
        allow_inline_edit : true,
        field_type : "select"
    },
    {
        label : "Amount",
        key : "Amount",
        show_in_list : true,
        show_in_detail : false,
        show_header : true,
        allow_inline_edit : false,
        field_type : "text"
    }
];

const getEntryPaymentStatusClass = (_type) => {
    if(!_type) return '';
    return _type.replace(' ','-');
}

const formatDateString = (_dateString) =>{
    if(!_dateString) return '';
    let dateArr = _dateString.split('-');
    return dateArr[2] + ' ' + MONTH[dateArr[1]] + ' ' + dateArr[0]; 
}

const convertDateToString = (_date) =>{
    if(!_date) return '';
    let year = _date.getFullYear();
    let month = _date.getMonth() + 1;
    let date = _date.getDate();
    date = (date < 10) ? '0' + date : date;
    month = (month < 10) ? '0' + month : month;
    return year + '-' + month + '-' + date; 
}

const convertDateToTimeString = (_date) =>{
    if(!_date) return '';
    let hour = _date.getHours();
    let minute = _date.getMinutes();
    let second = _date.getSeconds();
    hour = (hour < 10) ? '0' + hour : hour;
    minute = (minute < 10) ? '0' + minute : minute;
    second = (second < 10) ? '0' + second : second;
    return hour + ':' + minute + ':' + second; 
}

const formatTimeString = (_TimeString) =>{
    if(!_TimeString) return '';
    let timeArr = _TimeString.split(':');
    let _hour = Number(timeArr[0]);
    const isAMPM = _hour >= 12 ? 'PM' : 'AM';
    _hour = (_hour > 12) ? _hour - 12 : _hour;
    _hour = (_hour == 0) ? 12 : _hour;
    _hour = (_hour < 10) ? '0' + _hour : _hour;
    return _hour + ':' + timeArr[1] + ':' + timeArr[2] + ' ' + isAMPM; 
}

Object.freeze(API);
Object.freeze(ENTRY_COLUMN);
Object.freeze(DEFAULTS);
Object.freeze(PAYMENT_STATUS);
Object.freeze(MONTH);
Object.freeze(ENTRY_DURATIONS);

export {
    API,
    ENTRY_COLUMN,
    DEFAULTS,
    PAYMENT_STATUS,
    getEntryPaymentStatusClass,
    formatDateString,
    formatTimeString,
    convertDateToString,
    convertDateToTimeString,
    ENTRY_DURATIONS
};




