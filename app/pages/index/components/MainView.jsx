import React from 'react';
import Head from 'react-declarative-head';
import Style from '../../../components/Style';
import Script from '../../../components/Script';

const MainView = () => (
  <>
    <Head>
      <title>titulazo</title>
    </Head>
    <div className="main-view">
      <h1>esto es un titulo</h1>
    </div>
    <Style href="style.css" />
    <Script src="script.js" />
  </>
);

export default MainView;
