# 예약 로직

1. user의 정보를 validation
    - jwt를 통해 userEmail이 들어온다고 가정하고 진행한다
    - jwt valdation mocking으로 진행
    - jwt로 들어온다고 가정하고, 요청 body에 필요한 정보를 모두 넣는 방식으로 진행한다
2. 예약한 ticket의 정보를 validation
    - seat을 확인해 예약 가능한 상태인지 검증한다
3. validation을 통과했다면, Payment를 진행한다
    - jwt에 payment에 필요한 정보가 들어있어, 처음에 들어온다고 가정
    - toss payment test api를 사용한다
    - 테스트는 mocking하여 진행한다
4. 결과를 반환한다
    - boolean, seatNo, message로 반환한다