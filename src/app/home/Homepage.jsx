
import GridSection from './components/GridSection'
import TextAnimate from './components/TextAnimate'
import VideoSection from './components/VideoSection'
import LogoSlider from '../components/Marquee/LogoSlider'
import CardStack from './components/CardStack'
import ShapeZoom from './components/ShapeZoom'
import MapSection from './components/MapSection'
import Testimonial from './components/Testimonial'


export default function Homepage({data}) {
  const{banner,posts} = data ||{}
console.log(data,"data")
  return (
    <div>
      <GridSection/>
      <TextAnimate/>
      <VideoSection/>
      <LogoSlider/>
      {/* <CardStack/> */}
      <ShapeZoom/>
      <Testimonial />
      <MapSection/>
    </div>
  )
}
