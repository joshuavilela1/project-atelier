import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
const {useState, useEffect} = React;
let totalReviews = 0;
let avgReviews = 0;
let recPercent = 0;

const RatingsBreakdown = ({metaData}) => {
  const [ratingStats, setRatingStats] = useState([]);
  const [recStats, setRecStats] = useState([]);


  if (metaData.length !== 0 && ratingStats.length === 0) {
    setRatingStats(metaData.ratings);
    setRecStats(metaData.recommended);
  }

  if (ratingStats.length !== 0) {
    for (let key in ratingStats) {
      totalReviews += parseInt(ratingStats[key]);
      avgReviews += parseInt(key) * parseInt(ratingStats[key]);
    }

    avgReviews = parseFloat((avgReviews / totalReviews).toFixed(1));
  }

  if (recStats.length !== 0) {
    const noCount = parseInt(recStats.false);
    const yesCount = parseInt(recStats.true);
    const totalCount = noCount + yesCount;
    recPercent = Math.round(yesCount / totalCount * 100);
  }

  return (
    <div id='ratings-breakdown'>
      Ratings Breakdown Component
      <div>
        {avgReviews} Stars
        <p> {recPercent}% of reviews recommend this product </p>
        <ul>
          <li><u>5 Stars</u> {ratingStats['5']}/{totalReviews}</li>
          <li><u>4 Stars</u> {ratingStats['4']}/{totalReviews}</li>
          <li><u>3 Stars</u> {ratingStats['3']}/{totalReviews}</li>
          <li><u>2 Stars</u> {ratingStats['2']}/{totalReviews}</li>
          <li><u>1 Stars</u> {ratingStats['1']}/{totalReviews}</li>
        </ul>
      </div>
    </div>
  );
};

export default RatingsBreakdown;