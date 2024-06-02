---
layout: "blog.njk"
title: "Blog"
---

<script>
  // Function to get the value of a specific cookie by name
  function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");

      // Removing whitespace at the beginning of the cookie name and compare it with the given string
      if (name === cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  // Check if the user is authenticated
  if (getCookie('auth') !== 'true') {
    window.location.href = "/login";
  }
</script>

<h1>Blog Articles</h1>
<ul class="blog-list">
{% for post in collections.blog %}
  {% if post.inputPath != './src/blog/index.md' %}
    <li class="blog-post">
      <a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date | dateFormat("LLLL dd, yyyy") }}
    </li>
  {% endif %}
{% endfor %}
</ul>
