# Cho-min 
 (가칭) 잼민정음
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![](https://img.shields.io/badge/Maintained-yes-green.svg)
![](https://img.shields.io/website-up-down-green-red/http/monip.org.svg)
![](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

![](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## 목차
[1. **프로젝트 소개**](#프로젝트-소개)

[2. **개발 환경**](#개발-환경)

[3. **설계 구조**](#설계-구조)

[4. **상세 기능**](#상세-기능)

[5. **업데이트 진행**](#업데이트-진행)


## 프로젝트 소개
* 해당 프로젝트는 스프링부트 기반 웹 어플리케이션이며, 다음 목표를 달성하기 위하여 제작되었습니다.  
  * 기존의 초등학교 교육과정 중 초등교사가 한글 학습중 학습지, 학습 교보재로서 사용하기 위한 목적
  * 분리 관리되던 초등 한글 교보재를 통합 및 종합하여 관리의 편이성을 증대시키기 위한 목적
  * 기타 소규모 한글 학습의 교육 방법 개선 및 토의와 논의를 위한 네트워크를 형성하기 위한 목적
* 개발 효율성을 향상시키기 위하여 다음과 같은 인프라가 활용, 구축되었습니다.  
  * Docker 를 이용한 컨테이너 어플리케이션 형식으로 구성되었습니다.  
  * Amazon Web Service 환경을 이용한 클라우딩 기술을 활용하여 구축하였습니다.  
* 해당 프로젝트는 [MIT 라이센스](https://choosealicense.com/licenses/mit/) 기반 배포 및 운영됩니다.  
  *  관련 의문사항이나 기타 2차 가공, 혹은 상업적 이용 등은 [이슈 생성](https://github.com/LucestDail/jammin/issues)을 통하여 문의 및 진행하시길 바랍니다.



## 개발 환경

- 코드 작성 환경 구성
  * VSCode
    * 유료화 툴 사용을 가급적 배제 및 사용자 커스터마이징 포퍼먼스에 맞는 에디트 툴 선택
  * DBeaver
    * 이클립스 기반 무료 툴 중 가장 Reference 다수 보유한 DB 에디트 툴 선택

- 어플리케이션 환경 구성
  * OpenJDK17
    * Java 8 EOL 예정에 따라 이후 LTS 버전 중 가장 최신 버전을 선택
  * Spring Boot 3.0.6
    * 웹 프레임워크 초기 구축 효율화를 위해 SpringBoot 활용
    * 3.0 버전의 개발 및 운영 환경 확대에 따라 3.0 버전으로 소스 마이그레이션 및 개발 진행
  * Maven 4.0.0
    * 빌드 툴 안정성 및 하위 호환성 고려 최신 버전 4.0.0 선택
  * spring-boot-starter-thymeleaf
    * View Template Engine 기반 스프링 진영에서 Active 하게 반응하는 뷰 엔진 활용
    * Document, Reference 다수 보유하며, Bootstrap 효응성 가장 우수하므로 선택
  * spring-boot-starter-data-jpa, lombok
    * Domain 단위 관리 및 데이터베이스 직접적 조작을 최소화 하기 위하여 코드 단위 관리에 최적화된 JPA 선택
    * 지연 저장 기능을 활용한 데이터 불시적인 트랜젝션 오류 최소화 위하여 활용
    * JPA 기능에 따른 코드 관리에 가장 적합한 라이브러리 Lombok 적용하여 코드 가독성 및 개발 효율성 도모
  * mariadb-java-client
    * Oracle 상업적 이용에 따른 유료 라이센스 상정, mysql 진영 무료 라이센스 데이터베이스 활용
    * Reference, Document 다수 보유한 MariaDB 선택
  
- 운영 환경 구성
  * Amazon Web Service (Ubuntu 20.04 LTS)
    * AWS EC2 인스턴스를 활용하여 서버 구축 및 어플리케이션 배포 
      * Local 환경에서 구축시 상시 서버 기기 구동이 필요하므로 클라우드 서버로 대체
      * GCP, Heroku, Naver Cloud, Gabia 등 여러 서비스 확인하였으나,  
         실제 운영 서버 구축시 추가적으로 발생할 인프라 확장성을 고려 AWS 기반 인프라로 선택
    * AWS RDS 를 활용하여 클라우딩 환경에서 데이터베이스 구축
  * SSR 페이지 구성 및 jquery, jquery-ui 스크립트 함수를 통한 데이터 조작 처리
    * 프론트 프레임워크를 별도로 두지 않고 서버 가용성을 최대한 활용한 SSR 방식을 활용, 사용자 사용환경을 최대한 사용하지 않도록 구성
  * Springboot Embded Apache Tomcat
    * 소규모 어플리케이션 구동시 가용성 및 추가적인 설정 고려 해당 WAS 선택

## 설계 구조

- 코드 구조  
  
  * 프로젝트 구조는 메이븐에서 제시하는 권장 템플릿 구조로 진행하였습니다.
  * com.JamminApplication
    * 최초 어플리케이션 진입점이며 main 이 실행됩니다.
  * .controller
    * Handler 에 대한 맵핑 컨트롤러를 구성과, RESTful 한 URL 입출입을 관리합니다.
  * .service
    * 메인 비지니스 로직을 통한 데이터 가공, 입출입을 통제합니다.
  * .util
    * 데이터 및 한글 파싱 처리에 있어서 필요한 기능이 포함됩니다.  
  
- 운영 환경 구조
  * 기본적으로 AWS IaaS 기반으로 구성되며 이를 통하여 어플리케이션을 설정하였습니다.  
  * 어플리케이션 서버는 Micro 기반으로 구성하였습니다.(Docker 기반 빌드 시 가용성 고려)  
  * AWS Route 53 을 활용한 DNS 도메인을 적용하였으며, 이를 활용하기 위하여 ELB 를 통한 라우팅 기능을 구성하였습니다.  
  * HTTPS 적용하여 일반적인 사이트에서 제공하는 사용자 보안 편의성을 제공합니다.
  * 내부적으로 Spring MVC 구조를 채택하여 맵핑 후 RESTFul 한 서비스 URL 제공이 가능하도록 구성하였습니다.  
  * 서버에 접근 가능한 대상은 포트로 구분하여 AWS VPC 를 세팅, 구성하였습니다.   

## 상세 기능
- 메인
  - 최초 진입 페이지입니다.
  - 전체적인 웹 사이트의 진입 방법 및 개발 인원 소개, 문의 링크를 안내합니다.

- 도움말
  - 웹 사이트의 사용 방법에 대해서 설명합니다.
  - 각 웹사이트의 기능별 URL 로 이동이 가능합니다.

- 받아쓰기
  - 받아쓰기 학습지를 사용자에 의해 생성 및 출력이 가능합니다.
  - 받아쓰기 대상자의 연령과 수준을 고려, 사용자에 의하여 특정 한글 자모를 숨기거나 글자 크기를 조정할 수 있습니다.
  
- 긴글 연습
  - 긴글 학습지를 사용자에 의해 생성 및 출력이 가능합니다.

- 교안 자료실
  - 한글 학습에 필요한 교안을 다운로드 가능합니다.
  - 교안 내용을 미리보고, 교안 학습 방법에 대한 설명을 명세합니다.

## 업데이트 진행
  - Ver 1.000(23.05.06)
    - 인스턴스 배포
      - IP URL 형식으로 최초 서버 구성이 완료되었습니다.
    - 메인 페이지 추가
    - 도움말 페이지 추가
  - Ver 1.003(23.06.02)
    - 받아쓰기 학습지 기능 추가
  - Ver 1.010(23.06.05)
    - 긴글 연습 기능 추가
  - Ver 1.010(23.07.29)
    - 받아쓰기 학습지 출력 기능 추가
  - Ver 1.010(23.08.12)
    - Route53 을 통한 도메인 바인딩 클라우딩 서버 구조 완성
    - SSL 인증서 keystore 프로퍼티 적용 및 HTTPS 접속 연결
  - Ver 1.011(23.09.24)
    - 교안자료실 추가
  - Ver 1.011(23.10.05)
    - 교안자료실 자료 추가
  - Ver 1.012(23.11.04)
    - 받아쓰기 기능 개선
        - 받아쓰기 폰트 조정 기능이 추가됩니다.(기존 - 중간, 추가 - 작게)
        - 받아쓰기 문제 단위 옵션바의 위치를 우측 끝에서 문제 바로 옆으로 조정하였습니다.