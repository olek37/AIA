const view = (html) => `
  <!DOCTYPE html>
  <html>
  <head>
    <title>ClothesApp</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossorigin="anonymous" />
    <link rel="stylesheet" type="text/css" href="style.css">

    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script> 
  </head>
  <body>
    <div class='container'>
      <h1>My Clothes</h1>
      ${ html }
    </div>
    <script>
    $(document).ready(function(){
      $(".add").on("click", function(event){
          event.preventDefault()
          const data = {product: $(this).data('product')}
          $.ajax({
              url: '/',
              type: 'POST',
              data: data
          }).done(function(data){
            alert('Added to cart')
          }).fail(function(data){
            alert('Error')  
          });
      });
      $(".buy").on("click", function(event){
        event.preventDefault()
        $.ajax({
            url: '/cart',
            type: 'POST',
            data: {}
        }).done(function(data){
          alert('Purchased')
          window.location = '/'
        }).fail(function(data){
          alert('Error')
          window.location = '/'
        });
      });
      $(".remove").on("click", function(event){
        event.preventDefault()
        const data = {product: $(this).data('product')}
        $.ajax({
            url: '/cart',
            type: 'DELETE',
            data: data
        }).done(function(data){
          alert('Removed from cart')
          location.reload()
        }).fail(function(data){
          alert('Error')  
          location.reload()
        });
    });
    });
    </script>
  </body>
  </html>
`

export default view