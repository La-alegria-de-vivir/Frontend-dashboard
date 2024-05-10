import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
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
    <Table hoverable className='shadow-md'>
      <Table.Head>
        <Table.HeadCell>Date updated</Table.HeadCell>
        <Table.HeadCell>Menu image</Table.HeadCell>
        <Table.HeadCell>Menu title</Table.HeadCell>
        <Table.HeadCell>Precio</Table.HeadCell>
        <Table.HeadCell>Borrar</Table.HeadCell>
        
        <Table.HeadCell>
          <span>Editar</span>
        </Table.HeadCell>
      </Table.Head>
      {userMenu.menu.map((menu) => (
        <Table.Body className='divide-y'>
          <Table.Row className=''>
            <Table.Cell>
              {new Date(menu.updatedAt).toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>
              <Link to={`/menu/${menu.slug}`}>
                <img
                  src={menu.image}
                  alt={menu.title}
                  className='w-20 h-10 object-cover bg-black-500'
                />
              </Link>
            </Table.Cell>
            <Table.Cell>
              <Link
                className='font-medium text-gray-900 dark:text-white'
                to={`/menu/${menu.slug}`}
              >
                {menu.title}
              </Link>
            </Table.Cell>
            <Table.Cell>{menu.category}</Table.Cell>

            <Table.Cell>
              <span
                onClick={() => {
                  setShowModal(true);
                  setMenuIdToDelete(menu._id);
                }}
                className='font-medium text-red-500 hover:underline cursor-pointer'
              >
                Borrar
              </span>
            </Table.Cell>
            
            <Table.Cell>
              <Link
                className='text-teal-500 hover:underline'
                to={`/update-menu/${post._id}`}
              >
                <span>Editar</span>
              </Link>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      ))}
    </Table>
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

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this menu?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteMenu}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}