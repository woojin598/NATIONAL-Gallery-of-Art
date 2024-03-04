import React from 'react';


function ItemComp2(props) {
  const strBytes = props.item.strBytes;
  let items = [];
  if (Array.isArray(props.item)) {
    items = props.item;
  } else {
    items = [props.item];
  }
  const opacity = props.opacity || 1;

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          {index % 2 === 0 && (
            <>
              <div>
                <div>

                  <span>{item.file1}</span><br />
                </div>
              </div>
              <div>
                {strBytes !== null && (
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${strBytes}`}
                      alt="이미지"
                      style={{

                        opacity: opacity
                      }}
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

export default ItemComp2;
