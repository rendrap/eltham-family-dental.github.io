---
layout: pages
---
<div class="sitemap">

    <h1 class="mb-0">SITEMAP</h1>
    <hr class="mb-4 mt-0">
    <div class="mb-5">
        <h2>Page list</h2>
        <ul class="page-list">
            <li><a href="{{ "/" | relative_url }}">Home</a></li>
            <li><a href="{{ "/team" | relative_url }}">About Eltham Family Dental</a></li>
            <li><a href="{{ "/stories" | relative_url }}">Stories</a></li>
            <li><a href="{{ "/contact" | relative_url }}">Contact us</a></li>
            <li><a href="{{ "/stories" | relative_url }}">Stories</a></li>
            <li><a href="{{ "/sitemap" | relative_url }}">Sitemap</a></li>
            <li><a href="{{ "/privacy" | relative_url }}">Privacy</a></li>
        </ul>
    </div>

    <div>
        <h2>Post list</h2>
        <ul class="post-list">
            {% for post in site.posts %}
            <li>
                <a href="{{post.url | relative_url }}">{{ post.title }}</a>
            </li>
            {% endfor %}
        </ul>
    </div>

</div>

