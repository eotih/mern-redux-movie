import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import "./hero-slide.scss";
import { responseMovie } from "../../redux/reducers";
import { showMovie } from "../../redux/actions";

const HeroSlide = () => {
  const dispatch = useDispatch();
  const { movie } = useSelector(responseMovie);
  const [movieItems, setMovieItems] = useState([]);

  SwiperCore.use([Autoplay]);

  useEffect(() => {
    dispatch(showMovie());
  }, [dispatch]);

  console.log(movie);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovieItems(response.results.slice(1, 4));
      } catch {
        console.log("error");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
      >
        {movieItems.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem item={item} className={isActive ? "active" : ""} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  let { push } = useHistory();
  const { id, title, overview, backdrop_path, poster_path } = item;

  const background = apiConfig.originalImage(
    backdrop_path ? backdrop_path : poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${id}`);
    const videos = await tmdbApi.getVideos(category.movie, id);

    if (videos.results.length > 0) {
      const videSrc = "https://www.youtube.com/embed/" + videos.results[0].key;
      modal
        .querySelector(".modal__content > iframe")
        .setAttribute("src", videSrc);
    } else {
      modal.querySelector(".modal__content").innerHTML = "No trailer";
    }

    modal.classList.toggle("active");
  };

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{title}</h2>
          <div className="overview">{overview}</div>
          <div className="btns">
            <Button onClick={() => push("/movie/" + id)}>Watch now</Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
