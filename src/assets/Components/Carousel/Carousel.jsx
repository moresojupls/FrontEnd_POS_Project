import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image from "../../image";


export default function SimpleSlider() {
  var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // เพิ่มคุณสมบัติ autoplay ถ้าต้องการ
  autoplaySpeed: 2000, // ความเร็วในการเปลี่ยนสไลด์
  };
  return (
    <div style={{marginLeft:'150px',width:'100%',height:'100%'}}>
        <Slider {...settings}>
      <div>
      <img src="https://i.pinimg.com/enabled_lo/564x/a4/70/be/a470be53b62804c5cec30f67311ee734.jpg" style={{marginLeft:'100px'}} alt="Image 1" />
      </div>
      <div>
      <img src="https://i.pinimg.com/564x/83/0f/d1/830fd1963afb2a1e55c648b66bd3cf90.jpg" style={{marginLeft:'100px'}} alt="Image 2" />
      </div>
      <div>
      <img src="https://i.pinimg.com/564x/41/c5/08/41c5086fb66ed569a8210bc5eae6950f.jpg" style={{marginLeft:'100px'}} alt="Image 3" />
      </div>

    </Slider>
    </div>

    
  );
}