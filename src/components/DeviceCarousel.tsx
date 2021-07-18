import { useEffect, useState } from "react";
import { DeviceCarouselProps, DeviceCarouselSizeData } from "../@types";
import styled from "styled-components";
import mobile from '../assets/mobile.png';
import desktop from '../assets/desktop.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

export const DeviceCarousel: React.FC<DeviceCarouselProps> = ({ images, arrowColor, deviceType }) => {

   const [grabbing, setGrabbing] = useState(false);

   useEffect(() => {

      const handleGrab = () => { if (grabbing) setGrabbing(false) };

      window.addEventListener('mouseup', handleGrab);

      return () => window.removeEventListener('mouseup', handleGrab);

   }, [grabbing]);

   //grab handlers
   const startGrabbing = () => setGrabbing(true);
   const stopGrabbing = () => setGrabbing(false);

   const deviceImagePath = {
      mobile: mobile,
      desktop: desktop
   };

   const { width, height, top, right, bottom, left } = deviceType === 'mobile' ? {

      height: 838, //mobile image size data
      width: 400,
      top: 107,
      right: 20,
      bottom: 105,
      left: 25

   } : {

      height: 637, //desktop image size data
      width: 1094,
      top: 35,
      right: 129,
      bottom: 72,
      left: 127

   };

   const screenWidth = width - right - left;
   const screenHeight = height - top - bottom;

   //will be plugged into the "in-device" carousel's css
   const sizeData = {
      deviceHeight: `${(height / width) * 100}%`,
      screenTopMargin: `${(top / height) * 100}%`,
      screenLeftMargin: `${(left / width) * 100}%`,
      screenWidthPercentage: `${(screenWidth / width) * 100}%`,
      screenHeightPercentage: `${(screenHeight / height) * 100}%`
   };

   return (
      <Carousel arrowColor={arrowColor}>
         <Device sizeData={sizeData}>
            <Screen sizeData={sizeData} grabbing={grabbing} onMouseDown={startGrabbing} onMouseUp={stopGrabbing}>
               <Slider dots={false} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
                  {images.map((image, index) => <SliderImage alt='' key={index} src={image} />)}
               </Slider>
            </Screen>
            <DeviceMock deviceImage={deviceImagePath[deviceType]} />
         </Device>
      </Carousel>
   );

};

export const Carousel = styled.div<{ arrowColor: string }>`

   //I am using normal css classes instead of styled components
   //here because I am overwriting slick carousel's defaults here
   .slick-next{ right: -50px; }

   .slick-prev{ left: -50px; }

   .slick-slide {
      height: inherit !important;
      display: flex !important;
      justify-content: center;
      align-items: center;
   }

   .slick-track {
      display: flex !important;
      height: 100%;
   }

   .slick-slider, .slick-list{ height: 100%; }

   .slick-slide > div{
      width: 100%;
      height: 100%;
   }

   .slick-prev:before, .slick-next:before{ color: ${({ arrowColor }) => arrowColor}; }

`;

const SliderImage = styled.img`

   display: block;
   height: 100%;
   width: auto;

`;

const DeviceMock = styled.div<{ deviceImage: string }>`

   position: absolute;
   background-size: cover;
   width: 100%;
   height: 100%;
   pointer-events: none;
   z-index: 0;
   background-image: url(${({ deviceImage }) => deviceImage});

`;

const Screen = styled.div<{ sizeData: DeviceCarouselSizeData, grabbing: boolean }>`

   position: absolute;
   cursor: ${({ grabbing }) => grabbing ? 'grabbing' : 'grab'};
   background-size: cover;
   z-index: 1;

   top: ${({ sizeData }) => sizeData.screenTopMargin};
   left: ${({ sizeData }) => sizeData.screenLeftMargin};
   width: ${({ sizeData }) => sizeData.screenWidthPercentage};
   height: ${({ sizeData }) => sizeData.screenHeightPercentage};

`;

const Device = styled.div<{ sizeData: DeviceCarouselSizeData }>`

   position: relative;
   background-size: cover;
   padding-bottom: ${({ sizeData }) => sizeData.deviceHeight};

`;