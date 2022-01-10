//Generando h1 con Jquery

$("#tituloPag").prepend(`<h1>¡bienvenidos!</h1>`);
$("#subtituloPag").prepend(`<h6>En Megumi podes confiar para elegir tu primer manga o seguir con las historias que tanto te gustan. ¡Este es un lugar creado por fanaticos para fanaticos!</h6>`);

// Modificacion de css con Jquery
$("#tituloPag").css ({ "color": "#ce6402",
                           "text-align": "center",
                           "text-transform": "uppercase",
                           "font-family": "'Montserrat', sans-serif",
                           "font-style": "bold",
                           "background-color": "#ffffff",
                           "margin-top": "150px"
                           });

$("#subtituloPag").css ({ "color": "#198754",
                           "text-align": "center",
                           "font-family": "'Roboto', sans-serif",
                           "font-style": "bold",
                           "background-color": "#ffffff",
                           "margin-top": "20px"
                           });



// Animaciones concatenadas con Jquery                           
$("#tituloPag").fadeOut("slow")
                   .fadeIn("slow")
                   .fadeOut("slow")
                   .fadeIn("slow")
                   .show();