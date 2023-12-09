import axios from "axios";


export interface DefaultAPIParas  {
  query ?: string,
  category ?: string,
  from ?: string,
  to ?: string,
  sources ?: string
}

const sendHttpRequest = async (url : string) => {
    return axios
      .get(url)
      .then(function (response: any) {
        return (response);
      })
      .catch(function (error) {
        return (error);
      });

};
// YEAR-MONTH-DAY
export const getNewsApiData = ({query='', category='', from='', to='', sources='the-washington-post,cnn,google-news,engadget,reuters,the-hill,cbs-news,the-times-of-india,axios,politico'} : DefaultAPIParas) => {
    const base_URL='https://newsapi.org/v2'
    const langParameter = 'language=en'
    const queryParameter = query ? `/everything?${langParameter}&q=${query}` : `/top-headlines?${langParameter}`    
    const sourceParameter = sources ? `&sources=${sources}` : ''
    const categoryParameter = query ? '' : category ? `&category=${category}` : ''
    const fromParameter = from ? `&from=${from}` : ''
    const toParameter = to ? `&to=${to}` : ''
    const apiKey=`&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    
    return sendHttpRequest(base_URL+queryParameter+sourceParameter+"&pageSize=100"+categoryParameter+fromParameter+toParameter+apiKey)
    .then(response => response?.data?.articles ?? [])
};


export const getGuardianNewsAPIData = ({query='', category='', from='', to=''} : DefaultAPIParas) => {
    const base_URL='https://content.guardianapis.com/search?'
    const queryParameter = query ? `&q=${query}` : ''
    const categoryParameter = category ? `&section=${category}` : ''
    const fromParameter = from ? `&from-date=${from}` : ''
    const toParameter = to ? `&to-date=${to}` : ''
    const apiKey=`show-tags=contributor&show-fields=thumbnail%2CtrailText&page-size=100&api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`
    
    return sendHttpRequest(base_URL+apiKey+queryParameter+categoryParameter+fromParameter+toParameter)
    .then(response => response?.data?.response?.results ?? [])
};


export const getNYTAPIData = ({query='', category='', from='', to=''} : DefaultAPIParas) => {
    const base_URL='https://api.nytimes.com/svc/search/v2/articlesearch.json?'
    const queryParameter = query ? `&q=${query}` : ''
    const categoryParameter = category ? `&fq=section_name:(${category})` : ''
    const fromParameter = from ? `&begin_date=${from.replaceAll('-','')}` : ''
    const toParameter = to ? `&end_date=${to.replaceAll('-','')}` : ''
    const apiKey=`api-key=${process.env.REACT_APP_NEW_YORK_TIMES_KEY}`
    
    return sendHttpRequest(base_URL+apiKey+queryParameter+categoryParameter+fromParameter+toParameter)
    .then(response => response?.data?.response?.docs ?? [])
};