import React from "react";
import { Link } from "react-router-dom";
import styles from "./PrivacyPolicy.module.css";

function PrivacyPolicy() {
  const privacyPolicyText = `
    1. 개인정보 처리 목적
    1.1 회사는 다음의 목적을 위해 개인정보를 처리합니다:
    - 서비스 제공 및 계약 이행을 위한 연락
    - 서비스 유효성 확인, 불법적 사용 방지 및 부정 사용 방지
    - 서비스 개선을 위한 통계 및 설문조사 분석
    - 신규 서비스 개발 및 마케팅 활용
    1.2 회사는 법령 및 동의 받은 개인정보 보유·이용 기간 내에서 처리 및 보유합니다.
    
    2. 개인정보의 제3자 제공 
    2.1 회사는 정보주체 동의 또는 법령에 따라 제3자에게 제공할 수 있습니다.
    
    3. 개인정보처리 위탁  
    3.1 회사는 필요한 업무 중 일부를 외부 업체에 위탁합니다. 개인정보 안전 처리 및 관리를 위해 계약을 체결하고 있습니다.
    
    4. 정보주체의 권리, 의무 및 행사 방법 
    4.1 정보주체는 권리를 행사할 수 있으며, 다음과 같은 권리가 있습니다:
    - 개인정보 열람 및 정정, 삭제 요구
    - 처리정지, 동의 철회 등
    
    5. 개인정보의 파기   
    5.1 회사는 불필요한 개인정보를 파기합니다. 동의 철회 요청 시까지 보유 가능합니다.
    
    6. 개인정보의 안전성 확보 조치
    6.1 회사는 안전성 확보를 위해 조치를 취하고 있습니다:
    - 직원 교육 및 접근 제한
    - 개인정보 보호를 위한 기록 관리
    - 처리시스템의 접근 권한 관리
    
    7. 개인정보 보호책임자 및 담당자 연락처  
    7.1 회사는 개인정보 보호책임자를 지정하고 있습니다:
    - 개인정보 보호책임자: 더조은
    - 이메일: privacy@example.com
    
    8. 개인정보 처리방침 변경   
    8.1 변경 시 홈페이지 '공지사항'을 통해 고지합니다.
  `;

  return (
    <div className={styles.container}>
      {/* 스크롤 가능한 개인정보 처리방침 내용 */}
      <div className={styles.privacyPolicyTitle}>Privacy Policy</div>
      <div className={styles.privacyPolicyTextContainer}>
        <pre className={styles.privacyPolicyText}>{privacyPolicyText}</pre>
      </div>

      {/* 개인정보 보호책임자 및 담당자 연락처 */}
      <div className={styles.contactInfo}>
        개인정보 보호책임자: 더조은
        <br />
        이메일: privacy@example.com
        <br />
        연락처: 000-1234-5678
      </div>

      {/* 개인정보 처리방침 버전 */}
      <div className={styles.versionInfo}>개인정보 처리방침 버전: 1.0</div>

      {/* 뒤로가기 버튼 */}
      <Link to="/member-service/insert" className={styles.backButton}>
        계정 만들기로 돌아가기
      </Link>
    </div>
  );
}

export default PrivacyPolicy;
