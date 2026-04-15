# 초민정음 (jammin) — 상세 구현 계획

## 1. 프로젝트 비전

초등 한글/국어 교육 웹 서버. 받아쓰기 만들기를 포함한 초등 국어교육 전반에 필요한 교육 자료, 기능 제공 및 학생/부모/교사를 위한 AI 접목 사이버 교육 지원 플랫폼의 백엔드 + 웹 프론트.

## 2. 현재 상태

- Spring Boot 3.0.6 + Thymeleaf + jQuery/Bootstrap (Agency 테마)
- 페이지: 메인(`/`), 도움말(`/help`), 받아쓰기(`/test`), 긴글연습(`/practice`), 자료실(`/paper`)
- 한글 분해 REST API (`POST /addWord`)
- `HangulUtil` — 초/중/종성 분해 유틸
- 한글 SVG 자산, KCC 도담도담체 폰트
- DB 없음 (pom.xml에 JPA/드라이버 미포함)
- 서비스 레이어 비어 있음
- HTTPS(443) + 키스토어 하드코딩 (키스토어 파일 부재)

## 3. 디자인 시스템

**기존 디자인 유지** — Bootstrap Agency 테마 + 교육용 커스텀

### 현재 디자인 요소
| 요소 | 값 |
|------|-----|
| Primary | `#ffc800` (골든 옐로우) |
| Warning | `#ffc800` |
| Success | `#198754` (CTA 버튼) |
| Link | `#ffc800` → hover `#cca000` |
| Highlight | `#fff4cc` |
| 본문 폰트 | KCC-DodamdodamR (도담도담체, 1.6rem) |
| 헤딩 폰트 | Montserrat, Roboto Slab |
| 기반 | Bootstrap 5.2.3 Agency 테마 |

교육 대상(초등학생, 교사)을 고려한 따뜻하고 친근한 톤 유지.

---

## 4. 단계별 구현 계획

### Phase 1 — 기반 인프라 구축 (3주)

**1.1 DB 연동**
- [ ] `pom.xml`에 Spring Data JPA + MariaDB 드라이버 추가
- [ ] 개발용 H2 프로필 분리 (`application-dev.properties`)
- [ ] 엔티티 설계:
  - `User` — 사용자 (역할: STUDENT, PARENT, TEACHER)
  - `Classroom` — 학급
  - `Student` — 학생 정보
  - `DictationTest` — 받아쓰기 시험
  - `DictationResult` — 시험 결과
  - `LearningHistory` — 학습 이력
- [ ] Flyway 마이그레이션 설정

**1.2 인증/권한 시스템**
- [ ] Spring Security 의존성 추가
- [ ] 3가지 역할: STUDENT, PARENT, TEACHER
- [ ] 회원가입/로그인 (폼 기반 + JWT API)
- [ ] 교사: 학급 생성, 학생 초대
- [ ] 학부모: 자녀 연결 (초대 코드)
- [ ] 학생: 학급 가입

**1.3 프로필 분리 (HTTPS 문제 해결)**
- [ ] `application-dev.properties` — HTTP, 포트 8080, H2
- [ ] `application-prod.properties` — HTTPS, 포트 443, MariaDB
- [ ] 키스토어 경로를 환경 변수로 변경
- [ ] `ssl/README`에 개발용 자체 서명 인증서 생성 스크립트 추가

**1.4 Spring Boot 업그레이드**
- [ ] 3.0.6 → 3.4.x (최신 LTS)
- [ ] 의존성 호환성 확인 및 수정

### Phase 2 — 교육 기능 강화 (4주)

**2.1 AI 받아쓰기 출제**
- [ ] Gemini API 연동 (`pom.xml`에 google-genai 추가)
- [ ] 학년/단원별 받아쓰기 자동 출제 프롬프트
- [ ] 난이도 3단계 (쉬움/보통/어려움)
- [ ] 커스텀 단어장 기반 출제 (교사가 등록한 단어)
- [ ] 음성 기반 받아쓰기:
  - Web Speech API (TTS) — 문제 읽어주기
  - 학생이 타이핑으로 답변
  - 자동 채점 (HangulUtil 기반 음절 비교)

**2.2 실시간 시험 시스템**
- [ ] WebSocket 의존성 추가 (`spring-boot-starter-websocket`)
- [ ] 교사: 시험 출제 → 학급 학생에게 실시간 전송
- [ ] 학생: 실시간 응시 화면
- [ ] 자동 채점 → 결과 즉시 표시
- [ ] 교사 대시보드에 실시간 진행 상황

**2.3 학습 이력 대시보드**
- [ ] 학생별 정답률, 취약 자모 분석
- [ ] 진도 차트 (Chart.js 또는 SVG)
- [ ] 교사: 학급 전체 통계
- [ ] 학부모: 자녀 학습 리포트

**2.4 한글 분해 API 확장**
- [ ] 겹자음, 이중모음 처리 강화
- [ ] 불규칙 활용 (ㅂ불규칙, ㅎ불규칙 등) 분석
- [ ] 띄어쓰기 검사
- [ ] 맞춤법 검사 (기본 규칙 기반)

### Phase 3 — AI 교정 + 콘텐츠 확장 (4주)

**3.1 AI 글씨체 교정 (Web 버전)**
- [ ] Canvas 기반 손글씨 입력 (터치/마우스)
- [ ] 획순 비교 — SVG 메타데이터와 사용자 입력 비교
- [ ] AI 분석: 비율, 균형, 크기 일관성 평가
- [ ] 교정 피드백 UI (어디가 어떻게 다른지 시각적 표시)

**3.2 교과서 연계 콘텐츠**
- [ ] 초등 1~2학년 국어 단원별 학습 콘텐츠
- [ ] 단원별 핵심 어휘 목록
- [ ] AI 기반 독해 문제 생성
- [ ] 단원별 교안 자동 생성 (교사용)

**3.3 SVG 획순 업그레이드**
- [ ] 정적 SVG → 획순 메타데이터 포함 인터랙티브 SVG
- [ ] 획순 애니메이션 재생
- [ ] 따라 쓰기 모드 (사용자가 직접 순서대로 그리기)

### Phase 4 — 학부모/교사 기능 + 안정화 (3주)

**4.1 학부모 기능**
- [ ] 자녀 학습 현황 대시보드
- [ ] 주간/월간 리포트 자동 생성
- [ ] 교사 메시지 확인
- [ ] 가정 학습 과제 확인

**4.2 교사 관리 도구**
- [ ] 학급 관리 — 학생 추가/제거, 그룹 편성
- [ ] 학습지 자동 생성 (PDF 출력)
- [ ] 성적표 생성
- [ ] 공지사항 발송

**4.3 서비스 레이어 정리**
- [ ] 빈 `MainService`/`MainServiceImpl` → 실제 비즈니스 로직 이동
- [ ] 컨트롤러 → 서비스 → 리포지토리 계층 분리 철저화
- [ ] 예외 처리 표준화

---

## 5. 기술 스택

| 구분 | 기술 | 비고 |
|------|------|------|
| 언어 | Java 17 → 21 | 업그레이드 검토 |
| 프레임워크 | Spring Boot 3.0.6 → 3.4.x | 업그레이드 |
| 보안 | Spring Security | 역할 기반 |
| DB | MariaDB (운영), H2 (개발) | 신규 추가 |
| ORM | Spring Data JPA | 신규 추가 |
| 마이그레이션 | Flyway | 신규 추가 |
| 실시간 | WebSocket | 실시간 시험 |
| AI | Google Gemini API | 출제, 교정 |
| 템플릿 | Thymeleaf | 기존 유지 |
| CSS | Bootstrap 5.2.3 (Agency) | 기존 유지 |
| 폰트 | KCC-DodamdodamR | 기존 유지 |
| 배포 | Docker | 기존 Dockerfile |
