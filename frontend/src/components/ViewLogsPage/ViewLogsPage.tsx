import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { logs } from '../../data/dbMock';

const columns: GridColDef[] = [
    { field: 'date', headerName: 'Pickup Date', width: 130},
    { field: 'driverName', headerName: 'Driver Name', width: 130 },
    { field: 'vehicle', headerName: 'Vehicle', width: 130 },
    { field: 'foodType', headerName: 'Food Type', width: 130 },
    { field: 'lbsPickedUp', headerName: 'Pounds Picked Up', width: 130 },
    { field: 'locationType', headerName: 'Location Type', width: 130 },
    { field: 'donorEntityType', headerName: 'Farm', width: 130 },
    { field: 'area', headerName: 'Area', width: 130 },
    // {field: 'age', headerName: 'Age', type: 'number', width: 90},
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

let i = 0;
const rows = logs?.map((log) => {
    return {
        id: i++,
        date: log.date,
        driverName: log.driver,
        vehicle: log.vehicle,
        name: log.name,
        foodType: log.foodType,
        lbsPickedUp: log.lbsPickedUp,
        locationType: log.locationType,
        donorEntityType: log.donorEntityType,
        area: log.area
    } 
});


export default function DataTable() {
    return (
        <div className='bg-green-50 w-screen h-screen'>
            <div className='font-poppins flex items-center flex-col space-y-[50px]'>
                <h4 className='mt-[50px] text-[50px] text-[#555555]'>
                    Logs
                </h4>
                <div className='w-[1120px] h-[650px] mb-[1000px]'>
                    <DataGrid
                        sx={{
                            borderRadius: 3,
                            boxShadow: 4,
                            bgcolor: 'white',
                            fontFamily: 'poppins',
                        }}
                        rows={rows}
                        getRowId={(row) => row.id}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </div>
            </div>
        </div>
    );
}