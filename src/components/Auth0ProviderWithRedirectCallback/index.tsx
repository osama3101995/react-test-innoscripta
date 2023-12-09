import React, { PropsWithChildren } from 'react';
import { Auth0Provider, AppState, Auth0ProviderOptions } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithRedirectCallback = ({
    children,
    ...props
  }: PropsWithChildren<Auth0ProviderOptions>) => {
    const navigate = useNavigate();
  
    const onRedirectCallback = (appState?: AppState) => {
      navigate((appState && appState.returnTo) || window.location.pathname);
    };
  
    return (
      <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
        {children}
      </Auth0Provider>
    );
  };

export default Auth0ProviderWithRedirectCallback