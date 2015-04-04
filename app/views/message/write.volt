<div class="row inbox">
    {% if isPost %}
    <div class="row list-view-sorting clearfix">
        {% if errors|length == 0 %}
            <div class="note note-success">
                <p>
                    Ваше сообщение успешно отправлено!
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
    {% endif %}
    <div class="inbox-header">
        <h1 class="pull-left">Написать Администрации</h1>
    </div>
    <div class="inbox-loading" style="display: none;">
        Loading...
    </div>
    <div class="inbox-content">
        <form class="inbox-compose form-horizontal" id="fileupload" action="" method="POST">
            <div class="inbox-form-group">
                <label class="control-label">Тема:</label>
                <div class="controls">
                    <input type="text" class="form-control" name="subject" value="{{ subject }}">
                </div>
            </div>
            <div class="inbox-form-group">
                <div class="controls-row">
                    <textarea class="inbox-editor inbox-wysihtml5 form-control" name="text" rows="12" style="max-width: 100%">{{ text }}</textarea>
                </div>
            </div>

            <div class="inbox-compose-btn">
                <button class="btn blue"><i class="fa fa-check"></i>Отправить</button>
            </div>
        </form>
    </div>
</div>