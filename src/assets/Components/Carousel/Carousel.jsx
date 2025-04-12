import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Myimg from '../Image/img';
import image from "../../image";


export default function SimpleSlider() {
  var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // เพิ่มคุณสมบัติ autoplay ถ้าต้องการ
  autoplaySpeed: 3000, // ความเร็วในการเปลี่ยนสไลด์
  };
  return (
    <div>
      <div style={{ width: '100%' }}> {/* ปรับขนาดตามต้องการ */}
        <Slider {...settings}>
          <div style={{display:'flex',flexDirection:'row'}}>
            <Myimg size={700} url={image.MainMenu} />
            <Myimg size={700} url={image.FruitTea} />
          </div>
          <div>
          <Myimg size={680} url={image.Special} />
          </div>
        </Slider>
      </div>
    </div>

    
  );
}