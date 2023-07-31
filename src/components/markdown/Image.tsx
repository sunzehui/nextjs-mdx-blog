'use client'
import { LazyLoad } from "../common/lazyload"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import '@/assets/styles/components/image.scss'

interface ImageProps {
  src: string
  alt: string
}
export const Image: Component<ImageProps> = (props) => {
  const nextProps = {
    ...props,
  }
  nextProps.alt = props.alt?.replace(/^[¡!]/, '')

  if (props.src.endsWith('.mp4')) {
    return <video src={props.src} controls playsInline autoPlay />
  }

  const handleImageLoadFail = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (e.target as HTMLImageElement).classList.add('error')
  }
  return (
    <LazyLoad placeholder={'loading...'}>
      <PhotoProvider>
        <PhotoView src={props.src}>
          <img {...nextProps} className='my-2' onError={handleImageLoadFail} />
        </PhotoView>
      </PhotoProvider>
    </LazyLoad>
  )
}

