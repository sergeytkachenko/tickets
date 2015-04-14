var FormDropzone = function () {
    return {
        init: function () {
            Dropzone.options.myDropzone = {
                init: function() {
                    var self = this;
                    this.on("addedfile", function(file) {
                        var removeButton = Dropzone.createElement("<button class='btn btn-sm btn-block'>Удалить файл</button>");

                        var _this = this;

                        removeButton.addEventListener("click", function(e) {
                            e.preventDefault();
                            e.stopPropagation();

                            _this.removeFile(file);
                        });

                        file.previewElement.appendChild(removeButton);
                    });

                    this.on("success", function(file, response) {
                        if(response.success === false) {
                            this.removeFile(file);
                            alert("При загрузке произошла ошибка: "+response.msg);

                            return;
                        }
                        file.previewElement.querySelector("img").src = response.fullPath;
                        file.previewElement.querySelector("img").alt = response.filename;
                        file.previewElement.querySelector(".dz-filename span").innerHTML = response.filename;
                    });
                }
            }
        }
    };
}();