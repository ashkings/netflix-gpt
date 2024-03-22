import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/contant";
import { addNowPlayingMovies } from "../utils/redux/movieSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getMoviesList = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      const json = await res.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMoviesList();
  }, []);
};

export default useNowPlayingMovies;
