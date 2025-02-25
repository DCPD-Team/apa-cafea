import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabaseClient } from '../supabase/supabase';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext<{
  session: Session | null | undefined;
  user: AppUser | null | undefined;
  isLoading: boolean | null | undefined;
  signOut: () => void;
}>({ session: null, user: null, isLoading: null, signOut: () => {} });

type JwtCustomPayload = {
  user_roles: string[];
};

type AppUser = User & { appRole: string[] };

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AppUser>();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabaseClient.auth.getSession();
        setSession(session);

        const currentUser = session?.user as User & { appRole: string[] };
        if (session) {
          const jwt = jwtDecode<JwtCustomPayload>(session.access_token);
          currentUser.appRole = jwt.user_roles;
        }
        console.log(currentUser);
        setUser(currentUser ?? null);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching session:', error);
      } finally {
        setSession(session);

        const currentUser = session?.user as User & { appRole: string[] };
        if (session) {
          const jwt = jwtDecode<JwtCustomPayload>(session.access_token);
          currentUser.appRole = jwt.user_roles;
        }
        setUser(currentUser);
        setIsLoading(false);
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user as User & { appRole: string[] };
      if (session) {
        const jwt = jwtDecode<JwtCustomPayload>(session.access_token);
        currentUser.appRole = jwt.user_roles;
      }
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user,
    isLoading,
    signOut: () => supabaseClient.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
