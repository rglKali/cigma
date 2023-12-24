import { useState, useEffect } from 'react';

type ApiResponse = any; // Define your API response type here

interface ApiError {
  message: string;
  statusCode: number;
}

interface ApiParams {
  op: string;
  jwt?: boolean;
  data?: any;
}

const useApi = (initialParams: ApiParams): [(params: ApiParams) => void, ApiResponse | null, ApiError | null, boolean] => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async (params: ApiParams) => {
    setLoading(true);

    try {
      const { op, jwt = false, data } = params;

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(jwt && { Authorization: `Bearer ${localStorage.getItem('jwt')}` }),
        },
        body: JSON.stringify({ 
          op, 
          jwt: (jwt && localStorage.getItem('jwt')), 
          data
        }),
      };

      const apiUrl = 'YOUR_API_ENDPOINT'; // Replace with your API endpoint URL

      const apiResponse = await fetch(apiUrl, requestOptions);

      if (!apiResponse.ok) {
        const errorData: ApiError = {
          message: 'Failed to fetch data',
          statusCode: apiResponse.status,
        };
        throw errorData;
      }

      const responseData = await apiResponse.json();
      setResponse(responseData);
      setError(null);
    } catch (error) {
      setError(error as ApiError);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Invoke the API call with initial parameters when the component mounts
    callApi(initialParams);
  }, []); // Empty dependency array ensures this runs only once on mount

  return [callApi, response, error, loading];
};

export default useApi;
