import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from 'hooks/useFetch';
import moment from 'moment';
import { Box, CircularProgress, IconButton, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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
  const { data, loading, error, reFetch } = useFetch('/hotels/');
  const [open, setOpen] = useState(false);

  const [credentials, setCredentials] = useState({
    name: undefined,
    type: undefined,
    city: undefined,
    address: undefined,
    distance: undefined,
    photos: undefined,
    cheapestPrice: undefined,
    desc: undefined,
    title: undefined,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.toLowerCase(),
    }));
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 240 },
    { field: 'name', headerName: 'Name', width: 130, editable: true },
    { field: 'type', headerName: 'Type', width: 200, editable: true },
    { field: 'city', headerName: 'City', width: 130, editable: true },
    { field: 'address', headerName: 'Address', width: 130, editable: true },
    { field: 'distance', headerName: 'Distance', width: 130, editable: true },
    {
      field: 'cheapestPrice',
      headerName: 'Price',
      width: 130,
      editable: true,
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
    await axios.post('/hotels', credentials);
    reFetch();
    toast('Created new Hotel');
    handleClose();
  };

  const onDeletButtonClicked = async (id) => {
    await axios.delete(`/hotels/${id}`);
    reFetch();
    toast(`Deleted hotel ${id}`);
  };

  const onUpdateButtonClicked = async (id, field, value) => {
    await axios.put(`/hotels/${id}`, {
      [field]: value,
    });
    reFetch();
    toast(`Updated field: ${field.toUpperCase()} on location ${id}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mt-10 ">
            Location Administration
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
              Add Location
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
                <h2>Add Location</h2>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="name"
                      id="name"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Type
                    </label>
                    <input
                      type="text"
                      placeholder="type"
                      id="type"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="city"
                      id="city"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="address"
                      id="address"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Distance
                    </label>
                    <input
                      type="text"
                      placeholder="distance"
                      id="distance"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Photo
                    </label>
                    <input
                      type="text"
                      placeholder="photo"
                      id="photos"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Price
                    </label>
                    <input
                      type="text"
                      placeholder="price"
                      id="cheapestPrice"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="description"
                      id="desc"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="title"
                      id="title"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
                    Create New Location
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
