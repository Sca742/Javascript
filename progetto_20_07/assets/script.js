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
            '  <div class="accordion-body" id="infoCard">'+
            '<img class="mx-auto" src="'+dati.data[i].avatar+'">'+
            '<p>' + dati.data[i].email + '</p>' +

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
