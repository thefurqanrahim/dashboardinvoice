import React, { useState } from 'react';

//MUI Design Library
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { visuallyHidden } from '@mui/utils';

//Api
import { getUser, deleteUser } from '../utils/HandleApi';
import { useNavigate } from 'react-router-dom';

interface Data {
  calories: number;
  carbs: string;
  fat: string;
  name: string;
  protein: string;
}

function createData(
  name: string,
  calories: number,
  fat: string,
  carbs: string,
  protein: string,
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Due Date',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Activities',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant="h6"
        id="tableTitle"
      component="div"
      >
        Invoice
      </Typography>
    </Toolbar>
  );
}


type ResultProps = {
  user: any,
  setUser: any
  update: boolean,
  setUpdate: any,
  data: any,
  setData: any,
  userId: any,
  setUserId: any
}

export default function EnhancedTable({ user, setUser, update, setUpdate, data, setData, userId, setUserId }: ResultProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('calories');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [dense, setDense] = useState(true);

  React.useEffect(() => {
    getUser(setUser)
  }, [])


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = user.map((n: any) => n.username);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const navigate = useNavigate()
  const onUserUpdate = (_id: any, data: any) => {
    setUpdate(true)
    setUserId(_id)
    setData(data)
    navigate("/form")

  }


  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={user.length}
            />
            <TableBody>
              {user && user.map((row: any, index: any) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={row._id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell >
                      {index + 1}
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.userName}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => onUserUpdate(row._id, row)}>
                        <EditCalendarIcon sx={{ color: 'blue' }} />
                      </IconButton>
                      <IconButton onClick={() => deleteUser(row._id, setUser)}>
                        <DeleteIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
