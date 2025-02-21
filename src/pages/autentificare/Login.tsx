import React from 'react';
import { AuthenticationForm } from '@/pages/autentificare/components/authentication-form.tsx';

export type AuthTypes = 'SIGN IN' | 'SIGN UP';

export const Login: React.FC = () => {
  const [authType, setAuthType] = React.useState<AuthTypes>('SIGN IN');
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthenticationForm
          type={authType}
          setType={setAuthType}
        />
      </div>
    </div>
  );
};
