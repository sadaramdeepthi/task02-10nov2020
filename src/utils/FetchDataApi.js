const FetchDataApi = async () => {
  try {
    const response = await fetch("https://gorest.co.in/public-api/users");
    const data = await response.json();
    return data.data;
  } catch (err) {
    return false;
  }
};

export default FetchDataApi;
