// 캐싱
var CASH_NAME = "pwa-offline-v1"; // 캐싱스토리지에 저장될 이름
var cash_file_list = [
  "/", // index.html에 대한 캐싱도 담당 하고 있다는 것을 의미
  "/favicon.png",
  "/css/app.css",
  "/images/gauntlet.jpg",
  "/images/hammer.png",
  "/images/refresh.svg",
  "/images/shield.png",
]; // 캐싱할 웹 자원(css, img, ... )의 목록

// activate 실습
var CASH_NAME2 = "pwa-offline-v2"; // 캐싱스토리지에 저장될 이름
var cash_file_list2 = [
  "/", // index.html에 대한 캐싱도 담당 하고 있다는 것을 의미
  "/css/app.css",
]; // 캐싱할 웹 자원(css, img, ... )의 목록

// 서비스 워커 설치 ( 웹 자원 캐싱 )
self.addEventListener("install", function (event) {
  /**
   * self ?
   * 서비스워커파일에서 페이지에 대한 정보를 바라본다.
   * worker 에서는 window에 접근이 안되서 self로 접근 한다.
   */

  // waitUntil 안의 로직이 끝나기 전에는 event가 종료되지 않는다.
  event.waitUntil(
    // caches : 브라우저, sw에서 캐시스토리지에 접근 할 수 있는 예약어
    caches
      .open(CASH_NAME)
      .then(function (cache) {
        // pwa 파일에 전부 저장
        return cache.addAll(cash_file_list);
      })
      .catch(function (err) {
        return console.log("caches open error ", err);
      })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("event.request  " + event.request);
  event.respondWith(
    // 화면에서 요청하는 request
    caches
      .match(event.request)
      .then(function (resp) {
        /**
         * fetch : 응답값이 없을 경우 웹 리소스를 가져오는 네트워크 요청 발생
         */
        return resp || fetch(event.request);
      })
      .catch(function (err) {
        return console.log("fetch error " + err);
      })
  );
});

/**
 * 기존의 캐시를 지우고 새로운 캐시를 추가한다.
 */
self.addEventListener("activate", function (event) {
  var newCacheList = [CASH_NAME2];
  event.waitUntil(
    caches
      .keys()
      .then(function (cache) {
        /**
         * 모든 값이 promise로 반환이 된 후 return 이 진행된다.
         */
        return Promise.all(
          cache.map(function (ele) {
            if (newCacheList.indexOf(ele) === -1) {
              return caches.delete(ele);
            }
          })
        );
      })
      .catch(function (err) {
        return console.log("activate error " + err);
      })
  );
});
