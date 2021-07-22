var elLista = document.getElementById("listaContatti"); 
var elForm = document.getElementById("form"); 
var utenti;
//prendo utenti e li scrivo in h1
$.ajax({
    url: "https://reqres.in/api/users?page=1",
    type:"GET",
    dataType:'json',
    success: function(dati){
        
        utenti = dati.data;

        stampaUtenti();
        
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





$(document).on('click','#btnDel',elimina);

function stampaUtenti() {
    $("#listaContatti").empty();
    for (let i = 0; i < utenti.length; i++) {
        // $('#listaContatti').children().remove();
        $('#listaContatti').append(
            
            '<div class="accordion-item">' +
            '<h2 class="accordion-header" id="headingTwo">' +
            '<button id="nomeUtente" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + utenti[i].first_name + '" aria-expanded="false" aria-controls="collapseTwo">' + utenti[i].first_name + ' ' + utenti[i].last_name + '</button> </h2>'
            + '<div id="collapse' + utenti[i].first_name + '" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">' +
            '<div class="accordion-body" id="infoCard">' +

            // card
            '<div class="card" style="width: 18rem;" id="card'+i+'">' +
            "<img class='card-img-top' src='"+ utenti[i].avatar +"' alt=''>" +
            '<div class="card-body">' +
            '<h5 class="card-title">' + utenti[i].first_name + '-' + utenti[i].last_name + '</h5>' +
            '<p class="card-text">' + utenti[i].email + '</p>' +
            '<button id="btnMod" class="btn btn-warning"> <i class="fas fa-pen"></i></button>' +
            '<button id="btnDel" class="btn btn-danger"> <i class="fas fa-trash-alt"></i></button>' +
            '</div>' +
            '</div>' +

            '</div></div>');

    }
}

function elimina(){
    console.log("sono in elimina")
    $(this).parent()
   .parent()
   .parent()
   .parent()
    .parent().remove();
}


$(document).on('click','#btnMod',modifica);

var nuovoUtente;
function getIndexByEmail(emaildellaltro) {
    for (let i = 0; i < utenti.length; i++) {
        if (utenti[i].email==emaildellaltro) {
            return i;
        }
    }
    return -1;
}

function modifica(){
    // console.log($(this).parent().parent().attr("id"));
    $("#"+$(this).parent().parent().attr("id")).find("#btnDel").click();
    
    console.log(getIndexByEmail($(this).parent().find('p').html()))
    delete utenti[getIndexByEmail($(this).parent().find('p').html())]
    utenti.sort();
    utenti.pop();
    
    $('#name').val($(this).parent().children(0).html().split('-')[0]);
    $('#surname').val($(this).parent().children(0).html().split('-')[1]);
    $('#email').val($(this).parent().find('p').html());
                            
    }
        
        
        
        
        
        $('#btn').on('click', function () {
            if (($('#name').val()=="")||($('#email').val()=="")||($('#surname').val()=="")) {
                
            } else {
                
                $.ajax({
                    url: "https://reqres.in/api/users",
                    type: "POST",
                    data: {
                        first_name: $('#name').val(),
                        last_name: $('#surname').val(),
                        email: $('#email').val(),
                        id: (Number)(1+utenti.length),
                        avatar: 'https://reqres.in/img/faces/'+(Number)(Math.ceil(10*(Math.random())))+'-image.jpg'
                    },
                    success: function(response){
                        $('#name').val("");
                        $('#surname').val("");
                        $('#email').val("");
                        nuovoUtente=response;
                        console.log(utenti);
                        console.log(nuovoUtente);
                        utenti.push(nuovoUtente);
                        
                        stampaUtenti();
                    }
                })
            }
        });
 
