# HPTimeLock 함수 설명

```
struct DonationInfo
```

도네이션 상태와 결과를 추적하기 위한 구조체

- 현재 도네이션 상태를 나타낸다. 시작전, 진행중, 완료, 취소로 구분한다
- 도네이션을 받을 글 작성자
- 도네이션 양
- 도네이션한 사람

<br />

```
struct LockInfo
```

도네이션 기부 토큰을 잠그기 위해 사용하는 구조체 도네이션이 종료되면 사라진다.

<br />

```
function donate(uint256 articleId, address donator, address writer, uint256 amount) public onlyOwner
```

글 번호 articleId에 도네이션 한다.

- 도네이터는 이 함수를 실행시키기 전에 HPTimeLock Contract에 자기가 도네이트할 토큰을 approve해놓는다.
- 도네이션 상태가 진행중이거나 시작전일 때만 실행
- 도네이터의 토큰이 충분한지 확인
- 도네이션 상태가 시작전이라면 초기 값을 세팅한다.
- 기부 토큰을 HPTimeLock Contract에 보내고 도네이션 정보를 기록한다.

<br />

```
function revokeAll(uint256 articleId, address writer) public onlyOwner
```

기부를 받던 글을 삭제할 때 호출

- 돈을 도네이터들에게 모두 돌려주고 기부토큰 잠금정보를 삭제하고 해당 글 아이디의 도네이션 상태를 취소상태로 변경

<br />

```
function revokeDonate(uint256 articleId, address donator) public onlyOwner
```

도네이터가 도네이션을 취소할 때 호출

- 돈을 돌려준다.

<br />

```
function release(uint256 articleId, address writer) public onlyOwner
```

정해둔 시간이 지나면 글 작성자가 기부 토큰으로 받은 토큰을 자기 지갑으로 가져갈 수 있다.

- 도네이션 토큰과 도네이터들을 기록하고 도네이션 상태를 완료로 바꾼다.
- 도네이션 토큰을 글 작성자에게 전송한다.

<br />

# 함수 테스트

```
npx hardhat test
```
