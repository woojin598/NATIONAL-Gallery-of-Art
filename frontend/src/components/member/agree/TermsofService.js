import React from "react";
import { Link } from "react-router-dom";
import styles from "./TermsofService.module.css";

function TermsofService() {
  const termsText = `
  1. 서비스 이용약관 동의
  1.1 본 이용약관에 동의함으로써 서비스를 이용할 수 있습니다.
  1.2 회원은 이용 약관에 동의함으로써 서비스 이용 중 발생하는 일체의 권리와 의무에 동의하게 됩니다.

  2. 서비스 제공
  2.1 본 서비스는 회원이 약관에 동의한 경우에만 제공되며, 일부 서비스는 유료로 제공될 수 있습니다.
  2.2 회사는 서비스 제공을 위해 필요한 경우 예고 없이 서비스 내용을 변경하거나 중단할 수 있습니다.

  3. 회원의 의무
  3.1 회원은 자신의 ID와 비밀번호를 안전하게 관리하여야 합니다.
  3.2 회원은 본 서비스를 불법적인 목적으로 사용해서는 안됩니다.
  3.3 회원은 본 서비스 이용 시 타인의 권리를 침해하지 않아야 합니다.

  4. 소유권 및 저작권
  4.1 회사가 제공하는 서비스와 관련된 모든 저작권과 지적 재산권은 회사에게 속합니다.
  4.2 회원은 회사의 사전 승인 없이 서비스 내용을 복사, 수정, 배포할 수 없습니다.

  5. 서비스의 중단 및 해지
  5.1 회원이 서비스 이용을 중단하고자 하는 경우, 회원은 이메일 등을 통해 서비스 탈퇴를 요청할 수 있습니다.
  5.2 회사는 회원이 이용 약관을 위반하는 경우 서비스 이용을 제한하거나 회원 자격을 박탈할 수 있습니다.

  6. 책임 제한
  6.1 회사는 서비스 이용으로 인해 발생한 손해에 대해 책임을 지지 않습니다.
  6.2 회사는 회원의 행위로 인해 발생한 손해에 대해 책임을 지지 않습니다.

  7. 기타
  7.1 본 이용약관은 관련 법률에 의해 규정된 사항을 따르며, 규정된 사항이 없는 경우 일반적인 상관례에 따릅니다.
  7.2 회사는 필요에 따라 이용약관을 변경할 수 있으며, 변경 사항은 이용자에게 공지됩니다.
`;

  return (
    <div className={styles.container}>
      {/* 스크롤 가능한 이용약관 내용 */}
      <div className={styles.termsofServiceTitle}>TermsofService</div>
      <div className={styles.termsofServiceTextContainer}>
        <pre className={styles.termsofServiceText}>{termsText}</pre>
      </div>

      {/* 이용약관 담당자 연락처 */}
      <div className={styles.contactInfo}>
        이용약관 담당자: 더조은
        <br />
        이메일: privacy@example.com
        <br />
        연락처: 000-1234-5678
      </div>

      {/* 이용약관 처리방침 버전 */}
      <div className={styles.versionInfo}>이용약관 버전: 1.0</div>

      {/* 뒤로가기 버튼 */}
      <Link to="/member-service/insert" className={styles.backButton}>
        계정 만들기로 돌아가기
      </Link>
    </div>
  );
}

export default TermsofService;
