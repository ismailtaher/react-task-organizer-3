import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const tasksAdapter = createEntityAdapter({
  sortComparer: (a, b) => Number(b.priority) - Number(a.priority),
});

const initialState = tasksAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      transformResponse: (ResponseData) => {
        return tasksAdapter.setAll(initialState, ResponseData);
      },
      providesTags: (result, error, arg) => [
        { type: "TASK", id: "LIST" },
        ...(result?.ids?.map((id) => ({
          type: "Task",
          id,
        })) || []),
      ],
    }),
    onDragTask: builder.mutation({
      query: (updatedTask) => ({
        url: `/tasks/${updatedTask.id}`,
        method: "PUT",
        body: {
          ...updatedTask,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    getTasksByUserId: builder.query({
      query: (id) => `tasks/?userId=${id}`,
      transformResponse: (responseData) => {
        return tasksAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        console.log(result);
        return [...result.ids.map((id) => ({ type: "Task", id }))];
      },
    }),
    addNewTask: builder.mutation({
      query: (initialTask) => ({
        url: "/tasks",
        method: "POST",
        body: {
          ...initialTask,
        },
      }),
      invalidatesTags: [{ type: "TASK", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: (initialTask) => ({
        url: `/tasks/${initialTask.id}`,
        method: "PUT",
        body: {
          ...initialTask,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    toggleObjective: builder.mutation({
      query: ({ taskId, key_objectives }) => ({
        url: `tasks/${taskId}`,
        method: "PATCH",
        body: { key_objectives },
      }),
      async onQueryStarted(
        { taskId, key_objectives },
        { dispatch, queryFulfilled }
      ) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so that it knows which piece of cache state to update
        const pathResult = dispatch(
          extendedApiSlice.util.updateQueryData(
            "getTasks",
            undefined,
            (draft) => {
              // the draft is Immer-wrapped and can be 'mutated' like in create slice
              const task = draft.entities[taskId];
              if (task) task.key_objectives = key_objectives;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          pathResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useOnDragTaskMutation,
  useGetTasksByUserIdQuery,
  useAddNewTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleObjectiveMutation,
} = extendedApiSlice;

// return the query result object
export const selectTasksResult = extendedApiSlice.endpoints.getTasks.select();

// create memoized selector
const selectTasksData = createSelector(
  selectTasksResult,
  (tasksResult) => tasksResult.data // normalised state object with ids & entities
);

// getSelector to create some selectors

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
} = tasksAdapter.getSelectors(
  (state) => selectTasksData(state) ?? initialState
);
