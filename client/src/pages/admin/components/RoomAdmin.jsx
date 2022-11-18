import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useFetch from 'hooks/useFetch';
// @ts-ignore
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

const RoomAdmin = () => {
  // @ts-ignore
  const { data, loading, error, reFetch } = useFetch('/rooms/');

  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [hotelData, setHotelData] = useState();
  const [hotelId, setHotelId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/hotels/');
      setHotelData(response.data);
    };

    fetchData();
  }, []);

  const [credentials, setCredentials] = useState({
    title: undefined,
    hotelId: undefined,
    desc: undefined,
    price: undefined,
    maxPeople: undefined,
    roomNumbers: undefined,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 240 },
    { field: 'hotelId', headerName: 'Location ID', width: 240 },
    { field: 'title', headerName: 'Title', width: 130, editable: true },
    { field: 'desc', headerName: 'Desc', width: 200, editable: true },
    { field: 'price', headerName: 'Price', width: 130, editable: true },
    {
      field: 'maxPeople',
      headerName: 'Max People',
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
                onDeletButtonClicked(params.id, params.row.hotelId);
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
    const roomNumbers = rooms.split(',').map((room) => ({ number: room }));

    await axios.post(`/rooms/${hotelId}`, {
      ...credentials,
      hotelId: hotelId,
      roomNumbers,
    });

    reFetch();
    toast('Created new Room');
    handleClose();
  };

  const onDeletButtonClicked = async (id, hotelId) => {
    await axios.delete(`/rooms/${id}/${hotelId}`);
    reFetch();
    toast(`Deleted room ${id}`);
  };

  const onUpdateButtonClicked = async (id, field, value) => {
    await axios.put(`/rooms/${id}`, {
      [field]: value,
    });
    reFetch();
    toast(`Updated field: ${field.toUpperCase()} on room ${id}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 mt-10">
            Rooms Administration
          </h2>
          <div style={{ height: 800, width: '100%', marginTop: '50px' }}>
            <button
              onClick={handleOpen}
              className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700 mb-5"
            >
              Add Room
            </button>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={100}
              disableSelectionOnClick
              rowsPerPageOptions={[5]}
              getRowId={(row) => row._id}
              // @ts-ignore
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
                <h2>Add Room</h2>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <div>
                      <label>Choose a location</label>
                      <select
                        id="hotelId"
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          setHotelId(e.target.value);
                        }}
                      >
                        {hotelData &&
                          // @ts-ignore
                          hotelData.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>
                              {hotel.name}
                            </option>
                          ))}
                      </select>
                    </div>
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

                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="desc"
                      id="desc"
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
                      type="number"
                      placeholder="price"
                      id="price"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Max People
                    </label>
                    <input
                      type="number"
                      placeholder="maxPeople"
                      id="maxPeople"
                      required
                      onChange={handleChange}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <textarea
                      // @ts-ignore
                      onChange={(e) => setRooms(e.target.value)}
                      placeholder="Room Numbers: give comma between room numbers."
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
                    Create New Room
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

export default RoomAdmin;
