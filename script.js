new ClipboardJS('.copy');

const userAction = async () => {
  const response = await fetch('https://pkinopk-server.herokuapp.com/recipe-book/recipelist');
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
};

// userAction();

$('.copy').on('click', function() {
  $('.copy').animate(
    {
      opacity: 0
    },
    10,
    function() {
      $('.copy')[0].innerHTML = 'Copied!';
    }
  );
  $('.copy').animate(
    {
      opacity: 1
    },
    500
  );
});

$('.antify').on('click', function() {
  var serverURL = 'http://localhost:8000/antifier/';

  console.log($('#originalURL')[0].value);

  $.ajax(serverURL + 'add/', {
    data: JSON.stringify({ original_url: $('#originalURL')[0].value }),
    contentType: 'application/json',
    type: 'POST'
    // success: function(data) {}
  })
    .done(function(data) {
      console.log(data);
      if (!data.error) {
        $('.links').html(
          '<div class="link"><small>Original Link:</small><p class="original-link">' +
            data.original_url +
            '</p><small>Antified Link:</small> <br /><p class="antified-link">' +
            '<a href="' +
            serverURL +
            data.short_url +
            '" target="_blank">' +
            serverURL +
            data.short_url +
            '</a>' +
            '</p><button class="copy" data-clipboard-target=".antified-link">Copy</button></div>'
        );
      } else {
        $('.links').html('<div class="link"><p class="invalid-link">Invalid Link!</p></div>');
      }
    })
    .fail(function(err) {
      console.log(err);
    });
});
