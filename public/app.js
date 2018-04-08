/* global $ */
$(document).ready(function(){
    $.getJSON('/api/todos')
    .then(addTodos)
    .catch(function(err){
        console.log(err);
    });
    
    $('#todoInput').keypress(function(e){
       if (e.which === 13) {
           createTodo();
       } 
    });
    
    $('.list').on('click', 'span', function(e){
        e.stopPropagation();
        removeTodo($(this).parent());
    });
    
    $('.list').on('click','li', function(){
        updateTodo($(this));
    });
});

function addTodos(todos){
   todos.forEach(function(todo){
       addTodo(todo);
   }); 
}

function addTodo(todo){
    var newTodo =$('<li class="task">'+todo.name+'<span>x</span></li>');
    newTodo.data('id',todo._id);
    newTodo.data('completed',todo.completed);
       if (todo.completed) {
           newTodo.addClass('done');
       }
       $('.list').append(newTodo);
}

function createTodo(){
    //send post request to /api/todos
    var userInput = $('#todoInput').val();
    $.post('/api/todos',{name: userInput})
    .then(function(newTodo){
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err){
        console.log(err);
    });
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data){
        todo.remove();
    })
    .catch(function(err){
        console.log(err);
    });    
}

function updateTodo(todo){
    var deleteUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: deleteUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
    .catch(function(err){
        console.log(err);
    });
}