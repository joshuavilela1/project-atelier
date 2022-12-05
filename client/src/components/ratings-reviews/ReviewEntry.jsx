import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
const {useState, useEffect} = React;

const LOG_STYLES = {
  position: 'relative',
  top: 0,
  right: 0,
}

const ReviewEntry = ({review}) => {

  const properDate = () => {
    const date = new Date(review.date.substring(0,10)).toString()
    const date1 = date.slice(0,10);
    return date1;
  };

  return (
    <div id='review-entry'>
      <span className = 'entry-stars'> {review.rating} Stars</span>
      <span className = 'entry-log' style = {LOG_STYLES}> {review.recommend ? '✔️' : '❌'} {review.reviewer_name}, {properDate()}</span>
      <div className = 'entry-summary'> <strong>{review.summary}</strong> </div>
      <div className = 'entry-body'> {review.body} </div>
      <p className = 'entry-rec'> {review.recommend ? '✔️ I recommend this product' : null}</p>
      <p>Helpful? <u>Yes</u> ({review.helpfulness}) | <u>Report</u> </p>
    </div>
  );
};

export default ReviewEntry;