import Rating from '@material-ui/lab/Rating';
import Box from "@material-ui/core/Box";

import PropTypes from 'prop-types';

import React from 'react'

const StarRating = ({value}) => {
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating name="half-rating-read" defaultValue={value} precision={0.5} size='small' readOnly />
            </Box>
        </div>
    )
}

StarRating.defaultProps = {
    value: 0,
}

StarRating.propTypes = {
    value: PropTypes.number,
}

export default StarRating
