import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const Persoana: React.FC = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};
