
const Columns = [
    {
        //id:'logID',
        Header: 'Log Id',
        accessor:'logId'
        // selector: (row) => row.logId,
        // sortable:true,
        // style: {
        //     n: "r"
        // },
    },
    {
        Header: 'Application Type',
        accessor: 'applicationType'
        // id:'applicationType',
        // name: 'Application Type',
        // selector: (row) => row.applicationType,
        // sortable:true
    },
    {
        Header: 'Application Id',
        accessor: 'applicationId'
        // id:'applicationId',
        // name: 'Application Id',
        // selector: (row) => row.applicationId,
        // sortable:true
    },
    {
        Header: 'Action',
        accessor:'actionType'
        // id:'action',
        // name: 'Action',
        // selector: (row) => row.actionType,
        // sortable:true
    },
    {
        Header:'Date:Time',
        accessor: 'creationTimestamp'
        // id:'DateTIme',
        // name: 'Date:Time',
        // selector: (row) => row.creationTimestamp,
        // sortable:true
    }
]
export default Columns;