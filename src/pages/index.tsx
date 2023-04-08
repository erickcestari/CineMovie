import { useEffect, useState } from "react";
import { MovieCard } from "./components/MovieCard";
import { AreaCards } from "./components/AreaCards";
import styles from '../styles/app.module.css'
import { CSSProperties } from "styled-components";
import { useLocalStorage } from "usehooks-ts";
//import {ReactComponent as SearchIcon} from './svg/searchIcon.svg'
const API_KEY = '1d79a819bd97c7fd093bf0a0718d7149'
const API_URL = 'https://api.themoviedb.org/3/trending/all/week?api_key=1d79a819bd97c7fd093bf0a0718d7149'

function App() {
  const [localSearch, setLocalSearch] = useLocalStorage('movie', 'The last')
  const [movies, setMovies] = useState<any>()
  const [search, setSearch] = useState<string>(localSearch)
  const [searchResults, setSearchResults] = useState(localSearch)
  console.log()
  //<SearchIcon onClick={handleSearchClick} width={40} height={40} style={{position:'absolute', left:'80%', borderRadius:'30%', padding:'25', backgroundColor:'white', cursor:'pointer'}}/>
  const handleSearchClick = () =>{
    setSearchResults(search)
  }

  const searchMovies = async () =>{
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchResults}&api_key=${API_KEY}`)
    const data = await response.json();
    setLocalSearch(searchResults)
    setMovies(data.results)
    
  }

  useEffect(() => {searchMovies()},[])
  useEffect(() => {searchMovies()},[searchResults])
  
  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>CineMovie</h1>
      <div className={styles.SearchArea}>
        <input className={styles.Search} placeholder="Search here" autoFocus value={search} onChange={e => setSearch(e.target.value)}/>
        <div onClick={handleSearchClick} 
        style={{position:'absolute', left:'80%', borderRadius:'30%', 
        padding:'15px', backgroundColor:'white', cursor:'pointer', fontSize:'40px'}}>🔎</div>
     </div>
     {movies?.length  > 0 ? (
        <AreaCards>
          {movies.map((movie:any, i:number) => (
            <>
              <MovieCard movie={movie} key={i}/>
            </>
          ))}
        </AreaCards>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
