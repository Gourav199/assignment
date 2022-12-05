
const Columns = [
    {
        id:'logID',
        name: 'Log Id',
        selector: (row) => row.logId,
        sortable:true,
        style: {
            n: "r"
        },
    },
    {
        id:'applicationType',
        name: 'Application Type',
        selector: (row) => row.applicationType,
        sortable:true
    },
    {
        id:'applicationId',
        name: 'Application Id',
        selector: (row) => row.applicationId,
        sortable:true
    },
    {
        id:'action',
        name: 'Action',
        selector: (row) => row.actionType,
        sortable:true
    },
    {
        id:'DateTIme',
        name: 'Date:Time',
        selector: (row) => row.creationTimestamp,
        sortable:true
    }
]
export default Columns;