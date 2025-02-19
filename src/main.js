import './style.css';
import Navigo  from 'navigo';
import { Home } from './pages/Home';
import { PageNotFound } from './pages/404';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TasksPage } from './pages/TasksPage';
import { handleLoginPage } from './PageHandlers/LoginHandler';
import { handleRegisterPage } from './PageHandlers/RegisterHandler';
import { handleTasksPage } from './PageHandlers/TasksHandler';
import { handleUpdateTaskPage } from './PageHandlers/UpdateTaskHandler';
import { UpdateTaskPage } from './pages/UpdateTaskPage';

export const router = new Navigo("/", {linksSelector: "a"});
const app = document.querySelector('#app');

router.on({
  "/": () => render(app, Home),
  "/home": () => render(app, Home)
});

router.on({"/login": function() {
  render(app, LoginPage, undefined, handleLoginPage);
}});

router.on({"/register": function() {
  render(app, RegisterPage, undefined, handleRegisterPage);
}});

router.on({"/update-task": function() {
  render(app, UpdateTaskPage, undefined, handleUpdateTaskPage);
}});

router.on({"/tasks": function() {
  render(app, TasksPage, undefined, handleTasksPage);
}});

router.notFound(function() {
  render(app, PageNotFound);
})

function render(target, content, beforeFunc, afterFunc) {
  if(beforeFunc) beforeFunc();
  target.innerHTML = content();
  if(afterFunc) afterFunc();
}

router.resolve();