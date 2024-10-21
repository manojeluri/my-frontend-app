useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      // If no token, redirect to login
      navigate('/login');
      return;
    }
  
    fetch('https://enigmatic-hollows-82185-701449e24cf2.herokuapp.com/auth/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`, // Include Bearer prefix
      },
    })
      .then((response) => {
        if (response.status === 401) {
          // Unauthorized, redirect to login
          navigate('/login');
          return null;
        }
        // Check if the response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .then((data) => {
        if (data) {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('An error occurred while fetching data.');
      });
  }, [navigate]);
  