import * as React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbarContainer, GridToolbarExport, GridCsvExportOptions, GridValueGetterParams, GridValueFormatterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { logs } from '../../data/dbMock';

interface GridCellExpandProps {
    value: string;
    width: number;
}

function isOverflown(element: Element): boolean {
return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
);
}

const GridCellExpand = React.memo(function GridCellExpand(
    props: GridCellExpandProps,
  ) {
    const { width, value } = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current!);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      function handleKeyDown(nativeEvent: KeyboardEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <Box
        ref={wrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
            alignItems: 'center',
            lineHeight: '24px',
            width: 1,
            height: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
        }}
      >
        <Box
          ref={cellDiv}
          sx={{
            height: 1,
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <Box
          ref={cellValue}
          sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',}}
        >
          {value}
        </Box>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </Box>
    );
});

function renderCellExpand(params: GridRenderCellParams<string>) {
    return (
      <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

const columns: GridColDef[] = [
    { 
        field: 'date',
        headerName: 'Pickup Date', 
        width: 160,
        sortable: true,
        headerAlign: 'center',
        type: 'dateTime',
        valueFormatter: (params: GridValueFormatterParams) => {
            const date = new Date(params.value);
            return date.toDateString().replace(/^\S+\s/,'')
        },
        valueGetter: ({ value }) => value && new Date(value),
        align: 'center',
    },
    { 
        field: 'driverName', 
        headerName: 'Driver Name', 
        width: 130,
        headerAlign: 'center',
        align: 'center',
        renderCell: renderCellExpand
    },
    { 
        field: 'vehicle', 
        headerName: 'Vehicle', 
        width: 130,
        headerAlign: 'center',
        align: 'center',
        renderCell: renderCellExpand,
    },
    { 
        field: 'foodType', 
        headerName: 'Food Type', 
        width: 130,
        headerAlign: 'center',
        align: 'center',
        renderCell: renderCellExpand,
    },
    { 
        field: 'lbsPickedUp', 
        headerName: 'lbs. Picked', 
        width: 130,
        headerAlign: 'center',
        align: 'center'
    },
    { 
        field: 'locationType', 
        headerName: 'Location Type', 
        width: 130,
        headerAlign: 'center', 
        align: 'center',
        renderCell: renderCellExpand,
    },
    { 
        field: 'donorEntityType', 
        align: 'center',
        headerName: 'Farm', 
        width: 130,
        headerAlign: 'center',
        renderCell: renderCellExpand,
    },
    { 
        field: 'area', 
        headerName: 'Area', 
        width: 130,
        headerAlign: 'center',
        align: 'center',
        renderCell: renderCellExpand,
    },
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