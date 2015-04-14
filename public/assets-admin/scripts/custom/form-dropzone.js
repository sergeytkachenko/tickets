var FormDropzone = function () {


    return {
        //main function to initiate the module
        init: function () {  

            Dropzone.options.myDropzone = {
                init: function() {
                    var self = this;
                    this.on("addedfile", function(file) {
                        // Create the remove button
                        var removeButton = Dropzone.createElement("<button class='btn btn-sm btn-block'>Удалить файл</button>");
                        
                        // Capture the Dropzone instance as closure.
                        var _this = this;

                        // Listen to the click event
                        removeButton.addEventListener("click", function(e) {
                          // Make sure the button click doesn't submit the form:
                          e.preventDefault();
                          e.stopPropagation();

                          // Remove the file preview.
                          _this.removeFile(file);
                          // If you want to the delete the file on the server as well,
                          // you can do the AJAX request here.
                        });

                        // Add the button to the file preview element.
                        file.previewElement.appendChild(removeButton);
                    });

                    this.on("success", function(file, response) {
                        if(response.success === false) {
                            file.previewElement.parentNode.removeChild(file.previewElement);
                            alert("При загрузке произошла ошибка: "+response.msg)
                        }
                    });
                }
            }
        }
    };
}();