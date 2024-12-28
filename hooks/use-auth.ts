"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials, logout } from '@/store/slices/authSlice';
import { useStorage } from './use-storage';
import { AuthUser } from '@/types/user';
import { STORAGE_KEYS } from '@/constants/storage.constant';
// import { useGetCurrentUserQuery, useRefreshTokenMutation } from '@/store/api/authApi';

export function useAuth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { getItem, getJson, clear } = useStorage();

  // Auto-fetch current user if we have a token
  // const { data: user, error: userError } = useGetCurrentUserQuery(undefined, {
  //   skip: !getItem(STORAGE_KEYS.ACCESS_TOKEN),
  // });

  // const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const storedUser = getJson(STORAGE_KEYS.USER) as AuthUser;
        
        if (!token || !storedUser) {
          handleLogout();
          return;
        }

        // If we have a user from the API, use that, otherwise use stored user
        const currentUser =  storedUser;

        dispatch(setCredentials({
          user: currentUser,
          token
        }));

        // If there was an error fetching the user, try to refresh the token
        // if (userError) {
        //   const refreshTokenValue = getItem(STORAGE_KEYS.REFRESH_TOKEN);
        //   if (refreshTokenValue) {
        //     try {
        //       const result = await refreshToken({ refresh_token: refreshTokenValue }).unwrap();
        //       dispatch(setCredentials({
        //         user: result.user,
        //         token: result.access_token
        //       }));
        //       localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, result.access_token);
        //       localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, result.refresh_token);
        //       localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(result.user));
        //     } catch {
        //       handleLogout();
        //     }
        //   } else {
        //     handleLogout();
        //   }
        // }
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
