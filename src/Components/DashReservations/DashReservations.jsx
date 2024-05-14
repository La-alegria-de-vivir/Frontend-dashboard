import React, { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DashReservation() {
  const [reservations, setReservations] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reservationIdToDelete, setReservationIdToDelete] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await fetch(`/api/reserve/getreservations`);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        if (data) {
          console.log("Reservas recibidas:", data);
          setReservations(data.slice(0, 5));
          if (data.length <= 5) {
            setShowMore(false);
          }
        } else {
          console.log("La respuesta de la API no contiene reservaciones:", data);
        }
      } else {
        console.log("Error al obtener las reservas:", res.status);
      }
    } catch (error) {
      console.log("Error en la solicitud de reservas:", error.message);
    }
  };

  const handleShowMore = async () => {
    const startIndex = reservations.length;
    try {
      const res = await fetch(`/api/reserve/getreservations?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setReservations((prev) => [...prev, ...data]);
        if (data.length < 5) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteReservation = async () => {
    try {
      const res = await fetch(`/api/reserve/deletereservations/${reservationIdToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setReservations((prev) => prev.filter((reservation) => reservation._id !== reservationIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className='table-auto overflow-y-hidden md:mx-auto p-3 h-screen mt-24 w-full'>
      <div className="overflow-y-auto h-full">
        {reservations.length > 0 ? (
          <>
            <table className='min-w-full divide-y divide-gray-200 shadow-md'>
              <thead className='bg-gray-50'>
                <tr>
                  <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5'>
                    Nombre
                  </th>
                  <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20]'>
                    Telef
                  </th>
                  <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5'>
                    Hora
                  </th>
                  <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5'>
                    Fecha
                  </th>
                  <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5'>
                    Lugar
                  </th>
                  <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5'>
                    Comensales
                  </th>
                  <th scope='col' className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {reservations.map((reservation) => (
                  <tr key={reservation._id}>
                    <td className='px-4 py-4 whitespace-nowrap'>{reservation.name}</td>
                    <td className='px-4 py-4 whitespace-nowrap'>{reservation.phoneNumber}</td>
                    <td className='px-4 py-4 whitespace-nowrap'>{reservation.hour}</td>
                    <td className='px-4 py-4 whitespace-nowrap'>{formatDate(reservation.date)}</td>
                    <td className='px-4 py-4 whitespace-nowrap'>{reservation.place}</td>
                    <td className='px-4 py-4 whitespace-nowrap'>{reservation.people}</td>
                    <td className='px-4 py-4 whitespace-nowrap'>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setReservationIdToDelete(reservation._id);
                        }}
                        className='text-red-500 hover:underline cursor-pointer mr-4'
                      >
                        Borrar
                      </span>
                      <Link
                        className='text-teal-500 hover:underline'
                        to={`/update-reservation/${reservation._id}`}
                      >
                        Actualizar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showMore && (
              <button
                onClick={handleShowMore}
                className='w-full text-teal-500 self-center text-sm py-7'
              >
                Mostrar más
              </button>
            )}
          </>
        ) : (
          <p>Aún no tienes ninguna reservación!</p>
        )}
      </div>
      {showModal && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
            </div>
            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'></span>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <HiOutlineExclamationCircle className='h-6 w-6 text-red-600' />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-title'>
                      ¿Seguro que quieres eliminar esta reservación?
                    </h3>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  onClick={handleDeleteReservation}
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  Sí, estoy seguro
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                >
                  No, cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

