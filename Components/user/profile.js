import { supabase } from '/Components/user/sever.js';

async function loadProfile() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/Components/user/login.html";
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    showToast("error", "Không thể tải thông tin người dùng");
    return;
  }

  document.getElementById("full_name").textContent = data.full_name;
  document.getElementById("email").textContent = user.email;
  document.getElementById("phone").textContent = data.phone;
  document.getElementById("address").textContent = data.address;
}

document.addEventListener("DOMContentLoaded", loadProfile);
