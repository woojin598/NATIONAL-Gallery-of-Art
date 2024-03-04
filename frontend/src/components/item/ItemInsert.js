import React, { useState } from 'react';
import { fetchFn3 } from '../../NetworkUtils';
import { useContext } from 'react';
import { ItemContext } from '../../contexts/ItemContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Item.module.css';


function ItemInsert() {
  const { itemInfo, setItemInfo } = useContext(ItemContext);
  const username = sessionStorage.getItem("LOGINER");
  const [bytes, setBytes] = useState("");

  function onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetchFn3("POST", "http://localhost:8000/item-service/items", formData)
      .then(data => {
        console.log(data);
        setBytes(data.bytes ? "data:image/png;base64," + data.bytes : null);

        sessionStorage.setItem("ITEM_ID", data.id);

        setItemInfo(100);

        window.location.href = `/item-service/detail/${data.id}`;
      })
  }

  return (

    <div className={`${styles.containerXxl} ${styles.py5}`}>
      <div className={styles.container}>
        <div className={`${styles.booking} ${styles.p5}`}>
          <div className={`${styles.row} ${styles.g5} ${styles.alignItemsCenter}`}>
            <div className={`${styles.colMd6} ${styles.textWhite}`}>
              <h6 className={`${styles.textWhite} ${styles.textUppercase}`}>Explore art, find inspiration</h6>
              <h1 className={`${styles.customHead} ${styles.mb4}`}>Share Your Artwork</h1>
              <p className={`${styles.customText} ${styles.mb4}`}>여러분의 예술을 세상과 함께 나누는 특별한 장소, 작가들의 무한한 창작을 자유롭게 발휘하는 공간입니다.</p>
              <p className={`${styles.customText} ${styles.mb4}`}>자신만의 빛나는 작품들을 자랑스럽게 업로드하고, 예술적 성장과 교류를 경험해보세요. 여러분의 작품이 더 큰 세계로 펼쳐질 수 있도록 노력하겠습니다.</p>
            </div>
            <div className={styles.colMd6}>
              <h1 className={`${styles.textWhite} ${styles.mb4} ${styles.customHead2}`}>작품등록</h1>
              {
                bytes !== "" && <img src={bytes} alt='이미지' style={{ display: 'block', margin: '0 auto' }} />
              }
              <form method='post' encType="multipart/form-data" onSubmit={onSubmitHandler}>

                <div className={`${styles.row} ${styles.g3}`}>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="title" placeholder="작품명" />
                      <label htmlFor="title" className={styles.customBlank}>작품명</label>
                    </div>
                  </div>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="artist" placeholder="작가명" />
                      <label htmlFor="artist" className={styles.customBlank}>작가명</label>
                    </div>
                  </div>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="qty" placeholder="qty" />
                      <label htmlFor="qty" className={styles.customBlank}>수량</label>
                    </div>
                  </div>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="price" placeholder="price" />
                      <label htmlFor="price" className={styles.customBlank}>가격</label>
                    </div>
                  </div>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating2}>
                      <input type="file" id="file1" name="file1" className={`${styles.formControl} ${styles.bgTransparent} ${styles.fileInput}`} />
                    </div>
                  </div>

                  <div className={styles.col12}>
                    <div className={styles.formFloating}>
                      <textarea className={`${styles.formControl} ${styles.bgTransparent}`} placeholder="작품설명" name="itemDescribe" style={{ height: '100px' }}></textarea>
                      <label htmlFor="itemDescribe" className={styles.customBlank}>작품설명</label>
                    </div>
                  </div>
                  <div className={styles.col12}>
                    <button className={`${styles.btn} ${styles.btnOutlineLight} ${styles.w100} ${styles.py3}`} type="submit">SUBMIT</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ItemInsert;
