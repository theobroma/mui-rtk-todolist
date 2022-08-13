import { todosAxiosInstance } from './index';
import { TodoType } from '../@types';
// import { UsersFilterType } from '../@types';

export const TodosAPI = {
  getTodos: async () => {
    try {
      const response = await todosAxiosInstance.get<TodoType[]>('items');
      // console.log(response.data);
      return response.data;
    } catch (e) {
      return e.message;
    }
  },

  // followUser: async (id: number) => {
  //   try {
  //     const response = await instance.post<APIResponseType>(`follow/${id}`);
  //     return response.data;
  //   } catch (e) {
  //     return e.message;
  //   }
  // },

  // unfollowUser: async (id: number) => {
  //   try {
  //     const response = await instance.delete<APIResponseType>(`follow/${id}`);
  //     return response.data;
  //   } catch (e) {
  //     return e.message;
  //   }
  // },
};
