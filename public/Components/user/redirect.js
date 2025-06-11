import { supabase } from '/Components/user/config.js';

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("start-btn");
  if (btn) {
    btn.addEventListener("click", async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        window.location.href = "/Components/user/profile.html";
      } else {
        window.location.href = "/Components/user/user.html";
      }
    });
  }
});
