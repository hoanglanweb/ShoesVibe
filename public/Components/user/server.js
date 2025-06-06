import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
const SUPABASE_URL = "https://drrhonkiqhmpnqhuzvlh.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRycmhvbmtpcWhtcG5xaHV6dmxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTU3NTgsImV4cCI6MjA2MzQ3MTc1OH0.E8veK1djbCd0CHinT8soI8oeKnY8BjzlEjR8wzAnwIk";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Đăng ký
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6;
}

async function signUp() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!validateEmail(email)) return showToast("error", "Email không hợp lệ");
  if (!validatePassword(password))
    return showToast("error", "Mật khẩu phải từ 6 ký tự");

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    showToast("error", error.message);
  } else {
    showToast("success", "Vui lòng kiểm tra email để xác minh!");
  }
}

// Gắn sự kiện sau khi DOM tải xong
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-signup");
  if (btn) {
    btn.addEventListener("click", signUp);
  }
});

// Đăng nhập
async function signIn() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!validateEmail(email) || !password) {
    return showToast("error", "Vui lòng nhập email và mật khẩu hợp lệ");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    showToast("error", error.message);
  } else {
    window.location.href = "profile.html";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-signin");
  if (btn) {
    btn.addEventListener("click", signIn);
  }
});

// Đăng xuất
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

// Gửi email đặt lại mật khẩu
async function sendResetLink() {
  const email = document.getElementById("reset-email").value.trim();

  if (!validateEmail(email)) return showToast("error", "Email không hợp lệ");

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    showToast("error", error.message);
  } else {
    showToast("success", "Đã gửi liên kết đặt lại mật khẩu!");
  }
}

// Đặt lại mật khẩu mới
async function updatePassword() {
  const newPassword = document.getElementById("new-password").value;

  if (!validatePassword(newPassword))
    return showToast("error", "Mật khẩu quá ngắn");

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) {
    showToast("error", error.message);
  } else {
    showToast("success", "Mật khẩu đã được cập nhật!");
    setTimeout(() => (window.location.href = "login.html"), 1500);
  }
}

function showToast(type, message) {
  const toastContainer =
    document.getElementById("toast-container") || createToastContainer();
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

function createToastContainer() {
  const container = document.createElement("div");
  container.id = "toast-container";
  document.body.appendChild(container);
  return container;
}
window.signUp = signUp;
