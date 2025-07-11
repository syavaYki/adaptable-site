import React, { useMemo, useState } from 'react';
import style from './PetInfoSwiper.module.scss';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { ModalImage } from '../ModalImage';

interface Props {
  images: string[];
  petType: string;
}

export const PetInfoSwiper: React.FC<Props> = ({ images, petType }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [curImgUrl, setcurImgUrl] = useState('');

  const imagesToShow = useMemo(() => {
    if (images.length === 0) {
      if (petType === 'dog') {
        return ['assets/dog-img-placeholder.png'];
      } else if (petType === 'cat') {
        return ['assets/cat-img-placeholder.png'];
      } else {
        return ['https://placehold.co/400x600?text=Comming+Soon'];
      }
    }
    return images;
  }, [images]);

  return (
    <div className={style.container}>
      <div>
        <Swiper
          modules={[Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
        >
          {imagesToShow.map((imgLink, index) => {
            return (
              <SwiperSlide
                key={index}
                onClick={() => {
                  setShowModal(true);
                  setcurImgUrl(imgLink);
                }}
              >
                <div className={style.image_container}>
                  <div className={style.image_frame}>
                    <img
                      src={imgLink}
                      alt="pet image"
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="mt-3">
          <Swiper
            style={{ paddingBottom: 40 }}
            modules={[Thumbs, Pagination]}
            spaceBetween={10}
            slidesPerView={5}
            pagination={{ clickable: true }}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
          >
            {imagesToShow.map((imgLink, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className={style.thumbs_container}>
                    <div className={style.thumbs_frame}>
                      <img
                        src={imgLink}
                        alt="pet image"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <div>
        {showModal && (
          <ModalImage
            imageUrl={curImgUrl}
            visible={true}
            onClose={setShowModal}
          />
        )}
      </div>
    </div>
  );
};
