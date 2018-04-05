defmodule Tasktrack.Tasks do
  @moduledoc """
  The Tasks context.
  """

  import Ecto.Query, warn: false
  alias Tasktrack.Repo

  alias Tasktrack.Tasks.Task

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  def list_tasks do
    Repo.all(Task)
    |> Repo.preload(:requester)
    |> Repo.preload(:assignee)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id) do
    Repo.get!(Task, id)
    |> Repo.preload(:requester)
    |> Repo.preload(:assignee)
  end

  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
    {_, t} = %Task{}
    |> Tasktrack.Tasks.Task.changeset(attrs)
    |> Ecto.Changeset.validate_change(:act_time, fn :act_time, act_time ->
      if rem(act_time, 15) != 0 do
	[act_time: "must be div by 15"]
      else
	[]
      end
    end)
    |> Repo.insert()
    {:ok, Tasktrack.Tasks.get_task!(t.id)}
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    task
    |> Tasktrack.Tasks.Task.changeset(attrs)
    |> Ecto.Changeset.validate_change(:act_time, fn :act_time, act_time ->
      if rem(act_time, 15) != 0 do
	[act_time: "must be div by 15"]
      else
	[]
      end
    end)
    |> Repo.update()
  end

  @doc """
  Deletes a Task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{source: %Task{}}

  """
  def change_task(%Task{} = task) do
    Task.changeset(task, %{})
  end
end
