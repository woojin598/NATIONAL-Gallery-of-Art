import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFn, fetchFn3 } from "../../NetworkUtils";
import { ItemContext } from '../../contexts/ItemContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Item.module.css';

function ItemUpdate() {
  const { id } = useParams();
  const { itemInfo, setItemInfo } = useContext(ItemContext);

  const [item, setItem] = useState(null);
  const [bytes, setBytes] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (id) {
      fetchFn("GET", `http://localhost:8000/item-service/items/${id}`, null)
        .then(data => {
          if (data !== undefined) {
            setBytes("data:image/png;base64," + data.bytes);
            setItem(data.result);
            console.log(data);
          }
        });
    }
  }, [id]);

  useEffect(() => {
    if (item) {
      const newFormData = new FormData();
      newFormData.append("artist", item.artist);
      newFormData.append("title", item.title);
      newFormData.append("itemDescribe", item.itemDescribe);
      newFormData.append("price", item.price);
      newFormData.append("qty", item.qty);
      // 여기서 파일을 추가하고 싶다면 아래와 같이 추가합니다.
      // newFormData.append("file1", 파일객체);

      setFormData(newFormData);
    }
  }, [item]);

  function onInputHandler(e) {
    let val = e.target.value;

    let newItem = { ...item, [e.target.name]: val };

    setItem(newItem);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (!formData) {
      alert("데이터가 준비되지 않았습니다.");
      return;
    }

    // FileReader를 사용하여 파일을 읽고, Base64로 인코딩합니다.
    const fileInput = e.target.querySelector('input[name="file1"]');
    if (fileInput.files.length > 0) {
      formData.append("file1", fileInput.files[0]);
    }

    fetchFn3("PUT", `http://localhost:8000/item-service/items/update/${id}`, formData)
      .then(data => {
        if (data === undefined) {
          console.log(data);
          alert("수정 실패");
          return;
        }
        if (data !== undefined) {
          setItemInfo(data);
          window.location.href = `/item-service/detail/${id}`;
        }
      })
      .catch(error => {
        console.error(error);
        alert("입력 실패: " + error.message);
      });
  }

  if (!id) {
    return <div>유효한 ID가 없습니다.</div>;
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
              <h1 className={`${styles.textWhite} ${styles.mb4} ${styles.customHead2}`}>작품수정</h1>

              <form method='post' encType="multipart/form-data" onSubmit={onSubmitHandler}>
                <div className={`${styles.row} ${styles.g3}`}>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="title" value={item ? item.title : ''} onInput={onInputHandler} placeholder="작품명" />

                      <label htmlFor="title" className={styles.customBlank}>작품명</label>
                    </div>
                  </div>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="artist" value={item ? item.artist : ''} onInput={onInputHandler} placeholder="작가명" />
                      <label htmlFor="artist" className={styles.customBlank}>작가명</label>
                    </div>
                  </div>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="qty" value={item ? item.qty : ''} onInput={onInputHandler} placeholder="qty" />
                      <label htmlFor="qty" className={styles.customBlank}>수량</label>
                    </div>
                  </div>
                  <div className={styles.colMd6}>
                    <div className={styles.formFloating}>
                      <input type="text" className={`${styles.formControl} ${styles.bgTransparent}`} name="price" value={item ? item.price : ''} onInput={onInputHandler} placeholder="price" />
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
                      <textarea className={`${styles.formControl} ${styles.bgTransparent}`} name="itemDescribe" value={item ? item.itemDescribe : ''} onInput={onInputHandler} style={{ height: '100px' }}></textarea>
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
}

export default ItemUpdate;