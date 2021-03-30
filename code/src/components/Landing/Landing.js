import './style.css'
import landing_img from '../../image/landing_img.svg'

const Landing = () => {
    return (
        <div>
            <div className="main">
                <div className="main__container">
                    <div class="main__content">
                        <h1>THE FUTURE OF HOME</h1>
                        <h2>IMPROVEMENT</h2>
                        <p>Get your home tasks done.</p>
                        <button className="main__btn"><a href="/">Get Started</a></button>

                    </div>
                    <div className="main_image--container">
                        <img src={landing_img} alt="pic" id="main__img" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing
