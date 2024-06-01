---
layout: "blog.njk"
title: "Blog"
---

<h1>Blog Articles</h1>
<ul class="blog-list">
{% for post in collections.blog %}
  <li class="blog-post">
    <a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date | dateFormat("LLLL dd, yyyy") }}
  </li>
{% endfor %}
</ul>
