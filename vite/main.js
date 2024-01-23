// Fetch
const testRoute = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    console.log('data:', data);
  }


  const url1 = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const url2 = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Jamaican';
  const url3 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=Jamaican%20Beef%20Patties'
 
  testRoute(url1);
  testRoute(url2);
  testRoute(url3)