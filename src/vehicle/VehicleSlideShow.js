import React, {Component} from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import leftArrow from './assets/left_arrow.png'

const VehicleSlideShowWrapper = styled.div`
	position: relative;

	.slick-arrow {
		height: 30px;
		width: 30px;
		z-index: 2;
	}

	.slick-prev {
		left: 15px;		
	}

	.slick-next {
		transform: translateY(-50%) rotate(180deg);
		right: 15px;	
	}

	.slick-slide img {
		width: 100%;

		@media (min-width: 992px) {
			height: 224px;
    		object-fit: cover;
		}
	}
`

class VehicleSlideShow extends Component {
	settings = {
		infinite: true,
		speed: 1000,
		arrows: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
		centerMode: true,
		prevArrow: <img src={leftArrow}/>,
		nextArrow: <img src={leftArrow}/>,
		adaptiveHeight: this.props.adaptiveHeight || false,
		centerPadding: '0px',
		responsive: [{
			breakpoint: 992,
			settings: {
				slidesToShow: 1
			}
		}]
	}

	render() {
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