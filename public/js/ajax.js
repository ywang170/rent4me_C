$('#showInventorys').click(function() {
  var rowClasses = ['even-row', 'odd-row'];
  $.ajax({
    url: 'inventory',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var div = $('#inventorys');
      div.empty();
      var ul = div.append('<ul></ul>').find('ul').eq(0);
      $.each(data, function(idx, val) {
        ul.append('<li class="' + rowClasses[idx % 2] + '">' + val['name'] + ' x ' + val['amount'] + '</li>');
      });
    }
  });
});

$('#showAbout').click(function() {
  var userName = $('#userName').val();
  $.ajax({
    url: 'about/?name=' + userName,
    type: 'GET',
    dataType: 'html',
    success: function(data) {
      alert(data);
    }
  });
});
