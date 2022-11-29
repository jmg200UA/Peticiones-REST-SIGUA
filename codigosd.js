sessionStorage['ini']=0;

function funcion1(){
	//indentificador, nombre y plantas del edificio
	let url='http://www.sigua.ua.es/api/pub/edificio/all/items',
		html='',
		html2='';

	fetch(url).then(function(respuesta){
			if(respuesta.ok){
				respuesta.json().then(function(datos){
					if(sessionStorage['ini']>0){
						
						html='';
						document.querySelector('#resultado').innerHTML=html;
					}
					

					console.log(datos);

					datos.forEach(function(e){
						 
						 html = `<p> <strong>IDENTIFICADOR:</strong> ${e.id} , <strong>NOMBRE:</strong> ${e.nombre} , <strong>PLANTAS:</strong> ${e.plantas}</p>`;
						 

			            document.querySelector('#resultado').innerHTML+=html;
			            
			            
			       });
					sessionStorage['ini']++;
					
				});
			}
			else console.log('ERROR en la petición fetch');
		});

		return false; 
}

function funcion2(){
	//identificador, numero de estancias, numero de ocupantes y superficie total del edificio
	let url='http://www.sigua.ua.es/api/agregados/seo/edificio/all/items',
		html='',
		html2='';

	fetch(url).then(function(respuesta){
			if(respuesta.ok){
				respuesta.json().then(function(datos){

					if(sessionStorage['ini']>0){
						
						html='';
						document.querySelector('#resultado').innerHTML=html;
					}
					

					console.log(datos);
					
					datos.forEach(function(e){
						 
						 html = `<p> <strong>IDENTIFICADOR:</strong> ${e.id} , <strong>NUMERO DE ESTANCIAS:</strong> ${e.estancias} , <strong>NUMERO DE OCUPANTES:</strong> ${e.ocupantes} , <strong>SUPERFICIE TOTAL:</strong> ${e.superficie}</p>`;
						 

			            document.querySelector('#resultado').innerHTML+=html;
			            
			            
			       });
					sessionStorage['ini']++;
					
				});
			}
			else console.log('ERROR en la petición fetch');
		});

		return false;
}

function funcion3(){
	//codigo estancia, denominacion, superficie, nombre actividad por de la estancia
	let split = document.querySelector('#categoria').value.split(" ")[0],
		url='http://www.sigua.ua.es/api/pub/estancia/edificio/' + split + '/items',
		html='',
		html2='',
		i=0;

		console.log(split);
	if(split){
		

		fetch(url).then(function(respuesta){
			console.log(respuesta);
			if(respuesta.ok){ //Si la respuesta la tenemos...
				respuesta.json().then(function(datos){
					if(sessionStorage['ini']>0){
							
							html='';
							document.querySelector('#resultado').innerHTML=html;
						}

						console.log(datos);

						console.log(datos.type);
						console.log(datos.features);
						
						/*datos.forEach(function(e){
							html = `<p>${e.type.features.properties.codigo} , ${e.type.features.properties.denominacion} , ${e.type.features.properties.superficie} , ${e.type.features.properties.nombre_actividad}</p>`;
				            document.querySelector('#resultado').innerHTML+=html;  
				       });*/
				       while(i<datos.features.length){
				       		html= '<p> <strong>CODIGO ESTANCIA:</strong> ' + datos.features[i].properties.codigo + ', <strong>DENOMINACION:</strong> ' + datos.features[i].properties.denominacion + ', <strong>SUPERFICIE:</strong> ' + datos.features[i].properties.superficie + ', <strong>NOMBRE ACTIVIDAD:</strong> ' + datos.features[i].properties.nombre_actividad + '</p>';
				       		document.querySelector('#resultado').innerHTML+=html;
							i++;
						}

					sessionStorage['ini']++;
				});
			}
			else console.log("Error en la peticion Fetch");
		});
	}
	else{
		let html3= '';
				html3 += '<article>';
				html3 += '<h2>INTRODUCE EDIFICIO </h2>';
				html3 += '<p> Debes de introducir un edificio para buscar';
				
				html3 += '<footer><button onclick="cerrarMensajeModal();">Aceptar</button>'
				html3 += '</article>';

				mensajeModal(html3);
	}
}

function edificios(){
	let url='http://www.sigua.ua.es/api/pub/edificio/all/items',
		html='';

	fetch(url).then(function(respuesta){
			if(respuesta.ok){
				respuesta.json().then(function(datos){

					console.log(datos);
					datos.forEach(function(e){
						 
						 html = `<option>${e.id} , ${e.nombre}</option>`;
						 

			            document.querySelector('#listacat').innerHTML+=html;
			            
			            
			       });
					
					
				});
			}
			else console.log('ERROR en la petición fetch');
		});

		return false; 
}

function funcion4(){
	//identificador, numero de estancias, numero de ocupantes y superficie total del departamento
	let url='http://www.sigua.ua.es/api/agregados/seo/departamento/all/items',
		html='',
		html2='';

	fetch(url).then(function(respuesta){
			if(respuesta.ok){
				respuesta.json().then(function(datos){
					if(sessionStorage['ini']>0){
						
						html='';
						document.querySelector('#resultado').innerHTML=html;
					}

					console.log(datos);
					datos.forEach(function(e){
						 
						 if (e.ocupantes>document.querySelector('#numoc').value) {
						 	html = `<p> <strong>ID:</strong> ${e.id} , <strong>NUMERO ESTANCIAS:</strong> ${e.estancias} , <strong>NUMERO OCUPANTES:</strong> ${e.ocupantes} , <strong>SUPERFICIE:</strong> ${e.superficie}</p>`;
						 }

			            document.querySelector('#resultado').innerHTML+=html;
			            
			            
			       });
					sessionStorage['ini']++;
					
				});
			}
			else console.log('ERROR en la petición fetch');
		});

		return false;
}

function mensajeModal(html){
	let div= document.createElement('div');

	//div.id='capa-fondo';
	div.setAttribute('id','capa-fondo');
	div.innerHTML= html;

	document.querySelector('body').appendChild(div);
}

function cerrarMensajeModal(){
	document.querySelector('#capa-fondo').remove();
}