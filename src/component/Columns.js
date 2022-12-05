const Columns = [
    {
        name: 'Log Id',
        selector: (row) => row.logId,
        sortable:true
    },
    {
        name: 'Application Type',
        selector: (row) => row.applicationType,
        sortable:true
    },
    {
        name: 'Application Id',
        selector: (row) => row.applicationId,
        sortable:true
    },
    {
        name: 'Action',
        selector: (row) => row.actionType,
        sortable:true
    },
    {
        name: 'Date:Time',
        selector: (row) => row.creationTimestamp,
        sortable:true
    }
]
export default Columns;