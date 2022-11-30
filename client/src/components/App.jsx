import axios from 'axios';
import API_KEY from '../config.js';

import React from 'react';
const { useState, useEffect } = React;

import Overview from './overview/Overview.jsx';
import RelatedItems from './related-items/RelatedItems.jsx';
import QuestionsAnswers from './questions-answers/QuestionsAnswers.jsx';
import RatingsReviews from './ratings-reviews/RatingsReviews.jsx';

const App = () => {
  const [ products, setProducts ] = useState([]);
  const [ currentProduct, setCurrentProduct ] = useState({});

  useEffect(async () => {
    try {
      const options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products`,
        method: 'GET',
        responseType: 'json',
        headers: { 'Authorization': API_KEY }
      };
      const { data } = await axios(options);

      setProducts(data);
      setCurrentProduct(data[0]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const request = async (path, method, body = {}, callback = () => {}) => {
    try {
      const options = {
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp${path}`,
        headers: { 'Authorization': API_KEY }
      };
      switch (method) {
        case 'GET':
          options.repsonseType = 'json';
          break;
        case 'POST':
          options.data = body;
          break;
      }
      const { data } = await axios(options);

      callback(null, data);
    } catch (error) {
      callback(error, null);
    }
  };

  return (
    <>
      <Overview currentProduct={currentProduct} request={request} />
      <RelatedItems currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} request={request}/>
      <QuestionsAnswers currentProduct={currentProduct} request={request} />
      <RatingsReviews currentProduct={currentProduct} request={request} />
    </>
  );
};

export default App;