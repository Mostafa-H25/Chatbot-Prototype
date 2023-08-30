'use client';

import Link from 'next/link';


import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SettingsIcon from '@mui/icons-material/Settings';
import { setUser , setChats , setIsSettingsModalOpen } from '@/services/redux/reducers/appSlice'

import Swal from 'sweetalert2';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';  
import { useGlobalContext } from "@/services/context/GlobalContext";
import { useSelector , useDispatch } from 'react-redux';

export default function ChatSidebarFooter() {
  const { data: session } = useSession();
  const { user , chats  } = useSelector((state) => state.app);
  const dispatch = useDispatch();



  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setChats([]));
        // Call the API or perform any other necessary action here
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  };

  const router = useRouter();

  const handleLogout = async () => {
    setUser({ ...user });
    const endpoint = '/api/logout';
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credential: 'include',
    };
    const response = await fetch(endpoint, options);
    console.log(response);
    await signOut({
      redirect: false,
    });
    router.replace('/');
  };

  console.log('SEESION OF THE USER', session?.user.accessToken);

  return (
    <div className='flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm'>
      {chats.length > 0 && (
        <>
          <button
            onClick={handleDeleteClick}
            className='flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10'>
            <FileUploadIcon />
            <span>Clear Chats</span>
          </button>
        </>
      )}

      <button className='flex items-center gap-3 w-full cursor-pointer select-none rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10'>
        <label
          htmlFor='fileImport'
          className='flex items-center gap-3 w-full h-full'>
          <input
            type='file'
            accept='.json'
            name='fileImport'
            id='fileImport'
            className='hidden'
          />
          <FileUploadIcon />
          <span>Import data</span>
        </label>
      </button>
      <button className='flex items-center gap-3 w-full cursor-pointer select-none rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10'>
        <Link
          href='/chats/history'
          download={<p>history</p>}
          rel='noreferrer'
          className='flex items-center gap-3 w-full h-full'>
          <FileDownloadIcon />
          <span>Export data</span>
        </Link>
      </button>
      <button
       onClick={() => dispatch(setIsSettingsModalOpen(true))}
        className='flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10'>
        <SettingsIcon />
        <span>Settings</span>
      </button>
      {/* user session */}
      {session && (
        <>
          <button
            onClick={handleLogout}
            className='flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10'>
            <SettingsIcon />
            <span>Logout</span>
          </button>
        </>
      )}
    </div>
  );
}
