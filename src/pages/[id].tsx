import {useRouter} from 'next/router';
import styles from '../styles/app.module.css'
import { useEffect, useState } from 'react';
import { MovieCard } from './components/MovieCard';

const Movie = () => {
    const router = useRouter()
    const IMAGE_URL = 'http://image.tmdb.org/t/p/w500/'
    const API_KEY = '1d79a819bd97c7fd093bf0a0718d7149'
    const id = router.query.id
    console.log(id)
    const [movie, setMovie] = useState<any>()

    const searchMovies = async () =>{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
        const data = await response.json();
        setMovie(data)
      }
    useEffect(() => {searchMovies()},[id])
    console.log(movie)

    const stars = () => {
        let listStar = []
        let numberStars = Math.floor(movie.vote_average/ 2)
        for(let i =0; i < numberStars; i++) {
            listStar.push(<span>⭐</span>)
        }
        return(listStar)
    }
    return(
    <div className={styles.Container} style={{fontFamily:''}}>
         
        <button style={{zIndex:'99',position:'absolute', left:'10px', top:'10px', padding:'15px 20px', border:'0', borderRadius:'5px', fontWeight:'bold'}} onClick={() => router.push('/')}>Back</button>
        {movie ? 
        <div style={{display:'flex', flexDirection:'column', maxWidth:'100%', position:'relative'}}>
            
            <h1 className={styles.Title}>{movie.title}</h1>
            <div style={{maxWidth:'100%', height:'700px', backgroundColor:'#3d08ec96', display:'flex', alignItems:'center'}}>
            {movie.poster_path && <img style={{opacity:'1', zIndex:'1', height:'80%', marginLeft:'10%', marginRight:'5%'}}
                src={IMAGE_URL + movie.poster_path}></img>}
                {movie.backdrop_path && <img style={{left:'0%',opacity:'0.1', flex:'1',height:'75%', width:'100%', objectFit:'cover', objectPosition:'0px 0px', borderRadius:'20px', position:'absolute'}}
                src={IMAGE_URL + movie.backdrop_path}></img>}
                <div style={{textAlign:'left', justifyContent:'end', alignItems:'end', maxWidth:'1300px', zIndex:'0'}} >
                    {movie.release_date && <h2>Release: {movie.release_date.replace("-","/").replace("-","/")}</h2>}
                    
                    {movie.vote_average && <h1>⭐{movie.vote_average.toFixed(1)}</h1>}
                    {stars()}
                    <hr />
                    <h1>Overview</h1>
                    <p style={{color:'#fff', fontSize:'18px'}}>{movie.overview}</p>
                    <h1>Genres</h1>
                    {movie.genres && movie.genres.map((genres:any, i:number) => <li key={i}style={{color:'#4fa5eb', fontSize:'20px', fontWeight:'bold'}}>{genres.name}</li>)}
                    {movie.homepage && 
                    <div>
                        <h1>🏠Homepage:  </h1>
                        <a href={movie.homepage}>
                            <h3>{movie.homepage}</h3>
                        </a>
                    </div>
                    }
                </div>
            </div>
           
        </div>
        
        : 
        <div> 
            <h2>Loading...</h2>
            <h1>🤚</h1>
        </div>
        }
        {movie && movie.production_companies && movie.production_companies.map((companies:any, i:number) => companies.logo_path !== null ? <img key={i} style={{width:'20%'}} src={IMAGE_URL + companies.logo_path}/> : false)}
    </div>
    )
}

export default Movie;