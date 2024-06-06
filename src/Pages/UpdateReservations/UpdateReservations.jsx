import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateReservations = () => {
    const [showModal, setShowModal] = useState(false);
    const [reservationData, setReservationData] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const { reservationId } = useParams();

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
            }
        };

        if (reservationId) {
            fetchReservationData();
        }
    }, [reservationId]);

    const handleSubmit = async (values) => {
        values.date = new Date(values.date).toISOString().split('T')[0];

        try {
            const response = await fetch(`/api/reserve/update-reservations/${reservationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                const updatedResponse = await fetch(`/api/reserve/getreservations/${reservationId}`);
                if (updatedResponse.ok) {
                    const updatedData = await updatedResponse.json();
                    setReservationData(updatedData);
                    setShowModal(true);
                } else {
                    throw new Error('Error al obtener datos de reserva actualizados');
                }
            } else {
                const data = await response.json();
                if (data.message.includes('superado el número máximo de comensales') || data.message.includes('límite de comensales permitidos')) {
                    setShowAlert(true);
                } else {
                    throw new Error('Error al actualizar reserva');
                }
            }
        } catch (error) {
            console.error('Error al actualizar reserva:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/dashboard?tab=reservations');
    };

    const allowedTimes = [
        'Selecciona la hora', '12:30', '12:45', '13:00', '13:15',
        '13:30', '13:45', '14:00', '14:15',
        '14:30', '14:45', '15:00', '15:15',
        '15:30', '15:45', '16:00', '16:15',
        '16:30', '16:45', '17:00', 
        '20:00', '20:15', '20:30', '20:45',
        '21:00', '21:15', '21:30', '21:45',
        '22:00', '22:15', '22:30', '22:45',
        '23:00', '23:15', '23:30' 
    ];

    const isHourBetween = (hour, minHour, maxHour, minutes = 0) => {
        if (hour > minHour && hour < maxHour) return true;
        if (hour === minHour && (minutes === 0 || minutes >= 30)) return true;
        if (hour === maxHour && (minutes === 0 || minutes <= 30)) return true;
        return false;
    };

    return (
        <section className="max-w-4xl mx-auto bg-white bg-opacity-75 p-6 rounded-lg shadow-md">
            <div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 mt-0 lg:mt-0 xl:mt-0 text-center" style={{ marginTop: '6rem' }}>Actualizar <span className='text-[#BBBC4E]'>Reserva</span></h2>
                {showAlert && (
                    <div className="bg-red-200 text-red-800 p-3 rounded-md mb-4">
                        Se ha superado el número máximo de comensales para ese horario. Contacte con nosotros.
                    </div>
                )}
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

                                    const selectedDate = new Date(values.date);
                                    const selectedDay = selectedDate.getDay(); 
                                    const selectedHour = parseInt(values.hour.substring(0, 2)); 
                                    const selectedMinutes = parseInt(values.hour.substring(3)); 

                                    if (selectedDay === 1 || selectedDay === 2) {
                                        errors.date = 'No se pueden hacer reservas los lunes y martes.';
                                    } else if (selectedDay === 0) {
                                        if (!isHourBetween(selectedHour, 12, 17, selectedMinutes)) {
                                            errors.hour = '¡Hora no válida!. Horario de reserva para Domingo es de 12:30 a 17:00.';
                                        }
                                    } else if (selectedDay >= 3 || selectedDay <= 6) {
                                        if (
                                            !isHourBetween(selectedHour, 12, 17, selectedMinutes) &&
                                            !isHourBetween(selectedHour, 20, 23, selectedMinutes)
                                        ) {
                                            errors.hour = '¡Hora no válida!. Horario de reserva de Miércoles a Sábado es de 12:30 a 17:00 y de 20:00 a 23:30.';
                                        }
                                    }

                                    // Validar el número de teléfono
                                    const phoneNumberRegex = /^\d{9}$/;
                                    if (!phoneNumberRegex.test(values.phoneNumber)) {
                                        errors.phoneNumber = 'El número de teléfono debe contener 9 dígitos numéricos.';
                                    }

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
                                                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 mt-1" />
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
                                                <ErrorMessage name="date" component="div" className="text-red-500 mt-1" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="hour" className="block font-medium mb-1">Hora</label>
                                                <Field as="select" id="hour" name="hour" className="w-full p-2 border border-gray-300 rounded-md">
                                                    {allowedTimes.map((time) => (
                                                        <option key={time} value={time}>{time}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="hour" component="div" className="text-red-500 mt-1" />
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex justify-between">
                                            <button type="submit" className="bg-[#AEAF50] text-white px-4 py-2 rounded-md">Actualizar Reserva</button>
                                            <button type="button" onClick={() => resetForm()} className="bg-green-500 text-white px-4 py-2 rounded-md">Reiniciar</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </aside>
                </div>
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <h3 className="text-2xl font-bold mb-4">Reserva Actualizada</h3>
                            <p>Su reserva ha sido actualizada con éxito.</p>
                            <button onClick={handleCloseModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default UpdateReservations;
