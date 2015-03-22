<div class="row list-view-sorting clearfix">
    <?php if ($this->length($errors) == 0) { ?>
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
    <?php } else { ?>

        <div class="note note-danger">

            <p>
                <?php foreach ($errors as $error) { ?>
                    <?php echo $error; ?>.<br>
                <?php } ?>
            </p>

        </div>
        <div>
            <a role="button" class="btn blue" href="javascript:history.back();" >Назад</a>
        </div>
    <?php } ?>
</div>