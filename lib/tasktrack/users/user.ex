defmodule Tasktrack.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :password_hash, :string, null: false
    field :username, :string, null: false
    field :password, :string, virtual: true

    has_many :assigned_task, Tasktrack.Tasks.Task, foreign_key: :assignee_id
    has_many :requested_task, Tasktrack.Tasks.Task, foreign_key: :requester_id
    
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password])
    |> validate_required([:username])
    |> unique_constraint(:username)
  end
end
