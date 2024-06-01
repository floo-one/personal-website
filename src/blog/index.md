---
layout: "blog.njk"
title: "Blog"
---

<h1>Login</h1>
<form id="login-form">
  <label for="login-username">Username:</label>
  <input type="text" id="login-username" name="login-username" required>
  <label for="login-password">Password:</label>
  <input type="password" id="login-password" name="login-password" required>
  <button type="submit">Login</button>
</form>

<h1>Register</h1>
<form id="register-form">
  <label for="register-username">Username:</label>
  <input type="text" id="register-username" name="register-username" required>
  <label for="register-password">Password:</label>
  <input type="password" id="register-password" name="register-password" required>
  <button type="submit">Register</button>
</form>

<script src="/authentication.js"></script>
