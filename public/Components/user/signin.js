import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ktnpeskqyygikjitfkno.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bnBlc2txeXlnaWtqaXRma25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTk4MjEsImV4cCI6MjA2MzQ3NTgyMX0.h-i2kZF3dygFXAAuLUjzHYFJgI0Np5lUogZvxPD6RaI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function showToast(type, message) {
  alert(`${type.toUpperCase()}: ${message}`);
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

async function signIn() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!validateEmail(email) || !password) {
    return showToast("error", "Vui lòng nhập email và mật khẩu hợp lệ");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    showToast("error", error.message);
  } else {
    showToast("success", "Đăng nhập thành công, đang chuyển hướng...");
    setTimeout(() => {
      window.location.href = "../../index.html";

    }, 1500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-signin");
  if (btn) {
    btn.addEventListener("click", signIn);
  }
});
