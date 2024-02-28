import SingleProductCart from '../SingleProductCart/SingleProductCart'
import styles from './carousel.module.scss'
import PropTypes from 'prop-types'

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

function CarouselComponent({ title, products, deviceType, isAutoPlaying = false }) {



    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    }

    return (
        <div className={styles.wrapper}>
            <h3>{title}</h3>

            <Carousel
                className='custom-react-carousel'
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlay={isAutoPlaying && deviceType !== "mobile" ? true : false}
                autoPlaySpeed={4000}
                keyBoardControl={true}

                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"


            >
                {products.map(({ category, id, image, price, title }, index) => (
                    <SingleProductCart key={index}
                        imageURL={image}
                        price={price}
                        title={title}
                        id={id}
                        category={category}
                    />
                ))}
            </Carousel>

        </div>
    )

}
CarouselComponent.propTypes = {
    products: PropTypes.array,
    title: PropTypes.string,
    onClick: PropTypes.func,
    index: PropTypes.number,
    active: PropTypes.bool,
    deviceType: PropTypes.string,
    isAutoPlaying: PropTypes.bool,
};
export default CarouselComponent

