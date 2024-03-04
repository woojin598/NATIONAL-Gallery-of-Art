import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Search() {
  const { searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/item-service/search?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error(error));
  }, [searchTerm]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {searchResults.map((item) => (
          <div key={item.id} style={itemContainerStyle}>
            <Link
              to={`/item-service/detail/${item.id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              {item.bytes && (
                <img
                  src={`data:image/png;base64, ${item.bytes}`}
                  alt="이미지"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    width: '178px', // 이미지의 가로 크기 조절
                    height: '250px', // 이미지의 세로 크기 조절
                  }}
                />
              )}
              <div style={{ marginBottom: 'auto' }}>
                <p style={{ fontWeight: 'bold', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{item.title}</p>
                <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{item.price}원</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const itemContainerStyle = {
  width: '200px',
  height: 'auto',
  border: '1px solid black',
  margin: '10px',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
};

export default Search;