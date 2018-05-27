import React, {Component} from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import leftArrow from './assets/left_arrow.png'

const VehicleSlideShowWrapper = styled.div`
	position: relative;

	.slide-arrow {
		position: absolute;
		height: 30px;
		width: 30px;
		z-index: 2;
		top: 50%;

		&.prev {
			transform: translateY(-50%);
			left: 15px;		
		}

		&.next {
			transform: translateY(-50%) rotate(180deg);
			right: 15px;	
		}
	}

	.slick-slide img {
		width: 100%;

		@media (min-width: 992px) {
			height: 224px;
    		object-fit: cover;
		}
	}
`

const SlideArrow = className => ({onClick}) => <img className={`slide-arrow ${className}`} alt={className} src={leftArrow} onClick={onClick}/>

const PrevArrow = SlideArrow('prev')
const NextArrow = SlideArrow('next')

class VehicleSlideShow extends Component {
	settings = {
		infinite: true,
		speed: 1000,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
		centerMode: true,
		prevArrow: <PrevArrow/>,
		nextArrow: <NextArrow/>,
		adaptiveHeight: false,
		centerPadding: '0px'
	}

	render = () => {
		const {images} = this.props

		return (
			<VehicleSlideShowWrapper className="vehicle-slide-show">
				<Slider {...this.settings}>
					{images.sort((a, b) => a.position - b.position).map(({main_image_url, description}, i) => <img key={i} src={main_image_url} alt={description}/>)}
				</Slider>
			</VehicleSlideShowWrapper>
		)
	}
}

export default VehicleSlideShow