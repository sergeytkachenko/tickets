
<ul class="breadcrumb">
    {% for b in br %}
    <li><a href="{{ b['link'] }}">{{ b['text'] }}</a></li>
    {% endfor %}
</ul>