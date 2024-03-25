import { useEffect, useState } from 'react';

const useFetch = (url, setCurrentPage, isIntersecting) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const clearData = () => {
    setData((prev) => prev.splice(0, prev.length));
  };

  const handleOnClick = async function () {
    try {
      setLoading(true);
      const res = await fetch(url);
      const result = await res.json();
      setResponse(result.Response);
      setData([...data, ...result.Search]);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    const res = await fetch(url);
    const result = await res.json();
    setResponse(result.Response);
    setData([...data, ...result.Search]);
    setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (isIntersecting && response === 'True') {
      fetchData();
    }
  }, [isIntersecting, url, response]);

  return [data, error, loading, handleOnClick, clearData, setData];
};

export default useFetch;
