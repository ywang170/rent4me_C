$(document).ready(function(){
    $('.form-inline').on('submit', function (e){
        e.preventDefault();
        $.post('/search/result', $(this).serialize(), function(data){
            var div = $('#showResults');
            div.empty();
            $.each(data, function(index, value) {
                div.append('<div class="col-lg-4 col-md-6 col-xs-12 thumb"><a class="thumbnail" href="/search/' + value['pid'] +'"><img class="img-responsive" src=' +value['img_url'] + 'alt=""><p>' + value['address'] + '</p></a></div>');
            });
        });
    });
});
                
