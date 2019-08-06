import React,{useState} from 'react';
import classes from './search.css';
import SearchContext from '../../context/search-context';
const Search = props =>{

    const [searchState,setSearchState] = useState({
        searchValue:""
    })

    const changed = (e,context) =>{
        const searchValue = e.target.value;
        setSearchState({
            searchValue:searchValue
        })
        context.setMoviesBySearchValue(searchValue);
    }

    return(
        <div className={classes.search}>
           <SearchContext.Consumer>
             {  context =>
            <input className={classes.searchInput}
             type='text'
            placeholder="Search..."
            value={searchState.searchValue}
            onChange = {(event)=>changed(event,context)}
            />}
            </SearchContext.Consumer> 
        </div>
    )
}


export default Search;