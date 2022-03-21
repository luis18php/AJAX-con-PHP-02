console.log("TEST 01");

$(function(){
	
	console.log("TEST 02");	
	$('#container').hide();
	fetchTasks();
	let edit = false;

	// BUSQUEDA X NOMBRE DE TAREA
	$('#search').keyup(function(){

		if($('#search').val()){
			let search = $('#search').val();
			//console.log(search);
			$.ajax({
				url: 'tarea-search.php',
				type: 'POST',
				data: {search},
				success: function(response){
					//console.log(response);
					let tareas = JSON.parse(response);	//convertir string(obtenido de PHP con json_encode($array)) -> json
					//console.log(tareas);
					tareas.forEach(tarea =>{
						console.log(tarea);
					});
					$('#container').html(response);
					$('#container').show();
				}
			});
		}
	});

	// AÑADIR/EDITAR NUEVA TAREA
	$('#tarea-form').submit(function(e){	
		//console.log('submiting');
		e.preventDefault();
		const postData = {
			name: $('#nombre').val(),
			description: $('#descrip').val(),
			id: $('#taskId').val()
		}
		console.log(postData);
		var url = '';
		url = edit ? 'tarea-edit.php' : 'tarea-add.php';
		$.post(url, postData, function(response){	//se captura respuesta del servidor
			console.log(response);
			$('#tarea-form').trigger('reset');
			fetchTasks();
			edit = false;
		});
	});

	// LISTAR TODOS LOS ELEMENTOS
	function fetchTasks() {
		$.ajax({
			url: 'tarea-list.php',
			type: 'GET',
			success: function(response){
				//console.log(response);
				const tasks = JSON.parse(response);
	        	let template = '';
	        	tasks.forEach(task => {
	          	template += `
	                <tr taskId="${task.id}">
	                	<td>${task.id}</td>
	                	<td>
	                	<a href="#" class="task-item">
	                  		${task.name} 
	                	</a>
	                	</td>
	                	<td>${task.description}</td>
	                	<td>
	                  		<button class="task-delete">
	                   			Delete 
	                  		</button>
	                	</td>
	                </tr>
	                `
	        	});
	        	$('#tasks').html(template);
			}
		});
	}

	// ELIMINAR UNA TAREA
	$(document).on('click', '.task-delete', function(){
		if(confirm('Are you sure you want to delete it?')) {
			//console.log($(this));
			//console.log($(this)[0]);								//button
			//console.log($(this)[0].parentElement);				//td
			//console.log($(this)[0].parentElement.parentElement);	//tr
			//const element = $(this)[0].activeElement.parentElement.parentElement;
	   		const element = $(this)[0].parentElement.parentElement;
	   		console.log(element);
	    	const id = $(element).attr('taskId');
	    	$.post('tarea-delete.php', {id}, (response) => {
	    		fetchTasks();
	    	});
    	}
	});

	// OBTENER UN ELEMENTO PARA LUEGO ELIMINARLO
	$(document).on('click', '.task-item', function(){
		const element = $(this)[0].parentElement.parentElement;
		const id = $(element).attr('taskId');
		console.log(id);
		$.post('tarea-single.php', {id}, (response) => {
			console.log(response);
			const task = JSON.parse(response);
			$('#nombre').val(task.name);
			$('#descrip').val(task.description);
			$('#taskId').val(task.id);
			edit = true;
		});
	});

});