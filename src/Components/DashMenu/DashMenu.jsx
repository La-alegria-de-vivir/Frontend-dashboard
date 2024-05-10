import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashMenu() {
  const { currentUser } = useSelector((state) => state.user);
  const [userMenu, setUserMenu] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [menuIdToDelete, setMenuIdToDelete] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/api/menu/getmenu?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserMenu(data.menu);
          if (data.menu.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchMenu();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userMenu.length;
    try {
      const res = await fetch(
        `/api/post/getmenu?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserMenu((prev) => [...prev, ...data.menu]);
        if (data.menu.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteMenu = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/menu/deletemenu/${menuIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserMenu((prev) =>
          prev.filter((menu) => menu._id !== menuIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=' mt-40 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar'>
      {currentUser.isAdmin && userMenu.length > 0 ? (
        <>
          <table className='shadow-md'>
            <thead>
              <tr>
                <th>Date updated</th>
                <th>Menu image</th>
                <th>Menu title</th>
                <th>Precio</th>
                <th>Borrar</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {userMenu.map((menu) => (
                <tr key={menu._id}>
                  <td>{new Date(menu.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/menu/${menu.slug}`}>
                      <img
                        src={menu.image}
                        alt={menu.title}
                        className='w-20 h-10 object-cover bg-black-500'
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      className='font-medium text-gray-900 dark:text-white'
                      to={`/menu/${menu.slug}`}
                    >
                      {menu.title}
                    </Link>
                  </td>
                  <td>{menu.category}</td>
                  <td>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setMenuIdToDelete(menu._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Borrar
                    </span>
                  </td>
                  <td>
                    <Link
                      className='text-teal-500 hover:underline'
                      to={`/update-menu/${menu._id}`}
                    >
                      Editar
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
              Mostrar Más
            </button>
          )}
        </>
      ) : (
        <p>No tienes ningún menú!</p>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete this menu?
              </h3>
              <div className='flex justify-center gap-4'>
                <button className='btn btn-danger' onClick={handleDeleteMenu}>
                  Yes, I'm sure
                </button>
                <button className='btn btn-secondary' onClick={() => setShowModal(false)}>
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
