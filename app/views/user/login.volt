<h1>Вход в личный кабинет</h1>
<div class="content-form-page">
    {% if errors|length > 0 %}
        <div class="note note-danger">
            <p>
                {% for error in errors %}
                    {{ error }}.<br>
                {% endfor %}
            </p>
        </div>
    {% endif %}
        <div class="row">
            <div class="col-md-7 col-sm-7">
                <form class="form-horizontal form-without-legend" role="form" action="" method="POST">
                    <div class="form-group">
                        <label for="email" class="col-lg-4 control-label">Email <span class="require">*</span></label>
                        <div class="col-lg-8">
                            <input type="text" class="form-control" id="email" value="{{ email }}" name="email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password" class="col-lg-4 control-label">Пароль <span class="require">*</span></label>
                        <div class="col-lg-8">
                            <input type="password" class="form-control" id="password" name="password">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 col-md-offset-4 padding-left-0">
                            <a href="forgotton-password.html">Забыли пароль?</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 col-md-offset-4 padding-left-0 padding-top-20">
                            <button type="submit" class="btn btn-primary">Войти</button>
                        </div>
                    </div>
                    {#<div class="row">#}
                        {#<div class="col-lg-8 col-md-offset-4 padding-left-0 padding-top-10 padding-right-30">#}
                            {#<hr>#}
                            {#<div class="login-socio">#}
                                {#<p class="text-muted">or login using:</p>#}
                                {#<ul class="social-icons">#}
                                    {#<li><a href="#" data-original-title="facebook" class="facebook" title="facebook"></a></li>#}
                                    {#<li><a href="#" data-original-title="Twitter" class="twitter" title="Twitter"></a></li>#}
                                    {#<li><a href="#" data-original-title="Google Plus" class="googleplus" title="Google Plus"></a></li>#}
                                    {#<li><a href="#" data-original-title="Linkedin" class="linkedin" title="LinkedIn"></a></li>#}
                                {#</ul>#}
                            {#</div>#}
                        {#</div>#}
                    {#</div>#}
                </form>
            </div>
            {#<div class="col-md-4 col-sm-4 pull-right">#}
                {#<div class="form-info">#}
                    {#<h2><em>Important</em> Information</h2>#}
                    {#<p>Duis autem vel eum iriure at dolor vulputate velit esse vel molestie at dolore.</p>#}

                    {#<button type="button" class="btn btn-default">More details</button>#}
                {#</div>#}
            {#</div>#}
        </div>
</div>