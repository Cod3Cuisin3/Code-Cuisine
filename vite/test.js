// Fetch
const testRoute = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    console.log('data:', data);
  }


  const url1 = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const url2 = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Jamaican';

  const dishId = 52936
  const url3 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId} `
 
  testRoute(url1);
  testRoute(url2);
  testRoute(url3)

  const handleClick = (e) => {
    const food = document.querySelector('#food');
    
  }
  
  document.querySelector('button').addEventListener('click', handleClick)