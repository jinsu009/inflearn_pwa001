if ("serviceWorker" in navigator) {
  // sw 등록
  navigator.serviceWorker
    .register("service-worker.js")
    .then(function (reg) {
      console.log("sw 등록 완료 " + reg);
    })
    .catch(function (err) {
      console.log("sw 등록 실패 " + err);
    });
}
