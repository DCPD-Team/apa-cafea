import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const Navbar: React.FC = () => {
  const { state } = useLocation();

  const getStyles = (isActive: boolean) => {
    return twMerge('px-6 py-2 rounded-md text-lg font-bold bg-slate-100', isActive ? 'bg-blue-500 text-white' : '');
  };

  return (
    <div className={'container mx-auto flex flex-col gap-3'}>
      <div className="pt-5">
        <NavLink
          to="/persoana"
          className={({ isActive }) => getStyles(isActive)}>
          Persoane
        </NavLink>
        <NavLink
          to="/situatie"
          className={({ isActive }) => getStyles(isActive)}>
          Situatie
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
      </div>
      <Outlet />
    </div>
  );
};
