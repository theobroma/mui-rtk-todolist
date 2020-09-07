import { Server, Model, Factory } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  const serverInstance = new Server({
    environment,

    models: {
      todo: Model,
    },

    // factories: {
    //   todo: Factory.extend({
    //     // text(i: any) {
    //     //   console.log(i);
    //     //   return `Todo ${i + 1}`;
    //     // },

    //     completed: false,
    //   }),
    // },

    seeds(server: any) {
      server.create('todo', { text: 'Buy groceries 1', completed: true });
      server.create('todo', { text: 'Walk the dog 2', completed: false });
      server.create('todo', { text: 'Do laundry 3', completed: false });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 500;

      this.get(
        '/todos',
        (schema: any) => {
          return schema.todos.all();
        },
        { timing: 500 },
      );

      this.patch('/todos/:id', (schema: any, request) => {
        const attrs = JSON.parse(request.requestBody).todo;

        return schema.todos.find(request.params.id).update(attrs);
      });

      this.post(
        '/todos',
        (schema: any, request) => {
          const attrs = JSON.parse(request.requestBody).text;
          return schema.todos.create(attrs);
        },
        { timing: 500 },
      );

      this.delete('/todos/:id', (schema: any, request) => {
        return schema.todos.find(request.params.id).destroy();
      });
    },
  });

  return serverInstance;
}
