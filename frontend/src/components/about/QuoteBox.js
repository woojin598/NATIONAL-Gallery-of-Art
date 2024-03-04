import React, { useEffect } from 'react';
import './QuoteBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'



function QuoteBox() {
    useEffect(() => {

        document.body.classList.add('body-about');

        return () => {
            document.body.classList.remove('body-about');
        };
    }, []);


    return (
        <div className="box">
            <FontAwesomeIcon icon={faQuoteLeft} className="fas fa2" />
            <div className="text">
                <FontAwesomeIcon icon={faQuoteRight} className="fas fa1" />
                <div>
                    <h3>Explore Artistic Journeys</h3>
                    <p>
                        National Gallery of Art에 오신 것을 환영합니다.<br />
                        여기는 예술가들의 창조적 여행을 모색하고, 끊임없는 탐색을 통해 <br />신선한 창조력을 찾는 곳입니다.<br />
                        '예술의 여정을 탐색하다'라는 슬로건처럼<br />
                        우리는 다양한 예술가들이 자신들의 작품을 통해 이야기하는 <br />개인적인 이야기와 문화적 경험을 공유하고자 합니다.<br />
                        여러 나라의 예술가들이 그들의 작품을 통해 감정, 생각, 아이디어를 <br />표현할 수 있는 우리 갤러리에서
                        예술의 감동과 이해를 느낄 수 있는 <br />여정을 함께 탐험해 보세요.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default QuoteBox;