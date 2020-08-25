import { Server, Model, Factory } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  const serverInstance = new Server({
    environment,

    models: {
      todo: Model,
    },

    factories: {
      todo: Factory.extend({
        text(i: any) {
          return `Todo ${i + 1}`;
        },

        isDone: false,
      }),
    },

    seeds(server: any) {
      server.create('todo', { text: 'Buy groceries', isDone: false });
      server.create('todo', { text: 'Walk the dog', isDone: false });
      server.create('todo', { text: 'Do laundry', isDone: false });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/todos', (schema: any) => {
        return schema.todos.all();
      });

      this.patch('/todos/:id', (schema: any, request) => {
        const attrs = JSON.parse(request.requestBody).todo;

        return schema.todos.find(request.params.id).update(attrs);
      });

      this.post(
        '/todos',
        (schema: any, request) => {
          const attrs = JSON.parse(request.requestBody).todo;

          return schema.todos.create(attrs);
        },
        { timing: 2000 },
      );

      this.delete('/todos/:id', (schema: any, request) => {
        return schema.todos.find(request.params.id).destroy();
      });
    },
  });

  return serverInstance;
}
