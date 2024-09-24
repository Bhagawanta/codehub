'use client'

import React, { createContext} from 'react';

const AuthContext = createContext({})

export default function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {


  return <AuthContext.Provider value={''}>{children}</AuthContext.Provider>;
}
