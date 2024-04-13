import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Article from './components/Article';

function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/photo-gallery-feed-page/page/${page}`);
      const newArticles = response.data.nodes.map((node) => ({
        title: node.node.title,
        image: node.node.field_photo_image_section,
        path: node.node.path,
        nid: node.node.nid,
      }));

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 20 && !loading) {
      fetchData();
    }
  };

  return (
    <div className='App'>
      <div className='articles'>
        {articles.map((article, index) => (
          <Article key={index} {...article} />
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
