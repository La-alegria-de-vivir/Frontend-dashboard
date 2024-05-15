import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateReservations = () => {
    const [showModal, setShowModal] = useState(false);
    const [reservationData, setReservationData] = useState(null);
    const navigate = useNavigate();
    const { reservationId } = useParams(); // Mover useParams aquí
    
    useEffect(() => {
        const fetchReservationData = async () => {
            try {
                const response = await fetch(`/api/reserve/getreservations/${reservationId}`);
                if (response.ok) {
                    const data = await response.json();
                    setReservationData(data);
                } else {
                    throw new Error('Error al obtener datos de reserva');
                }
            } catch (error) {
                console.error('Error al obtener datos de reserva:', error);
                // Manejar el error de alguna manera
            }
        };
    
        if (reservationId) {
            fetchReservationData();
        }
    }, [reservationId]);

    const handleSubmit = async (values) => {
        // Formatear la fecha antes de enviarla
        values.date = new Date(values.date).toISOString().split('T')[0];
    
        try {
            const response = await fetch(`/api/reserve/update-revervations/${reservationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });
            console.log(reservationId);
            if (response.ok) {
                // Refrescar los datos de la reserva actualizada
                const updatedResponse = await fetch(`/api/reserve/getreservations/${reservationId}`);
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setReservationData(updatedData); // Actualizar los datos de la reserva
                    setShowModal(true); // Mostrar el modal
                } else {
                    throw new Error('Error al obtener datos de reserva actualizados');
                }
            } else {
                throw new Error('Error al actualizar reserva');
            }
        } catch (error) {
            console.error('Error al actualizar reserva:', error);
            // Puedes manejar el error de alguna manera
        }
    };
    
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan en 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/dashboard?tab=reservations');
    };

    return (
        <div className="max-w-4xl mx-auto bg-white bg-opacity-75 p-6 rounded-lg shadow-md">
            <div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 mt-0 lg:mt-0 xl:mt-0 text-center" style={{ marginTop: '6rem' }}>Actualizar <span className='text-[#BBBC4E]'>Reserva</span></h2>
                <div className="flex justify-center mt-8">
                    <aside className="w-[23] p-4 ml-15">
                        {!reservationData ? (
                            <div>Cargando...</div>
                        ) : (
                            <Formik
                                initialValues={{
                                    name: reservationData.name || '',
                                    people: reservationData.people || 1,
                                    place: reservationData.place || 'Sala',
                                    date: reservationData.date || '',
                                    hour: reservationData.hour || '',
                                    phoneNumber: reservationData.phoneNumber || ''
                                }}
                                validate={(values) => {
                                    const errors = {};
                                    if (values.people < 1) {
                                        errors.people = 'El número mínimo de comensales es 1';
                                    } else if (values.people > 10) {
                                        errors.people = 'El número máximo de comensales es 10';
                                    }
                                    // Puedes agregar más validaciones aquí si es necesario
                                    return errors;
                                }}
                                onSubmit={(values) => {
                                    handleSubmit(values);
                                }}
                            >
                                {({ resetForm }) => (
                                    <Form className="w-full grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-4">
                                                <label htmlFor="name" className="block font-medium mb-1">Nombre</label>
                                                <Field type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-md" />
                                                <ErrorMessage name="name" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="people" className="block font-medium mb-1">Número de comensales</label>
                                                <Field type="number" id="people" name="people" className="w-full p-2 border border-gray-300 rounded-md" min="1" max="10" />
                                                <ErrorMessage name="people" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="phoneNumber" className="block font-medium mb-1">Número de teléfono</label>
                                                <Field type="tel" id="phoneNumber" name="phoneNumber" className="w-full p-2 border border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-4">
                                                <label htmlFor="place" className="block font-medium mb-1">Lugar</label>
                                                <Field as="select" id="place" name="place" className="w-full p-2 border border-gray-300 rounded-md">
                                                    <option value="Sala">Sala</option>
                                                    <option value="Terraza">Terraza</option>
                                                </Field>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="date" className="block font-medium mb-1">Fecha</label>
                                                <Field type="date" id="date" name="date" className="w-full p-2 border border-gray-300 rounded-md" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="hour" className="block font-medium mb-1">Hora</label>
                                                <Field type="time" id="hour" name="hour" className="w-full p-2 border border-gray-300 rounded-md" />
                                            </div>
                                        </div>
                                        <button type="submit" className="bg-gradient-to-r from-[#AEAF50] to-[#F3C14C] hover:from-[#adaf50bd] hover:to-[#F3C14C] text-white font-bold py-2 px-4 rounded-md col-span-2">Actualizar Reserva</button>
                                    </Form>
                                )}
                            </Formik>
                        )}
                        <p className='mt-4 text-center text-black font-bold'>Para grupos superiores a 10 personas, contacta con el restaurante. Gracias</p>
                    </aside>
                </div>
                {/* Modal de confirmación */}
                {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-md max-w-md">
            <h3 className="text-2xl font-bold mb-4">Resumen de la reserva</h3>
            <div>
                <p><strong>Nombre:</strong> {reservationData.name}</p>
                <p><strong>Número de comensales:</strong> {reservationData.people}</p>
                <p><strong>Lugar:</strong> {reservationData.place}</p>
                <p><strong>Fecha:</strong> {formatDate(reservationData.date)}</p> {/* Formatear la fecha */}
                <p><strong>Hora:</strong> {reservationData.hour}</p>
                <p><strong>Teléfono:</strong> {reservationData.phoneNumber}</p>
            </div>
            <p className="text-green-500 mt-4">Reserva actualizada correctamente</p> {/* Agregar mensaje de éxito */}
            <div className="flex justify-end mt-4">
                <button onClick={handleCloseModal} className="bg-gradient-to-r from-[#AEAF50] to-[#F3C14C] hover:from-[#adaf50bd] hover:to-[#F3C14C] text-white font-bold py-2 px-4 rounded-md">Cerrar</button>
            </div>
        </div>
    </div>
)}


            </div>
        </div>
    );
};

export default UpdateReservations;
