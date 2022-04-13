import * as React from 'react';
import { DataGrid, GridColDef, GridToolbar, GridToolbarContainer, GridToolbarExport, GridCsvExportOptions, GridValueGetterParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { logs } from '../../data/dbMock';

const columns: GridColDef[] = [
    { 
        field: 'date',
        headerName: 'Pickup Date', 
        width: 160,
        sortable: true,
        headerAlign: 'center',
        type: 'date',
        valueFormatter: (params: GridValueFormatterParams) => {
            const date = new Date(params.value);
            return date.toDateString().replace(/^\S+\s/,'')
        },
        align: 'center'
        // valueGetter: (params: GridValueGetterParams) => {
        //     const date = new Date(params.value);
        //     return date.toDateString().replace(/^\S+\s/,'');
        // },
    },
    { 
        field: 'driverName', 
        headerName: 'Driver Name', 
        width: 130,
        headerAlign: 'center',
        align: 'center'
    },
    { 
        field: 'vehicle', 
        headerName: 'Vehicle', 
        width: 130,
        headerAlign: 'center',
        align: 'center'
    },
    { 
        field: 'foodType', 
        headerName: 'Food Type', 
        width: 130,
        headerAlign: 'center',
        align: 'center'
    },
    { 
        field: 'lbsPickedUp', 
        headerName: 'lbs. Picked', 
        width: 100,
        headerAlign: 'center',
        align: 'center'
    },
    { 
        field: 'locationType', 
        headerName: 'Location Type', 
        width: 130,
        headerAlign: 'center', 
        align: 'center'
    },
    { 
        field: 'donorEntityType', 
        headerName: 'Farm', 
        width: 180,
        headerAlign: 'center',
        align: 'center'
    },
    { 
        field: 'area', 
        headerName: 'Area', 
        width: 130,
        headerAlign: 'center',
        align: 'center'
    },
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

const GridCustomToolbarExport = (props: GridCsvExportOptions) => {
    return (
      <GridToolbarExport
        csvOptions={{fileName: 'logs'}}
      />
    );
  };

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridCustomToolbarExport />
      </GridToolbarContainer>
    );
  }


const s = "02-Jan-21";
const d = new Date(s);
console.log(d);


export default function DataTable() {
    return (
        <div className='bg-green-50 w-screen h-screen'>
            <div className='font-poppins flex items-center flex-col space-y-[50px]'>
                <h4 className='mt-[50px] text-[50px] text-[#555555]'>
                    Logs
                </h4>
                <div className='w-[1120px] h-[550px] mb-[1000px]'>
                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar
                        }}
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