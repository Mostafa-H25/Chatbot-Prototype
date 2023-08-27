'use client'
import React from 'react'
import { Provider } from 'react-redux'
import Store from "@/services/Store"
import GlobalContext from "@/services/context/GlobalContext";

const WrapRedux = ({
    children,
  }: {
    children: React.ReactNode;
  })=>{
    return (
        
        <Provider store={Store}>
            <GlobalContext> {children}</GlobalContext>
        </Provider>
    )

}

export default WrapRedux
