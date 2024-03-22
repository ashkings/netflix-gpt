import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/redux/movieSlice";
import { API_OPTIONS } from "../utils/contant";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMoviesVideo = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await res.json();
    const filteredData = json.results.filter(
      (video) => video.type === "trailer"
    );
    const trailer =
      filteredData?.length > 0 ? filteredData[0] : json.results[0];

    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMoviesVideo();
  }, []);
};

export default useMovieTrailer;
