import PropTypes from 'prop-types'

import './style.css'
const Rating = ({rating}) => {
    return (
        <div className=''>
                <span id='rating' style={{marginRight: "5%"}}>{rating}</span>
            <div className='stars'>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star unchecked"></span>
                <span className="fa fa-star unchecked"></span>
            </div>
        </div>
    )
}

Rating.defaultProps = {
    rating: 0,
}

Rating.propTypes = {
    rating: PropTypes.number,
}

export default Rating
