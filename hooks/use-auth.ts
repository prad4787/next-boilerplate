"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from '@/store/slices/authSlice';
import { useStorage } from './use-storage';
import { AuthUser } from '@/types/user';
import { STORAGE_KEYS } from '@/constants/storage.constant';

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getItem, getJson, clear } = useStorage();

  

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const storedUser = getJson(STORAGE_KEYS.USER) as AuthUser;
        
        if (!token || !storedUser) {
          handleLogout();
          return;
        }

        const currentUser =  storedUser;

        dispatch(setCredentials({
          user: currentUser,
          token
        }));

     
      } catch (error) {
        console.error('Auth initialization error:', error);
        handleLogout();
      }
    };

    initAuth();
  }, [dispatch, getItem, getJson]);

  const handleLogout = () => {
    dispatch(logout());
    clear();
    router.push('/auth/login');
  };

  return { handleLogout };
}
