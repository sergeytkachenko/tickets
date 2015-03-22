<div class="row list-view-sorting clearfix">
    {% if errors|length == 0 %}
        <div class="note note-success">
            <p>
                Запсиь успешно добавлена, перенаправляем...
                <script>
                    setTimeout(function () {
                        location.href="/room";
                    }, 1000);
                </script>
            </p>
        </div>
    {% else %}

        <div class="note note-danger">

            <p>
                {% for error in errors %}
                    {{ error }}.<br>
                {% endfor %}
            </p>

        </div>
        <div>
            <a role="button" class="btn blue" href="javascript:history.back();" >Назад</a>
        </div>
    {% endif %}
</div>