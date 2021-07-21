var elLista = document.getElementById("listaContatti"); 

//prendo utenti e li scrivo in h1
$.ajax({
    url: "https://reqres.in/api/users?page=1",
    type:"GET",
    dataType:'json',
    success: function(dati){
        console.log(dati);

        for(let i = 0; i < dati.data.length;i++){

            $('#listaContatti').append('<div class="accordion-item">'+
            '<h2 class="accordion-header" id="headingTwo">'+
              '<button id="nomeUtente" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+dati.data[i].first_name+'" aria-expanded="false" aria-controls="collapseTwo">' + dati.data[i].first_name+ ' ' + dati.data[i].last_name +'</button> </h2>'
              + '<div id="collapse'+dati.data[i].first_name+'" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">'+
            '<div class="accordion-body" id="infoCard">'+

            // card
            '<div class="card" style="width: 18rem;">'+
            '<img class="card-img-top" src="'+dati.data[i].avatar+'" alt="Card image cap">'+
            '<div class="card-body">'+
              '<h5 class="card-title">'+dati.data[i].first_name+'-'+dati.data[i].last_name +'</h5>'+
              '<p class="card-text">'+ dati.data[i].email +'</p>'+
              '<a href="#" class="card-link">Modifica</a>'+
              '<a href="#" class="card-link">Elimina</a>'+
            '</div>'+
          '</div>'+

            // '<img class="mx-auto" src="'+dati.data[i].avatar+'">'+
            // '<p>' + dati.data[i].email + '</p>' +

             '</div></div>')
        }

    },
    error:function(textStatus){
        if(textStatus.status == 404){
            console.log('risorsa non trovata');
            console.log(textStatus.status);
        }else{
            console.log('qualcosa è andato storto');
        }
    },

})