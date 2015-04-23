{% for n in news %}
    <div class="row content-page" style="margin-bottom: 40px;">
        <div class="col-md-12 col-sm-12">
            <h2 style="text-align: left;"><a href="/news/view/{{ n.id }}">{{ n.title }}</a></h2>
            <ul class="blog-info" style=" padding: 0; margin-left: 0; list-style: none">
                <li><i class="fa fa-calendar"></i> {{ display_when(n.date_create) }}</li>
            </ul>
            <div>
                {{ n.short_description }}
            </div>
            <a class="more" href="/news/view/{{ n.id }}">Подробнее <i class="icon-angle-right"></i></a>
        </div>
    </div>
{% endfor %}
{% if news|length == 0 %}
    {{ partial("partials/items-null") }}
{% endif %}