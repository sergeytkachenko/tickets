function voteRaiting(score, anketId){
    
        var request = $.ajax({
            url: "/raiting/save.json?idAnket=" + anketId + "&score=" + score,
            type: "GET",
            dataType: "html",
            async : false
        });

        request.error(function(mess){
            alert( "Error. More info in your console." );
            console.log(mess);
        });

        request.success(function(data) {

            alert($.evalJSON(data).result);
            location.reload();
            
        });
    
}

function voteSalonsRaiting(score, idSalon){
        var request = $.ajax({
            url: "/raiting/salon-save.json?idSalon=" + idSalon + "&score=" + score,
            type: "GET",
            dataType: "html",
            async : false
        });

        request.error(function(mess){
            alert("Error. More info in your console brouser.");
            console.dir(mess);
        });

        request.success(function(data) {
            alert($.evalJSON(data).result);
            location.reload();
        });
    
}