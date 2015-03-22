<div class="panel-body row" style="background-color: #fff;">
    <?php if ($this->length($errors) > 0) { ?>
    <div class="note note-danger">
        <p>
            <?php foreach ($errors as $error) { ?>
                <?php echo $error; ?>.<br>
            <?php } ?>
        </p>
    </div>
    <?php } ?>
    <form action="" method="POST">
        <div class="col-md-6 col-sm-6">
            <h3>Личные данные</h3>
            <div class="form-group">
                <label for="email">E-Mail <span class="require">*</span></label>
                <input type="email" required id="email" class="form-control" name="email" value="<?php echo $email; ?>">
            </div>
            <h3>Пароль</h3>
            <div class="form-group">
                <label for="password">Пароль <span class="require">*</span></label>
                <input type="password"  required id="password" class="form-control" name="password" value="<?php echo $password; ?>">
            </div>
            <div class="form-group">
                <label for="password-confirm">Пароль еще раз <span class="require">*</span></label>
                <input type="password" required id="password-confirm" class="form-control" name="password2" value="<?php echo $password2; ?>">
            </div>
        </div>
        <div class="col-md-6 col-sm-6">
            <h3>Подробнее о себе</h3>
            <div class="form-group">
                <label for="company">Компания</label>
                <input type="text" id="company" class="form-control">
            </div>
            <div class="form-group">
                <label for="telephone">Телефон </label>
                <input type="text" id="telephone" class="form-control">
            </div>
            <div class="form-group">
                <label for="telephone">Город </label>
                <input type="text" id="telephone" class="form-control">
            </div>
        </div>
        <hr>
        <div class="col-md-12">
            <div class="checkbox">
                <label>
                    <div class="checker"><span class="checked"><input type="checkbox" ></span></div> Получать новости на почту
                </label>
            </div>
            <button class="btn btn-primary  pull-right collapsed" type="submit" >Продолжить</button>
            <div class="checkbox pull-right">
                <label>
                    <div class="checker">
                        <span>
                            <input type="checkbox" name="igree" <?php if ($igree == 'on') { ?> checked <?php } ?> >
                        </span>
                    </div> Я согласен с  <a title="Privacy Policy" href="#">Условиями сайта</a> &nbsp;&nbsp;&nbsp;
                </label>
            </div>
        </div>
    </form>
</div>
