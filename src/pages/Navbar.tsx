import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { supabaseClient } from '@/supabase/supabase.ts';
import { Button } from '@/components/ui/button.tsx';
import { LuLogOut } from 'react-icons/lu';
import { useAuth } from '@/hooks/useAuth.tsx';
import { ProfilAvatar } from '@/components/ProfilAvatar.tsx';

export const Navbar: React.FC = () => {
  const { user } = useAuth();

  const getStyles = (isActive: boolean) => {
    return twMerge('px-6 py-2 rounded-md text-lg font-bold bg-slate-100', isActive ? 'bg-blue-500 text-white' : '');
  };

  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      navigate('/');
    } else {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <div className={'container mx-auto flex flex-col gap-3'}>
      <div className="flex items-center justify-between pt-5">
        <div>
          <ProfilAvatar />
        </div>
        <div className="flex justify-between">
          <NavLink
            to="/persoana"
            className={({ isActive }) => getStyles(isActive)}>
            Persoane
          </NavLink>
          <NavLink
            to="/situatie"
            className={({ isActive }) => getStyles(isActive)}>
            Situație
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) => getStyles(isActive)}>
            Leaderboard
          </NavLink>
          <NavLink
            to="/cheltuiala"
            className={({ isActive }) => getStyles(isActive)}>
            Cheltuieli
          </NavLink>
          {user?.appRole?.includes('moderator') && (
            <NavLink
              to="/admin"
              className={({ isActive }) => getStyles(isActive)}>
              Admin Panel
            </NavLink>
          )}
        </div>
        <Button
          variant={'outline'}
          onClick={() => {
            handleSignOut();
          }}>
          <LuLogOut className={'size-5'} /> Logout
        </Button>
      </div>
      <Outlet />
    </div>
  );
};
