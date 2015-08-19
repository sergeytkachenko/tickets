<div class="container-fluid">
    <div class="navbar-header">
        <a class="navbar-brand" href="/">Покупка билетов онлайн</a>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right">
            <li {% if router.getRewriteUri() == '/event/list' %}class="active"{% endif %}><a href="/event/list">Мероприятия</a></li>
            {%  if user %}
                <li><a href="javascript:void(0)">{{ user.email }}</a></li>
                <li><a href="/user/exit">Выход</a></li>
            {% endif %}
        </ul>
    </div><!--/.nav-collapse -->
</div><!--/.container-fluid -->