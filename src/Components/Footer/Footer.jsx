import React from 'react'
import logo from '/logo.png';
import { FaCalendarAlt } from "react-icons/fa";
import { IoNewspaper } from "react-icons/io5";



function Footer() {
  return (
    <div className=''>
<footer className="bg-[#8C1111] text-white">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex ">
          <div className="mb-6 md:mb-0">
          <a className="text-3xl font-bold font-heading" href="/">
              <img
              src={logo}
              width={50}
              height={50}
              className="rounded-full mr-4"
              alt="Picture of the author"
            />
            </a>
          </div>
          <div className="grid grid-cols-4 gap-5 sm:gap-6 sm:grid-cols-3">
              <div className=' ml-10'>
                  <h2 className="mb-6 text-sm  font-semibold text-white">VEN A VISITARNOS</h2>
                  <ul className="text-white-500  font-medium">
                      <li className="mb-4">
                          <a href="https://maps.app.goo.gl/TrdWgmpdWXvLi7dq7" className="hover:underline text-sm">Av. de Isabel la Católica, 5, <br/> 28320 Pinto, Madrid</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-white uppercase">HORARIOS</h2>
                  <ul className="text-white  font-medium">
                      <li className="mb-4">
                          <p className="flex"><FaCalendarAlt className=" mr-2 mt-1" />De Miercoles a Sábado <br/> 12:30 - 17:00 y 20:00 - 23:30</p>
                      </li>
                      <li className="mb-4">
                          <p className="flex"><FaCalendarAlt className=" mr-2 mt-1" />Domingo <br/> 12:30 - 17:00</p>
                      </li>
                      <li className="mb-4">
                          <p className="flex"><FaCalendarAlt className=" mr-2 mt-1" />Lunes y Martes<br/>Cerrado</p>
                      </li>
                  </ul>
              </div>
              <div className="flex">
                <div className="ml-11">

                  <h2 className="mb-6 text-sm font-semibold text-white">CONTACTA CON NOSOTROS</h2>
                  <ul className="text-white font-medium">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Teléfono: 652196890</a>
                      </li>
                  </ul>
                </div>
                  <div className=" h-56 border-l border-white ml-4 mr-4"></div>
                  <ul className="text-white d font-medium">
                      <li className="mb-4 mr-4">
                          <a href="#">Aviso Legal</a>
                      </li>
                      <li className="mb-4">
                          <a href="#">Política de privacidad</a>
                      </li>
                      <li className="mb-4">
                          <a href="#">Política de cookies</a>
                      </li>
                  </ul>
              </div>
              <div >
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className=' mr-4'> Desing by Sala 3 Web 2024</span><span> La alegria de vivir 99º</span>
    </div>
</footer>

    </div>

  )
}

export default Footer