---
layout: base.njk
title: "Welcome to My Personal Website"
---
{% for section in collections.sections %}
    {{ section.templateContent | safe }}
{% endfor %}
