# 초민정음 — 초등 한글 학습 웹 애플리케이션

> 초등학교 교사가 한글 교육에 활용할 수 있는 학습지·교보재 생성 웹 애플리케이션입니다. 분산된 한글 교보재를 한곳에서 쉽게 사용할 수 있도록 제공합니다.

## 주요 기능

- **받아쓰기 학습지** — 단어/문장 기반 받아쓰기 학습지 생성 및 출력
- **긴글 연습** — 긴 문장 쓰기 연습 화면
- **교안 자료실** — 한글 교육용 교안 자료 제공
- **한글 분해 API** — 한글 음절을 초성/중성/종성으로 분해하는 REST API
- **획순 연습** — 한글 글자 SVG 기반 획순 연습 (개발 중)

## 기술 스택

| 구분 | 기술 |
|------|------|
| 언어 | Java 17 |
| 프레임워크 | Spring Boot 3.0.6 |
| 템플릿 | Thymeleaf |
| 프론트엔드 | Bootstrap, jQuery 3.7.0 |
| 폰트 | KCC 도담도담체 등 교육용 폰트 |
| 빌드 | Maven (`mvnw`) |
| 배포 | Docker (`eclipse-temurin:17-jre`) |

## 프로젝트 구조

```
jammin/
├── pom.xml
├── Dockerfile
└── src/main/
    ├── java/com/jammin/
    │   ├── JamminApplication.java        # 진입점
    │   ├── controller/
    │   │   ├── MainController.java       # 페이지 라우트
    │   │   └── TestRestController.java   # 한글 분해 REST API
    │   ├── service/                      # 서비스 레이어
    │   └── util/
    │       ├── Hangul.java               # 음절/자모 모델
    │       └── HangulUtil.java           # 한글 분해·검증 유틸
    └── resources/
        ├── application.properties
        ├── templates/                    # Thymeleaf 뷰 (index, test, practice, paper)
        └── static/                       # CSS, JS, 한글 SVG, 폰트
```

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 메인 페이지 (소개, 내비게이션) |
| `/help` | 도움말 |
| `/test` | 받아쓰기 학습지 생성·출력 |
| `/practice` | 긴글 연습 |
| `/paper` | 교안 자료실 |

## API

```
POST /addWord
Body: { "requestWord": "한글" }
Response: [{"cho":"ㅎ","jung":"ㅏ","jong":"ㄴ"}, {"cho":"ㄱ","jung":"ㅡ","jong":"ㄹ"}]
```

## 실행

### 사전 요구사항
- JDK 17

### 로컬 실행
```bash
./mvnw spring-boot:run
```

### Docker
```bash
./mvnw clean package
docker build -t jammin .
docker run -p 8080:443 jammin
```

> **참고**: `application.properties`에 HTTPS(포트 443) + SSL 키스토어가 설정되어 있습니다. 로컬 개발 시 HTTP + 8080 포트로 변경하거나, `ssl/README`를 참고하여 키스토어를 생성하세요.

## 라이선스

MIT
