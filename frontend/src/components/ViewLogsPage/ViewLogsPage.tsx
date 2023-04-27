import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarExport,
  GridCsvExportOptions,
  GridValueFormatterParams
} from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPickups } from '../../features/pickups/pickupsSlice';
import { getDropoffs } from '../../features/dropoffs/dropoffsSlice';
import AdminHeader from '../AdminHeader/AdminHeader';

// props for expanding cell if too long
interface GridCellExpandProps {
  value: string;
  width: number;
}

// checks if the cell is overflowing the cell width
function isOverflown(element: Element): boolean {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

// handles all the logic and formatting for expanding the cell
const GridCellExpand = React.memo((props: GridCellExpandProps) => {
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

  useEffect(() => {
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
        flexDirection: 'row'
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: 'block',
          position: 'absolute',
          top: 0
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
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

// function that expands the cell
function renderCellExpand(params: GridRenderCellParams<string>) {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
    />
  );
}

// Custom toolbar that only houses the export button
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GridCustomToolbarExport(props: GridCsvExportOptions) {
  return <GridToolbarExport csvOptions={{ fileName: 'logs' }} />;
}

// function to call the custom toolbar
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridCustomToolbarExport />
    </GridToolbarContainer>
  );
}

// Formatting the column headers, its data types, and sorting of the column headers
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
      return date.toDateString().replace(/^\S+\s/, '');
    },
    valueGetter: ({ value }) => value && new Date(value),
    align: 'center'
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
    renderCell: renderCellExpand
  },
  {
    field: 'foodType',
    headerName: 'Food Type',
    width: 130,
    headerAlign: 'center',
    align: 'center',
    renderCell: renderCellExpand
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
    renderCell: renderCellExpand
  },
  {
    field: 'donorEntityType',
    align: 'center',
    headerName: 'Farm',
    width: 130,
    headerAlign: 'center',
    renderCell: renderCellExpand
  },
  {
    field: 'area',
    headerName: 'Area',
    width: 130,
    headerAlign: 'center',
    align: 'center',
    renderCell: renderCellExpand
  }
];

export default function DataTable() {
  const [pickupSelected, setPickupSelected] = useState(true);

  // command for backend: npm start dev
  const dispatch = useAppDispatch();
  const { pickups } = useAppSelector((state) => state.pickups);
  const { dropoffs } = useAppSelector((state) => state.dropoffs);

  useEffect(() => {
    dispatch(getPickups());
    dispatch(getDropoffs());
  }, [dispatch, pickups, dropoffs]);

  function handlePickups() {
    console.log('Pickups');
    setPickupSelected(() => true);
  }

  function handleDropoffs() {
    console.log('Dropoffs');
    setPickupSelected(() => false);
  }

  // MUI state
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);

    if (newAlignment === 'Pickups') {
      handlePickups();
    } else if (newAlignment === 'Dropoffs') {
      handleDropoffs();
    }
  };

  function getData() {
    if (pickupSelected) {
      return pickups;
    }
    return dropoffs;
  }

  // function to display pickups/dropoffs header
  function getLogsText(isPickupSelected: boolean) {
    if (isPickupSelected) {
      return 'Pickups';
    }
    return 'Dropoffs';
  }

  let i = 0;
  const rows = getData()?.map(
    (data: {
      date: String;
      driver: String;
      vehicle: String;
      name: String;
      donorEntityType: String;
      demographic: String;
      area: String;
      foodAllocation: Map<string, number>;
    }) => ({
      id: i++,
      // id: newData.id,
      //
      date: data.date,
      driver: data.driver,
      vehicle: data.vehicle,
      name: data.name,
      donorEntityType: data.donorEntityType,
      demographic: data.demographic,
      area: data.area,
      foodAllocation: data.foodAllocation
    })
  );

  return (
    <div className="bg-white w-screen h-[850px]">
      <AdminHeader />
      <div className="font-poppins flex items-center flex-col space-y-[30px]">
        <h4 className="mt-[50px] text-[28px] text-[#555555] font-bold">Logs</h4>
        <p className="text-[#555555]">{getLogsText(pickupSelected)}</p>
        <div className="w-[1120px] h-[550px] mb-[1000px]">
          <DataGrid
            components={{
              Toolbar: CustomToolbar
            }}
            sx={{
              borderRadius: 3,
              boxShadow: 4,
              bgcolor: 'white',
              fontFamily: 'poppins'
            }}
            rows={rows}
            getRowId={(row) => row.id}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="Pickups">Pickups</ToggleButton>
            <ToggleButton value="Dropoffs">Dropoffs</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </div>
  );
}
