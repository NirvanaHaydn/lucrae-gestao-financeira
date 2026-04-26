function isAuthenticated() {
  return localStorage.getItem("user") !== null;
}

function protectPage() {
  if (!isAuthenticated()) {
    window.location.href = "/login.html";
  }
}