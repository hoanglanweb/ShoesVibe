import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ktnpeskqyygikjitfkno.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bnBlc2txeXlnaWtqaXRma25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTk4MjEsImV4cCI6MjA2MzQ3NTgyMX0.h-i2kZF3dygFXAAuLUjzHYFJgI0Np5lUogZvxPD6RaI';

 export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY); 

// Đăng ký
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function validatePassword(password) {
  return password.length >= 6;
}
async function signUp() {
  const full_name = document.getElementById("full_name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!full_name || !phone || !address)
    return showToast("error", "Vui lòng điền đầy đủ thông tin");

  if (!validateEmail(email))
    return showToast("error", "Email không hợp lệ");

  if (!validatePassword(password))
    return showToast("error", "Mật khẩu phải từ 6 ký tự");

  const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

  if (signUpError) {
    return showToast("error", signUpError.message);
  }

  // Chèn dữ liệu vào bảng profiles
  if (data?.user?.id) {
    const { error: insertError } = await supabase.from('profiles').insert([
      {
        id: data.user.id,
        full_name,
        phone,
        address,
        created_at: new Date().toISOString()
      }
    ]);

    if (insertError) {
      return showToast("error", "Lỗi khi lưu thông tin người dùng");
    }
  }

  showToast("success", "Đăng ký thành công, đang chuyển hướng...");
  setTimeout(() => {
    window.location.href = "/Components/user/login.html"; // Trang chủ của bạn
  }, 1500);
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
