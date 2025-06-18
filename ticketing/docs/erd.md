# Entity 계획

## Event

- 각 이벤트의 티켓은 100개가 존재한다

### FIELD

- eventId: Long
- eventName: String
- remainTickets: Int

## User

### FIELD

- userId: Long
- userEmail: String

## Ticket

### FIELD

- ticketNo: Long
- seat: Seat
- event: Event
- user: User
- payment: Payment

## Payment

### FIELD

- paymentId: Long
- paymentAmount: Long
- paymentMethod: PaymentMethod
- event: Event
- ticket: Ticket
- user: User

## Seat

### FIELD

- seatId: Long
- seatNo: Int
- seatStatus: seatStatus

## Base

- createdAt: Date
- updatedAt: Date

## 카디널리티

- Event - Ticket	1:N	공연 하나에 여러 티켓
- User - Ticket	1:N (권장)	한 유저가 여러 티켓 예매 가능
- Ticket - Payment	1:1	하나의 티켓당 하나의 결제
- User - Payment	1:N	유저는 여러 번 결제 가능
- Ticket - Seat 1:1 하나의 티켓은 하나의 좌석을 가짐