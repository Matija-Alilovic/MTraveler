import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from 'hooks/useFetch';
import moment from 'moment';
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 1,
  p: 4,
};

const UserAdmin = () => {
  const { data, loading, error, reFetch } = useFetch('/users/');
  const [open, setOpen] = useState(false);

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 240 },
    { field: 'username', headerName: 'Username', width: 130, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      renderCell: (params) =>
        moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      width: 200,
      renderCell: (params) =>
        moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
    },
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      type: 'boolean',
      width: 130,
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      width: 80,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => {
                onDeletButtonClicked(params.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.post('/auth/register', credentials);
    reFetch();
    toast('Created new User');
    handleClose();

    console.log(data);
  };

  const onDeletButtonClicked = async (id) => {
    await axios.delete(`/users/${id}`);
    reFetch();
    toast(`Deleted user ${id}`);
  };

  const onUpdateButtonClicked = async (id, field, value) => {
    await axios.put(`/users/${id}`, {
      [field]: value,
    });
    reFetch();
    toast(`Updated field: ${field.toUpperCase()} on user ${id}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mt-10">
            User Administration
          </h2>
          <div
            style={{
              height: 800,
              width: '100%',
              marginTop: '50px',
              marginBottom: '150px',
            }}
          >
            <button
              onClick={handleOpen}
              className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700 mb-5"
            >
              Add User
            </button>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={100}
              disableSelectionOnClick
              rowsPerPageOptions={[5]}
              getRowId={(row) => row._id}
              onCellEditCommit={(params, event) => {
                onUpdateButtonClicked(params.id, params.field, params.value);
              }}
            />
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <form className="space-y-6" action="#" method="POST">
                <h2>Add User</h2>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="username"
                      id="username"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      id="email"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      id="password"
                      onChange={handleChange}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="confirm password"
                      id="password"
                      onChange={handleChange}
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={submitForm}
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Create User
                  </button>
                </div>
              </form>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default UserAdmin;
