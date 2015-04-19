<div class="row inbox">
    <div class="inbox-header">
        <h1 class="pull-left">Сообщение</h1>
    </div>
    <div class="inbox-loading" style="display: none;">
        Loading...
    </div>
    <div class="inbox-content"><form class="inbox-compose form-horizontal" id="fileupload" action="#" method="POST" enctype="multipart/form-data">
            <div class="inbox-form-group">
                <label class="control-label" >От кого:</label>
                <div class="controls">
                    <input type="text" class="form-control" name="subject" disabled value="{{ massage.UsersSender.email }}" >
                </div>
            </div>
            <div class="inbox-form-group">
                <label class="control-label">Кому:</label>
                <div class="controls">
                    <input type="text" class="form-control" name="subject" disabled value="{{ massage.UsersRecipient.email }}">
                </div>
            </div>
            <div class="inbox-form-group">
                <label class="control-label">Тема:</label>
                <div class="controls">
                    <input type="text" class="form-control" name="subject" disabled value="{{ massage.subject }}">
                </div>
            </div>
            <div class="inbox-form-group">
                <div class="controls-row">
                    <textarea class="inbox-editor inbox-wysihtml5 form-control" name="message" rows="12" disabled style="max-width: 100%">{{ massage.text }}</textarea>
                </div>
            </div>

            <div class="inbox-compose-btn">
                <a role="button" class="btn blue" href="/message/write">Ответить</a>
                <a role="button"  class="btn red" href="/message/delete/{{ massage.id }}"><i class="fa fa-trash-o"></i> Удалить сообщение</a>
            </div>
        </form>
    </div>
</div>