import {inject} from 'aurelia-framework';
//import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {ToDos} from '../resources/data/todos';


@inject(ToDos, AuthService)
export class List {
  constructor(todos, auth) {
	this.todos = todos;
          this.message = 'List';
          this.auth = auth;
          this.loginError = '';
          this.user = JSON.parse(sessionStorage.getItem('user'));
          this.showList = true;
         this.priorities=['Low', 'Medium', 'High', 'Critical']
      
  }
  async activate(){
		await this.todos.getUserTodos(this.user._id);
	}

  createTodo(){	
		this.todoObj = {
			todo: "",
			description: "",
			dateDue: new Date(),
			 userId: this.user._id,
			priority: this.priorities[0]
		}
		this.showList = false;		
  }
  
  async saveTodo(){
		if(this.todoObj){		
			let response = await this.todos.save(this.todoObj);
			if(response.error){
				alert("There was an error creating the ToDo");
			} else {
				//Could provide feeback									
			}
			this.showList = true;
		}
	}


  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
}

}

