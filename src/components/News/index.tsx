
import React, {useEffect, useState} from 'react'
import List from '../../components/List';
import SearchBar from '../../components/SearchBar';
import "./styles.scss";
import { FilterOptions, filter, getNews } from '../../utils/data';
import Filter from '../Filter';
import Cookies from 'js-cookie';

export interface NewsItem {
  id : string
  apiSource : "news_api" | "guardian_news" | "nyt_api";
  author : string;
  description : string;
  publishedAt : string;
  source : string;
  image: string;
  title : string;
  url : string;
}

export const sourcingFrom = {
  news_api: "News API",
  guardian_news: "The Guardian Open Platform",
  nyt_api: "New York Times Article Search"
} 

export type ApiSource = keyof typeof sourcingFrom;


function News() {

 
  const [newsItems, setNewsItems] = useState([])
  const [filters, setFilters] = useState<FilterOptions>({})



  
  const updateFilters = (newFilters : FilterOptions) => {
    const updateFiltersQuery :FilterOptions = {
      ...filters,
      ...newFilters,
    }   
    setFilters(prev => updateFiltersQuery)
  }
  
  const updateNews = (filterData: FilterOptions = {}) => {    
    const filterRequest = Object.keys(filterData).length > 0 ? filterData :  filters
    console.log(filterRequest);
    filter(filterRequest).then(newNewsItems => {
        setNewsItems(prev => newNewsItems);
      
    });
  };

  const updateQuery = (e : string) => {  
    const updateFiltersQuery :FilterOptions = {
      ...filters,
      query : e,
    }   
    setFilters(prev => updateFiltersQuery)
  }
  const resetFilters = () => {
  }

  const resetPreferences = () => {
    Cookies.remove('filterPreferences');
  }

  const savePreferences = () => {
    Cookies.set('filterPreferences', JSON.stringify(filters), { expires: 30 });
  }


  
  useEffect(() => {

    const savedPreferences = Cookies.get('filterPreferences');
    if(savedPreferences){
      const filterData : FilterOptions = JSON.parse(savedPreferences)
      updateFilters(filterData);
      
        updateNews(filterData);
      
      
    }
    else {
      getNews().then(res => setNewsItems(res));
    }
    
  }, []);


  return (
    <section className='newsItems'>
      <SearchBar updateQuery={updateQuery} updateNews={updateNews} resetFilters={resetFilters}/>
      <Filter savedPreferences={filters} filter={updateFilters} savePreferences={savePreferences} resetPreferences={resetPreferences}/>
      <List newsItems={newsItems}/>
    </section>
  )
}

export default News