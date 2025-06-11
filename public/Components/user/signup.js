import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ktnpeskqyygikjitfkno.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bnBlc2txeXlnaWtqaXRma25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTk4MjEsImV4cCI6MjA2MzQ3NTgyMX0.h-i2kZF3dygFXAAuLUjzHYFJgI0Np5lUogZvxPD6RaI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function showToast(type, message) {
  alert(`${type.toUpperCase()}: ${message}`);
}

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
    window.location.href = "/Components/user/login.html";
  }, 1500);
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-signup");
  if (btn) {
    btn.addEventListener("click", signUp);
  }
});
