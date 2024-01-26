import { ChangeEvent, FormEvent, useState } from "react";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { ITodo } from "../interfaces";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Modal from "./ui/Modal";
import axiosInstance from "../config/axios.config";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const [queryVersion, setQueryVersion] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description: "",
  });
  const [todoToAdd, setTodoToAdd] = useState<ITodo>({
    title: "",
    description: "",
  });

  const { data } = useAuthenticatedQuery({
    queryKey: ["todos", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // *------- Handlers -------*
  const onCloseAddModal = () => {
    setTodoToAdd({
      title: "",
      description: "",
    });
    setIsAddModalOpen(false);
  };

  const onOpenAddModal = () => setIsAddModalOpen(true);

  const onCloseEditModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsEditModalOpen(false);
  };

  const onOpenEditModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsEditModalOpen(true);
  };

  const closeConfirmModal = () => {
    setTodoToEdit({
      id: 0,
      title: "",
      description: "",
    });
    setIsOpenConfirmModal(false);
  };

  const openConfirmModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenConfirmModal(true);
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (isAddModalOpen) {
      setTodoToAdd({
        ...todoToAdd,
        [name]: value,
      });
    } else if (isEditModalOpen) {
      setTodoToEdit({
        ...todoToEdit,
        [name]: value,
      });
    }
  };

  const onSubmitCreateTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    const { title, description } = todoToAdd;
    try {
      const { status } = await axiosInstance.post(
        `/todos`,
        {
          data: { title, description, user: [userData.user.id] },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );

      if (status === 200) {
        onCloseAddModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitUpdateTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);

    const { id, title, description } = todoToEdit;
    try {
      const { status } = await axiosInstance.put(
        `/todos/${id}`,
        {
          data: { title, description },
        },
        {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        }
      );

      if (status === 200) {
        onCloseEditModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onSubmitRemoveTodo = async () => {
    setIsUpdating(true);

    const { id } = todoToEdit;
    try {
      const { status } = await axiosInstance.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });

      if (status === 200) {
        closeConfirmModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-1">
      <div className="w-fit mx-auto my-10">
        <Button size={"sm"} onClick={onOpenAddModal}>
          Post new todo
        </Button>
      </div>

      {data.todos.length ? (
        data.todos.map((todo: ITodo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100"
          >
            <p className="w-full font-semibold">{todo.title}</p>
            <div className="flex items-center justify-end w-full space-x-3">
              <Button size={"sm"} onClick={() => onOpenEditModal(todo)}>
                Edit
              </Button>
              <Button
                variant={"danger"}
                size={"sm"}
                onClick={() => openConfirmModal(todo)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h3>You have no todos yet!</h3>
      )}

      {/* (ADD & EDIT) TODO MODAL */}
      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        closeModal={isAddModalOpen ? onCloseAddModal : onCloseEditModal}
        title={isAddModalOpen ? "Add a new todo" : "Edit this todo"}
      >
        <form
          className="space-y-3"
          onSubmit={isAddModalOpen ? onSubmitCreateTodo : onSubmitUpdateTodo}
        >
          <Input
            name="title"
            value={isAddModalOpen ? todoToAdd.title : todoToEdit.title}
            onChange={onChangeHandler}
          />
          <Textarea
            name="description"
            value={
              isAddModalOpen ? todoToAdd.description : todoToEdit.description
            }
            onChange={onChangeHandler}
          />
          <div className="flex items-center gap-3 mt-4 w-full">
            <Button
              className="bg-indigo-700 hover:bg-indigo-800"
              isLoading={isUpdating}
              type="submit"
            >
              {isAddModalOpen ? "Done" : "Update"}
            </Button>
            <Button
              type="button"
              variant="cancel"
              onClick={isAddModalOpen ? onCloseAddModal : onCloseEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE TODO CONFIRM MODAL */}
      <Modal
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        title="Are you sure you want to remove this Todo ?"
        description="Deleting this Todo will remove it permanently"
      >
        <div className="flex items-center space-x-3">
          <Button variant={"danger"} size={"sm"} onClick={onSubmitRemoveTodo}>
            Yes, remove
          </Button>
          <Button
            type="button"
            variant={"cancel"}
            size={"sm"}
            onClick={closeConfirmModal}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;



