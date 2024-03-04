import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import './assets/ItemComp.module.css';

function ItemComp(props) {
  const strBytes = props.item.strBytes;
  let items = [];
  if (Array.isArray(props.item)) {
    items = props.item;
  } else {
    items = [props.item];
  }

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          {index % 2 === 0 && (
            <>
              <div>
                <div>
                  <span>{item.artist}</span><br />
                  <span>
                    <Link to={`/item-service/detail/${item.id}`}>{item.title}</Link>
                  </span><br />
                  <span>{item.itemDescribe}</span><br />
                  <span>{item.file1}</span><br />
                </div>
              </div>
              <div>
                {strBytes !== null && (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${strBytes}`}
                      alt="이미지"
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ItemComp;