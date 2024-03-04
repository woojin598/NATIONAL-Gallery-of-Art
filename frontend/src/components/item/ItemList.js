import React, { useEffect, useState } from 'react';
import { fetchFn } from '../../NetworkUtils';
import ItemComp2 from './ItemComp2';
import ItemListPaging from './ItemListPaging';
import { Link, useNavigate } from 'react-router-dom';
import './ItemList.css';
import './izmir.scss';

function ItemList() {
  const [pageList, setPageList] = useState([]);
  const [bytes, setBytes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFn("GET", "http://localhost:8000/item-service/list?pageNum=0")
      .then((data) => {
        setPageList(data.result.content);
        setBytes("data:image/png;base64," + data.strBytes);
      });
  }, []);

  const renderFigure = (item, index) => {
    switch (index % 9) {
      case 0:
        return (
          <figure
            className="c4-izmir c4-border-bottom-left c4-image-pan-left c4-gradient-bottom-right home-content col-item"
            tabIndex="0"
            style={{
              '--primary-color': '#f12711',
              '--secondary-color': '#f5af19',
              '--image-opacity': '.1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="c4-layout-bottom-left">
              <div className="c4-reveal-right c4-delay-100 linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
      case 1:
        return (
          <figure className="c4-izmir c4-border-cc-3 c4-image-pan-left c4-gradient-bottom-right col-item"
            tabIndex="0"
            style={{
              '--primary-color': '#7303c0',
              '--secondary-color': '#ec38bc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption>
              <div className="c4-rotate-up-right c4-delay-200 linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );

      case 2:
        return (
          <figure className="c4-izmir c4-border-right c4-image-pan-left c4-gradient-top col-item"
            tabIndex="0"
            style={{
              '--primary-color': '#000046', '--secondary-color': '#1CB5E0',
              '--text-color': '#fdeff9', '--border-color': '#fdeff9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="c4-layout-top-right">
              <div className="c4-reveal-left linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
      case 3:
        return (
          <figure className="c4-izmir c4-border-cc-1 c4-image-pan-left c4-gradient-bottom-right col-item"
            tabIndex="0" style={{
              '--primary-color': '#02AAB0',
              '--secondary-color': '#00CDAC', '--border-color': '#e1f0e4', '--text-color': '#e1f0e4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="c4-layout-bottom-right">
              <div className="c4-reveal-left c4-delay-800 linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
      case 4:
        return (
          <figure
            className="c4-izmir c4-border-center c4-image-pan-left c4-gradient-top col-item"
            tabIndex="0"
            style={{
              '--primary-color': '#e52d27',
              '--secondary-color': '#b31217',
              '--text-color': '#fdeff9',
              '--border-color': '#fdeff9',
              '--image-opacity': '.1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="">
              <div className="c4-fade-up linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
      case 5:
        return (
          <figure
            className="c4-izmir c4-border-corners-1 c4-image-pan-left c4-gradient-bottom col-item"
            tabIndex="0"
            style={{
              '--primary-color': '#E0EAFC',
              '--secondary-color': '#CFDEF3',
              '--text-color': '#1f467b',
              '--border-color': '#1f467b',
              '--image-opacity': '.1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="c4-layout-top-left">
              <div className="c4-reveal-down linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
      case 6:
        return (
          <figure className="c4-izmir c4-border-left c4-gradient-top-right c4-image-pan-left col-item"
            style={{
              '--primary-color': '#f5af19',
              '--secondary-color': '#f12711',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="c4-layout-center-center">
              <div className="c4-izmir-title-wrapper c4-reveal-left linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
      case 8:
        return (
          <figure
            className="c4-izmir c4-border-corners-1 c4-gradient-bottom-left c4-image-pan-left col-item"
            style={{
              '--primary-color': '#16A085',
              '--secondary-color': '#F4D03F',
              '--border-width': '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="c4-layout-center-center col-item">
              <div className="c4-izmir-icon-wrapper c4-fade c4-delay-300 linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
      case 7:
        return (
          <figure
            className="c4-izmir c4-border-vert c4-gradient-top c4-image-pan-left col-item"
            style={{
              '--primary-color': '#4D516C',
              '--secondary-color': '#73799F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigate(`/item-service/detail/${item.id}`)}
          >
            <div style={{ transform: 'translateY(-10px)' }}>
              <ItemComp2 item={item} opacity={0.7} />
            </div>
            <figcaption className="c4-layout-center-center">
              <div className="c4-izmir-title-wrapper c4-fade c4-delay-300 linkStyle">
                <h2>
                  {item.title}
                </h2>
              </div>
            </figcaption>
          </figure>
        );
    }
  }

  return (
    <div id="main-content" className="home-content home-wrapper" role="main">
      {
        pageList.map((item, index) => (
          <div className="col-item" key={index}>
            {renderFigure(item, index)}
          </div>
        ))
      }
      <div className="pagination-container">
        <ItemListPaging setFn={setPageList} />
      </div>
    </div>
  );
}

export default ItemList;
